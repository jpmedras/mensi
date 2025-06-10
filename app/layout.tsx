import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AccessibilityButton } from "@/components/accessibility-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mensi - Plataforma de Aprendizado",
  description: "Mensi é a plataforma que vai te ajudar a aprender de verdade!",
  generator: "v0.dev",
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          {/* Botão de acessibilidade flutuante global */}
        </ThemeProvider>
      </body>
    </html>
  )
}
