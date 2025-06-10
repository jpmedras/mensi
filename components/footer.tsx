import Image from "next/image"

export function Footer() {
  return (
    <footer id="rodape" className="bg-sky-100 py-8" tabIndex={-1}>
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          © Mensi
          <br />
          Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
