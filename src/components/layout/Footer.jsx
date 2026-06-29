import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { getAllPosts } from "@/lib/blog";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Footer = async ({ locale }) => {
  const t = await getTranslations({
    locale,
    namespace: "footer",
  });
  const posts = getAllPosts(locale).slice(0, 2);

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 max-md:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{t("name")}</h3>
          <p className="mt-2 text-[var(--muted)]">{t("title")}</p>
          <a
            href="/Fard.Mohammadmehdi.pdf"
            download
            className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white
w-fit
mt-3
hover:opacity-90
transition"
          >
            {t("downloadResume")}
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-3">{t("quickLinks")}</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href={`/${locale}#about`}
                className="transition hover:text-[var(--accent)]"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}#skills`}
                className="transition hover:text-[var(--accent)]"
              >
                {t("skills")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}#projects`}
                className="transition hover:text-[var(--accent)]"
              >
                {t("projects")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">{t("popularPosts")}</h4>
          <ul className="flex flex-col space-y-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="transition hover:text-[var(--accent)]"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">{t("connect")}</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/payamfrd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition
hover:text-[var(--accent)]"
              >
                <FaGithub size={20} />
                {t("github")}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mohammadmehdi-fard-a430a1222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition
hover:text-[var(--accent)]"
              >
                <FaLinkedin size={20} />
                {t("linkedin")}
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/989301801747"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition
hover:text-[var(--accent)]"
              >
                <FaWhatsapp size={20} />
                {t("whatsapp")}
              </a>
            </li>
            <li>
              <a
                href="mailto:Fard.Mohammadmehdi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition
hover:text-[var(--accent)]"
              >
                <HiOutlineMailOpen size={20} />
                {t("email")}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        dir="ltr"
        className=" border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]"
      >
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-[var(--accent)]">Mohammadmehdi Fard ❤</span>
      </div>
    </footer>
  );
};

export default Footer;
