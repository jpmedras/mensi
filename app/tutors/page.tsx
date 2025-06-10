"use client"

import { AccessibilityMenu } from "@/components/accessibility-menu"
import { ProfileHeader } from "@/components/profile-header"
import { TutorsSearch } from "@/components/tutors-search"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"
import { Breadcrumb } from "@/components/breadcrumb"

export default function TutorsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo das outras páginas */}
      <AccessibilityMenu />

      {/* Header da página com navegação */}
      <ProfileHeader activeItem="tutores" />

      {/* Conteúdo principal da página de tutores */}
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Perfil", href: "/profile" },
              { label: "Tutores", href: "/tutors", active: true },
            ]}
            className="mb-8"
          />

          {/* Componente de busca de tutores */}
          <TutorsSearch />
        </div>
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}
