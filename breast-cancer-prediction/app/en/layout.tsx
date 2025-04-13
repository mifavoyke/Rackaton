import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Breast Cancer Recurrence Prediction",
  description: "A tool to predict breast cancer recurrence risk",
  icons: {
    icon: [
      { url: '/favicon.svg' }
    ]
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar lang="en" />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}