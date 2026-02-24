import Link from 'next/link'

export default function BlogHeader({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      // Layout da Home (Logo maior)
      return (
        <header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
          <Link href="/">
            <img 
              src="/logoskate.svg" 
              alt="CEMPORCENTOSKATE" 
              className="h-16 md:h-24 w-auto hover:opacity-80 transition-opacity" 
            />
          </Link>
        </header>
      )

    case 2:
      // Layout de dentro da matéria (Logo menorzinho no topo)
      return (
        <header>
          <div className="mb-20 mt-8">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-block">
              <img 
                src="/logoskate.svg" 
                alt="CEMPORCENTOSKATE" 
                className="h-10 md:h-12 w-auto" 
              />
            </Link>
          </div>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
  }
}
