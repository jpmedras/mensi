"use client"

import { Download, Play, FileText, BookOpen } from "lucide-react"

// Tipo para os dados do conteúdo
interface Content {
  id: string
  title: string
  type: "video" | "document" | "exercise" | "article"
  subject: string
  grade: string
  category: string
  description?: string
  downloadUrl?: string
  viewUrl?: string
}

interface ContentCardProps {
  content: Content
}

export function ContentCard({ content }: ContentCardProps) {
  // Determinar o ícone com base no tipo de conteúdo
  const getIcon = () => {
    switch (content.type) {
      case "video":
        return <Play size={24} className="text-gray-700" />
      case "document":
        return <FileText size={24} className="text-gray-700" />
      case "exercise":
        return <BookOpen size={24} className="text-gray-700" />
      case "article":
        return <FileText size={24} className="text-gray-700" />
      default:
        return <FileText size={24} className="text-gray-700" />
    }
  }

  // Função para lidar com o download/visualização do conteúdo
  const handleDownload = () => {
    // Aqui seria implementada a lógica real de download ou visualização
    console.log(`Baixando/visualizando conteúdo: ${content.title}`)

    // Simular download ou redirecionamento
    if (content.type === "video") {
      // Para vídeos, abrir em nova aba ou modal de player
      console.log("Abrindo player de vídeo...")
    } else {
      // Para outros tipos, iniciar download
      console.log("Iniciando download...")
    }
  }

  // Determinar o texto do botão com base no tipo
  const getButtonText = () => {
    switch (content.type) {
      case "video":
        return "Assistir"
      case "exercise":
        return "Baixar"
      case "document":
        return "Baixar"
      case "article":
        return "Ler"
      default:
        return "Baixar"
    }
  }

  return (
    <div className="bg-amber-300 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Conteúdo principal */}
        <div className="flex items-center gap-4 flex-grow">
          {/* Ícone do tipo de conteúdo */}
          <div className="flex-shrink-0">{getIcon()}</div>

          {/* Informações do conteúdo */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{content.title}</h3>

            {/* Metadados */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
              <span className="bg-white px-2 py-1 rounded-full">{content.subject}</span>
              <span className="bg-white px-2 py-1 rounded-full">{content.grade}</span>
              <span className="bg-white px-2 py-1 rounded-full">{content.category}</span>
            </div>

            {/* Descrição (se disponível) */}
            {content.description && <p className="text-gray-700 text-sm">{content.description}</p>}
          </div>
        </div>

        {/* Botão de ação */}
        <div className="flex-shrink-0 ml-4">
          <button
            onClick={handleDownload}
            className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 flex items-center gap-2"
            aria-label={`${getButtonText()} ${content.title}`}
          >
            {content.type === "video" ? <Play size={16} /> : <Download size={16} />}
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  )
}
