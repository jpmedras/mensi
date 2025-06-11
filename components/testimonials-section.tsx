export function TestimonialsSection() {
  return (
    <section id="recomendacoes" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Os estudantes recomendam</h2>

        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Aprender pode ser desafiador, mas você não precisa enfrentar isso sozinho. Nossa plataforma conecta alunos do
          ensino médio com tutores dedicados, além de oferecer comunidades de apoio e um repositório completo de
          conteúdos. Veja como essa combinação tem feito a diferença na vida de quem já está com a gente.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Depoimento 1 */}
          <div className="border border-cyan-400 rounded-lg p-6 relative">
            <div className="text-gray-700 mb-4">
              "A Mensi realmente fez a diferença na minha preparação para o vestibular. A qualidade, a variedade de
              cursos e a interação com os professores são pontos que realmente fazem a diferença no meu aprendizado."
            </div>
            <div className="font-semibold">— Lara, 18 anos</div>
          </div>

          {/* Depoimento 2 */}
          <div className="border border-cyan-400 rounded-lg p-6 relative">
            <div className="text-gray-700 mb-4">
              "É incrível como a plataforma me ajudou nos estudos e a focar no que eu realmente precisava melhorar. Os
              tutores são atenciosos e explicam de um jeito simples e direto. Isso mudou o jogo!"
            </div>
            <div className="font-semibold">— Alex, 16 anos</div>
          </div>

          {/* Depoimento 3 */}
          <div className="border border-cyan-400 rounded-lg p-6 relative">
            <div className="text-gray-700 mb-4">
              "Antes eu tinha muita dificuldade com matérias diferentes, mas com a plataforma consegui traçar um caminho
              claro. O suporte dos tutores foi crucial e fez toda a diferença na minha confiança e notas!"
            </div>
            <div className="font-semibold">— Adriana, 20 anos</div>
          </div>
        </div>
      </div>
    </section>
  )
}
