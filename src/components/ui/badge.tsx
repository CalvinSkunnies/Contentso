import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20",
        secondary: "bg-[var(--secondary)]/10 text-[var(--secondary)] border border-[var(--secondary)]/20",
        outline: "border border-[var(--card-border)] text-[var(--muted)]",
        success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
