import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">|</span>}
            {item.active ? (
              <span className="text-gray-800 font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-cyan-800 hover:text-cyan-900 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-1 rounded-sm"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
