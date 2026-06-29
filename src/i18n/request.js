import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});


// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {

//   return {
//     locale: "fa",

//     messages: (
//       await import("../messages/fa.json")
//     ).default
//   };
// });

// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async ({ requestLocale }) => {

//   console.log("requestLocale:", requestLocale);

//   const locale = await requestLocale;

//   console.log("locale:", locale);

//   return {
//     locale: locale || "fa",

//     messages: (
//       await import(
//         `../messages/${locale || "fa"}.json`
//       )
//     ).default
//   };
// });

