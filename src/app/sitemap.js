import { getAllPosts } from "@/lib/blog/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

const LOCALES = ["fa", "en"];

function getValidDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export default function sitemap() {
  const pages = [
    {
      url: `${SITE_URL}/fa`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/fa/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/en/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/fa/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/en/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const postUrls = [];

  for (const locale of LOCALES) {
    const posts = getAllPosts(locale);

    for (const post of posts) {
      const lastModified =
        getValidDate(post.modified) || getValidDate(post.date);

      postUrls.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly",
        priority: post.featured ? 0.8 : 0.7,
      });
    }
  }

  return [...pages, ...postUrls];
}
