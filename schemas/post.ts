import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineArrayMember, defineField, defineType } from 'sanity'

import authorType from './author'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    // 1. Title
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      placeholder: 'Titulo da materia (max 70 chars para SEO)',
      description: 'Titulo principal da materia. Use ate 70 caracteres para melhor exibicao em buscadores.',
      validation: (rule) => rule.required().max(120),
    }),

    // 2. Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Gerado automaticamente a partir do titulo. Clique em "Generate".',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, ''),
      },
      validation: (rule) => rule.required(),
    }),

    // 3. Published date
    defineField({
      name: 'date',
      title: 'Data de publicacao',
      type: 'datetime',
      description: 'Data e hora de publicacao da materia.',
      initialValue: () => new Date().toISOString(),
    }),

    // 4. Author
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),

    // 5. Cover image
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      description: 'Minimo 1200x630px para OG/social. Use imagens horizontais.',
      options: {
        hotspot: true,
      },
    }),

    // 6. Excerpt
    defineField({
      name: 'excerpt',
      title: 'Resumo / Chamada',
      type: 'text',
      rows: 3,
      description: 'Aparece na home, cards e meta description. Max 160 caracteres.',
      validation: (rule) => rule.max(160),
    }),

    // 7. Body (Portable Text)
    defineField({
      name: 'content',
      title: 'Corpo da materia',
      type: 'array',
      of: [
        // Standard text block with curated marks only
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citacao', value: 'blockquote' },
          ],
          lists: [
            { title: 'Marcadores', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Italico', value: 'em' },
            ],
            annotations: [
              defineField({
                name: 'link',
                type: 'object',
                title: 'Link',
                description: 'Cole a URL completa (ex: https://...)',
                fields: [
                  defineField({
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ scheme: ['http', 'https'] }),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Abrir em nova aba',
                    type: 'boolean',
                    initialValue: true,
                  }),
                  defineField({
                    name: 'title',
                    title: 'Titulo do link (acessibilidade/SEO)',
                    type: 'string',
                  }),
                ],
              }),
            ],
          },
        }),

        // Image block with alt + caption
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Importante para SEO e acessibilidade.',
            }),
            defineField({
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              description: 'Legenda exibida abaixo da imagem.',
            }),
          ],
        }),

        // Embed block: YouTube, Instagram, Twitter/X, generic
        defineArrayMember({
          type: 'object',
          name: 'embed',
          title: 'Embed',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'URL do embed',
              description:
                'Cole a URL do YouTube, Instagram, Twitter/X ou outro. O sistema detecta automaticamente.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Legenda (opcional)',
            }),
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare({ url, caption }: { url?: string; caption?: string }) {
              const platform =
                url?.includes('youtube') || url?.includes('youtu.be')
                  ? 'YouTube'
                  : url?.includes('instagram')
                    ? 'Instagram'
                    : url?.includes('twitter') || url?.includes('x.com')
                      ? 'Twitter/X'
                      : url?.includes('soundcloud')
                        ? 'SoundCloud'
                        : 'Embed'
              return { title: platform, subtitle: caption || url }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `por ${author}`,
        date && `em ${format(parseISO(date), 'dd/MM/yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
