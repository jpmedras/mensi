import Image from "next/image"
import Link from "next/link"

// Tipo para os dados do tutor
interface Tutor {
  id: string
  name: string
  image: string
  description: string
  title?: string
  institution?: string
  subjects: string[]
  availability?: string
  isAI?: boolean
}

interface TutorCardProps {
  tutor: Tutor
}

export function TutorCard({ tutor }: TutorCardProps) {
  // Determinar a cor de fundo com base no tipo de tutor (IA ou regular)
  const bgColor = tutor.isAI ? "bg-orange-500" : "bg-amber-300"

  // Determinar o texto do botão com base no tipo de tutor
  const buttonText = tutor.isAI ? "Começar" : "Ver perfil"

  // Determinar a URL de destino com base no tipo de tutor
  const buttonHref = tutor.isAI ? "/tutors/ai" : `/tutors/${tutor.id}`

  return (
    <div className={`${bgColor} rounded-lg overflow-hidden shadow-md`}>
      <div className="p-6 flex flex-col items-center">
        {/* Imagem do tutor */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-white flex items-center justify-center">
          <Image
            src={tutor.image}
            alt={tutor.description}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        {/* Nome do tutor */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">{tutor.name}</h3>

        {/* Título e instituição (se não for IA) */}
        {!tutor.isAI && tutor.title && tutor.institution && (
          <p className="text-gray-700 mb-4">
            {tutor.title} {tutor.institution}
          </p>
        )}

        {/* Disciplinas oferecidas */}
        <div className="w-full mt-2">
          <p className="text-center font-medium mb-2">Oferece tutoria em:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {tutor.subjects.map((subject) => (
              <span key={`${tutor.id}-${subject}`} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm">
                {subject}
              </span>
            ))}
          </div>

          {/* Disponibilidade (se houver) */}
          {tutor.availability && (
            <span className="block text-center bg-white text-gray-700 px-3 py-1 rounded-full text-sm mx-auto mt-2 max-w-max">
              {tutor.availability}
            </span>
          )}
        </div>

        {/* Botão de ação */}
        <div className="mt-6">
          <Link
            href={buttonHref}
            className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}
