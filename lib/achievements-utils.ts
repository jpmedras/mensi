/**
 * Utilitários para o sistema de conquistas
 *
 * Este arquivo contém funções auxiliares para gerenciar conquistas,
 * calcular progresso e determinar quando novas conquistas devem ser desbloqueadas.
 */

// Tipos para o sistema de conquistas
export interface UserProgress {
  studyHours: number
  exercisesCompleted: number
  communityPosts: number
  helpedStudents: number
  aiInteractions: number
  tutoringSessions: number
  loginStreak: number
  subjectsStudied: string[]
}

export interface AchievementRule {
  id: string
  checkCondition: (progress: UserProgress) => boolean
  getProgress?: (progress: UserProgress) => { current: number; total: number }
}

/**
 * Regras para desbloqueio de conquistas
 */
export const achievementRules: AchievementRule[] = [
  // Conquistas de estudo
  {
    id: "math-lvl10",
    checkCondition: (progress) => progress.exercisesCompleted >= 10 && progress.subjectsStudied.includes("Matemática"),
    getProgress: (progress) => ({ current: Math.min(progress.exercisesCompleted, 10), total: 10 }),
  },
  {
    id: "studious-10h",
    checkCondition: (progress) => progress.studyHours >= 10,
    getProgress: (progress) => ({ current: Math.min(progress.studyHours, 10), total: 10 }),
  },
  {
    id: "math-master",
    checkCondition: (progress) => progress.exercisesCompleted >= 50 && progress.subjectsStudied.includes("Matemática"),
    getProgress: (progress) => ({ current: Math.min(progress.exercisesCompleted, 50), total: 50 }),
  },

  // Conquistas de IA
  {
    id: "ai-newcomer",
    checkCondition: (progress) => progress.aiInteractions >= 1,
    getProgress: (progress) => ({ current: Math.min(progress.aiInteractions, 1), total: 1 }),
  },
  {
    id: "ai-friend",
    checkCondition: (progress) => progress.aiInteractions >= 10,
    getProgress: (progress) => ({ current: Math.min(progress.aiInteractions, 10), total: 10 }),
  },

  // Conquistas sociais
  {
    id: "community-here",
    checkCondition: (progress) => progress.communityPosts >= 5 && progress.helpedStudents >= 3,
    getProgress: (progress) => ({
      current: Math.min(progress.communityPosts + progress.helpedStudents, 8),
      total: 8,
    }),
  },
  {
    id: "helper",
    checkCondition: (progress) => progress.helpedStudents >= 20,
    getProgress: (progress) => ({ current: Math.min(progress.helpedStudents, 20), total: 20 }),
  },

  // Conquistas de marcos
  {
    id: "chose-tutor",
    checkCondition: (progress) => progress.tutoringSessions >= 1,
    getProgress: (progress) => ({ current: Math.min(progress.tutoringSessions, 1), total: 1 }),
  },

  // Conquistas de progresso
  {
    id: "streak-30",
    checkCondition: (progress) => progress.loginStreak >= 30,
    getProgress: (progress) => ({ current: Math.min(progress.loginStreak, 30), total: 30 }),
  },
]

/**
 * Verifica quais conquistas um usuário deve ter desbloqueadas
 *
 * @param progress Progresso atual do usuário
 * @returns Array de IDs das conquistas que devem estar desbloqueadas
 */
export function checkUnlockedAchievements(progress: UserProgress): string[] {
  return achievementRules.filter((rule) => rule.checkCondition(progress)).map((rule) => rule.id)
}

/**
 * Calcula o progresso de uma conquista específica
 *
 * @param achievementId ID da conquista
 * @param progress Progresso atual do usuário
 * @returns Objeto com progresso atual e total, ou null se não aplicável
 */
export function getAchievementProgress(
  achievementId: string,
  progress: UserProgress,
): { current: number; total: number } | null {
  const rule = achievementRules.find((r) => r.id === achievementId)
  return rule?.getProgress ? rule.getProgress(progress) : null
}

/**
 * Simula o progresso de um usuário (para demonstração)
 *
 * @returns Progresso simulado do usuário
 */
export function getMockUserProgress(): UserProgress {
  return {
    studyHours: 12,
    exercisesCompleted: 15,
    communityPosts: 8,
    helpedStudents: 5,
    aiInteractions: 15,
    tutoringSessions: 2,
    loginStreak: 12,
    subjectsStudied: ["Matemática", "Física", "Química"],
  }
}

/**
 * Calcula estatísticas gerais do usuário
 *
 * @param unlockedAchievements Array de conquistas desbloqueadas
 * @param totalAchievements Total de conquistas disponíveis
 * @returns Objeto com estatísticas
 */
export function calculateUserStats(unlockedAchievements: string[], totalAchievements: number) {
  const completionRate = Math.round((unlockedAchievements.length / totalAchievements) * 100)

  return {
    unlockedCount: unlockedAchievements.length,
    totalCount: totalAchievements,
    completionRate,
    remainingCount: totalAchievements - unlockedAchievements.length,
  }
}

/**
 * Determina a próxima conquista mais próxima de ser desbloqueada
 *
 * @param progress Progresso atual do usuário
 * @param unlockedAchievements Conquistas já desbloqueadas
 * @returns ID da próxima conquista ou null
 */
export function getNextAchievement(progress: UserProgress, unlockedAchievements: string[]): string | null {
  const lockedRules = achievementRules.filter((rule) => !unlockedAchievements.includes(rule.id))

  let closestAchievement: string | null = null
  let highestProgress = 0

  for (const rule of lockedRules) {
    const achievementProgress = rule.getProgress?.(progress)
    if (achievementProgress) {
      const progressPercentage = achievementProgress.current / achievementProgress.total
      if (progressPercentage > highestProgress) {
        highestProgress = progressPercentage
        closestAchievement = rule.id
      }
    }
  }

  return closestAchievement
}

/**
 * Gera sugestões de ações para desbloquear conquistas
 *
 * @param achievementId ID da conquista
 * @returns Array de sugestões de ação
 */
export function getAchievementSuggestions(achievementId: string): string[] {
  const suggestions: { [key: string]: string[] } = {
    "math-master": [
      "Continue resolvendo exercícios de matemática",
      "Mantenha uma média alta de acertos",
      "Pratique diferentes tópicos de matemática",
    ],
    helper: [
      "Participe mais ativamente da comunidade",
      "Responda dúvidas de outros estudantes",
      "Compartilhe seu conhecimento",
    ],
    "streak-30": [
      "Acesse a plataforma todos os dias",
      "Complete pelo menos uma atividade por dia",
      "Defina lembretes para não perder dias",
    ],
    "ai-friend": [
      "Faça mais perguntas para a IA",
      "Use a IA para tirar dúvidas",
      "Explore diferentes funcionalidades da IA",
    ],
  }

  return suggestions[achievementId] || ["Continue usando a plataforma regularmente"]
}
