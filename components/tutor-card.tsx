import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Calendar } from "lucide-react"

// Tipo para os dados do tutor
interface Tutor {
  id: string
  name: string
  image: string
  description?: string
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
  // Função para renderizar as estrelas de avaliação
  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star key={index} size={16} className={index < count ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
      ))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Imagem do tutor */}
        <div className="md:w-1/4 flex justify-center items-center p-4 bg-gray-50">
          <div className="relative w-32 h-32 md:w-full md:h-40 overflow-hidden rounded-full md:rounded-lg">
            <Image
              src={tutor.image || "/placeholder.svg"}
              alt={tutor.description || `Foto do tutor ${tutor.name}`}
              fill
              sizes="(max-width: 768px) 128px, 200px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Informações do tutor */}
        <div className="md:w-3/4 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
              {tutor.title && tutor.institution && (
                <p className="text-gray-600">
                  {tutor.title} - {tutor.institution}
                </p>
              )}
            </div>

            {/* Avaliação */}
            {!tutor.isAI && (
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex mr-2">{renderStars(4)}</div>
                <span className="text-sm text-gray-600">4.0 (12 avaliações)</span>
              </div>
            )}
          </div>

          {/* Disciplinas */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Disciplinas:</h4>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((subject, index) => (
                <span key={index} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Disponibilidade */}
          {tutor.availability && (
            <div className="flex items-center mb-4">
              <Clock size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Disponibilidade: {tutor.availability}</span>
            </div>
          )}

          {/* Próximas datas */}
          {!tutor.isAI && (
            <div className="flex items-center mb-6">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Próximas datas disponíveis: 16/03, 22/03, 05/04</span>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/tutors/${tutor.id}`}
              className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2"
            >
              Ver perfil
            </Link>
            <Link
              href={`/tutors/${tutor.id}/schedule`}
              className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2"
            >
              Agendar tutoria
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
