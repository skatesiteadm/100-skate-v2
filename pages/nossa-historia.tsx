import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import Head from 'next/head'
import Link from 'next/link'
import { BorderBeam } from 'components/BorderBeam'

export default function NossaHistoriaPage() {
  return (
    <>
      <Head><title>Nossa História — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          {/* Hero */}
          <section className="bg-black text-white rounded-2xl overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 md:p-16">
                <span className="text-[#ff44cc] text-xs font-black uppercase tracking-widest block mb-4">
                  Desde 1995
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
                  Mais de 30 anos de resistência.
                </h1>
                <blockquote className="text-gray-400 text-lg leading-relaxed mb-6">
                  "Era um grupo de amigos descontentes com o que tinha de mídia no Brasil. Fizemos um zine. E a gente vem documentando o skate brasileiro há 30 anos."
                </blockquote>
                <cite className="not-italic">
                  <span className="text-[#ff44cc] text-sm font-black uppercase tracking-widest block">Marco Cruz</span>
                  <span className="text-gray-300 text-xs uppercase tracking-widest block mt-1">Diretor da 100% SKATE</span>
                </cite>
              </div>

              {/* Capa com aurora frame */}
              <div className="flex flex-col items-center justify-center p-8 bg-black border-l border-gray-800">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl aurora-frame" />
                  <div className="absolute -inset-1 rounded-xl border border-[#ff44cc] opacity-60 z-10" />
                  <img
                    src="/capa-edicao-01.jpg"
                    alt="100% SKATE Edição 01 - Bob Burnquist na capa"
                    className="relative rounded-lg shadow-2xl max-h-80 w-auto object-contain z-20"
                  />
                  <span className="absolute -top-3 -right-3 bg-[#ff44cc] text-white text-xs font-black uppercase px-2 py-1 rounded-full z-30 tracking-widest">
                    Ed. 01
                  </span>
                </div>
                <div className="mt-6 text-center">
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-bold block">Agosto 1995</span>
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-bold block mt-1">Bob Burnquist na capa</span>
                </div>
              </div>
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
                  texto: 'Um grupo de amigos descontentes com o que tinha de mídia no Brasil. Alexandre Vianna, skatista profissional, fotógrafo e jornalista, lidera a publicação da primeira edição da 100% SKATE. Um zine preto e branco de oito páginas com Bob Burnquist na capa. Era o início de uma história de conceito, credibilidade e longevidade.',
                  destaque: false,
                },
                {
                  ano: '2000',
                  titulo: 'Mensal + Site',
                  texto: 'A consolidação como referência do skate nacional fez a revista dar um passo decisivo: de bimestral para mensal. A internet chegava e a 100% SKATE já estava lá. O portal virou braço direito da revista na construção do skate brasileiro.',
                  destaque: false,
                },
                {
                  ano: '2001',
                  titulo: 'Desafio de Rua',
                  texto: 'Nasce o Desafio de Rua, evento de captação em formato de tour itinerante pelos melhores picos de rua já mapeados pela 100% SKATE. No formato Best Trick, quem acerta a melhor manobra em cada pico leva a etapa. A cada parada, os skatistas gravam depoimentos e escolhem o próximo vencedor. Cultura, rua e skate raiz.',
                  destaque: true,
                },
                {
                  ano: '2002',
                  titulo: 'Guia de Pistas',
                  texto: 'A revista inova e lança o primeiro Guia de Pistas de Skate do Brasil. O guia teria mais duas edições, em 2004 e 2006. O último com 200 páginas e 1024 pistas e picos de rua catalogados pelo país inteiro.',
                  destaque: false,
                },
                {
                  ano: '2009',
                  titulo: 'Troféu CemporcentoSKATE',
                  texto: 'Nasce o Troféu CemporcentoSKATE, a principal premiação do skate nacional segundo a Confederação Brasileira de Skate. Com a fusão de forças editoriais, o objetivo era colocar o Brasil no mapa internacional das melhores revistas de skate do mundo.',
                  destaque: false,
                },
                {
                  ano: '2021',
                  titulo: 'Desafio de Rua Volta',
                  texto: 'Após 10 anos de hiato, o Desafio de Rua retorna com tudo e em formato totalmente novo. Além do full video tradicional, o evento ganha uma websérie adaptada à nova linguagem das redes sociais, com episódios que documentam cada parada, os depoimentos dos skatistas e os bastidores da estrada.',
                  destaque: false,
                },
                {
                  ano: '2025',
                  titulo: '30 Anos e A Banca',
                  texto: 'Três décadas são comemoradas com A Banca, evento de três paradas por Porto Alegre, Florianópolis e São Paulo. Uma banca skatável com obstáculos em volta e o Museu 100% SKATE com exibição de itens históricos da revista. São 262.800 horas, 10.950 dias, 360 meses. A única revista impressa de skate em produção no Brasil.',
                  destaque: true,
                },
              ].map((item, i) => (
                <div key={item.ano} className="flex gap-6 md:gap-12 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#ff44cc] mt-1 shrink-0" />
                    {i < 6 && <div className="w-0.5 bg-gray-200 flex-1 my-1" style={{ minHeight: '80px' }} />}
                  </div>
             <div className={`pb-10 flex-1 ${item.destaque ? 'bg-black text-white rounded-2xl p-6 mb-4' : ''}`}>
                    <span className="text-[#ff44cc] text-xs font-black uppercase tracking-widest">{item.ano}</span>
                    <h3 className={`text-xl font-black uppercase mt-1 mb-2 ${item.destaque ? 'text-white' : ''}`}>{item.titulo}</h3>
                    <p className={`leading-relaxed max-w-2xl ${item.destaque ? 'text-gray-400' : 'text-gray-600'}`}>{item.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Um estilo de vida */}
          <section className="mb-12 max-w-3xl">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
              Um estilo de vida
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Os costumes. A moda. As peças de skate. De 1995 para cá, os skatistas mudaram, se adaptaram e fizeram o mundo se adaptar a eles. São 30 anos de correria e de história sendo feita. Três décadas de resistência e insistência.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Contamos histórias tristes e felizes. Mostramos manobras inéditas e conquistas dos skatistas brasileiros. Descobrimos novos talentos e celebramos os ícones da nossa cultura. São páginas e páginas registrando o que o skate nacional produziu de melhor.
            </p>
            <p className="text-gray-600 leading-relaxed">
              E sempre aquela boa lembrança cada vez que você rasga o plástico que embala sua revista nova: nada como o cheiro de papel e tinta. Vida longa à 100%SKATE.
            </p>
          </section>

          {/* 2026 */}
         {/* 2026 */}
<section className="relative bg-black text-white rounded-2xl overflow-hidden mb-16">
  <BorderBeam lightColor="#ff44cc" lightWidth={300} duration={20} borderWidth={2} />
  
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-0">
    {/* Esquerda */}
    <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-gray-800">
      <span className="text-[#ff44cc] text-xs font-black uppercase tracking-widest block mb-4">
        Já estamos em 2026
      </span>
      <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
        2026.
      </h2>
      <p className="text-gray-400 text-lg leading-relaxed">
        Mais de 30 anos não são o fim. São o começo de uma nova fase. Muitas novidades vindo por aí.
      </p>
    </div>

    {/* Direita */}
    <div className="p-8 md:p-16 flex flex-col gap-6">
      <p className="text-gray-300 text-sm uppercase tracking-widest font-bold">
        Fique ligado ao que vem por aí
      </p>
      <ul className="space-y-3 text-gray-400 text-sm">
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
          Nova plataforma digital
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
          Novos eventos pelo Brasil
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
          Edições especiais da revista
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff44cc] shrink-0" />
          Parcerias e colabs inéditas
        </li>
      </ul>
      
   <Link
  href="/contato"
  className="inline-block bg-[#ff44cc] text-white font-black uppercase text-xs px-6 py-3 rounded-full tracking-widest hover:bg-pink-500 transition-colors w-fit"
>
  Fale com a gente
</Link>
    </div>
  </div>
</section>

        </div>
      </Layout>
    </>
  )
}
