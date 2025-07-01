import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

interface Option {
    id: string
    text: string
    isCorrect: boolean
}

interface Question {
    id: string
    text: string
    image: string | null
    options: Option[]
    points: number
}

interface Exam {
    id: string
    title: string
    description: string
    category: string
    duration: number
    totalPoints: number
    questions: Question[]
    status: 'published' | 'draft'
    createdAt: string
    updatedAt: string
}

// Mock data
const mockExam: Exam = {
    id: '1',
    title: 'Matematik Final Sınavı',
    description: 'Temel matematik kavramlarını ölçen final sınavı.',
    category: 'Matematik',
    duration: 60,
    totalPoints: 100,
    status: 'published',
    createdAt: '2025-06-30',
    updatedAt: '2025-06-30',
    questions: [
        {
            id: '1',
            text: '2 + 2 = ?',
            image: null,
            points: 10,
            options: [
                { id: '1', text: '4', isCorrect: true },
                { id: '2', text: '5', isCorrect: false },
                { id: '3', text: '3', isCorrect: false }
            ]
        },
        {
            id: '2',
            text: 'Aşağıdakilerden hangisi bir asal sayıdır?',
            image: null,
            points: 10,
            options: [
                { id: '1', text: '4', isCorrect: false },
                { id: '2', text: '6', isCorrect: false },
                { id: '3', text: '7', isCorrect: true },
                { id: '4', text: '8', isCorrect: false }
            ]
        }
    ]
}

const ExamContents: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [exam] = React.useState<Exam>(mockExam)
    const [isPreview, setIsPreview] = React.useState(false)

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <button
                        onClick={() => router.push('/panel/exams/manage')}
                        className="flex items-center gap-2 text-neutral-400 hover:text-white mb-4"
                    >
                        <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
                        Sınavlara Dön
                    </button>
                    <h2 className="text-3xl font-pixelify">
                        <span className="text-orange-light">{exam.title}</span>
                    </h2>
                </div>
                <Button
                    variant="outline"
                    onClick={() => setIsPreview(!isPreview)}
                    icon={isPreview ? 'pixelarticons:edit' : 'pixelarticons:eye'}
                >
                    {isPreview ? 'Düzenle' : 'Önizle'}
                </Button>
            </div>

            {/* Sınav Bilgileri */}
            <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Kategori</label>
                        <p className="text-white">{exam.category}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Süre</label>
                        <p className="text-white">{exam.duration} dakika</p>
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Toplam Puan</label>
                        <p className="text-white">{exam.totalPoints} puan</p>
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-400 mb-1">Durum</label>
                        <span className={`px-2 py-1 text-sm font-nunito
                            ${exam.status === 'published'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                        >
                            {exam.status === 'published' ? 'Yayında' : 'Taslak'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sınav Açıklaması */}
            <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                <h3 className="font-nunito text-white text-lg mb-4">Sınav Açıklaması</h3>
                <p className="text-neutral-400">{exam.description}</p>
            </div>

            {/* Sorular */}
            <div className="space-y-6">
                {exam.questions.map((question, index) => (
                    <div key={question.id} className="bg-dark-800 border border-neutral-600 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-nunito text-white text-lg">
                                Soru {index + 1}
                                <span className="ml-2 text-sm text-neutral-400">
                                    ({question.points} puan)
                                </span>
                            </h3>
                        </div>

                        <div className="mb-4">
                            <p className="text-white mb-4">{question.text}</p>
                            {question.image && (
                                <img
                                    src={question.image}
                                    alt={`Soru ${index + 1} görseli`}
                                    className="max-h-48 mb-4"
                                />
                            )}
                        </div>

                        <div className="space-y-3">
                            {question.options.map((option, optionIndex) => (
                                <div
                                    key={option.id}
                                    className={`flex items-center gap-3 p-3 border
                                        ${isPreview
                                            ? option.isCorrect
                                                ? 'border-green-500 bg-green-500/10'
                                                : 'border-neutral-600'
                                            : 'border-neutral-600'
                                        }`}
                                >
                                    <span className="text-neutral-400">
                                        {String.fromCharCode(65 + optionIndex)}.
                                    </span>
                                    <span className={`flex-1 ${option.isCorrect && isPreview ? 'text-green-500' : 'text-white'}`}>
                                        {option.text}
                                    </span>
                                    {isPreview && option.isCorrect && (
                                        <Icon icon="pixelarticons:check" className="w-5 h-5 text-green-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

(ExamContents as any).Layout = 'panel'

export default ExamContents
