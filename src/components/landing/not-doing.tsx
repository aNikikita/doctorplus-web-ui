export function NotDoingSection() {
  const items = [
    'Не ставит диагнозы',
    'Не заменяет врача',
    'Не назначает лекарства',
  ]

  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Что Доктор+ НЕ делает</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Доктор+ — это информационный ассистент. Он помогает лучше подготовиться к визиту к врачу
          и понять, о чём спросить.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white p-4 rounded-lg">
              <div className="text-error-500 text-xl font-bold">❌</div>
              <p className="font-medium text-gray-900">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
