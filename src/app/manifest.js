export default function manifest() {
  return {
    name: "Mohammadmehdi Fard",
    short_name: "MMFard",

    description: "Portfolio and Blog of Mohammadmehdi Fard",

    start_url: "/",

    display: "standalone",

    background_color: "#020617",

    theme_color: "#2563eb",

    icons: [
      {
        src: "icon--200.jpg",
        sizes: "192x192",
        type: "image/jpg",
      },

      {
        src: "/icon--512.jpg",
        sizes: "512x512",
        type: "image/jpg",
      },
    ],
  };
}
