import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
  const variants: Record<string, string> = {
    primary: "bg-pink-600 text-white hover:bg-pink-700",
    outline: "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
    link: "text-pink-600 underline-offset-4 hover:underline bg-transparent"
  }
  const sizes: Record<string, string> = {
    sm: "h-8 px-3",
    md: "h-9 px-4",
    lg: "h-10 px-6 text-base"
  }

  const cls = [base, variants[variant] || variants.primary, sizes[size] || sizes.md, className]
    .filter(Boolean)
    .join(" ")

  return <button data-slot="button" className={cls} {...props} />
}

export { Button as default }
