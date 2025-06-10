"use client"

import { AccessibilityMenu } from "@/components/accessibility-menu"
import { ProfileHeader } from "@/components/profile-header"
import { ScheduleForm } from "@/components/schedule-form"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"
import { Breadcrumb } from "@/components/breadcrumb"
import { notFound } from "next/navigation"

// Dados simulados dos tutores (em uma aplicação real, isso viria de uma API)
const tutorsData = {
  "giovana-mattos": {
    id: "giovana-mattos",
    name: "Giovana Mattos",
    title: "Mestranda USP",
    subjects: ["Química", "Física", "Matemática"],
    verified: true,
  },
  "alberto-souza": {
    id: "alberto-souza",
    name: "Alberto Souza",
    title: "Doutorando UFSCAR",
    subjects: ["Biologia", "Português", "Inglês"],
    verified: true,
  },
  "carlos-silva": {
    id: "carlos-silva",
    name: "Carlos Silva",
    title: "Professor UNICAMP",
    subjects: ["História", "Geografia", "Sociologia"],
    verified: true,
  },
  "mariana-costa": {
    id: "mariana-costa",
    name: "Mariana Costa",
    title: "Especialista UFMG",
    subjects: ["Literatura", "Redação", "Gramática"],
    verified: true,
  },
}

interface SchedulePageProps {
  params: {
    id: string
  }
  searchParams: {
    date?: string
    time?: string
  }
}

export default function SchedulePage({ params, searchParams }: SchedulePageProps) {
  // Buscar os dados do tutor com base no ID
  const tutor = tutorsData[params.id as keyof typeof tutorsData]

  // Se o tutor não for encontrado, mostrar página 404
  if (!tutor) {
    notFound()
  }

  // Extrair data e horário dos parâmetros de busca (vindos da página do tutor)
  const selectedDate = searchParams.date || "16 de junho"
  const selectedTime = searchParams.time || "19:00"

  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo das outras páginas */}
      <AccessibilityMenu />

      {/* Header da página com navegação */}
      <ProfileHeader activeItem="tutores" />

      {/* Conteúdo principal da página de agendamento */}
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Perfil", href: "/profile" },
              { label: "Tutores", href: "/tutors" },
              { label: `Perfil Tutor - ${tutor.name}`, href: `/tutors/${tutor.id}` },
              { label: "Agendamento Tutoria", href: `/tutors/${tutor.id}/schedule`, active: true },
            ]}
            className="mb-8"
          />

          {/* Componente de formulário de agendamento */}
          <ScheduleForm tutor={tutor} selectedDate={selectedDate} selectedTime={selectedTime} />
        </div>
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}

// Remove metadata export since we're using "use client"
