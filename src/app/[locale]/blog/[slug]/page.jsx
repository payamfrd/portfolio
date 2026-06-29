import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import MdxContent from "@/components/blog/MdxContent";
import Image from "next/image";
import BlogCard from "@/components/blog/BlogCard";

export async function generateStaticParams() {
  const locales = ["fa", "en"];

  const params = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);

    posts.forEach((post) => {
      params.push({
        locale,
        slug: post.slug,
      });
    });
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_SITE_URL}/fa/blog/${slug}`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/blog/${slug}`,
      },
    },

    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${post.cover}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${post.cover}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;

  const post = getPostBySlug(slug, locale);

  const relatedPosts = getRelatedPosts(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <main
      className="
        max-w-4xl
        mx-auto
        px-6
        py-32
      "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",

            headline: post.title,
            description: post.description,

            image: `${process.env.NEXT_PUBLIC_SITE_URL}${post.cover}`,

            datePublished: post.date,

            author: {
              "@type": "Person",
              name: "Mohammadmehdi Fard",
            },

            publisher: {
              "@type": "Organization",
              name: "Mohammadmehdi Fard",
              url: process.env.NEXT_PUBLIC_SITE_URL,
            },

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
            },
          }),
        }}
      />
      <Image
        src={post.cover}
        alt={post.title}
        width={1200}
        height={630}
        priority
        sizes="(max-width:768px) 100vw, 1200px"
        className="rounded-3xl mb-10 border border-[var(--border)]"
      />
      <h1 className=" text-4xl md:text-5xl font-bold leading-tight">
        {post.title}
      </h1>

      <p className="mt-4 text-[var(--muted)] text-lg">{post.description}</p>

      <MdxContent source={post.content} />
      <div className=" mt-8 pt-6 border-t border-[var(--border)] flex gap-5 text-sm text-[var(--muted)]">
        <time dateTime={post.date}>
          {locale === "fa" ? "تاریخ:" : "Date:"} {post.date}
        </time>
        <p>{post.readingTime}</p>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">
            {locale === "fa" ? "مقالات مرتبط" : "Related Posts"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
