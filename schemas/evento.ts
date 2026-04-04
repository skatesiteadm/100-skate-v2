import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'evento',
  title: 'Eventos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Data',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Local',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'linkInscricao',
      title: 'Link de Inscrição',
      type: 'url',
    }),
    defineField({
      name: 'linkMateria',
      title: 'Link da Matéria',
      type: 'url',
    }),
    defineField({
      name: 'linkAtivo',
      title: 'Link Ativo',
      type: 'string',
      options: {
        list: [
          { title: 'Link de Inscrição', value: 'inscricao' },
          { title: 'Link da Matéria', value: 'materia' },
        ],
        layout: 'radio',
      },
      description: 'Escolha qual link será exibido no site. Deixe em branco para não exibir nenhum.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({ title, date, media }) {
      const d = date ? new Date(date) : null
      const isPast = d ? d < new Date() : false
      return {
        title,
        subtitle: isPast ? '✅ Encerrado' : '🔜 Em breve',
        media,
      }
    },
  },
})
