import { LoginForm } from "@/components/login-form"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { LoginHeader } from "@/components/login-header"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo da landing page */}
      <AccessibilityMenu />

      {/* Header simplificado para login */}
      <LoginHeader />

      {/* Conteúdo principal da página de login */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}
