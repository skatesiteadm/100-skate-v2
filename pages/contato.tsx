import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import Head from 'next/head'
import { useState } from 'react'

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', mensagem: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:contato@cemporcentoskate.com?subject=Solicitação de Media Kit - ${form.empresa}&body=Nome: ${form.nome}%0AEmail: ${form.email}%0AEmpresa: ${form.empresa}%0A%0AMensagem:%0A${form.mensagem}`
    window.location.href = mailto
    setEnviado(true)
  }

  return (
    <>
      <Head><title>Contato — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          {/* Hero */}
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
    <img
      src="/favicon.svg"
      alt="100% SKATE"
      className="w-24 md:w-36 opacity-90 shrink-0"
    />
  </div>
</section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

            {/* Formulário */}
            <section>
              <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-8 tracking-widest">
                Fale com a gente
              </h2>

              {enviado ? (
                <div className="bg-black text-white rounded-2xl p-8 text-center">
                  <span className="text-[#ff44cc] text-4xl font-black block mb-4">ok.</span>
                  <p className="text-gray-400">Seu cliente de email foi aberto. A gente responde em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest">Nome</label>
                    <input
                      type="text"
                      required
                      value={form.nome}
                      onChange={e => setForm({ ...form, nome: e.target.value })}
                      className="border-2 border-black rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#ff44cc] transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="border-2 border-black rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#ff44cc] transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest">Empresa / Marca</label>
                    <input
                      type="text"
                      value={form.empresa}
                      onChange={e => setForm({ ...form, empresa: e.target.value })}
                      className="border-2 border-black rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#ff44cc] transition-colors"
                      placeholder="Nome da empresa ou marca"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-black uppercase tracking-widest">Mensagem</label>
                    <textarea
                      required
                      value={form.mensagem}
                      onChange={e => setForm({ ...form, mensagem: e.target.value })}
                      rows={5}
                      className="border-2 border-black rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#ff44cc] transition-colors resize-none"
                      placeholder="Conte sobre sua marca, objetivo e tipo de parceria..."
                    />
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

            {/* Info */}
            <section className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
                  Onde Estamos
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed space-y-1">
                  <p className="font-black text-black">100 Skate Mag LTDA</p>
                  <p>Servidão Laura Duarte Prazeres SN</p>
                  <p>Campeche, Florianópolis SC</p>
                  <p>CEP 88065-175</p>
                  <p className="pt-2 text-gray-400">CNPJ: 60.234.444/0001-13</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
                  Email
                </h2>
                <p className="text-sm font-bold">
                  contato@cemporcentoskate.com
                </p>
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
