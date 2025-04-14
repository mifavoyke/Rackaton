"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from 'lucide-react'

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const switchLanguage = (locale: string) => {
    if (locale === currentLang) return
    
    // Get the current path without the locale prefix
    const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '') || '/'
    
    // Navigate to the same path with the new locale
    router.push(`/${locale}${pathnameWithoutLang}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('cs')}>Čeština</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}