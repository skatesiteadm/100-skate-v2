import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import Head from 'next/head'
import { useState } from 'react'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', mensagem: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório'
    if (!form.email.trim()) e.email = 'Email é obrigatório'
    else if (!isValidEmail(form.email)) e.email = 'Email inválido'
    if (!form.mensagem.trim()) e.mensagem = 'Mensagem é obrigatória'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    const mailto = `mailto:contato@cemporcentoskate.com?subject=Solicitação de Media Kit - ${form.empresa}&body=Nome: ${form.nome}%0AEmail: ${form.email}%0AEmpresa: ${form.empresa}%0A%0AMensagem:%0A${form.mensagem}`
    window.location.href = mailto
    setEnviado(true)
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [key]: e.target.value })
      if (errors[key]) setErrors({ ...errors, [key]: '' })
    },
  })

  const inputBase = 'bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-2 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-colors'

  return (
    <>
      <Head><title>Contato — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          <section className="bg-black text-white rounded-2xl p-8 md:p-16 mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <span className="text-[#ff44cc] text-xs font-black uppercase tracking-widest block mb-4">
                  Fale com a gente
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-4">
                  Contato
                </h1>
                <p className="text-gray-400 text-lg max-w-xl">
                  Parcerias, anúncios, press e media kit. Estamos à disposição.
                </p>
              </div>
              <img src="/favicon.svg" alt="100% SKATE" className="w-24 md:w-36 opacity-90 shrink-0" />
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

            <section>
              <h2 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
                Fale com a gente
              </h2>

              {enviado ? (
                <div className="bg-black text-white rounded-2xl p-8 text-center">
                  <span className="text-[#ff44cc] text-4xl font-black block mb-4">ok.</span>
                  <p className="text-gray-400">Seu cliente de email foi aberto. A gente responde em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Nome *</label>
                    <input
                      type="text"
                      {...field('nome')}
                      className={`${inputBase} ${errors.nome ? 'border-red-500 focus:border-red-500' : 'border-zinc-300 dark:border-zinc-600 focus:border-[#ff44cc]'}`}
                      placeholder="Seu nome"
                    />
                    {errors.nome && <span className="text-red-500 text-xs font-bold">{errors.nome}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Email *</label>
                    <input
                      type="email"
                      {...field('email')}
                      className={`${inputBase} ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-300 dark:border-zinc-600 focus:border-[#ff44cc]'}`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs font-bold">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Empresa / Marca</label>
                    <input
                      type="text"
                      {...field('empresa')}
                      className={`${inputBase} border-zinc-300 dark:border-zinc-600 focus:border-[#ff44cc]`}
                      placeholder="Nome da empresa ou marca"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Mensagem *</label>
                    <textarea
                      {...field('mensagem')}
                      rows={5}
                      className={`${inputBase} resize-none ${errors.mensagem ? 'border-red-500 focus:border-red-500' : 'border-zinc-300 dark:border-zinc-600 focus:border-[#ff44cc]'}`}
                      placeholder="Conte sobre sua marca, objetivo e tipo de parceria..."
                    />
                    {errors.mensagem && <span className="text-red-500 text-xs font-bold">{errors.mensagem}</span>}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#ff44cc] text-white font-black uppercase text-xs px-6 py-4 rounded-full tracking-widest hover:bg-pink-500 transition-colors w-fit"
                  >
                    Enviar
                  </button>
                </form>
              )}
            </section>

            <section className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-6 tracking-widest text-black dark:text-white">
                  Onde Estamos
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-1">
                  <p className="font-black text-black dark:text-white">100 Skate Mag LTDA</p>
                  <p>Servidão Laura Duarte Prazeres SN</p>
                  <p>Campeche, Florianópolis SC</p>
                  <p>CEP 88065-175</p>
                  <p className="pt-2 text-gray-400">CNPJ: 60.234.444/0001-13</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-6 tracking-widest text-black dark:text-white">
                  Email
                </h2>
                <p className="text-sm font-bold text-black dark:text-white">contato@cemporcentoskate.com</p>
              </div>

              <div className="bg-black text-white rounded-2xl p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#ff44cc] mb-3">
                  Por que anunciar na 100% SKATE?
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
                    A única revista impressa de skate em produção no Brasil
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
                    Mais de 100 milhões de visualizações nos últimos 3 anos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
                    30 anos de credibilidade com o público do skate
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
                    Revista, portal, YouTube, eventos e redes sociais
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </Layout>
    </>
  )
}
