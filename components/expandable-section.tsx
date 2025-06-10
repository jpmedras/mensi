"use client"

import type React from "react"

import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function ExpandableSection({ title, isExpanded, onToggle, children }: ExpandableSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Cabeçalho da seção - sempre visível */}
      <button
        onClick={onToggle}
        className="w-full bg-orange-300 hover:bg-orange-400 px-6 py-4 flex justify-between items-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
        aria-expanded={isExpanded}
        aria-controls={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-600" />
          ) : (
            <ChevronDown size={20} className="text-gray-600" />
          )}
        </div>
      </button>

      {/* Conteúdo da seção - expansível */}
      <div
        id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="bg-white">{children}</div>
      </div>
    </div>
  )
}
