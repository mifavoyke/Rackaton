interface InfoCircleProps {
  content?: string
  className?: string
}

export function InfoCircle({ content = "Additional information.", className }: InfoCircleProps) {
  return (
    <span
      aria-label={content}
      title={content}
      className={("inline-block h-4 w-4 text-muted-foreground cursor-help select-none" + (className ? " " + className : ""))}
    >
      i
    </span>
  )
}