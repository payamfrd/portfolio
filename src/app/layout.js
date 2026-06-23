import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/layout/ThemeProvider";

export const metadata = {
  title: "Mohammadmehdi Fard",
  description: "Front-End Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider><Navbar/>{children}</ThemeProvider>
      </body>
    </html>
  );
}
