"use client"

import { AccessibilityMenu } from "@/components/accessibility-menu"
import { ProfileHeader } from "@/components/profile-header"
import { AvatarCustomizer } from "@/components/avatar-customizer"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AvatarPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo das outras páginas */}
      <AccessibilityMenu />

      {/* Header da página com navegação */}
      <ProfileHeader activeItem="perfil" />

      {/* Conteúdo principal da página de avatar */}
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Perfil", href: "/profile" },
              { label: "Gerenciar Avatar", href: "/profile/avatar", active: true },
            ]}
            className="mb-8"
          />

          {/* Título da página */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Escolha sua combinação:</h1>

          {/* Texto explicativo */}
          <p className="text-gray-700 mb-8">
            Personalize seu avatar do jeitinho que você gosta e deixe sua cara na plataforma!
          </p>

          {/* Componente de customização do avatar */}
          <AvatarCustomizer />
        </div>
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}
