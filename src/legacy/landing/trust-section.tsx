export function TrustSection() {
  const points = [
    'Модель обучена на общих медицинских данных, но не знает вашей истории болезни.',
    'Всегда консультируйтесь с врачом.',
    'Не просим вводить ФИО, полис, адрес и т.п.',
  ]

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Безопасность и доверие
        </h2>

        <div className="space-y-4">
          {points.map((point) => (
            <div key={point} className="flex gap-4 p-4 bg-medical-50 rounded-lg">
              <div className="text-medical-600 text-xl flex-shrink-0">✓</div>
              <p className="text-gray-800">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
