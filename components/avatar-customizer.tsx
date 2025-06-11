"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, Save } from "lucide-react"
import { Modal } from "@/components/modal"

// Tipos para os dados do avatar
interface AvatarOption {
  id: string
  name: string
  image: string
  color: string
}

interface ComplementOption {
  id: string
  name: string
  image: string
  category: string
}

interface AvatarConfig {
  baseAvatar: string
  complements: string[]
}

// Dados dos avatares base (letras)
const avatarOptions: AvatarOption[] = [
  {
    id: "letter-a-orange",
    name: "A Laranja",
    image: "/images/avatars/letter-a-orange.png",
    color: "orange",
  },
  {
    id: "letter-a-green",
    name: "A Verde",
    image: "/images/avatars/letter-a-green.png",
    color: "green",
  },
  {
    id: "letter-a-cyan",
    name: "A Azul",
    image: "/images/avatars/letter-a-cyan.png",
    color: "cyan",
  },
  {
    id: "letter-a-pink",
    name: "A Rosa",
    image: "/images/avatars/letter-a-pink.png",
    color: "pink",
  },
]

// Dados dos complementos
const complementOptions: ComplementOption[] = [
  {
    id: "apple",
    name: "Maçã",
    image: "/images/complements/apple.png",
    category: "food",
  },
  {
    id: "pencil",
    name: "Lápis",
    image: "/images/complements/pencil.png",
    category: "school",
  },
  {
    id: "elephant",
    name: "Elefante",
    image: "/images/complements/elephant.png",
    category: "animal",
  },
  {
    id: "tiger",
    name: "Tigre",
    image: "/images/complements/tiger.png",
    category: "animal",
  },
]

export function AvatarCustomizer() {
  // Estados para controlar a seleção
  const [selectedAvatar, setSelectedAvatar] = useState<string>("")
  const [selectedComplement, setSelectedComplement] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  // Estados para controlar os modais
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const router = useRouter()

  // Carregar configuração atual do avatar do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem("mensi-avatar-config")
    if (savedConfig) {
      try {
        const config: AvatarConfig = JSON.parse(savedConfig)
        setSelectedAvatar(config.baseAvatar || "letter-a-orange")
        setSelectedComplement(config.complements?.[0] || "")
      } catch (error) {
        console.error("Erro ao carregar configuração do avatar:", error)
        // Definir avatar padrão se houver erro
        setSelectedAvatar("letter-a-orange")
      }
    } else {
      // Avatar padrão para novos usuários
      setSelectedAvatar("letter-a-orange")
    }
  }, [])

  // Função para selecionar avatar base
  const handleAvatarSelection = (avatarId: string) => {
    setSelectedAvatar(avatarId)
    setIsSaved(false)
  }

  // Função para selecionar complemento (apenas um por vez)
  const handleComplementSelection = (complementId: string) => {
    // Se o complemento já está selecionado, desmarcar
    if (selectedComplement === complementId) {
      setSelectedComplement("")
    } else {
      // Caso contrário, selecionar o novo complemento
      setSelectedComplement(complementId)
    }
    setIsSaved(false)
  }

  // Função para salvar as alterações
  const handleSaveChanges = async () => {
    setIsLoading(true)

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Salvar configuração no localStorage
      const config: AvatarConfig = {
        baseAvatar: selectedAvatar,
        complements: selectedComplement ? [selectedComplement] : [],
      }

      localStorage.setItem("mensi-avatar-config", JSON.stringify(config))

      // Aqui seria feita a chamada real para a API
      console.log("Avatar atualizado:", config)

      setIsSaved(true)

      // Mostrar modal de sucesso
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Erro ao salvar avatar:", error)
      alert("Erro ao salvar alterações. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Função para redirecionar para o perfil
  const handleGoToProfile = () => {
    setShowSuccessModal(false)
    router.push("/profile")
  }

  // Função para obter a cor de borda baseada no avatar selecionado
  const getAvatarBorderColor = (avatarId: string) => {
    const avatar = avatarOptions.find((a) => a.id === avatarId)
    switch (avatar?.color) {
      case "orange":
        return "border-orange-400"
      case "green":
        return "border-green-400"
      case "cyan":
        return "border-cyan-400"
      case "pink":
        return "border-pink-400"
      default:
        return "border-gray-400"
    }
  }

  return (
    <>
      <div className="space-y-8">
        {/* Seção de Avatares Base (Letras) */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Avatares (Letras)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleAvatarSelection(avatar.id)}
                className={`
                  relative p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2
                  ${
                    selectedAvatar === avatar.id
                      ? `bg-white border-4 ${getAvatarBorderColor(avatar.id)} shadow-lg scale-105`
                      : "bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }
                `}
                aria-label={`Selecionar avatar ${avatar.name}`}
                aria-pressed={selectedAvatar === avatar.id}
              >
                {/* Imagem do avatar */}
                <div className="flex justify-center mb-2">
                  <Image
                    src={avatar.image || "/placeholder.svg"}
                    alt={avatar.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                {/* Nome do avatar */}
                <p className="text-sm font-medium text-gray-700 text-center">{avatar.name}</p>

                {/* Indicador de seleção */}
                {selectedAvatar === avatar.id && (
                  <div className="absolute top-2 right-2 bg-cyan-700 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Seção de Complementos */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Avatares (Complemento)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {complementOptions.map((complement) => (
              <button
                key={complement.id}
                onClick={() => handleComplementSelection(complement.id)}
                className={`
                  relative p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2
                  ${
                    selectedComplement === complement.id
                      ? "bg-white border-4 border-cyan-600 shadow-lg scale-105"
                      : "bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }
                `}
                aria-label={`${selectedComplement === complement.id ? "Remover" : "Selecionar"} complemento ${complement.name}`}
                aria-pressed={selectedComplement === complement.id}
              >
                {/* Imagem do complemento */}
                <div className="flex justify-center mb-2">
                  <Image
                    src={complement.image || "/placeholder.svg"}
                    alt={complement.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                {/* Nome do complemento */}
                <p className="text-sm font-medium text-gray-700 text-center">{complement.name}</p>

                {/* Indicador de seleção */}
                {selectedComplement === complement.id && (
                  <div className="absolute top-2 right-2 bg-cyan-700 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview do Avatar (opcional - para mostrar combinação) */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview do seu avatar:</h3>
          <div className="flex justify-center">
            <div className="relative">
              {/* Avatar base */}
              {selectedAvatar && (
                <Image
                  src={avatarOptions.find((a) => a.id === selectedAvatar)?.image || ""}
                  alt="Avatar selecionado"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              )}

              {/* Complementos sobrepostos (simulação visual) */}
              {selectedComplement && (
                <div className="absolute top-0 right-0">
                  {(() => {
                    const complement = complementOptions.find((c) => c.id === selectedComplement)
                    return complement ? (
                      <Image
                        src={complement.image || "/placeholder.svg"}
                        alt={complement.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    ) : null
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Informações da seleção */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              <strong>Avatar:</strong> {avatarOptions.find((a) => a.id === selectedAvatar)?.name || "Nenhum"}
            </p>
            {selectedComplement && (
              <p>
                <strong>Complemento:</strong> {complementOptions.find((c) => c.id === selectedComplement)?.name}
              </p>
            )}
          </div>
        </div>

        {/* Botão de salvar alterações */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            disabled={isLoading || !selectedAvatar}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2
              ${
                isSaved
                  ? "bg-green-500 text-white"
                  : isLoading
                    ? "bg-cyan-500 text-white cursor-not-allowed"
                    : "bg-cyan-700 hover:bg-cyan-800 text-white"
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            ) : isSaved ? (
              <>
                <Check size={20} />
                Salvo!
              </>
            ) : (
              <>
                <Save size={20} />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal de sucesso */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Alterações realizadas com sucesso!"
        className="max-w-md"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>

          <p className="text-gray-700 mb-6">
            Seu avatar foi atualizado com sucesso! As alterações já estão visíveis no seu perfil.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoToProfile}
              className="w-full px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
            >
              Ir para meu perfil
            </button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Continuar editando
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
