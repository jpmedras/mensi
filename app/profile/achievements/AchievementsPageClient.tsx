"use client"

import { AccessibilityMenu } from "@/components/accessibility-menu"
import { ProfileHeader } from "@/components/profile-header"
import { AchievementsGrid } from "@/components/achievements-grid"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AchievementsPageClient() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo das outras páginas */}
      <AccessibilityMenu />

      {/* Header da página com navegação */}
      <ProfileHeader activeItem="perfil" />

      {/* Conteúdo principal da página de conquistas */}
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Perfil", href: "/profile" },
              { label: "Minhas Conquistas", href: "/profile/achievements", active: true },
            ]}
            className="mb-8"
          />

          {/* Título da página */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Minhas Conquistas</h1>

          {/* Texto explicativo */}
          <div className="mb-8">
            <p className="text-gray-700 mb-2">Cada medalha aqui mostra o quanto você tá evoluindo.</p>
            <p className="text-gray-700">Estudou, ajudou, mandou bem? Ganha conquista! Bora colecionar vitórias!</p>
          </div>

          {/* Grid de conquistas */}
          <AchievementsGrid />
        </div>
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}
