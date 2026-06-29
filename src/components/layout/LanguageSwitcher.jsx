"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const switchTo = pathname.startsWith("/fa")
    ? pathname.replace("/fa", "/en")
    : pathname.replace("/en", "/fa");

  return (
    <Link
      href={switchTo}
      className=" px-2.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:text-[var(--primary)] transition "
    >
      {pathname.startsWith("/fa") ? "EN" : "فا"}
    </Link>
  );
}
