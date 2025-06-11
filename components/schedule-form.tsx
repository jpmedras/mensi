"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Tipos para os dados do formulário
interface ScheduleFormData {
  date: string
  time: string
  subject: string
  topic: string
  notes: string
}

// Dados simulados para as opções de horários
const availableDates = [
  { date: "2025-03-16", label: "16/03/2025", day: "Domingo" },
  { date: "2025-03-22", label: "22/03/2025", day: "Sábado" },
  { date: "2025-04-05", label: "05/04/2025", day: "Sábado" },
]

const availableTimes = [
  { time: "09:00", label: "09:00" },
  { time: "10:00", label: "10:00" },
  { time: "11:00", label: "11:00" },
  { time: "14:00", label: "14:00" },
  { time: "15:00", label: "15:00" },
  { time: "16:00", label: "16:00" },
  { time: "17:00", label: "17:00" },
]

const subjects = ["Matemática", "Português", "Física", "Química", "Biologia", "História", "Geografia"]

export function ScheduleForm() {
  // Estado para controlar a etapa atual do formulário
  const [step, setStep] = useState(1)

  // Estado para os dados do formulário
  const [formData, setFormData] = useState<ScheduleFormData>({
    date: "",
    time: "",
    subject: "",
    topic: "",
    notes: "",
  })

  // Estado para controlar erros de validação
  const [errors, setErrors] = useState<Partial<ScheduleFormData>>({})

  // Função para atualizar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro quando o usuário começa a digitar
    if (errors[name as keyof ScheduleFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Função para validar a etapa atual
  const validateStep = () => {
    const newErrors: Partial<ScheduleFormData> = {}

    if (step === 1) {
      if (!formData.date) {
        newErrors.date = "Selecione uma data"
      }
      if (!formData.time) {
        newErrors.time = "Selecione um horário"
      }
    } else if (step === 2) {
      if (!formData.subject) {
        newErrors.subject = "Selecione uma disciplina"
      }
      if (!formData.topic) {
        newErrors.topic = "Informe o tópico da tutoria"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para avançar para a próxima etapa
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  // Função para voltar para a etapa anterior
  const prevStep = () => {
    setStep(step - 1)
  }

  // Função para enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep()) {
      // Aqui seria implementada a lógica real de agendamento
      console.log("Dados do agendamento:", formData)

      // Avançar para a etapa de confirmação
      setStep(3)
    }
  }

  // Renderizar a etapa atual do formulário
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Selecione a data e horário</h2>

            {/* Seleção de data */}
            <div className="mb-6">
              <label htmlFor="date" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Calendar size={18} className="text-cyan-800" />
                Data disponível
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availableDates.map((dateOption) => (
                  <label
                    key={dateOption.date}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.date === dateOption.date
                        ? "border-cyan-800 bg-cyan-50"
                        : "border-gray-300 hover:border-cyan-800"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{dateOption.label}</div>
                      <div className="text-sm text-gray-600">{dateOption.day}</div>
                    </div>
                    <input
                      type="radio"
                      name="date"
                      value={dateOption.date}
                      checked={formData.date === dateOption.date}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        formData.date === dateOption.date ? "border-cyan-800 bg-cyan-800" : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {formData.date === dateOption.date && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                  </label>
                ))}
              </div>
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            {/* Seleção de horário */}
            <div className="mb-6">
              <label htmlFor="time" className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Clock size={18} className="text-cyan-800" />
                Horário disponível
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableTimes.map((timeOption) => (
                  <label
                    key={timeOption.time}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.time === timeOption.time
                        ? "border-cyan-800 bg-cyan-50"
                        : "border-gray-300 hover:border-cyan-800"
                    }`}
                  >
                    <div className="font-medium">{timeOption.label}</div>
                    <input
                      type="radio"
                      name="time"
                      value={timeOption.time}
                      checked={formData.time === timeOption.time}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        formData.time === timeOption.time ? "border-cyan-800 bg-cyan-800" : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {formData.time === timeOption.time && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                  </label>
                ))}
              </div>
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            {/* Botões de navegação */}
            <div className="flex justify-between mt-8">
              <Link
                href="/tutors"
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Cancelar
              </Link>
              <button
                type="button"
                onClick={nextStep}
                className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2 flex items-center gap-2"
              >
                Continuar
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )

      case 2:
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Detalhes da tutoria</h2>

            {/* Seleção de disciplina */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Disciplina <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-800 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione uma disciplina</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>

            {/* Tópico da tutoria */}
            <div className="mb-6">
              <label htmlFor="topic" className="block text-gray-700 font-medium mb-2">
                Tópico da tutoria <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Ex: Frações, Equações do 2º grau, etc."
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-800 ${
                  errors.topic ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.topic && <p className="mt-1 text-sm text-red-600">{errors.topic}</p>}
            </div>

            {/* Observações adicionais */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                Observações adicionais (opcional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Informe detalhes adicionais que possam ajudar o tutor a se preparar para a sessão"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-800"
              ></textarea>
            </div>

            {/* Botões de navegação */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <ChevronLeft size={18} />
                Voltar
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2"
              >
                Agendar tutoria
              </button>
            </div>
          </>
        )

      case 3:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tutoria agendada com sucesso!</h2>
            <p className="text-gray-600 mb-6">
              Sua tutoria foi agendada para o dia {formData.date.split("-").reverse().join("/")} às {formData.time}h.
              Você receberá um e-mail com os detalhes do agendamento.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="font-medium text-gray-800 mb-2">Detalhes do agendamento:</h3>
              <ul className="space-y-2 text-gray-600 text-left">
                <li>
                  <strong>Data:</strong> {formData.date.split("-").reverse().join("/")}
                </li>
                <li>
                  <strong>Horário:</strong> {formData.time}h
                </li>
                <li>
                  <strong>Disciplina:</strong> {formData.subject}
                </li>
                <li>
                  <strong>Tópico:</strong> {formData.topic}
                </li>
                {formData.notes && (
                  <li>
                    <strong>Observações:</strong> {formData.notes}
                  </li>
                )}
              </ul>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/profile/appointments"
                className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2"
              >
                Ver meus agendamentos
              </Link>
              <Link
                href="/tutors"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Continuar agendando
              </Link>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>{renderStep()}</form>
    </div>
  )
}
