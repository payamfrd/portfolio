// import Link from "next/link";
// import { useTranslations } from "next-intl";

// export default function Breadcrumb({ locale, title, type = "projects" }) {
//   const t = useTranslations("common");

//   return (
//     <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
//       <Link href={`/${locale}`}>{t("home")}</Link>

//       <span>/</span>

//       <Link href={`/${locale}/${type}`}>
//         {type === "blog" ? t("blog") : t("projects")}
//       </Link>

//       <span>/</span>

//       <span>{title}</span>
//     </div>
//   );
// }

import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[var(--text)]">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="
                    hover:text-[var(--accent)]
                    transition
                  "
                >
                  {item.label}
                </Link>
              )}

              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
