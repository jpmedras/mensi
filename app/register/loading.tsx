export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Skeleton para título */}
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            {/* Skeleton para formulário */}
            <div className="space-y-6">
              {/* Primeira linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Segunda linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Terceira linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Botão */}
              <div className="text-center pt-4">
                <div className="h-12 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
