"use client"

import { Lock, Star } from "lucide-react"

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

interface AchievementCardProps {
  achievement: Achievement
  onClick: () => void
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  // Determinar a cor de fundo baseada na categoria
  const getCategoryColor = () => {
    switch (achievement.category) {
      case "study":
        return "bg-green-100"
      case "social":
        return "bg-blue-100"
      case "progress":
        return "bg-purple-100"
      case "milestone":
        return "bg-orange-100"
      case "ai":
        return "bg-cyan-100"
      default:
        return "bg-gray-100"
    }
  }

  // Determinar o ícone visual baseado no tipo de conquista
  const getAchievementIcon = () => {
    // Mapear IDs específicos para ícones visuais
    const iconMap: { [key: string]: string } = {
      "math-lvl10": "🧮",
      "ai-newcomer": "🤖",
      "ai-friend": "💬",
      "community-here": "🌐",
      "chose-tutor": "🎓",
      "studious-10h": "🚀",
      "math-master": "👑",
      helper: "🤝",
      "streak-30": "🔥",
    }

    return iconMap[achievement.id] || achievement.icon
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2
        ${
          achievement.isUnlocked
            ? `${getCategoryColor()} hover:scale-105 shadow-sm hover:shadow-md`
            : "bg-gray-100 opacity-60 hover:opacity-80"
        }
      `}
      aria-label={`${achievement.title}: ${achievement.description}`}
    >
      {/* Ícone da conquista */}
      <div className="flex justify-center mb-3">
        <div
          className={`
          w-16 h-16 rounded-full flex items-center justify-center text-2xl
          ${achievement.isUnlocked ? "bg-white shadow-sm" : "bg-gray-200"}
        `}
        >
          {achievement.isUnlocked ? getAchievementIcon() : <Lock size={24} className="text-gray-400" />}
        </div>
      </div>

      {/* Título da conquista */}
      <h3
        className={`
        font-semibold text-sm text-center mb-1
        ${achievement.isUnlocked ? "text-gray-800" : "text-gray-500"}
      `}
      >
        {achievement.title}
      </h3>

      {/* Indicador de conquista desbloqueada */}
      {achievement.isUnlocked && (
        <div className="absolute top-2 right-2">
          <Star size={16} className="text-yellow-500 fill-current" />
        </div>
      )}

      {/* Barra de progresso para conquistas bloqueadas */}
      {!achievement.isUnlocked && achievement.progress && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-cyan-700 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(achievement.progress.current / achievement.progress.total) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            {achievement.progress.current}/{achievement.progress.total}
          </div>
        </div>
      )}
    </button>
  )
}
