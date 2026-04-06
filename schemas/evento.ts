import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'dates',
      title: 'Datas e Cidades',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'dateEntry',
          title: 'Etapa',
          fieldsets: [{ name: 'periodo', title: 'Período', options: { columns: 2 } }],
          fields: [
            defineField({
              name: 'cities',
              title: 'Cidade',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'date',
              title: 'Início',
              type: 'date',
              fieldset: 'periodo',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'Fim (opcional)',
              type: 'date',
              fieldset: 'periodo',
            }),
          ],
          preview: {
            select: { date: 'date', endDate: 'endDate', cities: 'cities' },
            prepare({ date, endDate, cities }) {
              const fmt = (d: string) =>
                new Date(`${d}T08:00:00`).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                })
              const range = date
                ? endDate && endDate !== date
                  ? `${fmt(date)} a ${fmt(endDate)}`
                  : fmt(date)
                : ''
              return { title: cities ?? 'Cidade nao definida', subtitle: range }
            },
          },
        }),
      ],
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
    select: { title: 'title', dates: 'dates', media: 'image' },
    prepare({ title, dates, media }) {
      const firstDate = (dates as { date?: string }[])?.[0]?.date
      const d = firstDate ? new Date(firstDate) : null
      const isPast = d ? d < new Date() : false
      return {
        title,
        subtitle: isPast ? 'Encerrado' : 'Em breve',
        media,
      }
    },
  },
})
