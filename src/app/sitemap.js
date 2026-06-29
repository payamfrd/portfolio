import { getAllPosts } from "@/lib/blog";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const enPosts = getAllPosts("en");
  const faPosts = getAllPosts("fa");

  const postUrls = [...enPosts, ...faPosts].map((post) => ({
    url: `${siteUrl}/${post.locale}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  return [
    {
      url: `${siteUrl}/fa`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${siteUrl}/fa/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${siteUrl}/fa/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },

    ...postUrls,
  ];
}
