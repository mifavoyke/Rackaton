import * as React from "react"

interface SimpleSelectOption {
  value: string | number
  label: string
}

interface SimpleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SimpleSelectOption[]
  placeholder?: string
  className?: string
}

export function Select({ options, placeholder, className = "", ...rest }: SimpleSelectProps) {
  return (
    <select
      data-slot="select"
      className={["border rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900", className].join(" ")}
      {...rest}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

export default Select
