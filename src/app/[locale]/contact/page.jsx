import ContactPage from "@/components/pages/ContactPage";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title:
      locale === "fa"
        ? "تماس با من | محمدمهدی فرد"
        : "Contact Me | Mohammadmehdi Fard",

    description:
      locale === "fa"
        ? "ارتباط با محمدمهدی فرد برای همکاری و پروژه"
        : "Contact Mohammadmehdi Fard for projects and collaboration",
        
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact`,

      languages: {
        fa: `${process.env.NEXT_PUBLIC_SITE_URL}/fa/contact`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact`,
      },
    },
  };
}

export default function Contact() {
  return <ContactPage />;
}
