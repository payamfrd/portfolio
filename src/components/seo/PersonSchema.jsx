export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",

    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#person`,

    name: "Mohammadmehdi Fard",

    alternateName: "Payam Fard",

    description: "Front-End Developer specialized in React and Next.js",

    nationality: {
      "@type": "Country",
      name: "Iran",
    },

    url: process.env.NEXT_PUBLIC_SITE_URL,

    image: `${process.env.NEXT_PUBLIC_SITE_URL}/profile.jpg`,

    jobTitle: "Front-End Developer",

    knowsAbout: [
      "JavaScript",
      "React",
      "Next.js",
      "Frontend Development",
      "Web Development",
      "Networking",
    ],

    sameAs: [
      "https://github.com/payamfrd",
      "https://www.linkedin.com/in/mohammadmehdi-fard-a430a1222",
      "https://wa.me/989301801747",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
