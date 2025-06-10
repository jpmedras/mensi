/**
 * Utilitários para manipulação de datas e calendário
 */

// Formatar data no formato DD/MM/YYYY
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Formatar data no formato YYYY-MM-DD
export function formatDateISO(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

// Obter o nome do mês em português
export function getMonthName(month: number): string {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return months[month]
}

// Obter o nome do dia da semana em português
export function getWeekdayName(weekday: number): string {
  const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

  return weekdays[weekday]
}

// Verificar se duas datas são o mesmo dia
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

// Adicionar dias a uma data
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// Adicionar meses a uma data
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

// Obter o primeiro dia do mês
export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

// Obter o último dia do mês
export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

// Obter o número de dias em um mês
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

// Gerar um array com todos os dias do mês
export function getMonthDays(year: number, month: number): Date[] {
  const days = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }

  return days
}

// Exportar funções para integração com APIs de calendário
export const calendarIntegration = {
  // Função para converter eventos do Google Calendar para o formato interno
  convertFromGoogleCalendar: (events: any[]) => {
    // Implementação futura
    return []
  },

  // Função para converter eventos do Outlook Calendar para o formato interno
  convertFromOutlookCalendar: (events: any[]) => {
    // Implementação futura
    return []
  },

  // Função para exportar eventos para o Google Calendar
  exportToGoogleCalendar: (events: any[]) => {
    // Implementação futura
    return true
  },

  // Função para exportar eventos para o Outlook Calendar
  exportToOutlookCalendar: (events: any[]) => {
    // Implementação futura
    return true
  },
}
