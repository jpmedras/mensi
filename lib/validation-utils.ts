/**
 * Utilitários para validação de formulários
 *
 * Este arquivo contém funções auxiliares para validar dados de entrada,
 * formatar campos e verificar regras de negócio.
 */

// Tipos para validação
export interface ValidationResult {
  isValid: boolean
  message?: string
}

/**
 * Valida se um e-mail tem formato válido
 *
 * @param email E-mail a ser validado
 * @returns Resultado da validação
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    return { isValid: false, message: "E-mail é obrigatório" }
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "E-mail inválido" }
  }

  return { isValid: true }
}

/**
 * Valida se uma senha atende aos critérios mínimos
 *
 * @param password Senha a ser validada
 * @returns Resultado da validação
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: "Senha é obrigatória" }
  }

  if (password.length < 6) {
    return { isValid: false, message: "Senha deve ter pelo menos 6 caracteres" }
  }

  if (password.length > 128) {
    return { isValid: false, message: "Senha muito longa" }
  }

  return { isValid: true }
}

/**
 * Valida se um nome completo é válido
 *
 * @param fullName Nome completo a ser validado
 * @returns Resultado da validação
 */
export function validateFullName(fullName: string): ValidationResult {
  const trimmedName = fullName.trim()

  if (!trimmedName) {
    return { isValid: false, message: "Nome completo é obrigatório" }
  }

  if (trimmedName.length < 2) {
    return { isValid: false, message: "Nome deve ter pelo menos 2 caracteres" }
  }

  if (trimmedName.length > 100) {
    return { isValid: false, message: "Nome muito longo" }
  }

  // Verificar se contém pelo menos um espaço (nome e sobrenome)
  if (!trimmedName.includes(" ")) {
    return { isValid: false, message: "Digite seu nome completo" }
  }

  return { isValid: true }
}

/**
 * Valida se uma data de nascimento é válida
 *
 * @param birthDate Data no formato dd/mm/aaaa
 * @returns Resultado da validação
 */
export function validateBirthDate(birthDate: string): ValidationResult {
  if (!birthDate) {
    return { isValid: false, message: "Data de nascimento é obrigatória" }
  }

  // Verificar formato dd/mm/aaaa
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = birthDate.match(dateRegex)

  if (!match) {
    return { isValid: false, message: "Data deve estar no formato dd/mm/aaaa" }
  }

  const [, day, month, year] = match
  const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))

  // Verificar se a data é válida
  if (
    date.getDate() !== Number.parseInt(day) ||
    date.getMonth() !== Number.parseInt(month) - 1 ||
    date.getFullYear() !== Number.parseInt(year)
  ) {
    return { isValid: false, message: "Data inválida" }
  }

  // Verificar idade mínima e máxima
  const today = new Date()
  const age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    // Ainda não fez aniversário este ano
  }

  if (age < 13) {
    return { isValid: false, message: "Você deve ter pelo menos 13 anos" }
  }

  if (age > 100) {
    return { isValid: false, message: "Idade inválida" }
  }

  // Verificar se não é uma data futura
  if (date > today) {
    return { isValid: false, message: "Data de nascimento não pode ser futura" }
  }

  return { isValid: true }
}

/**
 * Formata uma data de nascimento enquanto o usuário digita
 *
 * @param value Valor atual do campo
 * @returns Valor formatado
 */
export function formatBirthDate(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")

  // Aplica a máscara dd/mm/aaaa
  if (numbers.length <= 2) {
    return numbers
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
  } else {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
  }
}

/**
 * Verifica se duas senhas coincidem
 *
 * @param password Senha original
 * @param confirmPassword Confirmação da senha
 * @returns Resultado da validação
 */
export function validatePasswordConfirmation(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return { isValid: false, message: "Confirmação de senha é obrigatória" }
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Senhas não coincidem" }
  }

  return { isValid: true }
}

/**
 * Verifica se um e-mail já está em uso (simulação)
 *
 * @param email E-mail a ser verificado
 * @returns Promise com resultado da verificação
 */
export async function checkEmailAvailability(email: string): Promise<ValidationResult> {
  // Simular chamada à API
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Lista de e-mails já cadastrados (simulação)
  const existingEmails = ["admin@mensi.com", "teste@exemplo.com", "usuario@teste.com"]

  if (existingEmails.includes(email.toLowerCase())) {
    return { isValid: false, message: "Este e-mail já está cadastrado" }
  }

  return { isValid: true }
}

/**
 * Sanitiza uma string removendo caracteres perigosos
 *
 * @param input String a ser sanitizada
 * @returns String sanitizada
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < e >
    .replace(/javascript:/gi, "") // Remove javascript:
    .replace(/on\w+=/gi, "") // Remove event handlers
}

/**
 * Valida força da senha
 *
 * @param password Senha a ser analisada
 * @returns Objeto com força e sugestões
 */
export function analyzePasswordStrength(password: string) {
  let score = 0
  const suggestions: string[] = []

  if (password.length >= 8) score += 1
  else suggestions.push("Use pelo menos 8 caracteres")

  if (/[a-z]/.test(password)) score += 1
  else suggestions.push("Inclua letras minúsculas")

  if (/[A-Z]/.test(password)) score += 1
  else suggestions.push("Inclua letras maiúsculas")

  if (/\d/.test(password)) score += 1
  else suggestions.push("Inclua números")

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
  else suggestions.push("Inclua símbolos especiais")

  const strength = score <= 2 ? "fraca" : score <= 3 ? "média" : score <= 4 ? "boa" : "forte"

  return { score, strength, suggestions }
}
