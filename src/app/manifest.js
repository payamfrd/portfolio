export default function manifest() {
  return {
    name: "Mohammadmehdi Fard",
    short_name: "MMFard",
    description: "Portfolio and Blog of Mohammadmehdi Fard",
    start_url: "/fa",
    scope: "/",
    id: "/fa",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#2563eb",
    lang: "fa",
    dir: "rtl",

    icons: [
      {
        src: "/icon--200.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/icon--512.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
