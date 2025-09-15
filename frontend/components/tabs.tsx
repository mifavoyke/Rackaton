"use client"

import * as React from "react"

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (v: string) => void
}

function Tabs({ value, onValueChange, className = "", children, ...rest }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div data-slot="tabs" className={["flex flex-col gap-2", className].join(" ")} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className = "", children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={["inline-flex h-9 w-full items-center justify-start gap-2", className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function TabsTrigger({ value, className = "", children, ...rest }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs")
  const isActive = ctx.value === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-slot="tabs-trigger"
      onClick={() => ctx.setValue(value)}
      className={[
        "px-3 py-1.5 text-sm font-medium rounded-md border",
        isActive
          ? "bg-white text-gray-900 border-gray-300 shadow-sm"
          : "bg-gray-100 hover:bg-gray-200 text-gray-600 border-transparent",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function TabsContent({ value, className = "", children, ...rest }: TabsContentProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsContent must be used within Tabs")
  if (ctx.value !== value) return null
  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      className={["flex-1 outline-none mt-4", className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
