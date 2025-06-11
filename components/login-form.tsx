"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  // Estados para controlar o formulário
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const router = useRouter()

  // Função para atualizar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erros quando o usuário começar a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aqui seria implementada a lógica real de autenticação
      console.log("Dados de login:", formData)

      // Redirecionar para dashboard ou página principal após login bem-sucedido
      router.push("/profile")
    } catch (error) {
      console.error("Erro no login:", error)
      setErrors({ email: "Credenciais inválidas. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para login com Google (simulada)
  const handleGoogleLogin = async (e: React.FormEvent) => {
    console.log("Login com Google iniciado")
    // Aqui seria implementada a integração com Google OAuth
    e.preventDefault()

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aqui seria implementada a lógica real de autenticação
      console.log("Dados de login:", formData)

      // Redirecionar para dashboard ou página principal após login bem-sucedido
      router.push("/profile")
    } catch (error) {
      console.error("Erro no login:", error)
      setErrors({ email: "Credenciais inválidas. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Lado esquerdo - Mascote da Mensi */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <Image
              src="/images/logo-login.png"
              alt="A imagem é um logotipo com a palavra 'MENSI' escrita em letras maiúsculas e arredondadas, de cor azul. A última letra 'I' é substituída por um lápis desenhado de forma divertida e humanizada.Esse lápis tem olhos grandes, um sorriso simpático e está usando uma borracha rosa no topo, como se fosse um chapéu. A ponta do lápis está apontada para baixo, como se estivesse escrevendo. Abaixo dele, há uma linha ondulada preta, sugerindo que ele acabou de escrever 'me ensina'"
              width={400}
              height={400}
              priority
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Lado direito - Formulário de login */}
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Cabeçalho do formulário */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Entrar</h1>
              <p className="text-gray-600">Digite seus dados de acesso nos campos abaixo.</p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo E-mail */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite seu e-mail"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-colors pr-12 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Link "Esqueceu a senha?" */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-cyan-800 hover:text-cyan-900 focus:outline-none focus:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Botão Entrar */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-700 hover:bg-cyan-800 disabled:bg-cyan-500 text-white py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>

              {/* Link para cadastro */}
              <div className="text-center">
                <span className="text-gray-600">Não possui uma conta? </span>
                <Link
                  href="/register"
                  className="text-cyan-800 hover:text-cyan-900 font-medium focus:outline-none focus:underline"
                >
                  Cadastre-se
                </Link>
              </div>

              {/* Divisor */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              {/* Botão Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar com Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
