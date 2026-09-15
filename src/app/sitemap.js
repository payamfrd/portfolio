import { getAllPosts } from "@/lib/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

export default function sitemap() {
  const pages = [
    {
      url: `${SITE_URL}/fa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/fa/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/fa/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const postUrls = [];

  for (const locale of ["fa", "en"]) {
    const posts = getAllPosts(locale);

    for (const post of posts) {
      postUrls.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,

        lastModified: new Date(post.modified || post.date || Date.now()),

        changeFrequency: "monthly",

        priority: post.featured ? 0.8 : 0.7,
      });
    }
  }

  return [...pages, ...postUrls];
}
