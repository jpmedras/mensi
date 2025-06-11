"use client"

import { useState } from "react"
import { AchievementCard } from "@/components/achievement-card"
import { AchievementModal } from "@/components/achievement-modal"

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

// Dados simulados das conquistas (em uma aplicação real, viriam de uma API)
const achievementsData: Achievement[] = [
  {
    id: "math-lvl10",
    title: "Lvl 10 Matemática",
    description: "Completou 10 níveis de exercícios de matemática",
    icon: "🧮",
    category: "study",
    isUnlocked: true,
    unlockedAt: "2025-03-10",
    requirements: ["Completar 10 níveis de exercícios de matemática", "Acertar pelo menos 80% das questões"],
  },
  {
    id: "ai-newcomer",
    title: "Novo na IA",
    description: "Primeira interação com a IA da Mensi",
    icon: "🤖",
    category: "ai",
    isUnlocked: true,
    unlockedAt: "2025-03-05",
    requirements: ["Fazer a primeira pergunta para a IA da Mensi"],
  },
  {
    id: "ai-friend",
    title: "Amigo da IA",
    description: "Teve 10 conversas com a IA da Mensi",
    icon: "💬",
    category: "ai",
    isUnlocked: true,
    unlockedAt: "2025-03-12",
    requirements: ["Ter 10 conversas diferentes com a IA", "Usar a IA por pelo menos 5 dias"],
  },
  {
    id: "community-here",
    title: "Comunidade Aqui",
    description: "Participou ativamente da comunidade",
    icon: "🌐",
    category: "social",
    isUnlocked: true,
    unlockedAt: "2025-03-08",
    requirements: ["Fazer 5 postagens na comunidade", "Ajudar 3 colegas com dúvidas"],
  },
  {
    id: "chose-tutor",
    title: "Escolhi um tutor",
    description: "Agendou a primeira sessão de tutoria",
    icon: "🎓",
    category: "milestone",
    isUnlocked: true,
    unlockedAt: "2025-03-15",
    requirements: ["Agendar a primeira sessão de tutoria", "Completar o perfil do estudante"],
  },
  {
    id: "studious-10h",
    title: "Estudioso (10h+/semana)",
    description: "Estudou mais de 10 horas em uma semana",
    icon: "🚀",
    category: "study",
    isUnlocked: true,
    unlockedAt: "2025-03-14",
    requirements: ["Acumular 10+ horas de estudo em uma semana", "Usar a plataforma por pelo menos 5 dias na semana"],
  },
  // Conquistas bloqueadas (exemplos)
  {
    id: "math-master",
    title: "Mestre da Matemática",
    description: "Complete 50 níveis de exercícios de matemática",
    icon: "👑",
    category: "study",
    isUnlocked: false,
    progress: {
      current: 10,
      total: 50,
    },
    requirements: ["Completar 50 níveis de exercícios de matemática", "Manter média de 90% de acertos"],
  },
  {
    id: "helper",
    title: "Ajudante",
    description: "Ajude 20 colegas na comunidade",
    icon: "🤝",
    category: "social",
    isUnlocked: false,
    progress: {
      current: 3,
      total: 20,
    },
    requirements: ["Ajudar 20 colegas diferentes", "Receber pelo menos 10 curtidas nas respostas"],
  },
  {
    id: "streak-30",
    title: "Sequência de 30 dias",
    description: "Estude por 30 dias consecutivos",
    icon: "🔥",
    category: "progress",
    isUnlocked: false,
    progress: {
      current: 12,
      total: 30,
    },
    requirements: ["Acessar a plataforma por 30 dias consecutivos", "Completar pelo menos 1 atividade por dia"],
  },
]

export function AchievementsGrid() {
  // Estado para controlar o modal de detalhes
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para abrir o modal de detalhes
  const openAchievementDetails = (achievement: Achievement) => {
    setSelectedAchievement(achievement)
    setIsModalOpen(true)
  }

  // Separar conquistas desbloqueadas e bloqueadas
  const unlockedAchievements = achievementsData.filter((achievement) => achievement.isUnlocked)
  const lockedAchievements = achievementsData.filter((achievement) => !achievement.isUnlocked)

  return (
    <div className="space-y-8">
      {/* Seção de conquistas desbloqueadas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Conquistas Desbloqueadas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {unlockedAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={() => openAchievementDetails(achievement)}
            />
          ))}
        </div>
      </div>

      {/* Seção de conquistas em progresso */}
      {lockedAchievements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Em Progresso</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {lockedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClick={() => openAchievementDetails(achievement)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Estatísticas gerais */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Suas Estatísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-800">{unlockedAchievements.length}</div>
            <div className="text-sm text-gray-600">Conquistas Desbloqueadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{lockedAchievements.length}</div>
            <div className="text-sm text-gray-600">Em Progresso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((unlockedAchievements.length / achievementsData.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progresso Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">10h+</div>
            <div className="text-sm text-gray-600">Esta Semana</div>
          </div>
        </div>
      </div>

      {/* Modal de detalhes da conquista */}
      <AchievementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} achievement={selectedAchievement} />
    </div>
  )
}
