import { ThemeProvider } from "@/components/custom/theme-provider"

import type { Metadata } from "next"
import type React from "react"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Top Trump Generator - Greek Myths Edition",
  description: "Create your own Greek mythology-themed Top Trump card",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
