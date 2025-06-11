"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Award } from "lucide-react"
import { ExpandableSection } from "@/components/expandable-section"

export function ProfileContent() {
  // Estados para controlar quais seções estão expandidas
  const [expandedSections, setExpandedSections] = useState({
    tutors: true, // Primeira seção começa expandida conforme o layout
    communities: false,
    materials: false,
  })

  // Estados para o avatar personalizado
  const [avatarConfig, setAvatarConfig] = useState<{
    baseAvatar: string
    complement?: string
  } | null>(null)

  // Estado para controlar se o componente foi montado (hidratado)
  const [isMounted, setIsMounted] = useState(false)

  // Efeito para marcar o componente como montado
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Carregar configuração do avatar do localStorage apenas após a hidratação
  useEffect(() => {
    if (!isMounted) return

    const savedConfig = localStorage.getItem("mensi-avatar-config")
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig)
        setAvatarConfig({
          baseAvatar: config.baseAvatar || "letter-a-orange",
          complement: config.complements?.[0] || undefined,
        })
      } catch (error) {
        console.error("Erro ao carregar configuração do avatar:", error)
        setAvatarConfig({ baseAvatar: "letter-a-orange" })
      }
    } else {
      setAvatarConfig({ baseAvatar: "letter-a-orange" })
    }
  }, [isMounted])

  // Função para obter a imagem do avatar
  const getAvatarImage = () => {
    if (!avatarConfig) return "/placeholder.svg"

    const avatarMap: { [key: string]: string } = {
      "letter-a-orange": "/images/avatars/letter-a-orange.png",
      "letter-a-green": "/images/avatars/letter-a-green.png",
      "letter-a-cyan": "/images/avatars/letter-a-cyan.png",
      "letter-a-pink": "/images/avatars/letter-a-pink.png",
    }

    return avatarMap[avatarConfig.baseAvatar] || avatarMap["letter-a-orange"]
  }

  // Função para obter a imagem do complemento
  const getComplementImage = () => {
    if (!avatarConfig?.complement) return null

    const complementMap: { [key: string]: string } = {
      apple: "/images/complements/apple.png",
      pencil: "/images/complements/pencil.png",
      elephant: "/images/complements/elephant.png",
      tiger: "/images/complements/tiger.png",
    }

    return complementMap[avatarConfig.complement] || null
  }

  // Função para alternar uma seção específica
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Função para expandir todas as seções
  const expandAllSections = () => {
    setExpandedSections({
      tutors: true,
      communities: true,
      materials: true,
    })
  }

  // Função para recolher todas as seções
  const collapseAllSections = () => {
    setExpandedSections({
      tutors: false,
      communities: false,
      materials: false,
    })
  }

  // Renderizar um estado de carregamento até que o componente seja hidratado
  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção de boas-vindas */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar do usuário personalizado */}
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-sm">
              <Image
                src={getAvatarImage() || "/placeholder.svg"}
                alt="Seu avatar personalizado"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Complemento sobreposto */}
            {getComplementImage() && (
              <div className="absolute -top-1 -right-1 w-6 h-6">
                <Image
                  src={getComplementImage()! || "/placeholder.svg"}
                  alt="Complemento do avatar"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Adenilson, bem vindo!</h1>
            <Link
              href="/profile/avatar"
              className="text-cyan-800 hover:text-cyan-900 text-sm focus:outline-none focus:underline"
            >
              Gerenciar avatar
            </Link>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/profile/appointments"
            className="flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <Calendar size={18} />
            Meus agendamentos
          </Link>
          <Link
            href="/profile/achievements"
            className="flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <Award size={18} />
            Minhas conquistas
          </Link>
        </div>
      </div>

      {/* Controles para expandir/recolher todos os painéis */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={expandAllSections}
          className="text-cyan-800 hover:text-cyan-900 focus:outline-none focus:underline"
        >
          Abrir todos os painéis
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={collapseAllSections}
          className="text-cyan-800 hover:text-cyan-900 focus:outline-none focus:underline"
        >
          Ocultar todos os painéis
        </button>
      </div>

      {/* Seções expansíveis */}
      <div className="space-y-4">
        {/* Seção: Seus tutores */}
        <ExpandableSection
          title="Seus tutores"
          isExpanded={expandedSections.tutors}
          onToggle={() => toggleSection("tutors")}
        >
          <div className="p-6">
            <p className="text-gray-600 mb-4">Poxa! Por enquanto você ainda não tem nenhum tutor.</p>
            <Link
              href="/tutors"
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            >
              Encontre um tutor
            </Link>
          </div>
        </ExpandableSection>

        {/* Seção: Suas comunidades */}
        <ExpandableSection
          title="Suas comunidades"
          isExpanded={expandedSections.communities}
          onToggle={() => toggleSection("communities")}
        >
          <div className="p-6">
            <p className="text-gray-600 mb-4">Você ainda não participa de nenhuma comunidade.</p>
            <Link
              href="/community"
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            >
              Explorar comunidades
            </Link>
          </div>
        </ExpandableSection>

        {/* Seção: Últimos materiais visualizados */}
        <ExpandableSection
          title="Últimos materiais visualizados"
          isExpanded={expandedSections.materials}
          onToggle={() => toggleSection("materials")}
        >
          <div className="p-6">
            <p className="text-gray-600 mb-4">Nenhum material foi visualizado recentemente.</p>
            <Link
              href="/repository"
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            >
              Explorar repositório
            </Link>
          </div>
        </ExpandableSection>
      </div>
    </div>
  )
}
