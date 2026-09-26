export default function PersonSchema() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Mohammadmehdi Fard",
    alternateName: "Payam Fard",

    url: siteUrl,

    image: `${siteUrl}/profile.jpg`,

    description:
      "Front-End Developer and Network / IT Specialist specialized in React, Next.js, JavaScript and networking.",

    jobTitle: "Front-End Developer & Network / IT Specialist",

    knowsAbout: [
      "JavaScript",
      "React",
      "Next.js",
      "Frontend Development",
      "Web Development",
      "SEO",
      "Networking",
      "IT Infrastructure",
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
