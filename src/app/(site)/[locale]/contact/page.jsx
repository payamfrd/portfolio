import ContactPage from "@/components/pages/ContactPage";
import { notFound } from "next/navigation";

const SUPPORTED_LOCALES = ["fa", "en"];
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  const isFa = locale === "fa";

  const title = isFa
    ? "تماس با من | محمدمهدی فرد"
    : "Contact Me | Mohammadmehdi Fard";

  const description = isFa
    ? "برای همکاری در پروژه‌های فرانت‌اند، شبکه و فناوری اطلاعات با محمدمهدی فرد در ارتباط باشید."
    : "Contact Mohammadmehdi Fard for front-end development, networking, and IT projects.";

  const canonical = `${SITE_URL}/${locale}/contact`;

  return {
    title,
    description,

    keywords: isFa
      ? [
          "تماس با محمدمهدی فرد",
          "همکاری",
          "توسعه فرانت‌اند",
          "برنامه نویسی",
          "شبکه",
          "فناوری اطلاعات",
        ]
      : [
          "Contact Mohammadmehdi Fard",
          "Front-End Developer",
          "Networking",
          "IT",
          "Web Development",
          "Collaboration",
        ],

    alternates: {
      canonical,
      languages: {
        fa: `${SITE_URL}/fa/contact`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/en/contact`,
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

export default async function Contact({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return <ContactPage />;
}
