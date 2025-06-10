"use client"

import { AccessibilityMenu } from "@/components/accessibility-menu"
import { ProfileHeader } from "@/components/profile-header"
import { TutorProfile } from "@/components/tutor-profile"
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
    image: "/images/tutora-giovana.png",
    description: "Aui",
    subjects: ["Química", "Física", "Matemática"],
    specialties: [
      {
        category: "Matemática",
        items: ["Funções", "Geometria espacial", "Trigonometria"],
      },
      {
        category: "Física",
        items: ["Cinemática", "Dinâmica", "Óptica"],
      },
      {
        category: "Química",
        items: ["Tabela periódica", "Reações químicas"],
      },
    ],
    availability: {
      date: "16/06/2025",
      times: ["10:00", "13:00", "19:00"],
    },
    bio: "Mestranda em Computação na USP. Possui sólida formação e experiência na resolução de problemas complexos.",
  },
  "alberto-souza": {
    id: "alberto-souza",
    name: "Alberto Souza",
    title: "Doutorando UFSCAR",
    image: "/images/tutor-alberto.png",
    description: "",
    subjects: ["Biologia", "Português", "Inglês"],
    specialties: [
      {
        category: "Biologia",
        items: ["Genética", "Ecologia", "Citologia"],
      },
      {
        category: "Português",
        items: ["Gramática", "Literatura", "Redação"],
      },
      {
        category: "Inglês",
        items: ["Conversação", "Gramática", "Vocabulário"],
      },
    ],
    availability: {
      date: "16/06/2025",
      times: ["09:00", "14:00", "20:00"],
    },
    bio: "Formado em Matemática pela UFCAR. Trabalha como professor da rede pública e possui grande experiência com ensino de matemática.",
  },
  "carlos-silva": {
    id: "carlos-silva",
    name: "Carlos Silva",
    title: "Professor UNICAMP",
    image: "/images/tutor-carlos.jpg",
    description: "",
    subjects: ["História", "Geografia", "Sociologia"],
    specialties: [
      {
        category: "História",
        items: ["História Geral", "História do Brasil", "História Contemporânea"],
      },
      {
        category: "Geografia",
        items: ["Geopolítica", "Geografia Física", "Cartografia"],
      },
      {
        category: "Sociologia",
        items: ["Teorias Sociológicas", "Cidadania", "Movimentos Sociais"],
      },
    ],
    availability: {
      date: "16/06/2025",
      times: ["07:00", "09:00", "13:00"],
    },
    bio: "Professor da UNICAMP com ampla experiência no ensino de Ciências Humanas. Atua nas áreas de História, Geografia e Sociologia, com foco em pensamento crítico e interdisciplinaridade.",
  },
  "mariana-costa": {
    id: "mariana-costa",
    name: "Mariana Costa",
    title: "Especialista em Linguagens",
    image: "/images/tutora-mariana.jpg",
    description: "",
    subjects: ["Literatura", "Redação", "Gramática"],
    specialties: [
      {
        category: "Literatura",
        items: ["Literatura Brasileira", "Literatura Portuguesa", "Análise de Obras"],
      },
      {
        categor: "Redação",
        items: ["Dissertação", "Coesão e Coerência", "Estrutura Textual"],
      },
      {
        category: "Gramática",
        items: ["Morfologia", "Sintaxe", "Ortografia"],
      },
    ],
    availability: {
      date: "16/06/2025",
      times: ["08:00", "13:00", "18:00"],
    },
    bio: "specialista em Linguagens pela UFMG, Mariana atua há mais de 10 anos com preparação para vestibulares e ENEM, com foco em produção textual, gramática e literatura.",
  },
}

interface TutorPageProps {
  params: {
    id: string
  }
}

export default function TutorPage({ params }: TutorPageProps) {
  // Buscar os dados do tutor com base no ID
  const tutor = tutorsData[params.id as keyof typeof tutorsData]

  // Se o tutor não for encontrado, mostrar página 404
  if (!tutor) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo das outras páginas */}
      <AccessibilityMenu />

      {/* Header da página com navegação */}
      <ProfileHeader activeItem="tutores" />

      {/* Conteúdo principal da página de perfil do tutor */}
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Perfil", href: "/profile" },
              { label: "Tutores", href: "/tutors" },
              { label: `Perfil Tutor - ${tutor.name}`, href: `/tutors/${tutor.id}`, active: true },
            ]}
            className="mb-8"
          />

          {/* Componente de perfil do tutor */}
          <TutorProfile tutor={tutor} />
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
