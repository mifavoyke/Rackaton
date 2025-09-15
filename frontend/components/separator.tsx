"use client"

import * as React from "react"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function Separator({ orientation = "horizontal", className = "", ...rest }: SeparatorProps) {
  const base = orientation === "horizontal" ? "h-px w-full" : "w-px h-full"
  return <div role="separator" aria-orientation={orientation} className={[base, "bg-gray-300 dark:bg-gray-700", className].join(" ")} {...rest} />
}

export default Separator
