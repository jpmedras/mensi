"use client"

import { useState, useEffect } from "react"
import { TutorCard } from "@/components/tutor-card"
import { Search, X } from "lucide-react"

// Tipos para os dados dos tutores
interface Tutor {
  id: string
  name: string
  image: string
  description: string
  title: string
  institution: string
  subjects: string[]
  availability?: string
  isAI?: boolean
}

// Dados simulados de tutores
const tutorsData: Tutor[] = [
  {
    id: "mensi-ai",
    name: "MENSI AI",
    image: "/images/mensi-ai.png",
    title: "",
    institution: "",
    subjects: ["Todas as disciplinas"],
    availability: "24 horas",
    isAI: true,
  },
  {
    id: "giovana-mattos",
    name: "Giovana Mattos",
    image: "/images/tutora-giovana.png",
    description: "Uma mulher em pé contra um fundo azul-acinzentado. Ela está sorrindo de forma confiante e amigável, com os braços cruzados sobre o peito. Sua pele é escura, e ela tem cabelos pretos, cacheados e volumosos, na altura dos ombros. Ela está vestindo uma camisa de manga longa azul-escura. A expressão no rosto transmite simpatia, segurança e profissionalismo. ",
    title: "Mestranda",
    institution: "USP",
    subjects: ["Química", "Física", "Matemática"],
  },
  {
    id: "alberto-souza",
    name: "Alberto Souza",
    image: "/images/tutor-alberto.png",
    description: "Um homem jovem em pé, ao ar livre, com um prédio moderno e vegetação ao fundo. Ele está sorrindo de maneira confiante e simpática, com os braços cruzados na frente do corpo. Tem pele escura, cabelos curtos e bem aparados. Está vestindo um blazer bege claro sobre uma camisa preta",
    title: "Doutorando",
    institution: "UFSCAR",
    subjects: ["Biologia", "Português", "Inglês"],
  },
  {
    id: "carlos-silva",
    name: "Carlos Silva",
    image: "/images/tutor-carlos.jpg",
    description: "Um homem jovem com expressão de leve sorriso e ar confiante. Ele tem barba e bigode bem cheios, cabelo curto e escuro. Está vestindo uma camisa xadrez em tons de azul-marinho e branco, sob um blazer azul-escuro com textura. O fundo é totalmente branco.",
    title: "Professor",
    institution: "UNICAMP",
    subjects: ["História", "Geografia", "Sociologia"],
  },
  {
    id: "mariana-costa",
    name: "Mariana Costa",
    image: "/images/tutora-mariana.jpg",
    description:"Uma jovem mulher sorridente em frente a um fundo branco. Ela tem pele clara, cabelos longos, lisos e escuros, e está com os fios soltos, caindo sobre os ombros. Seus olhos são escuros e ela exibe um sorriso largo, transmitindo simpatia e confiança. Veste uma camiseta azul-clara e está posicionada de forma central na imagem, com os braços parcialmente visíveis. A iluminação é uniforme, destacando seu rosto de maneira suave.",
    title: "Especialista",
    institution: "UFMG",
    subjects: ["Literatura", "Redação", "Gramática"],
  },
]

// Lista de disciplinas disponíveis para o filtro
const availableSubjects = [
  "Matemática",
  "Português",
  "Inglês",
  "Física",
  "Química",
  "Biologia",
  "História",
  "Geografia",
  "Literatura",
  "Redação",
  "Gramática",
  "Sociologia",
]

// Lista de níveis de ensino
const educationLevels = ["Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Preparatório para Vestibular"]

// Horários disponíveis
const availableTimes = ["Manhã", "Tarde", "Noite", "Fins de semana", "24 horas"]

export function TutorsSearch() {
  // Estados para os filtros
  const [subject, setSubject] = useState<string>("")
  const [tutorName, setTutorName] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [level, setLevel] = useState<string>("")
  const [time, setTime] = useState<string>("")

  // Estado para os resultados filtrados
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([])

  // Estado para controlar se os resultados devem ser exibidos
  const [showResults, setShowResults] = useState<boolean>(false)

  // Estado para controlar se todos os tutores devem ser exibidos
  const [showAllTutors, setShowAllTutors] = useState<boolean>(false)

  // Efeito para filtrar os tutores com base nos critérios selecionados
  useEffect(() => {
    // Verificar se algum filtro foi aplicado
    const hasFilters = subject || tutorName || date || level || time

    if (!hasFilters) {
      // Se não houver filtros, mostrar apenas o tutor IA
      setFilteredTutors(tutorsData.filter((tutor) => tutor.isAI))
      setShowResults(true)
      return
    }

    // Filtrar os tutores com base nos critérios
    let results = tutorsData

    if (subject) {
      results = results.filter(
        (tutor) => tutor.subjects.includes(subject) || tutor.subjects.includes("Todas as disciplinas"),
      )
    }

    if (tutorName) {
      results = results.filter((tutor) => tutor.name.toLowerCase().includes(tutorName.toLowerCase()))
    }

    if (time) {
      results = results.filter((tutor) => tutor.availability === time || tutor.availability === "24 horas")
    }

    // Garantir que o tutor IA sempre apareça primeiro nos resultados
    const aiTutor = results.find((tutor) => tutor.isAI)
    const regularTutors = results.filter((tutor) => !tutor.isAI)

    setFilteredTutors(aiTutor ? [aiTutor, ...regularTutors] : regularTutors)
    setShowResults(true)
  }, [subject, tutorName, date, level, time])

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSubject("")
    setTutorName("")
    setDate("")
    setLevel("")
    setTime("")
    setShowAllTutors(false)
    // Resetar para mostrar apenas o tutor IA
    setFilteredTutors(tutorsData.filter((tutor) => tutor.isAI))
  }

  // Função para mostrar todos os tutores
  const handleShowAllTutors = () => {
    setShowAllTutors(true)
    setFilteredTutors(tutorsData)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Coluna de filtros */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Qual tutor está procurando?</h2>

          {/* Filtro por disciplina ou conteúdo */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Disciplina ou conteúdo:
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

          <div className="text-center text-gray-500 my-4">ou</div>

          {/* Filtro por nome do tutor */}
          <div className="mb-6">
            <label htmlFor="tutorName" className="block text-gray-700 font-medium mb-2">
              Nome do tutor:
            </label>
            <div className="relative">
              <input
                type="text"
                id="tutorName"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                placeholder="Digite o nome do tutor"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 my-4">ou</div>

          {/* Filtro por nível de ensino */}
          <div className="mb-6">
            <label htmlFor="level" className="block text-gray-700 font-medium mb-2">
              Nível de ensino:
            </label>
            <div className="relative">
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                aria-label="Selecione um nível de ensino"
              >
                <option value="">Selecione um nível</option>
                {educationLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
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

          <div className="text-center text-gray-500 my-4">ou</div>

          {/* Filtro por horário disponível */}
          <div className="mb-6">
            <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
              Horário disponível:
            </label>
            <div className="relative">
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                aria-label="Selecione um horário disponível"
              >
                <option value="">Selecione um horário</option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
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

            {filteredTutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-600 mb-4">Nenhum tutor encontrado com os filtros selecionados.</p>
                <button
                  onClick={clearFilters}
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Limpar filtros
                </button>
              </div>
            )}

            {/* Botão para exibir todos os tutores */}
            {!showAllTutors && filteredTutors.length > 0 && filteredTutors.length < tutorsData.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleShowAllTutors}
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Exibir todos os tutores
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
