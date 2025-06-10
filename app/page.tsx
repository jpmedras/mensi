import { AccessibilityMenu } from "@/components/accessibility-menu"
import { MainNavigation } from "@/components/main-navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TutorsSection } from "@/components/tutors-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AccessibilityButton } from "@/components/accessibility-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Menu de acessibilidade */}
      <AccessibilityMenu />

      {/* Menu de navegação principal */}
      <MainNavigation />

      {/* Seção principal (Hero) */}
      <HeroSection />

      {/* Seção "O que é a Mensi?" */}
      <AboutSection />

      {/* Seção "Os estudantes recomendam" */}
      <TestimonialsSection />

      {/* Seção "Conheça nossos tutores" */}
      <TutorsSection />

      {/* Seção "Fale conosco" */}
      <ContactSection />

      {/* Rodapé */}
      <Footer />

      {/* Botão de acessibilidade flutuante */}
      {/*<AccessibilityButton />*/}
    </main>
  )
}
