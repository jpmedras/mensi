import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={40} className="text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tutor não encontrado</h1>
          <p className="text-gray-600">O perfil do tutor que você está procurando não existe ou foi removido.</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <ArrowLeft size={20} />
            Voltar para busca de tutores
          </Link>

          <div>
            <Link
              href="/profile"
              className="text-teal-600 hover:text-teal-700 hover:underline focus:outline-none focus:underline"
            >
              Ir para meu perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
