"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, User, CheckCircle } from "lucide-react"
import { Modal } from "@/components/modal"

// Tipos para os dados do tutor
interface TutorData {
  id: string
  name: string
  title: string
  subjects: string[]
  verified?: boolean
}

interface ScheduleFormProps {
  tutor: TutorData
  selectedDate: string
  selectedTime: string
}

export function ScheduleForm({ tutor, selectedDate, selectedTime }: ScheduleFormProps) {
  // Estados para controlar o formulário
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Estados para controlar os modais
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const router = useRouter()

  // Função para lidar com o cancelamento
  const handleCancel = () => {
    setShowCancelModal(true)
  }

  // Função para confirmar o cancelamento
  const handleConfirmCancel = () => {
    setShowCancelModal(false)
    // Voltar para a página do tutor
    router.push(`/tutors/${tutor.id}`)
  }

  // Função para continuar agendando (fechar modal de cancelamento)
  const handleContinueScheduling = () => {
    setShowCancelModal(false)
  }

  // Função para enviar o agendamento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!message.trim()) {
      alert("Por favor, escreva uma mensagem descrevendo sua dificuldade.")
      return
    }

    setIsLoading(true)

    try {
      // Simular chamada de API para criar o agendamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aqui seria implementada a lógica real de agendamento
      console.log("Agendamento criado:", {
        tutorId: tutor.id,
        date: selectedDate,
        time: selectedTime,
        message: message.trim(),
      })

      // Mostrar modal de sucesso
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Erro ao criar agendamento:", error)
      alert("Erro ao criar agendamento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Função para navegar para "Meus agendamentos"
  const handleGoToAppointments = () => {
    setShowSuccessModal(false)
    router.push("/profile/appointments")
  }

  // Função para navegar para "Repositório"
  const handleGoToRepository = () => {
    setShowSuccessModal(false)
    router.push("/repository")
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Título principal */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Agendamento tutoria para o dia {selectedDate} às {selectedTime} horas
        </h1>

        {/* Informações do tutor */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {tutor.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                {tutor.name}
                {tutor.verified && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    <CheckCircle size={12} />
                    Tutora Verificada
                  </span>
                )}
              </h2>
              <p className="text-gray-600">{tutor.title}</p>
              <p className="text-sm text-gray-500">
                Tutora de {tutor.subjects.join(", ").replace(/, ([^,]*)$/, " e $1")}
              </p>
            </div>
          </div>

          {/* Detalhes do agendamento */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-teal-600" />
              <span>{selectedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-teal-600" />
              <span>{selectedTime} horas</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-teal-600" />
              <span>Sessão individual</span>
            </div>
          </div>
        </div>

        {/* Formulário de agendamento */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
          {/* Instrução */}
          <p className="text-gray-700 mb-6">
            Escreva uma breve mensagem para a tutora {tutor.name} entender melhor qual é sua principal dificuldade.
          </p>

          {/* Campo de mensagem */}
          <div className="mb-8">
            <label htmlFor="message" className="sr-only">
              Mensagem para a tutora
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex.: Minha maior dificuldade é a realização da multiplicação de fração."
              rows={8}
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              aria-describedby="message-help"
              required
            />
            <p id="message-help" className="mt-2 text-sm text-gray-500">
              Descreva suas dificuldades para que a tutora possa se preparar melhor para a sessão.
            </p>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmação de cancelamento */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancelar agendamento"
        className="max-w-md"
      >
        <div className="text-center">
          <p className="text-gray-700 mb-6">Deseja realmente cancelar o agendamento?</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleConfirmCancel}
              className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Sim, cancelar
            </button>
            <button
              onClick={handleContinueScheduling}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Continuar agendando
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de sucesso */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Agendamento realizado com sucesso!"
        className="max-w-md"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>

          <p className="text-gray-700 mb-6">Para onde deseja ir agora?</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoToAppointments}
              className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Ver meus agendamentos
            </button>
            <button
              onClick={handleGoToRepository}
              className="w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Ir para repositório
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
