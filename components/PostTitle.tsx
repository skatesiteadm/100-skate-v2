export default function PostTitle({ children }) {
  return (
    <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-black dark:text-white">
      {children}
    </h1>
  )
}
