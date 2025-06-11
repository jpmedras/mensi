"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria implementada a lógica para enviar o formulário
    console.log("Formulário enviado:", formData)
    setFormSubmitted(true)

    // Resetar o formulário após envio
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    })

    // Resetar a mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <section id="contato" className="bg-pink-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Fale conosco</h2>

            <p className="text-gray-700 mb-6">
              Sinta-se livre para nos enviar uma mensagem pelo formulário ao lado ou nos escreva um e-mail. Retornaremos
              o mais breve possível.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail className="text-cyan-700" size={20} />
                <span>contato@mensi.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-cyan-700" size={20} />
                <span>
                  Rua Intendente Humberto Campedelli, 1000
                  <br />
                  Universidade, São Carlos/SP
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <Image 
                src="/images/assistance.png" 
                alt="Uma mão com o dedo indicador apontado para cima está tocando uma tela com seis botões coloridos dispostos em duas fileiras de três. Cada botão tem um símbolo que representa uma reação ou ação" 
                width={200} 
                height={200} 
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              {formSubmitted && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Nome*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                  Telefone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  placeholder="Digite seu telefone"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  E-mail*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Mensagem*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  placeholder="Descreva como podemos te ajudar"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
