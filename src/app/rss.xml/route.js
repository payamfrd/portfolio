import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const enPosts = getAllPosts("en");
  const faPosts = getAllPosts("fa");

  const posts = [...enPosts, ...faPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20);

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>

<title>Mohammadmehdi Fard Blog</title>

<link>${siteUrl}</link>

<description>
Programming and Web Development Articles
</description>

${posts
  .map(
    (post) => `
<item>
<title>${post.title}</title>
<link>${siteUrl}/${post.locale}/blog/${post.slug}</link>
<description>${post.description}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>
`,
  )
  .join("")}

</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
