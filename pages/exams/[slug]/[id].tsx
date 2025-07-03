import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const questionData = {
  title: 'Soru - 1',
  description: 'Rich Text Editor Component in Figma - Örnek Olarak Bunu Aldım',
  content: 'Research about the WYSIWYG editor\'s best practices',
  options: [
    { id: 'A', text: 'A ) bir şey bir şey' },
    { id: 'B', text: 'B ) bir şey bir şey' },
    { id: 'C', text: 'C ) bir şey bir şey' },
    { id: 'D', text: 'D ) bir şey bir şey' },
    { id: 'E', text: 'E ) bir şey bir şey' },
  ]
}

const ExamsIdDetail = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className="container mx-auto max-w-7xl pt-6 pb-16 font-nunito">
      <div className="relative">
        <div className="grid gap-8">
          {/* Question Title */}
          <div>
            <h1 className="text-2xl font-medium text-orange-light font-pixelify">{questionData.title}</h1>
          </div>

          {/* Question Image (Varsa) */}
          <div className="rounded-lg overflow-hidden">
            <div className="mb-6">
              <h2 className="text-base text-gray-300">{questionData.description}</h2>
            </div>
            <div className="h-[240px] w-full bg-gray rounded-lg border border-gray-700" />
          </div>

          <p className='text-neutral-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi debitis aperiam autem omnis, repellat, sint nostrum consequatur, officiis consectetur deleniti ad architecto fugit explicabo maiores error. Obcaecati quas perferendis hic magnam quis mollitia atque debitis consectetur id, vel impedit, veniam quod est quibusdam voluptatem aspernatur laborum at ab voluptate assumenda?</p>

          {/* Options and Actions */}
          <div className="grid grid-cols-2 gap-8">
            {/* Options */}
            <div className="space-y-3">
              {questionData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left px-6 py-3 rounded-lg border border-gray transition-all cursor-pointer ${selectedOption === option.id
                      ? 'bg-orange-600/10 border-orange-600 text-orange-light'
                      : 'hover:bg-gray text-gray-300'
                    }`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div>
              <div className="flex flex-col gap-6 items-end justify-end h-full">
                <div className='flex items-center gap-6'>
                  <Button variant="outline">
                    Önceki
                  </Button>

                  <Button variant="filled" icon='pixelarticons:check'>
                    Tamamla
                  </Button>

                  <Button variant="outline">
                    Sonraki
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamsIdDetail