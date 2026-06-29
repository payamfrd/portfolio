// "use client";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// const ThemeProvider = ({ children }) => {
//   return (
//     <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
//       {children}
//     </NextThemesProvider>
//   );
// };

// export default ThemeProvider;

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
