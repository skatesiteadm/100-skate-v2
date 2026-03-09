import groq from 'groq'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const revistaQuery = groq`
*[_type == "revista" && ativa == true][0] {
  _id,
  titulo,
  edicao,
  capa,
  descricao,
  linkCompra,
  "materiaDestaque": materiaDestaque->{
    ${postFields}
  }
}
`

export const todasRevistasQuery = groq`
*[_type == "revista"] | order(edicao desc) {
  _id,
  titulo,
  edicao,
  capa,
  descricao,
  linkCompra,
  ativa
}
`

export const eventosQuery = groq`
*[_type == "evento"] | order(date asc) {
  _id,
  title,
  date,
  location,
  linkInscricao,
  "image": image.asset->url,
}
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Revista {
  _id: string
  titulo?: string
  edicao?: string
  capa?: any
  descricao?: string
  linkCompra?: string
  ativa?: boolean
  materiaDestaque?: Post
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface Evento {
  _id: string
  title: string
  date: string
  location: string
  image: string
  linkInscricao?: string
}
