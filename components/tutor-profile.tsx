"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageSquare, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Tipos para os dados do tutor
interface TutorSpecialty {
  category: string
  items: string[]
}

interface TutorAvailability {
  date: string
  times: string[]
}

interface TutorData {
  id: string
  name: string
  title: string
  image: string
  description: string
  subjects: string[]
  specialties: TutorSpecialty[]
  availability: TutorAvailability
  bio?: string
}

interface TutorProfileProps {
  tutor: TutorData
}

export function TutorProfile({ tutor }: TutorProfileProps) {
  // Estado para controlar o horário selecionado
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const router = useRouter()

  // Função para gerar dados do calendário
  const generateCalendarData = () => {
    // Data fixa para Junho de 2025
    const currentMonth = 5 // Junho (0-indexed)
    const currentYear = 2025

    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return {
      days,
      monthName: "Junho de 2025",
      currentMonth,
      currentYear,
    }
  }

  const calendarData = generateCalendarData()

  // Função para verificar se uma data tem horários disponíveis
  const hasAvailableSlots = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    // Disponível apenas para dias futuros e alguns dias específicos
    if (date < today) return false

    const dayOfWeek = date.getDay()
    // Disponível de segunda a sexta (1-5)
    return dayOfWeek >= 1 && dayOfWeek <= 5
  }

  // Função para formatar data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR")
  }

  // Função para lidar com seleção de data
  const handleDateSelection = (date: Date) => {
    if (hasAvailableSlots(date)) {
      setSelectedDate(formatDate(date))
      setSelectedTime("") // Reset selected time when date changes
    }
  }

  // Função para lidar com a seleção de horário
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time)
    // Redirecionar para a página de agendamento com os parâmetros
    router.push(`/tutors/${tutor.id}/schedule?date=${encodeURIComponent(selectedDate)}&time=${time}`)
  }

  // Função para enviar mensagem (apenas visual por enquanto)
  const handleSendMessage = () => {
    console.log(`Enviando mensagem para ${tutor.name}`)
    // Aqui seria implementada a lógica para abrir o chat ou modal de mensagem
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Card principal do perfil */}
      <div className="bg-amber-300 rounded-lg p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna esquerda - Informações principais */}
          <div className="lg:w-2/3">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              {/* Foto do tutor */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-md">
                  <Image
                    src={tutor.image}
                    alt={tutor.description}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Nome e título */}
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{tutor.name}</h1>
                <p className="text-xl text-gray-700 mb-4">{tutor.title}</p>

                {/* Bio (se disponível) */}
                {tutor.bio && <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>}
              </div>
            </div>

            {/* Seção: Oferece tutoria em */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Oferece tutoria em:</h2>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects.map((subject) => (
                  <span key={subject} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Seção: Especialidades */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Especialidades:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tutor.specialties.map((specialty, index) => (
                  <div key={index} className="bg-sky-100 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 sr-only">{specialty.category}</h3>
                    <ul className="space-y-1">
                      {specialty.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700 text-sm flex items-start">
                          <span className="text-cyan-800 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção: Escolha de data e horário */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Escolha uma data e horário:
              </h2>

              {/* Calendário */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{calendarData.monthName}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-md" aria-label="Mês anterior">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md" aria-label="Próximo mês">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Cabeçalho dos dias da semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Dias do calendário */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarData.days.map((date, index) => {
                    const isCurrentMonth = date.getMonth() === calendarData.currentMonth
                    const isToday = date.toDateString() === new Date().toDateString()
                    const isSelected = selectedDate === formatDate(date)
                    const isAvailable = hasAvailableSlots(date)
                    const isDisabled = !isCurrentMonth || !isAvailable

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelection(date)}
                        disabled={isDisabled}
                        className={`
                          p-2 text-sm rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-700
                          ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-cyan-200 cursor-pointer"}
                          ${
                            isSelected
                              ? "bg-cyan-700 text-white"
                              : isToday
                                ? "bg-cyan-300 text-cyan-900 font-semibold"
                                : isCurrentMonth
                                  ? "text-gray-700"
                                  : "text-gray-300"
                          }
                        `}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <p>• Disponível de segunda a sexta-feira</p>
                  <p>• Selecione uma data para ver os horários disponíveis</p>
                </div>
              </div>

              {/* Horários disponíveis - só aparecem após selecionar uma data */}
              {selectedDate && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Horários disponíveis para {selectedDate}:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {tutor.availability.times.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelection(time)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 ${
                          selectedTime === time
                            ? "bg-cyan-800 text-white shadow-md"
                            : "bg-cyan-700 hover:bg-cyan-800 text-white"
                        }`}
                        aria-label={`Agendar sessão às ${time} do dia ${selectedDate}`}
                      >
                        <Clock size={16} className="inline mr-2" />
                        {time}
                      </button>
                    ))}
                  </div>

                  {/* Feedback visual quando um horário é selecionado */}
                  {selectedTime && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-green-800 font-medium">
                        ✓ Horário selecionado: {selectedTime} do dia {selectedDate}
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        Clique em "Enviar mensagem" para confirmar o agendamento com {tutor.name}.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Coluna direita - Botão de ação */}
          <div className="lg:w-1/3 flex lg:justify-end">
            <div className="w-full lg:w-auto">
              <button
                onClick={handleSendMessage}
                className="w-full lg:w-auto bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 flex items-center justify-center gap-2"
                aria-label={`Enviar mensagem para ${tutor.name}`}
              >
                <MessageSquare size={20} />
                Enviar mensagem
              </button>

              {/* Informações adicionais (podem ser expandidas no futuro) */}
              <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">Informações adicionais</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Resposta rápida</li>
                  <li>• Aulas personalizadas</li>
                  <li>• Material didático incluso</li>
                  <li>• Suporte contínuo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
