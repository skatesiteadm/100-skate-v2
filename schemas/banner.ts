import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Anunciante',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posicao',
      title: 'Posicao',
      type: 'string',
      options: {
        list: [
          { title: 'Topo (970x90)', value: 'topo' },
          { title: 'Sidebar (160x600)', value: 'sidebar' },
          { title: 'Mobile rodape (320x50)', value: 'mobile' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem do Banner',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link de destino',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'dataInicio',
      title: 'Data de inicio',
      type: 'date',
    }),
    defineField({
      name: 'dataFim',
      title: 'Data de fim',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'posicao',
      media: 'imagem',
    },
  },
})
