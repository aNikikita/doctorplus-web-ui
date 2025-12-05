export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Опишите симптомы или вставьте анализы',
      description: 'Расскажите о том, что вас беспокоит, или загрузите результаты ваших анализов.',
    },
    {
      number: '2',
      title: 'Доктор+ объяснит простым языком',
      description:
        'Получите структурированное объяснение и выделите, на что важно обратить внимание.',
    },
    {
      number: '3',
      title: 'Идите к врачу подготовленными',
      description: 'С этой информацией вы сможете эффективнее общаться с вашим врачом.',
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Как это работает</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-medical-500 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
