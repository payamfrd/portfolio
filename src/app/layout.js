import ThemeProvider from "@/components/layout/ThemeProvider";

export const metadata = {
  title: "Mohammadmehdi Fard",
  description: "Front-End Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
