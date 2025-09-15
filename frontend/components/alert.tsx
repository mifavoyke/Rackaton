import * as React from "react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "destructive"
}

export function Alert({ className = "", tone = "default", ...props }: AlertProps) {
  const base = "relative w-full rounded border px-4 py-3 text-sm flex gap-3 items-start";
  const tones: Record<string, string> = {
    default: "bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100",
    destructive: "bg-white text-red-700 border-red-300 dark:bg-gray-900 dark:text-red-400 dark:border-red-600"
  }
  return <div role="alert" data-slot="alert" className={[base, tones[tone] || tones.default, className].join(" ")} {...props} />
}

export function AlertTitle({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-title" className={["font-semibold", className].join(" ")} {...props} />
}

export function AlertDescription({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-description" className={["text-sm text-gray-600 dark:text-gray-300", className].join(" ")} {...props} />
}

export default Alert
