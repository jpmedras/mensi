"use client"

import { useState, useEffect } from "react"
import { ContentCard } from "@/components/content-card"
import { X } from "lucide-react"

// Tipos para os dados dos conteúdos
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

// Dados simulados de conteúdos educativos
const contentsData: Content[] = [
  {
    id: "fracoes-conceitos",
    title: "Frações: o que são, tipos, exemplos e operações",
    type: "article",
    subject: "Matemática",
    grade: "6º ano",
    category: "Frações",
    description: "Material completo sobre frações com conceitos fundamentais, tipos e operações básicas.",
  },
  {
    id: "leitura-fracoes",
    title: "Leitura de Frações | Como se lê frações?",
    type: "video",
    subject: "Matemática",
    grade: "6º ano",
    category: "Frações",
    description: "Vídeo explicativo sobre como fazer a leitura correta de frações.",
  },
  {
    id: "exercicios-fracoes",
    title: "15 exercícios sobre frações (com respostas explicadas)",
    type: "exercise",
    subject: "Matemática",
    grade: "6º ano",
    category: "Frações",
    description: "Lista de exercícios práticos sobre frações com resoluções detalhadas.",
  },
  {
    id: "equacoes-primeiro-grau",
    title: "Equações do 1º grau: conceitos e resolução",
    type: "article",
    subject: "Matemática",
    grade: "7º ano",
    category: "Álgebra",
    description: "Guia completo sobre equações do primeiro grau.",
  },
  {
    id: "sistema-digestorio",
    title: "Sistema Digestório Humano",
    type: "video",
    subject: "Biologia",
    grade: "8º ano",
    category: "Corpo Humano",
    description: "Vídeo educativo sobre o funcionamento do sistema digestório.",
  },
  {
    id: "verbos-portugues",
    title: "Conjugação de Verbos em Português",
    type: "document",
    subject: "Português",
    grade: "9º ano",
    category: "Gramática",
    description: "Tabela completa de conjugação verbal.",
  },
  {
    id: "fisica-movimento",
    title: "Cinemática: Movimento Uniforme",
    type: "exercise",
    subject: "Física",
    grade: "1º ano",
    category: "Mecânica",
    description: "Exercícios sobre movimento uniforme e suas aplicações.",
  },
  {
    id: "quimica-tabela",
    title: "Tabela Periódica e Propriedades dos Elementos",
    type: "article",
    subject: "Química",
    grade: "1º ano",
    category: "Química Geral",
    description: "Estudo detalhado da tabela periódica.",
  },
]

// Listas para os filtros
const availableSubjects = ["Matemática", "Português", "Biologia", "Física", "Química", "História", "Geografia"]

const availableGrades = ["6º ano", "7º ano", "8º ano", "9º ano", "1º ano", "2º ano", "3º ano"]

const availableCategories = [
  "Frações",
  "Álgebra",
  "Geometria",
  "Gramática",
  "Literatura",
  "Corpo Humano",
  "Ecologia",
  "Mecânica",
  "Química Geral",
  "História do Brasil",
  "Geografia Física",
]

export function RepositorySearch() {
  // Estados para os filtros
  const [subject, setSubject] = useState<string>("")
  const [grade, setGrade] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  // Estado para os resultados filtrados
  const [filteredContents, setFilteredContents] = useState<Content[]>([])

  // Estado para controlar se os resultados devem ser exibidos
  const [showResults, setShowResults] = useState<boolean>(false)

  // Efeito para filtrar os conteúdos com base nos critérios selecionados
  useEffect(() => {
    // Verificar se algum filtro foi aplicado
    const hasFilters = subject || grade || category

    if (!hasFilters) {
      // Se não houver filtros, ocultar os resultados
      setShowResults(false)
      setFilteredContents([])
      return
    }

    // Filtrar os conteúdos com base nos critérios
    let results = contentsData

    if (subject) {
      results = results.filter((content) => content.subject === subject)
    }

    if (grade) {
      results = results.filter((content) => content.grade === grade)
    }

    if (category) {
      results = results.filter((content) => content.category === category)
    }

    setFilteredContents(results)
    setShowResults(true)
  }, [subject, grade, category])

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSubject("")
    setGrade("")
    setCategory("")
    setShowResults(false)
    setFilteredContents([])
  }

  // Função para buscar (mesmo comportamento dos filtros automáticos)
  const handleSearch = () => {
    // A busca já é automática, mas mantemos o botão para consistência visual
    console.log("Busca executada com filtros:", { subject, grade, category })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Coluna de filtros */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Utilize os filtros abaixo para personalizar sua busca
          </h2>

          {/* Filtro por disciplina */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Disciplina:
            </label>
            <div className="relative">
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                aria-label="Selecione uma disciplina"
              >
                <option value="">Selecione uma disciplina</option>
                {availableSubjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filtro por série */}
          <div className="mb-6">
            <label htmlFor="grade" className="block text-gray-700 font-medium mb-2">
              Série:
            </label>
            <div className="relative">
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                aria-label="Selecione uma série"
              >
                <option value="">Selecione uma série</option>
                {availableGrades.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filtro por conteúdo */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Conteúdo:
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                aria-label="Selecione um tipo de conteúdo"
              >
                <option value="">Selecione um conteúdo</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <X size={18} />
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Coluna de resultados */}
      <div className="lg:col-span-2">
        {showResults && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resultados da busca:</h2>

            {filteredContents.length > 0 ? (
              <div className="space-y-4">
                {filteredContents.map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-600 mb-4">Nenhum conteúdo encontrado com os filtros selecionados.</p>
                <button
                  onClick={clearFilters}
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Limpar filtros
                </button>
              </div>
            )}

            {/* Informação sobre total de resultados */}
            {filteredContents.length > 0 && (
              <div className="mt-6 text-center text-gray-600">
                <p>
                  {filteredContents.length === 1
                    ? "1 conteúdo encontrado"
                    : `${filteredContents.length} conteúdos encontrados`}
                </p>
              </div>
            )}
          </>
        )}

        {/* Mensagem inicial quando nenhum filtro foi aplicado */}
        {!showResults && (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bem-vindo ao Repositório!</h2>
            <p className="text-gray-600 mb-6">
              Use os filtros ao lado para encontrar materiais educativos organizados por disciplina, série e tipo de
              conteúdo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">Exercícios</span>
                <span>Com respostas explicadas</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium">Vídeos</span>
                <span>Aulas explicativas</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">Artigos</span>
                <span>Conteúdo teórico</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
