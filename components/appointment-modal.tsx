"use client"

import { useEffect } from "react"
import { X, Calendar, Clock, User, BookOpen, Check, AlertCircle } from "lucide-react"

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

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
}

export function AppointmentModal({ isOpen, onClose, appointment }: AppointmentModalProps) {
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
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }

  // Se o modal não estiver aberto ou não houver agendamento, não renderizar nada
  if (!isOpen || !appointment) return null

  // Determinar o status do agendamento
  const getStatusInfo = () => {
    switch (appointment.status) {
      case "scheduled":
        return {
          icon: <Calendar size={20} className="text-teal-600" />,
          text: "Agendado",
          className: "bg-sky-100 text-sky-800",
        }
      case "completed":
        return {
          icon: <Check size={20} className="text-green-600" />,
          text: "Concluído",
          className: "bg-green-100 text-green-800",
        }
      case "canceled":
        return {
          icon: <AlertCircle size={20} className="text-rose-600" />,
          text: "Cancelado",
          className: "bg-rose-100 text-rose-800",
        }
      default:
        return {
          icon: <Calendar size={20} className="text-gray-600" />,
          text: "Desconhecido",
          className: "bg-gray-100 text-gray-800",
        }
    }
  }

  const statusInfo = getStatusInfo()

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
            Detalhes do Agendamento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status do agendamento */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-md mb-6 ${statusInfo.className}`}>
            {statusInfo.icon}
            <span className="font-medium">{statusInfo.text}</span>
          </div>

          {/* Informações do agendamento */}
          <div className="space-y-4">
            {/* Tutor */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <User size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="font-medium">Tutor(a)</p>
                <p className="text-gray-700">
                  <a
                    href={`/tutors/${appointment.tutorId}`}
                    className="text-teal-600 hover:underline focus:outline-none focus:underline"
                  >
                    {appointment.tutorName}
                  </a>
                </p>
              </div>
            </div>

            {/* Data */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Calendar size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="font-medium">Data</p>
                <p className="text-gray-700">{formatDate(appointment.date)}</p>
              </div>
            </div>

            {/* Horário */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Clock size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="font-medium">Horário</p>
                <p className="text-gray-700">{appointment.time}</p>
              </div>
            </div>

            {/* Disciplina */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <BookOpen size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="font-medium">Disciplina</p>
                <p className="text-gray-700">{appointment.subject}</p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {appointment.status === "scheduled" && (
              <>
                <button
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={() => {
                    // Aqui seria implementada a lógica para entrar na aula
                    console.log("Entrar na aula:", appointment.id)
                    onClose()
                  }}
                >
                  Entrar na aula
                </button>
                <button
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  onClick={() => {
                    // Aqui seria implementada a lógica para cancelar o agendamento
                    console.log("Cancelar agendamento:", appointment.id)
                    onClose()
                  }}
                >
                  Cancelar
                </button>
              </>
            )}

            {appointment.status === "completed" && (
              <button
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                onClick={() => {
                  // Aqui seria implementada a lógica para avaliar a aula
                  console.log("Avaliar aula:", appointment.id)
                  onClose()
                }}
              >
                Avaliar aula
              </button>
            )}

            {appointment.status === "canceled" && (
              <button
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                onClick={() => {
                  // Aqui seria implementada a lógica para reagendar
                  console.log("Reagendar aula:", appointment.id)
                  onClose()
                }}
              >
                Reagendar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
