import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import Head from 'next/head'

export default function NossaHistoriaPage() {
  return (
    <>
      <Head><title>Nossa História — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          {/* Hero */}
          <section className="bg-black text-white rounded-2xl overflow-hidden mb-12">
            <div className="p-8 md:p-16 max-w-3xl">
              <span className="text-[#ff44cc] text-xs font-black uppercase tracking-widest block mb-4">
                Desde 1995
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
                30 anos de resistência.
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Um marco. Em 1995 nascia uma revista que representa os anseios e o talento da golden era do skateboard. Na capa, Bob Burnquist — o cara que não tinha medo de inovar.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-8 tracking-widest">
              A Linha do Tempo
            </h2>
            <div className="space-y-0">
              {[
                {
                  ano: '1995',
                  titulo: 'O Começo',
                  texto: 'Alexandre Vianna — skatista profissional, fotógrafo e jornalista — publica a primeira edição da 100% SKATE. Um zine preto e branco de oito páginas com Bob Burnquist na capa. Era o início de uma história de conceito, credibilidade e longevidade.',
                },
                {
                  ano: '2000',
                  titulo: 'Mensal',
                  texto: 'A consolidação como referência do skate nacional fez a revista dar um passo decisivo: de bimestral para mensal. A internet chegava e a 100% SKATE já estava lá — o portal virou braço direito da revista na construção do skate brasileiro.',
                },
                {
                  ano: '2002',
                  titulo: 'Guia de Pistas',
                  texto: 'A revista inova e lança o primeiro Guia de Pistas de Skate do Brasil. O guia teria mais duas edições, em 2004 e 2006 — o último com 200 páginas e 1024 pistas e picos de rua catalogados pelo país inteiro.',
                },
                {
                  ano: '2009',
                  titulo: 'Nova Era',
                  texto: 'Fusão com a SKT e criação da Editora ZY. Nasce o Troféu CemporcentoSKATE, hoje a principal premiação do skate nacional segundo a Confederação Brasileira de Skate. O objetivo era colocar o Brasil no mapa internacional das melhores revistas de skate do mundo.',
                },
                {
                  ano: '2025',
                  titulo: '30 Anos',
                  texto: 'São 262.800 horas, 10.950 dias, 360 meses. Três décadas da revista mais longeva do skate brasileiro. Mais de 227 edições impressas, sem contar as especiais. Resistência, insistência e vivência sendo contada a cada edição.',
                },
              ].map((item, i) => (
                <div key={item.ano} className="flex gap-6 md:gap-12 items-start">
                  {/* Linha vertical */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#ff44cc] mt-1 shrink-0" />
                    {i < 4 && <div className="w-0.5 bg-gray-200 flex-1 my-1" style={{ minHeight: '80px' }} />}
                  </div>
                  {/* Conteúdo */}
                  <div className="pb-10">
                    <span className="text-[#ff44cc] text-xs font-black uppercase tracking-widest">{item.ano}</span>
                    <h3 className="text-xl font-black uppercase mt-1 mb-2">{item.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed max-w-2xl">{item.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Citação */}
          <section className="bg-black text-white rounded-2xl p-8 md:p-12 mb-12">
            <blockquote className="text-xl md:text-2xl font-black uppercase leading-tight max-w-3xl">
              "Era um grupo de amigos descontentes com o que tinha de mídia no Brasil. Fizemos um zine. E a gente vem documentando o skate brasileiro há 30 anos."
            </blockquote>
            <cite className="text-[#ff44cc] text-xs font-black uppercase tracking-widest block mt-6 not-italic">
              — Marco Cruz, Diretor da CemporcentoSKATE
            </cite>
          </section>

          {/* Os costumes */}
          <section className="mb-16 max-w-3xl">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
              Mais que uma Revista
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Os costumes. A moda. As peças de skate. De 1995 para cá, os skatistas mudaram, se adaptaram e fizeram o mundo se adaptar a eles. São 30 anos de correria e de história sendo feita — três décadas de resistência e insistência.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Contamos histórias tristes e felizes. Mostramos manobras inéditas e conquistas dos skatistas brasileiros. Descobrimos novos talentos e celebramos os ícones da nossa cultura. São páginas e páginas registrando o que o skate nacional produziu de melhor.
            </p>
            <p className="text-gray-600 leading-relaxed">
              E sempre aquela boa lembrança cada vez que você rasga o plástico que embala sua revista nova: nada como o cheiro de papel e tinta. Vida longa à 100%SKATE.
            </p>
          </section>

        </div>
      </Layout>
    </>
  )
}
