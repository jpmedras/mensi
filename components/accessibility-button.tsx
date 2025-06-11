"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Accessibility } from "lucide-react"

export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If not mounted yet (during SSR), don't render anything
  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Menu de acessibilidade"
        className="bg-cyan-700 hover:bg-cyan-800 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
      >
        <Accessibility size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg w-64">
          <h3 className="font-bold mb-3">Opções de acessibilidade</h3>

          <ul className="space-y-2">
            <li>
              <Link
                href="#conteudo"
                className="block hover:text-cyan-800 focus:outline-none focus:text-cyan-800"
                onClick={() => {
                  document.getElementById("conteudo")?.focus()
                  document.getElementById("conteudo")?.scrollIntoView({ behavior: "smooth" })
                  setIsOpen(false)
                }}
              >
                Ir para conteúdo
              </Link>
            </li>
            <li>
              <Link
                href="#menu"
                className="block hover:text-cyan-800 focus:outline-none focus:text-cyan-800"
                onClick={() => {
                  document.getElementById("menu")?.focus()
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                  setIsOpen(false)
                }}
              >
                Ir para menu
              </Link>
            </li>
            <li>
              <Link
                href="#rodape"
                className="block hover:text-cyan-800 focus:outline-none focus:text-cyan-800"
                onClick={() => {
                  document.getElementById("rodape")?.focus()
                  document.getElementById("rodape")?.scrollIntoView({ behavior: "smooth" })
                  setIsOpen(false)
                }}
              >
                Ir para rodapé
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
