import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-1 text-sm text-[var(--muted)]">
          Built by
          <Link
            href="https://calvinskunnies.my.canva.site/"
            target="_blank"
            className="text-[var(--primary)] hover:underline font-medium"
          >
            CalvinSkunnies
          </Link>
        </div>
      </div>
    </footer>
  )
}
