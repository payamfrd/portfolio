import Link from "next/link";

export default async function NotFound({ params }) {
  const { locale } = await params;

  const isFa = locale === "fa";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="text-center max-w-xl">
        <span className="text-[var(--accent)] font-semibold">404</span>

        <h1 className="mt-4 text-5xl md:text-7xl font-bold">
          {isFa ? "صفحه پیدا نشد" : "Page Not Found"}
        </h1>

        <p className="mt-6 text-[var(--muted)]">
          {isFa
            ? "صفحه مورد نظر وجود ندارد یا منتقل شده است."
            : "The page you are looking for doesn't exist or has been moved."}
        </p>

        <Link
          href={`/${locale}`}
          className="
            mt-8
            inline-flex
            px-6
            py-3
            rounded-xl
            bg-[var(--primary)]
            text-white
            hover:opacity-90
            transition
          "
        >
          {isFa ? "بازگشت به صفحه اصلی" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}
