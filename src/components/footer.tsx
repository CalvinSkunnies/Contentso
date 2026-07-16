import { Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
            Built by{" "}
            <Link
              href="https://calvinskunnies.my.canva.site/"
              target="_blank"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              CalvinSkunnies
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link
              href="https://github.com/CalvinSkunnies/Contentso"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
            <Link
              href="https://calvinskunnies.my.canva.site/"
              target="_blank"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Portfolio
            </Link>
            <span>&copy; {new Date().getFullYear()} Contenso</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
