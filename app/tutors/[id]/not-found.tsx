import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-cyan-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={40} className="text-cyan-800" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tutor não encontrado</h1>
          <p className="text-gray-600">O perfil do tutor que você está procurando não existe ou foi removido.</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            <ArrowLeft size={20} />
            Voltar para busca de tutores
          </Link>

          <div>
            <Link
              href="/profile"
              className="text-cyan-800 hover:text-cyan-900 hover:underline focus:outline-none focus:underline"
            >
              Ir para meu perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
