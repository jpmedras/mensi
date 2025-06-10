/**
 * Utilitários para o sistema de avatares
 *
 * Este arquivo contém funções auxiliares para gerenciar avatares,
 * salvar configurações e integrar com o sistema de perfil do usuário.
 */

// Tipos para o sistema de avatares
export interface AvatarConfig {
  baseAvatar: string
  complements: string[]
  lastUpdated: string
}

export interface AvatarOption {
  id: string
  name: string
  image: string
  color: string
  unlocked: boolean
  unlockCondition?: string
}

export interface ComplementOption {
  id: string
  name: string
  image: string
  category: string
  unlocked: boolean
  unlockCondition?: string
}

/**
 * Salva a configuração do avatar no localStorage
 *
 * @param config Configuração do avatar a ser salva
 */
export function saveAvatarConfig(config: Omit<AvatarConfig, "lastUpdated">): void {
  const fullConfig: AvatarConfig = {
    ...config,
    lastUpdated: new Date().toISOString(),
  }

  try {
    localStorage.setItem("mensi-avatar-config", JSON.stringify(fullConfig))
    console.log("Configuração do avatar salva:", fullConfig)
  } catch (error) {
    console.error("Erro ao salvar configuração do avatar:", error)
    throw new Error("Não foi possível salvar a configuração do avatar")
  }
}

/**
 * Carrega a configuração do avatar do localStorage
 *
 * @returns Configuração do avatar ou null se não existir
 */
export function loadAvatarConfig(): AvatarConfig | null {
  try {
    const saved = localStorage.getItem("mensi-avatar-config")
    if (!saved) return null

    const config = JSON.parse(saved) as AvatarConfig

    // Validar estrutura básica
    if (!config.baseAvatar || !Array.isArray(config.complements)) {
      console.warn("Configuração de avatar inválida encontrada")
      return null
    }

    return config
  } catch (error) {
    console.error("Erro ao carregar configuração do avatar:", error)
    return null
  }
}

/**
 * Obtém a configuração padrão do avatar
 *
 * @returns Configuração padrão
 */
export function getDefaultAvatarConfig(): AvatarConfig {
  return {
    baseAvatar: "letter-a-orange",
    complements: [],
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Gera uma URL de avatar baseada na configuração
 *
 * @param config Configuração do avatar
 * @returns URL da imagem do avatar ou string vazia se inválida
 */
export function generateAvatarUrl(config: AvatarConfig): string {
  // Em uma implementação real, isso geraria uma URL combinando
  // o avatar base com os complementos

  const avatarMap: { [key: string]: string } = {
    "letter-a-orange": "/images/avatars/letter-a-orange.png",
    "letter-a-green": "/images/avatars/letter-a-green.png",
    "letter-a-cyan": "/images/avatars/letter-a-cyan.png",
    "letter-a-pink": "/images/avatars/letter-a-pink.png",
  }

  return avatarMap[config.baseAvatar] || avatarMap["letter-a-orange"]
}

/**
 * Verifica se um avatar ou complemento está desbloqueado
 *
 * @param itemId ID do item a verificar
 * @param userProgress Progresso do usuário (conquistas, nível, etc.)
 * @returns true se o item estiver desbloqueado
 */
export function isItemUnlocked(itemId: string, userProgress: any): boolean {
  // Avatares base sempre desbloqueados
  const baseAvatars = ["letter-a-orange", "letter-a-green", "letter-a-cyan", "letter-a-pink"]
  if (baseAvatars.includes(itemId)) return true

  // Complementos básicos sempre desbloqueados
  const basicComplements = ["apple", "pencil", "elephant", "tiger"]
  if (basicComplements.includes(itemId)) return true

  // Aqui seria implementada a lógica real de desbloqueio
  // baseada em conquistas, nível do usuário, etc.
  return true
}

/**
 * Obtém informações sobre como desbloquear um item
 *
 * @param itemId ID do item
 * @returns Descrição de como desbloquear ou null se já desbloqueado
 */
export function getUnlockCondition(itemId: string): string | null {
  const unlockConditions: { [key: string]: string } = {
    "letter-b-blue": "Complete 10 exercícios de matemática",
    "letter-c-purple": "Alcance nível 5 em qualquer disciplina",
    crown: "Obtenha a conquista 'Mestre da Matemática'",
    star: "Mantenha uma sequência de 7 dias de estudo",
    book: "Complete 50 exercícios em total",
  }

  return unlockConditions[itemId] || null
}

/**
 * Valida se uma configuração de avatar é válida
 *
 * @param config Configuração a ser validada
 * @returns true se a configuração for válida
 */
export function validateAvatarConfig(config: any): config is AvatarConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    typeof config.baseAvatar === "string" &&
    Array.isArray(config.complements) &&
    config.complements.every((c: any) => typeof c === "string") &&
    typeof config.lastUpdated === "string"
  )
}

/**
 * Combina avatar base com complementos para gerar preview
 *
 * @param baseAvatar ID do avatar base
 * @param complements Array de IDs dos complementos
 * @returns Objeto com informações para renderização
 */
export function generateAvatarPreview(baseAvatar: string, complements: string[]) {
  return {
    baseImage: generateAvatarUrl({ baseAvatar, complements, lastUpdated: "" }),
    complementImages: complements.map((id) => ({
      id,
      image: `/images/complements/${id}.png`,
    })),
    combinedDescription: `Avatar ${baseAvatar} com ${complements.length} complemento(s)`,
  }
}

/**
 * Exporta configuração do avatar para compartilhamento
 *
 * @param config Configuração do avatar
 * @returns String codificada para compartilhamento
 */
export function exportAvatarConfig(config: AvatarConfig): string {
  try {
    const exportData = {
      base: config.baseAvatar,
      comp: config.complements,
      v: "1.0", // versão do formato
    }

    return btoa(JSON.stringify(exportData))
  } catch (error) {
    console.error("Erro ao exportar configuração:", error)
    return ""
  }
}

/**
 * Importa configuração do avatar de string compartilhada
 *
 * @param exportedConfig String codificada
 * @returns Configuração do avatar ou null se inválida
 */
export function importAvatarConfig(exportedConfig: string): AvatarConfig | null {
  try {
    const decoded = JSON.parse(atob(exportedConfig))

    if (decoded.v !== "1.0") {
      console.warn("Versão de configuração não suportada")
      return null
    }

    return {
      baseAvatar: decoded.base,
      complements: decoded.comp || [],
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Erro ao importar configuração:", error)
    return null
  }
}
