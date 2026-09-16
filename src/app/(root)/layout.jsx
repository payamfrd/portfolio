import "@/app/globals.css";

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
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
