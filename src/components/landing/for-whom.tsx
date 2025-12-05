export function ForWhomSection() {
  const cases = [
    {
      emoji: '🔬',
      title: 'Вы получили анализы',
      description: 'Вы получили анализы и не понимаете, что в них. Доктор+ поможет разобраться.',
    },
    {
      emoji: '👨‍⚕️',
      title: 'Готовитесь к визиту',
      description: 'Готовитесь к визиту к врачу. Доктор+ поможет подготовить вопросы.',
    },
    {
      emoji: '💭',
      title: 'Хотите лучше понять',
      description:
        'Хотите лучше сформулировать вопросы врачу о своем здоровье. Доктор+ с этим поможет.',
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Для кого Доктор+</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div key={caseItem.title} className="bg-white p-6 rounded-lg">
              <div className="text-4xl mb-4">{caseItem.emoji}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{caseItem.title}</h3>
              <p className="text-gray-600 text-sm">{caseItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
