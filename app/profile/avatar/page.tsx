import AvatarPageClient from "./AvatarPageClient"

// Default export function is required for Next.js pages
export default function AvatarPage() {
  return <AvatarPageClient />
}

// Metadados para SEO
export const metadata = {
  title: "Gerenciar Avatar | Mensi",
  description: "Personalize seu avatar na plataforma Mensi. Escolha entre diferentes estilos e complementos.",
}
