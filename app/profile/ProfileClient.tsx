"use client"

import { ProfileHeader } from "@/components/profile-header"
import { ProfileContent } from "@/components/profile-content"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"

export default function ProfileClient() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo das outras páginas */}
      <AccessibilityMenu />

      {/* Header da página de perfil com navegação */}
      <ProfileHeader />

      {/* Conteúdo principal da página de perfil */}
      <div className="flex-1 bg-gray-50">
        <ProfileContent />
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}
