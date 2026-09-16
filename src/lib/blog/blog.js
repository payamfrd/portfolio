import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const SUPPORTED_LOCALES = ["fa", "en"];
const MIN_RELATED_POSTS = 2;
const MAX_RELATED_POSTS = 3;

/*
 * Phase 1:
 * Views are stored as data but are not collected or displayed.
 *
 * Phase 2:
 * A server-side view counter can update post.views
 * without changing the normalized post structure.
 */
const DEFAULT_RELATED = {
  "what-is-next-js": ["react", "javascript"],
  nextjs: ["react", "javascript"],

  "what-is-react-js": ["javascript", "nextjs"],
  react: ["javascript", "nextjs"],

  "what-is-javascript-js": ["react", "nextjs"],
  javascript: ["react", "nextjs"],

  algorithm: ["javascript", "react"],
  "what-is-algorithm": ["javascript", "react"],

  "hosting-domain": ["nextjs", "network-basics"],

  /*
   * Network article:
   * Covers networking fundamentals, IP, Subnet Mask,
   * MAC Address, routing basics, and related infrastructure concepts.
   */
  "what-is-network": ["hosting-domain", "nextjs"],
  "network-basics": ["hosting-domain", "nextjs"],
};

function getPostsDirectory(locale = "en") {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`Unsupported blog locale: ${locale}`);
  }

  return path.join(process.cwd(), "src", "content", "blog", locale);
}

function cleanContentForReadingTime(content) {
  return String(content || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[\*\_\~>-]/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateReadingTime(content, locale) {
  const cleanContent = cleanContentForReadingTime(content);

  const stats = readingTime(cleanContent, {
    wordsPerMinute: locale === "fa" ? 180 : 200,
  });

  return {
    minutes: Math.max(1, Math.ceil(stats.minutes)),
    wordCount: Math.max(0, Math.round(stats.words)),
  };
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(Boolean)
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function normalizeCover(data) {
  const candidates = [data.cover, data.image, data.thumbnail];

  const cover = candidates.find(
    (value) => typeof value === "string" && value.trim(),
  );

  return cover ? cover.trim() : null;
}

function normalizePost({ slug, locale, data, content = "" }) {
  const reading = calculateReadingTime(content, locale);

  const views = Number(data.views);

  const translationKey =
    typeof data.translationKey === "string" && data.translationKey.trim()
      ? data.translationKey.trim()
      : slug;

  return {
    slug,
    locale,

    title:
      typeof data.title === "string" && data.title.trim()
        ? data.title.trim()
        : slug,

    description:
      typeof data.description === "string" ? data.description.trim() : "",

    date: data.date || "",
    modified: data.modified || data.date || "",

    featured: Boolean(data.featured),

    /*
     * Supports the normal `cover` field and also
     * `image` / `thumbnail` as safe fallbacks.
     */
    cover: normalizeCover(data),

    translationKey,

    category:
      typeof data.category === "string" && data.category.trim()
        ? data.category.trim()
        : "general",

    tags: normalizeStringArray(data.tags),
    keywords: normalizeStringArray(data.keywords),

    /*
     * Phase 2-ready field.
     * Currently no view counter updates this value.
     */
    views: Number.isFinite(views) && views >= 0 ? views : 0,

    related: normalizeStringArray(data.related),

    readingTimeMinutes: reading.minutes,
    wordCount: reading.wordCount,

    content,
  };
}

function readPostFile(locale, filename) {
  const slug = filename.replace(/\.mdx$/i, "");

  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return null;
  }

  const postsDirectory = getPostsDirectory(locale);
  const fullPath = path.join(postsDirectory, filename);

  const resolvedDirectory = path.resolve(postsDirectory);
  const resolvedPath = path.resolve(fullPath);

  if (!resolvedPath.startsWith(`${resolvedDirectory}${path.sep}`)) {
    return null;
  }

  if (!fs.existsSync(resolvedPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(resolvedPath, "utf8");
  const { data, content } = matter(fileContent);

  return normalizePost({
    slug,
    locale,
    data,
    content,
  });
}

function getDefaultRelated(post) {
  const candidates = [
    DEFAULT_RELATED[post.translationKey],
    DEFAULT_RELATED[post.slug],
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate;
    }
  }

  return [];
}

function resolveRelatedPost(candidates, reference) {
  const normalizedReference = String(reference || "")
    .trim()
    .toLocaleLowerCase();

  if (!normalizedReference) {
    return null;
  }

  return (
    candidates.find(
      (post) => post.translationKey.toLocaleLowerCase() === normalizedReference,
    ) ||
    candidates.find(
      (post) => post.slug.toLocaleLowerCase() === normalizedReference,
    ) ||
    null
  );
}

function getExplicitRelatedPosts(currentPost, candidates) {
  const references = [
    ...currentPost.related,
    ...getDefaultRelated(currentPost),
  ];

  const result = [];

  for (const reference of references) {
    const match = resolveRelatedPost(candidates, reference);

    if (!match) {
      continue;
    }

    if (match.slug === currentPost.slug) {
      continue;
    }

    if (result.some((post) => post.slug === match.slug)) {
      continue;
    }

    result.push(match);

    if (result.length >= MAX_RELATED_POSTS) {
      break;
    }
  }

  return result;
}

function scoreRelatedPosts(currentPost, candidates) {
  const currentTags = new Set(
    (currentPost.tags || []).map((tag) => String(tag).toLocaleLowerCase()),
  );

  const currentKeywords = new Set(
    (currentPost.keywords || []).map((keyword) =>
      String(keyword).toLocaleLowerCase(),
    ),
  );

  return candidates
    .map((post) => {
      let score = 0;

      if (currentPost.category && post.category === currentPost.category) {
        score += 5;
      }

      for (const tag of post.tags || []) {
        if (currentTags.has(String(tag).toLocaleLowerCase())) {
          score += 3;
        }
      }

      for (const keyword of post.keywords || []) {
        if (currentKeywords.has(String(keyword).toLocaleLowerCase())) {
          score += 2;
        }
      }

      if (post.featured) {
        score += 0.25;
      }

      return {
        post,
        score,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    )
    .map(({ post }) => post);
}

function getRelatedPostsFromPost(currentPost, allPosts) {
  const candidates = allPosts.filter((post) => post.slug !== currentPost.slug);

  const explicitRelated = getExplicitRelatedPosts(currentPost, candidates);

  if (explicitRelated.length >= MIN_RELATED_POSTS) {
    return explicitRelated.slice(0, MAX_RELATED_POSTS);
  }

  const remainingCandidates = candidates.filter(
    (post) => !explicitRelated.some((related) => related.slug === post.slug),
  );

  const fallback = scoreRelatedPosts(currentPost, remainingCandidates);

  return [...explicitRelated, ...fallback].slice(0, MAX_RELATED_POSTS);
}

export function getAllPosts(locale = "en") {
  const postsDirectory = getPostsDirectory(locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(postsDirectory, {
      withFileTypes: true,
    })
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mdx"),
    )
    .map((entry) => entry.name);

  return files
    .map((filename) => readPostFile(locale, filename))
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return (
        (Number.isFinite(dateB) ? dateB : 0) -
        (Number.isFinite(dateA) ? dateA : 0)
      );
    });
}

export function getPostBySlug(slug, locale = "en") {
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/i.test(slug)) {
    return null;
  }

  const postsDirectory = getPostsDirectory(locale);
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  const resolvedDirectory = path.resolve(postsDirectory);
  const resolvedPath = path.resolve(fullPath);

  if (!resolvedPath.startsWith(`${resolvedDirectory}${path.sep}`)) {
    return null;
  }

  if (!fs.existsSync(resolvedPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(resolvedPath, "utf8");

  const { data, content } = matter(fileContent);

  return normalizePost({
    slug,
    locale,
    data,
    content,
  });
}

export function getFeaturedPosts(locale = "en") {
  return getAllPosts(locale).filter((post) => post.featured);
}

export function getPostTranslation(post) {
  if (!post?.translationKey) {
    return {};
  }

  const result = {};

  for (const locale of SUPPORTED_LOCALES) {
    const posts = getAllPosts(locale);

    const translatedPost = posts.find(
      (item) => item.translationKey === post.translationKey,
    );

    if (translatedPost) {
      result[locale] = translatedPost;
    }
  }

  return result;
}

export function getRelatedPosts(currentSlug, locale = "en") {
  const currentPost = getPostBySlug(currentSlug, locale);

  if (!currentPost) {
    return [];
  }

  const allPosts = getAllPosts(locale);

  return getRelatedPostsFromPost(currentPost, allPosts);
}

export function getAllTranslationKeys() {
  const keys = new Set();

  for (const locale of SUPPORTED_LOCALES) {
    for (const post of getAllPosts(locale)) {
      if (post.translationKey) {
        keys.add(post.translationKey);
      }
    }
  }

  return [...keys];
}
