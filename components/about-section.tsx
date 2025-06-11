import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="sobre-nos" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">O que é a Mensi?</h2>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-2/3 space-y-6">
            <p className="text-gray-700">
              A Mensi é uma plataforma criada para apoiar estudantes do ensino médio em cada etapa da sua jornada
              escolar. Aqui você encontra tutores exclusivos que acompanham seu progresso de forma personalizada, além
              de comunidades de estudo para trocar experiências, tirar dúvidas e manter a motivação em alta.
            </p>

            <p className="text-gray-700">
              Também oferecemos um repositório completo de aulas e conteúdos atualizados, para você aprender no seu
              tempo e do seu jeito. Nosso objetivo é facilitar o acesso a uma educação de qualidade, conectando você a
              quem pode realmente fazer a diferença nos seus estudos.
            </p>

            <p className="text-gray-700">
              Comece hoje mesmo a explorar a plataforma e descubra como aprender pode ser mais leve, eficiente e
              colaborativo.
            </p>

            <div className="pt-4 text-center md:text-left">
              <Link
                href="/register"
                className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
              >
                Crie sua conta
              </Link>
            </div>
          </div>

          <div className="lg:w-1/3 flex justify-center">
            <Image
              src="/images/foto.png"
              alt="Ilustração representando educação online: quatro pessoas à esquerda em frente a um globo, um professor em uma tela de computador no canto superior direito, e abaixo elementos gráficos como imagem, vídeo, texto com lápis e um ícone de megafone. A imagem sugere ensino a distância e comunicação digital."
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
