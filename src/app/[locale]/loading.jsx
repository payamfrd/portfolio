export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[var(--border)]" />

          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-transparent
              border-t-[var(--primary)]
              animate-spin
            "
          />
        </div>

        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce" />

          <span
            className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </main>
  );
}
