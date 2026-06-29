import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://MohammadmehdiFard.com"),

  title: {
    default: "Mohammadmehdi Fard",

    template: "%s | Mohammadmehdi Fard",
  },

  description: "Front-End Developer Portfolio",

  keywords: [
    "Frontend Developer",
    "Next.js",
    "React",
    "JavaScript",
    "Portfolio",
    "Mohammadmehdi Fard",
    "Payam Fard",
  ],

  authors: [
    {
      name: "Mohammadmehdi Fard",
    },
  ],

  creator: "Mohammadmehdi Fard",
  alternates: {
    languages: {
      en: "https://MohammadmehdiFard.com/en",
      fa: "https://MohammadmehdiFard.com/fa",
    },
  },
  openGraph: {
    type: "website",

    locale: "en_US",

    url: "https://MohammadmehdiFard.com",

    title: "Mohammadmehdi Fard",

    description: "Front-End Developer Portfolio",

    siteName: "Mohammadmehdi Fard",

    images: [{ url: "/og-image.png" }],
  },

  twitter: {
    card: "summary_large_image",

    title: "Mohammadmehdi Fard",

    description: "Front-End Developer Portfolio",
  },

  icons: {
    icon: "/profile.jpg",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
