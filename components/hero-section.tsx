import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="conteudo" className="bg-white py-12 md:py-16" tabIndex={-1}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="A imagem mostra uma letra 'M' maiúsculas e arredondada, de cor azul, encostado do lado direito da letra há um lápis grande e colorido, desenhado de forma divertida e humanizada. Esse lápis tem olhos grandes, um sorriso simpático e está usando uma borracha rosa no topo, como se fosse um chapéu. A ponta do lápis está apontada para baixo, como se estivesse escrevendo."
              width={300}
              height={300}
              priority
            />
          </div>

          <div className="md:w-2/3 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Mensi é a plataforma que vai te ajudar a aprender de verdade!
            </h1>

            <div className="space-y-4">
              <p className="text-gray-700">
                Está com dificuldade em alguma matéria? Aqui você encontra tutores dedicados prontos para te ajudar a
                entender de vez o conteúdo, no seu ritmo e do seu jeito.
              </p>

              <p className="text-gray-700">
                Conectamos você com quem sabe ensinar de forma simples, prática e personalizada.
              </p>

              <p className="text-gray-700">
                Nossa plataforma conta com um repositório de conteúdo que irá te ajudar a estudar em qualquer hora!
              </p>
            </div>

            <div className="pt-4 text-center md:text-left">
              <Link
                href="/login"
                className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
              >
                Começar agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
