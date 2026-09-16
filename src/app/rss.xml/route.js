import { getAllPosts } from "@/lib/blog/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

const MAX_POSTS = 20;

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getSafeSiteUrl() {
  try {
    return new URL(SITE_URL).origin;
  } catch {
    return "https://mohammadmehdifard.ir";
  }
}

function getValidDate(value) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function getPostUrl(post, siteUrl) {
  return new URL(
    `/${post.locale}/blog/${encodeURIComponent(post.slug)}`,
    `${siteUrl}/`,
  ).toString();
}

export async function GET() {
  const siteUrl = getSafeSiteUrl();

  const enPosts = getAllPosts("en");
  const faPosts = getAllPosts("fa");

  const posts = [...enPosts, ...faPosts]
    .filter((post) => {
      const date = getValidDate(post?.date);
      return (
        post?.slug && post?.locale && post?.title && post?.description && date
      );
    })
    .sort((a, b) => {
      const dateA = getValidDate(a.date)?.getTime() || 0;
      const dateB = getValidDate(b.date)?.getTime() || 0;

      return dateB - dateA;
    })
    .slice(0, MAX_POSTS);

  const items = posts
    .map((post) => {
      const postUrl = getPostUrl(post, siteUrl);

      const publishedDate = getValidDate(post.date);
      const modifiedDate = getValidDate(post.modified);

      const pubDate = publishedDate ? publishedDate.toUTCString() : "";

      const lastModified =
        modifiedDate && publishedDate && modifiedDate >= publishedDate
          ? modifiedDate.toUTCString()
          : pubDate;

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <lastBuildDate>${escapeXml(lastModified)}</lastBuildDate>
      <language>${post.locale === "fa" ? "fa-IR" : "en-US"}</language>
    </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Mohammadmehdi Fard Blog</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>
      Programming, Web Development, SEO, Networking, and IT Articles
    </description>
    <language>en-US</language>
    <lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
