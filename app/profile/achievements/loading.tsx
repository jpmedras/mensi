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
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>

          {/* Skeleton para grid de conquistas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
