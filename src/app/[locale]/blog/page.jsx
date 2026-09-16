import { getAllPosts } from "@/lib/blog/blog";
import BlogFilters from "@/components/blog/BlogFilters";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const SUPPORTED_LOCALES = ["fa", "en"];
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  const isFa = locale === "fa";

  const title = isFa ? "وبلاگ | محمدمهدی فرد" : "Blog | Mohammadmehdi Fard";

  const description = isFa
    ? "مقالات تخصصی درباره JavaScript، React، Next.js، توسعه وب، برنامه‌نویسی، سئو، شبکه و فناوری اطلاعات."
    : "Articles about JavaScript, React, Next.js, web development, programming, SEO, networking, and information technology.";

  const canonical = `${SITE_URL}/${locale}/blog`;

  return {
    title,
    description,

    keywords: isFa
      ? [
          "جاوااسکریپت",
          "ری‌اکت",
          "نکست جی‌اس",
          "توسعه وب",
          "برنامه نویسی",
          "سئو",
          "شبکه",
          "فناوری اطلاعات",
          "محمدمهدی فرد",
          "پیام فرد",
        ]
      : [
          "JavaScript",
          "React",
          "Next.js",
          "Web Development",
          "Programming",
          "SEO",
          "Networking",
          "Information Technology",
          "Mohammadmehdi Fard",
          "Payam Fard",
        ],

    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/fa/blog`,
        en: `${SITE_URL}/en/blog`,
        "x-default": `${SITE_URL}/en/blog`,
      },
    },

    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Mohammadmehdi Fard",
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
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

export default async function BlogPage({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const t = await getTranslations("blog");
  const posts = getAllPosts(locale);

  return (
    <main className="mx-auto max-w-7xl px-6 py-32" aria-labelledby="blog-title">
      <Breadcrumb
        items={[
          {
            label: t("home"),
            href: `/${locale}`,
          },
          {
            label: t("title"),
          },
        ]}
      />

      <header className="mb-12">
        <h1
          id="blog-title"
          className="border-b-2 border-[var(--border)] pb-5 text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl"
        >
          {t("title")}
        </h1>

        <p className="mt-6 max-w-3xl leading-8 text-[var(--muted)]">
          {t("metaDescription")}
        </p>
      </header>

      <BlogFilters posts={posts} />
    </main>
  );
}
