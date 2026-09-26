import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["fa", "en"];
const DEFAULT_LOCALE = "fa";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale = SUPPORTED_LOCALES.includes(requestedLocale)
    ? requestedLocale
    : DEFAULT_LOCALE;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
