import { RegisterForm } from "@/components/register-form"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { RegisterHeader } from "@/components/register-header"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Menu de acessibilidade - mesmo da landing page */}
      <AccessibilityMenu />

      {/* Header simplificado para cadastro */}
      <RegisterHeader />

      {/* Conteúdo principal da página de cadastro */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center py-12 px-4">
        <RegisterForm />
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      <AccessibilityButton />
    </main>
  )
}

// Metadados para SEO
export const metadata = {
  title: "Cadastro | Mensi",
  description: "Crie sua conta na plataforma Mensi e comece a aprender com nossos tutores especializados.",
}
