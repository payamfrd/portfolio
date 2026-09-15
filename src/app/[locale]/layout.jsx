import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SiteBackground from "@/components/layout/SiteBackground";
import ThemeProvider from "@/components/layout/ThemeProvider";
import PersonSchema from "@/components/seo/PersonSchema";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

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

  const title = isFa
    ? "محمدمهدی فرد (پیام فرد) | توسعه‌دهنده فرانت‌اند و متخصص شبکه و IT"
    : "Mohammadmehdi Fard (Payam Fard) | Front-End Developer & Network / IT Specialist";

  const description = isFa
    ? "رزومه، نمونه‌کارها، وبلاگ و سوابق حرفه‌ای محمدمهدی فرد (پیام فرد) در توسعه فرانت‌اند، JavaScript، React، Next.js، شبکه و فناوری اطلاعات."
    : "Portfolio, resume, projects, and technical articles by Mohammadmehdi Fard (Payam Fard), a Front-End Developer and Network / IT Specialist.";

  const canonical = `${SITE_URL}/${locale}`;

  return {
    title,

    description,

    keywords: [
      "Mohammadmehdi Fard",
      "Payam Fard",
      "محمدمهدی فرد",
      "پیام فرد",
      "Front-End Developer",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "Network Specialist",
      "IT Specialist",
      "Network Engineer",
      "Web Development",
      "SEO",
    ],

    alternates: {
      canonical,

      languages: {
        fa: `${SITE_URL}/fa`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/en`,
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

      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Mohammadmehdi Fard Portfolio",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [`${SITE_URL}/og-image.png`],
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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

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
            <SiteBackground />

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
