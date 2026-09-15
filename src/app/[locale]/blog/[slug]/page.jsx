import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getPostTranslation,
} from "@/lib/blog";

import { notFound } from "next/navigation";
import Image from "next/image";
import MdxContent from "@/components/blog/MdxContent";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getTranslations } from "next-intl/server";

const SUPPORTED_LOCALES = ["fa", "en"];

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];

  for (const locale of SUPPORTED_LOCALES) {
    const posts = getAllPosts(locale);

    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const canonical = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const translatedPost = getPostTranslation(post, locale);

  const languages = {};

  if (translatedPost?.fa) {
    languages.fa = `${SITE_URL}/fa/blog/${translatedPost.fa.slug}`;
  }

  if (translatedPost?.en) {
    languages.en = `${SITE_URL}/en/blog/${translatedPost.en.slug}`;
    languages["x-default"] = `${SITE_URL}/en/blog/${translatedPost.en.slug}`;
  }

  const imageUrl = post.cover ? `${SITE_URL}${post.cover}` : undefined;

  const keywords = post.keywords.length > 0 ? post.keywords : post.tags;

  return {
    title: post.title,
    description: post.description,

    keywords,

    authors: [
      {
        name: "Mohammadmehdi Fard",
        url: `${SITE_URL}/${locale}`,
      },
    ],

    alternates: {
      canonical,
      languages,
    },

    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.description,
      siteName: "Mohammadmehdi Fard",

      publishedTime: post.date,
      modifiedTime: post.modified || post.date,

      authors: [`${SITE_URL}/${locale}`],

      section: post.category,

      tags: post.tags.length > 0 ? post.tags : undefined,

      locale: locale === "fa" ? "fa_IR" : "en_US",

      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],

      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",

      title: post.title,
      description: post.description,

      images: imageUrl ? [imageUrl] : undefined,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

function formatDate(date, locale) {
  if (!date) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat(
      locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    ).format(new Date(date));
  } catch {
    return String(date);
  }
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("blog");

  const relatedPosts = getRelatedPosts(slug, locale);

  const canonical = `${SITE_URL}/${locale}/blog/${post.slug}`;

  const imageUrl = post.cover ? `${SITE_URL}${post.cover}` : undefined;

  const formattedDate = formatDate(post.date, locale);

  const formattedModifiedDate = formatDate(post.modified || post.date, locale);

  const readingTimeMinutes = Math.max(1, Number(post.readingTimeMinutes) || 1);

  const wordCount = Math.max(0, Number(post.wordCount) || 0);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "@id": `${canonical}#article`,

    headline: post.title,

    description: post.description,

    url: canonical,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },

    inLanguage: locale === "fa" ? "fa-IR" : "en-US",

    datePublished: post.date,

    dateModified: post.modified || post.date,

    author: {
      "@type": "Person",
      name: "Mohammadmehdi Fard",
      url: `${SITE_URL}/${locale}`,
    },

    publisher: {
      "@type": "Person",
      name: "Mohammadmehdi Fard",
      url: SITE_URL,
    },

    ...(imageUrl
      ? {
          image: [imageUrl],
        }
      : {}),

    ...(post.category
      ? {
          articleSection: post.category,
        }
      : {}),

    ...(post.keywords.length
      ? {
          keywords: post.keywords.join(", "),
        }
      : {}),

    ...(wordCount
      ? {
          wordCount,
        }
      : {}),

    ...(post.tags.length
      ? {
          about: post.tags.map((tag) => ({
            "@type": "Thing",
            name: tag,
          })),
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: `${SITE_URL}/${locale}`,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: `${SITE_URL}/${locale}/blog`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  const structuredData = [articleSchema, breadcrumbSchema];

  return (
    <main className="mx-auto max-w-5xl px-6 py-32">
      <article
        itemScope
        itemType="https://schema.org/BlogPosting"
        dir={locale === "fa" ? "rtl" : "ltr"}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Breadcrumb
          items={[
            {
              label: t("home"),
              href: `/${locale}`,
            },

            {
              label: t("title"),
              href: `/${locale}/blog`,
            },

            {
              label: post.title,
            },
          ]}
        />

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
            <time dateTime={post.date}>
              {t("published")}: {formattedDate}
            </time>

            {post.modified && post.modified !== post.date && (
              <time dateTime={post.modified}>
                {t("updated")}: {formattedModifiedDate}
              </time>
            )}

            <span>
              {readingTimeMinutes} {t("minutes")}
            </span>
          </div>

          <h1
            itemProp="headline"
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[var(--text)] md:text-5xl"
          >
            {post.title}
          </h1>

          <p
            itemProp="description"
            className="mt-6 max-w-4xl text-lg leading-9 text-[var(--muted)]"
          >
            {post.description}
          </p>
        </header>

        {post.cover && (
          <figure className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]">
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-auto w-full object-cover"
            />
          </figure>
        )}

        <div className="mt-12">
          <MdxContent source={post.content} locale={locale} />
        </div>

        {post.tags.length > 0 && (
          <footer className="mt-12 border-t border-[var(--border)] pt-8">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              {t("tags")}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section
          className="mt-24 border-t border-[var(--border)] pt-16"
          aria-labelledby="related-posts-title"
        >
          <h2
            id="related-posts-title"
            className="text-3xl font-bold tracking-tight text-[var(--text)]"
          >
            {t("relatedPosts")}
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={`${relatedPost.locale}-${relatedPost.slug}`}
                post={relatedPost}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
