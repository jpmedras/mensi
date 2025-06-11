"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { AppointmentModal } from "@/components/appointment-modal"

// Tipos para os dados de agendamento
interface Appointment {
  id: string
  tutorId: string
  tutorName: string
  date: string // formato YYYY-MM-DD
  time: string // formato HH:MM
  subject: string
  status: "scheduled" | "completed" | "canceled"
}

// Dados simulados de agendamentos (em uma aplicação real, viriam de uma API)
const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    tutorId: "giovana-mattos",
    tutorName: "Giovana",
    date: "2025-03-16",
    time: "19:00",
    subject: "Matemática",
    status: "scheduled",
  },
  {
    id: "apt-002",
    tutorId: "alberto-souza",
    tutorName: "Alberto",
    date: "2025-03-22",
    time: "10:00",
    subject: "Biologia",
    status: "scheduled",
  },
  {
    id: "apt-003",
    tutorId: "giovana-mattos",
    tutorName: "Giovana",
    date: "2025-04-05",
    time: "14:30",
    subject: "Física",
    status: "scheduled",
  },
]

export function AppointmentsCalendar() {
  // Estado para controlar o mês e ano atual
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)) // Março 2025 como no layout
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Efeito para carregar os agendamentos (simulando uma chamada de API)
  useEffect(() => {
    // Em uma aplicação real, aqui seria feita uma chamada à API
    // para buscar os agendamentos do mês atual
    const fetchAppointments = async () => {
      try {
        // Simular um delay de API
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Filtrar apenas os agendamentos do mês atual
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1 // getMonth() retorna 0-11
        const monthStr = month < 10 ? `0${month}` : `${month}`

        const filtered = mockAppointments.filter((apt) => {
          const [aptYear, aptMonth] = apt.date.split("-")
          return aptYear === `${year}` && aptMonth === monthStr
        })

        setAppointments(filtered)
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
      }
    }

    fetchAppointments()
  }, [currentDate])

  // Função para navegar para o mês anterior
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Função para navegar para o próximo mês
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Função para abrir o modal de detalhes do agendamento
  const openAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  // Função para formatar o nome do mês e ano
  const formatMonthYear = (date: Date) => {
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
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Função para gerar os dias do calendário
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1)
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0)

    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
    const firstDayOfWeek = firstDay.getDay()
    // Total de dias no mês
    const daysInMonth = lastDay.getDate()

    // Array para armazenar os dias do calendário
    const calendarDays = []

    // Adicionar células vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null)
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day)
    }

    return calendarDays
  }

  // Função para verificar se um dia tem agendamentos
  const getAppointmentForDay = (day: number) => {
    if (!day) return null

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.find((apt) => apt.date === dateStr) || null
  }

  // Dias da semana
  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

  // Gerar os dias do calendário
  const calendarDays = generateCalendarDays()

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cabeçalho do calendário */}
      <div className="bg-amber-300 p-4 flex items-center justify-between">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-amber-400 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">{formatMonthYear(currentDate)}</h2>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-amber-400 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Próximo mês"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Calendário */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Cabeçalho com dias da semana */}
          <thead>
            <tr>
              {weekDays.map((day, index) => (
                <th key={index} className="p-4 text-center border text-cyan-800 font-medium">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corpo do calendário */}
          <tbody>
            {/* Dividir os dias em semanas (arrays de 7 dias) */}
            {Array(Math.ceil(calendarDays.length / 7))
              .fill(null)
              .map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                    const appointment = day ? getAppointmentForDay(day) : null

                    return (
                      <td key={dayIndex} className={`border p-2 h-24 align-top ${day ? "" : "bg-gray-50"}`}>
                        {day && (
                          <div className="h-full">
                            {/* Número do dia */}
                            <div className="text-right mb-1">
                              <span className="text-cyan-800 font-medium">{day}</span>
                            </div>

                            {/* Agendamento (se houver) */}
                            {appointment && (
                              <div
                                className="bg-sky-100 p-2 rounded text-sm cursor-pointer hover:bg-sky-200 transition-colors"
                                onClick={() => openAppointmentDetails(appointment)}
                              >
                                <div className="font-medium">
                                  {appointment.tutorName} às {appointment.time.substring(0, 5)}h
                                </div>
                                <button
                                  className="text-cyan-800 text-xs hover:underline focus:outline-none focus:underline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openAppointmentDetails(appointment)
                                  }}
                                >
                                  Ver detalhes
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Estado vazio (quando não há agendamentos) */}
      {appointments.length === 0 && (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum agendamento encontrado</h3>
          <p className="text-gray-600 mb-4">Você não possui agendamentos para este mês. Que tal agendar uma tutoria?</p>
          <a
            href="/tutors"
            className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            Encontrar tutores
          </a>
        </div>
      )}

      {/* Legenda do calendário */}
      <div className="p-4 border-t">
        <h3 className="font-medium text-gray-800 mb-2">Legenda:</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-sky-100 rounded"></div>
            <span>Agendamento marcado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>Aula concluída</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span>Cancelado</span>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do agendamento */}
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} appointment={selectedAppointment} />
    </div>
  )
}
