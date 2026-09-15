export function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ۀ/g, "ه")
    .replace(/ة/g, "ه")
    .replace(/\u200c/g, " ")
    .replace(/\u200f/g, "")
    .replace(/\u200e/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatBlogDate(date, locale) {
  if (!date) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat(
      locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    ).format(new Date(date));
  } catch {
    return String(date);
  }
}

export function formatBlogNumber(value, locale) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString(locale === "fa" ? "fa-IR" : "en-US");
}
