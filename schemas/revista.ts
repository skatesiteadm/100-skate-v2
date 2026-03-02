import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'revista',
  title: 'Revista',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título da Edição',
      type: 'string',
    }),
    defineField({
      name: 'edicao',
      title: 'Número da Edição',
      type: 'string',
    }),
    defineField({
      name: 'capa',
      title: 'Foto da Capa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'linkCompra',
      title: 'Link de Compra (Mercado Pago)',
      type: 'url',
    }),
    defineField({
      name: 'materiaDestaque',
      title: 'Matéria de Capa',
      type: 'reference',
      to: [{ type: 'post' }],
    }),
    defineField({
      name: 'ativa',
      title: 'Edição Atual?',
      type: 'boolean',
    }),
  ],
})
