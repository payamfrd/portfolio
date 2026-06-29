import { getAllPosts, getFeaturedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title:
      locale === "fa" ? "بلاگ | محمدمهدی فرد" : "Blog | Mohammadmehdi Fard",

    description:
      locale === "fa"
        ? "مقالات برنامه نویسی و توسعه وب"
        : "Programming and Web Development Articles",

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;

  const t = await getTranslations("blog");

  const featured = getFeaturedPosts(locale);

  // All Posts
  const posts = getAllPosts(locale);

  // All Posts Other Than featured
  // const posts = getAllPosts(locale).filter(
  //   (post) => !featured.some((featuredPost) => featuredPost.slug === post.slug),
  // );

  return (
    <main className=" max-w-5xl mx-auto px-6 py-32">
      <h1 className=" text-5xl font-bold border-b-2 border-b-[var(--border)] pb-5 mb-5">
        {t("title")}
      </h1>

      {/* Featured Posts */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--primary)]">
          {t("featuredPosts")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-8">{t("allPosts")}</h2>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-[var(--muted)]">{t("noPosts")}</p>
          ) : (
            posts.map((post) => <BlogCard key={post.slug} post={post} />)
          )}
        </div>
      </section>
    </main>
  );
}
