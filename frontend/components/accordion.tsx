"use client"

import * as React from "react"

interface AccordionItemData {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
  single?: boolean
  defaultOpenId?: string
}

export function Accordion({ items, className = "", single = true, defaultOpenId }: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(() => (defaultOpenId ? [defaultOpenId] : []))

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const isOpen = prev.includes(id)
      if (single) {
        return isOpen ? [] : [id]
      }
      return isOpen ? prev.filter(x => x !== id) : [...prev, id]
    })
  }

  return (
    <div data-slot="accordion" className={["border rounded-md divide-y", className].join(" ")}> 
      {items.map(item => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id} data-slot="accordion-item">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span>{item.title}</span>
              <span className={"transition-transform text-gray-500 " + (isOpen ? "rotate-90" : "")}>›</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm" data-slot="accordion-content">{item.content}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
