import Link from "next/link"

export function TutorsSection() {
  return (
    <section id="tutores" className="bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Conheça nossos tutores</h2>

        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Sabemos que aprender nem sempre é simples — cada aluno tem seu ritmo, seus desafios e seus sonhos. É por isso
          que reunimos uma equipe de tutores apaixonados por ensinar e prontos para caminhar com você. Conheça os perfis
          dos nossos tutores e descubra como eles podem transformar sua jornada de estudos.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tutor 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Giovana Mattos</h3>
            <p className="text-gray-700 mb-4">
              Mestranda em Computação na USP. Possui sólida formação e experiência na resolução de problemas complexos.
            </p>
          </div>

          {/* Tutor 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Augusto Ladeira</h3>
            <p className="text-gray-700 mb-4">
              Graduando em Letras na UFMG. Ama ensinar, vê a educação como o caminho para um mundo melhor. Busca novas
              metodologias de ensino.
            </p>
          </div>

          {/* Tutor 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Alberto Souza</h3>
            <p className="text-gray-700 mb-4">
              Formado em Matemática pela UFCAR. Trabalha como professor da rede pública e possui grande experiência com
              ensino de matemática.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/login"
            className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            Agende uma tutoria
          </Link>
        </div>
      </div>
    </section>
  )
}
