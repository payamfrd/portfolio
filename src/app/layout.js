import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Mohammadmehdi Fard | Front-End Developer & Network / IT Specialist",
    template: "%s | Mohammadmehdi Fard",
  },

  description:
    "Mohammadmehdi Fard (Payam Fard) — Front-End Developer and Network / IT Specialist specializing in JavaScript, React, Next.js, modern web development, networking, and IT.",

  keywords: [
    "Mohammadmehdi Fard",
    "Payam Fard",
    "محمدمهدی فرد",
    "پیام فرد",
    "Front-End Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "Network Specialist",
    "IT Specialist",
    "Network Engineer",
    "Web Development",
    "SEO",
    "React",
    "Next.js",
    "JavaScript",
    "Portfolio",
  ],

  authors: [
    {
      name: "Mohammadmehdi Fard",
      url: `${SITE_URL}/en`,
    },
  ],

  creator: "Mohammadmehdi Fard",

  publisher: "Mohammadmehdi Fard",

  alternates: {
    canonical: `${SITE_URL}/en`,

    languages: {
      en: `${SITE_URL}/en`,
      fa: `${SITE_URL}/fa`,
      "x-default": `${SITE_URL}/en`,
    },
  },

  openGraph: {
    type: "website",

    url: SITE_URL,

    title: "Mohammadmehdi Fard | Front-End Developer & Network / IT Specialist",

    description:
      "Portfolio, projects, blog, resume, and professional background of Mohammadmehdi Fard.",

    siteName: "Mohammadmehdi Fard",

    locale: "en_US",

    alternateLocale: ["fa_IR"],

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammadmehdi Fard Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Mohammadmehdi Fard | Front-End Developer & Network / IT Specialist",

    description: "Front-End Developer and Network / IT Specialist portfolio.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg",
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

export default function RootLayout({ children }) {
  return children;
}
