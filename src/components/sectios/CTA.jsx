import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/50
            p-12
            text-center
          "
        >
          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
            "
          >
            Let's Build Something Together
          </h2>

          <p
            className="
              mt-6
              text-slate-400
              max-w-2xl
              mx-auto
            "
          >
            Open to freelance projects, full-time opportunities and technical
            collaborations.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-4
            "
          >
            <Link
              href="/contact"
              className="
                px-6
                py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                transition
              "
            >
              Start Collaboration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
