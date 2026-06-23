import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/layout/ThemeProvider";

import "./globals.css";
import PersonSchema from "@/components/seo/PersonSchema";

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

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "https://MohammadmehdiFard.com",

    title: "Mohammadmehdi Fard",

    description: "Front-End Developer Portfolio",

    siteName: "Mohammadmehdi Fard",

    images: ["/og=image.png"],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <PersonSchema />
        </ThemeProvider>
      </body>
    </html>
  );
}
