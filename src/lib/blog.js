import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

function getPostsDirectory(locale = "en") {
  return path.join(process.cwd(), "src/content/blog", locale);
}

export function getAllPosts(locale = "en") {
  const postsDirectory = getPostsDirectory(locale);
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");

      const fullPath = path.join(postsDirectory, file);

      const fileContent = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContent);

      return {
        slug,
        locale,
        ...data,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug, locale = "en") {
  const postsDirectory = getPostsDirectory(locale);
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContent);

  const stats = readingTime(content);

  return {
    slug,
    content,
    readingTime: stats.text,
    ...data,
  };
}

export function getFeaturedPosts(locale = "en") {
  const posts = getAllPosts(locale);

  return posts.filter((post) => post.featured);
}

export function getRelatedPosts(currentSlug, locale = "en") {
  return getAllPosts(locale)
    .filter((post) => post.slug !== currentSlug)

    .slice(0, 3);
}
