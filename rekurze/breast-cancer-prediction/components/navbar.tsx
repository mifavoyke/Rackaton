"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"
import { HeartPulse } from 'lucide-react'
import { getDictionary } from "@/lib/dictionary"

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname()
  const dict = getDictionary(lang)
  
  // Get the path without the language prefix
  const pathnameWithoutLang = pathname.replace(`/${lang}`, '') || '/'
  
  const navItems = [
    { name: dict.home, path: "/" },
    { name: dict.about, path: "/about" },
    { name: dict.predict, path: "/predict" },
    { name: dict.contact, path: "/contact" },
  ]
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="mr-4 flex items-center">
          <HeartPulse className="h-6 w-6 text-pink-500 dark:text-pink-400 mr-2" />
          <Link href={`/${lang}`} className="text-lg font-bold">
            BreastRecur
          </Link>
        </div>
        <nav className="flex items-center space-x-2 lg:space-x-4 mx-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors",
                pathnameWithoutLang === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Link href={`/${lang}${item.path}`}>{item.name}</Link>
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher currentLang={lang} />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}