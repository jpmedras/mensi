export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Skeleton para breadcrumb */}
          <div className="h-4 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>

          {/* Skeleton para título */}
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>

          {/* Skeleton para texto explicativo */}
          <div className="h-4 bg-gray-200 rounded w-full mb-8 animate-pulse"></div>

          {/* Skeleton para seção de avatares */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton para seção de complementos */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton para botão */}
          <div className="flex justify-end">
            <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
