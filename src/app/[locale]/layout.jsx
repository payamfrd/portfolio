import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/layout/ThemeProvider";
import PersonSchema from "@/components/seo/PersonSchema";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { NextIntlClientProvider } from "next-intl";

import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const isFa = locale === "fa";

  return {
    title: isFa
      ? "محمدمهدی فرد | توسعه‌دهنده فرانت‌اند"
      : "Mohammadmehdi Fard | Front-End Developer",

    description: isFa
      ? "رزومه و نمونه کارهای محمدمهدی فرد"
      : "Portfolio and Resume of Mohammadmehdi Fard",

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,

      languages: {
        fa: `${process.env.NEXT_PUBLIC_SITE_URL}/fa`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
      },
    },

    openGraph: {
      title: isFa ? "محمدمهدی فرد" : "Mohammadmehdi Fard",

      description: isFa ? "رزومه و نمونه کارها" : "Portfolio and Resume",

      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),

      applicationName: "Mohammadmehdi Fard",

      authors: [
        {
          name: "Mohammadmehdi Fard",
        },
      ],

      creator: "Mohammadmehdi Fard",

      publisher: "Mohammadmehdi Fard",

      keywords: [
        "Mohammadmehdi Fard",
        "Frontend Developer",
        "React Developer",
        "Next.js Developer",
        "JavaScript",
        "TypeScript",
        "Web Development",
        "Portfolio",
        "Blog",
      ],

      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,

      siteName: "Mohammadmehdi Fard",

      locale: locale,

      type: "website",

      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Mohammadmehdi Fard",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: isFa ? "محمدمهدی فرد" : "Mohammadmehdi Fard",
      description: isFa ? "رزومه و نمونه کارها" : "Portfolio and Resume",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Mohammadmehdi Fard",
        },
      ],
    },
    other: {
      "rss-feed": `${process.env.NEXT_PUBLIC_SITE_URL}/rss.xml`,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;

  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={locale === "fa" ? "font-vazir" : "font-inter"}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,

                style: {
                  background: "var(--card)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                },
              }}
            />
            <ScrollProgress />
            <Navbar />
            {children}
            <PersonSchema />
            <Footer locale={locale} />
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
