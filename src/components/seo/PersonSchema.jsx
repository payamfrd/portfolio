export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "Person",

    name: "Mohammadmehdi Fard",

    url: "https://yourdomain.com",

    jobTitle: "Front-End Developer",
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
