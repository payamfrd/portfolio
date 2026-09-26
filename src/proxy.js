import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const SUPPORTED_LOCALES = ["fa", "en"];
const DEFAULT_LOCALE = "fa";
const LOCALE_COOKIE = "portfolio-locale";

const handleI18nRouting = createMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: false,
});

export default function proxy(request) {
  const { pathname } = request.nextUrl;

  /*
   * Root URL:
   *
   * First visit:
   * /
   * ↓
   * /fa
   *
   * Returning visitor:
   * /
   * ↓
   * previously selected locale
   *
   * Explicit /fa and /en URLs are always respected.
   */
  if (pathname === "/") {
    const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;

    const locale = SUPPORTED_LOCALES.includes(savedLocale)
      ? savedLocale
      : DEFAULT_LOCALE;

    const url = request.nextUrl.clone();

    url.pathname = `/${locale}`;

    return NextResponse.redirect(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
