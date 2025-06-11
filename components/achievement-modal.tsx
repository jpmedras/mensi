"use client"

import { useEffect } from "react"
import { X, Star, Lock, Calendar, CheckCircle } from "lucide-react"

// Tipos para os dados das conquistas
interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "study" | "social" | "progress" | "milestone" | "ai"
  isUnlocked: boolean
  unlockedAt?: string
  progress?: {
    current: number
    total: number
  }
  requirements: string[]
}

interface AchievementModalProps {
  isOpen: boolean
  onClose: () => void
  achievement: Achievement | null
}

export function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  // Fechar modal com a tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevenir scroll do body quando o modal estiver aberto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Formatar data para exibição
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  // Determinar a cor da categoria
  const getCategoryInfo = () => {
    if (!achievement) return { color: "gray", name: "Desconhecida" }

    switch (achievement.category) {
      case "study":
        return { color: "green", name: "Estudos" }
      case "social":
        return { color: "blue", name: "Social" }
      case "progress":
        return { color: "purple", name: "Progresso" }
      case "milestone":
        return { color: "orange", name: "Marco" }
      case "ai":
        return { color: "cyan", name: "IA" }
      default:
        return { color: "gray", name: "Geral" }
    }
  }

  // Se o modal não estiver aberto ou não houver conquista, não renderizar nada
  if (!isOpen || !achievement) return null

  const categoryInfo = getCategoryInfo()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-800">
            Detalhes da Conquista
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 rounded-md"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Ícone e status da conquista */}
          <div className="text-center mb-6">
            <div
              className={`
              w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl
              ${achievement.isUnlocked ? "bg-yellow-100" : "bg-gray-100"}
            `}
            >
              {achievement.isUnlocked ? achievement.icon : <Lock size={32} className="text-gray-400" />}
            </div>

            {/* Status badge */}
            <div
              className={`
              inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-2
              ${achievement.isUnlocked ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
            `}
            >
              {achievement.isUnlocked ? (
                <>
                  <Star size={16} className="text-yellow-500 fill-current" />
                  Desbloqueada
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Bloqueada
                </>
              )}
            </div>

            {/* Categoria */}
            <div
              className={`
              inline-block px-2 py-1 rounded text-xs font-medium
              bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800
            `}
            >
              {categoryInfo.name}
            </div>
          </div>

          {/* Título e descrição */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
            <p className="text-gray-600">{achievement.description}</p>
          </div>

          {/* Data de desbloqueio */}
          {achievement.isUnlocked && achievement.unlockedAt && (
            <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 rounded-lg">
              <Calendar size={16} className="text-green-600" />
              <span className="text-sm text-green-800">Desbloqueada em {formatDate(achievement.unlockedAt)}</span>
            </div>
          )}

          {/* Barra de progresso para conquistas bloqueadas */}
          {!achievement.isUnlocked && achievement.progress && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso</span>
                <span className="text-sm text-gray-500">
                  {achievement.progress.current}/{achievement.progress.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-cyan-700 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${(achievement.progress.current / achievement.progress.total) * 100}%`,
                  }}
                />
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                {Math.round((achievement.progress.current / achievement.progress.total) * 100)}% completo
              </div>
            </div>
          )}

          {/* Requisitos */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              {achievement.isUnlocked ? "Como você conseguiu:" : "Como desbloquear:"}
            </h4>
            <ul className="space-y-2">
              {achievement.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle
                    size={16}
                    className={`mt-0.5 flex-shrink-0 ${achievement.isUnlocked ? "text-green-500" : "text-gray-400"}`}
                  />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botão de ação */}
          <div className="mt-6">
            {!achievement.isUnlocked && (
              <button
                onClick={() => {
                  // Aqui seria implementada a lógica para navegar para a ação relevante
                  console.log("Navegar para ação:", achievement.id)
                  onClose()
                }}
                className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
              >
                Começar agora
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
