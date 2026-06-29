export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: "Mohammadmehdi Fard",

    url: process.env.NEXT_PUBLIC_SITE_URL,

    image: `${process.env.NEXT_PUBLIC_SITE_URL}/profile.jpg`,

    jobTitle: "Front-End Developer",

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
