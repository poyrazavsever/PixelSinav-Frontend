import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'

interface Option {
    id: string
    text: string
    isCorrect: boolean
}

interface Question {
    id: string
    text: string
    image: File | null
    options: Option[]
    points: number
}

interface ExamFormData {
    title: string
    category: string
    description: string
    duration: number // dakika cinsinden
    totalPoints: number
    questions: Question[]
}

const MAX_QUESTIONS = 10;
const MIN_OPTIONS = 3;
const MAX_OPTIONS = 5;
const MAX_TOTAL_XP = 150;

const AddExam: NextPage = () => {
    const [questions, setQuestions] = React.useState<Question[]>([])
    const [selectedImage, setSelectedImage] = React.useState<{ [key: string]: string | null }>({})
    
    const totalXP = questions.reduce((sum, question) => sum + question.points, 0)
    const remainingXP = MAX_TOTAL_XP - totalXP

    const addQuestion = () => {
        if (questions.length >= MAX_QUESTIONS) return;
        if (remainingXP <= 0) return;

        const defaultPoints = Math.min(10, remainingXP);
        const newQuestion: Question = {
            id: Date.now().toString(),
            text: '',
            image: null,
            options: Array(MIN_OPTIONS).fill(null).map((_, index) => ({
                id: `${Date.now()}-${index}`,
                text: '',
                isCorrect: index === 0 // İlk şık varsayılan olarak doğru
            })),
            points: defaultPoints
        }
        setQuestions([...questions, newQuestion])
    }

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(question => question.id !== id))
    }

    const addOption = (questionId: string) => {
        const question = questions.find(q => q.id === questionId)
        if (!question || question.options.length >= MAX_OPTIONS) return;

        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: [...q.options, {
                        id: Date.now().toString(),
                        text: '',
                        isCorrect: false
                    }]
                }
            }
            return q
        }))
    }

    const removeOption = (questionId: string, optionId: string) => {
        const question = questions.find(q => q.id === questionId)
        if (!question || question.options.length <= MIN_OPTIONS) return;

        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: q.options.filter(opt => opt.id !== optionId)
                }
            }
            return q
        }))
    }

    const handleDrag = (e: React.DragEvent, questionId: string) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent, questionId: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type.startsWith('image/')) {
                setSelectedImage({
                    ...selectedImage,
                    [questionId]: URL.createObjectURL(file)
                })
            }
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage({
                ...selectedImage,
                [questionId]: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        if (field === 'points') {
            const numValue = typeof value === 'string' ? parseInt(value) : value;
            const otherQuestionsXP = questions.reduce((sum, q) =>
                q.id !== id ? sum + q.points : sum, 0);

            if (otherQuestionsXP + numValue > MAX_TOTAL_XP) {
                return; // XP limitini aşıyorsa güncelleme yapma
            }
        }

        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ))
    }

    const updateOption = (questionId: string, optionId: string, field: keyof Option, value: any) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: q.options.map(opt =>
                        opt.id === optionId ? { ...opt, [field]: value } : opt
                    )
                }
            }
            return q
        }))
    }

    return (
        <>
            <h1 className="font-pixelify text-4xl mb-8">
                <span className="text-orange-light">Yeni</span>
                <span className="text-white"> Sınav Ekle</span>
            </h1>

            <form>
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sınav Adı */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Sınav Adı
                            </label>
                            <input
                                type="text"
                                placeholder="Matematik Final Sınavı"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Kategori
                            </label>
                            <select className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none">
                                <option value="">Kategori Seçin</option>
                                <option value="matematik">Matematik</option>
                                <option value="fizik">Fizik</option>
                                <option value="kimya">Kimya</option>
                            </select>
                        </div>

                        {/* Süre */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Sınav Süresi (Dakika)
                            </label>
                            <input
                                type="number"
                                min="1"
                                placeholder="60"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>

                        {/* Toplam Puan */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Toplam Puan
                            </label>
                            <input
                                type="number"
                                min="1"
                                placeholder="100"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Sınav Açıklaması */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <label className="block font-nunito text-white mb-2">
                        Sınav Açıklaması
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Sınav hakkında açıklama yazın..."
                        className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                        placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    />
                </div>

                {/* Sorular */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <label className="block font-nunito text-white text-lg mb-1">
                                Sınav Soruları
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="px-3 py-1 bg-dark border border-neutral-600">
                                    <span className="font-pixelify text-neutral-400">Toplam XP:</span>
                                    <span className="font-nunito text-orange-light ml-2">{totalXP}</span>
                                </div>
                                <div className="px-3 py-1 bg-dark border border-neutral-600">
                                    <span className="font-pixelify text-neutral-400">Kalan XP:</span>
                                    <span className={`font-nunito ml-2 ${remainingXP < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        {remainingXP}
                                    </span>
                                </div>
                            </div>
                            <p className="text-neutral-400 text-sm mt-2">
                                Maksimum {MAX_QUESTIONS} soru ekleyebilirsiniz. Her soru için {MIN_OPTIONS}-{MAX_OPTIONS} şık belirleyebilirsiniz.
                            </p>
                        </div>
                        <Button
                            icon='pixelarticons:plus'
                            onClick={(e) => {
                                e.preventDefault()
                                addQuestion()
                            }}
                            disabled={questions.length >= MAX_QUESTIONS || remainingXP <= 0}
                            type="button"
                        >
                            {remainingXP <= 0 ? 'XP Limiti Doldu' : 'Yeni Soru'}
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {questions.map((question, qIndex) => (
                            <div key={question.id} className="bg-dark p-6 border border-neutral-600">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-nunito text-white text-lg">
                                        Soru {qIndex + 1}
                                    </h3>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            removeQuestion(question.id)
                                        }}
                                        className="text-neutral-400 hover:text-red-500 transition-colors"
                                    >
                                        <Icon icon="pixelarticons:close" className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Görsel Yükleme */}
                                <div className="mb-4">
                                    <div
                                        className="border-2 border-dashed border-neutral-600 rounded-lg p-6 text-center cursor-pointer
                                        hover:border-orange-primary/50 hover:bg-orange-primary/5 transition-colors"
                                        onDragEnter={(e) => handleDrag(e, question.id)}
                                        onDragLeave={(e) => handleDrag(e, question.id)}
                                        onDragOver={(e) => handleDrag(e, question.id)}
                                        onDrop={(e) => handleDrop(e, question.id)}
                                    >
                                        {selectedImage[question.id] ? (
                                            <div className="relative">
                                                <img
                                                    src={selectedImage[question.id]!}
                                                    alt="Preview"
                                                    className="max-h-48 mx-auto"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setSelectedImage({
                                                            ...selectedImage,
                                                            [question.id]: null
                                                        })
                                                    }}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full
                                                    hover:bg-red-600 transition-colors"
                                                >
                                                    <Icon icon="pixelarticons:close" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Icon icon="pixelarticons:image" className="w-8 h-8 mx-auto text-orange-light" />
                                                <p className="text-neutral-400 text-sm">Görsel eklemek için sürükleyin veya tıklayın</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Soru Metni */}
                                <div className="mb-4">
                                    <textarea
                                        rows={3}
                                        placeholder="Soru metnini yazın..."
                                        className="w-full px-4 py-3 bg-dark-800 border border-neutral-600 text-white font-nunito
                                        placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                        value={question.text}
                                        onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                                    />
                                </div>

                                {/* Şıklar */}
                                <div className="space-y-3">
                                    {question.options.map((option, oIndex) => (
                                        <div key={option.id} className="flex items-center gap-3">
                                            <div
                                                onClick={() => {
                                                    const updatedOptions = question.options.map(opt => ({
                                                        ...opt,
                                                        isCorrect: opt.id === option.id
                                                    }))
                                                    updateQuestion(question.id, 'options', updatedOptions)
                                                }}
                                                className={`w-5 h-5 rounded-full cursor-pointer flex items-center justify-center
                                                    ${option.isCorrect 
                                                        ? 'bg-orange-primary' 
                                                        : 'border-2 border-neutral-600 hover:border-orange-primary/50'}`}
                                            >
                                                {option.isCorrect && (
                                                    <Icon icon="pixelarticons:check" className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder={`${oIndex + 1}. şık`}
                                                value={option.text}
                                                onChange={(e) => updateOption(question.id, option.id, 'text', e.target.value)}
                                                className="flex-1 px-4 py-2 bg-dark-800 border border-neutral-600 text-white font-nunito
                                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                            />
                                            {question.options.length > MIN_OPTIONS && (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        removeOption(question.id, option.id)
                                                    }}
                                                    className="text-neutral-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Icon icon="pixelarticons:close" className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Şık Ekleme Butonu */}
                                {question.options.length < MAX_OPTIONS && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addOption(question.id)
                                        }}
                                        className="mt-3 text-sm text-neutral-400 hover:text-orange-primary transition-colors flex items-center gap-1"
                                    >
                                        <Icon icon="pixelarticons:plus" className="w-4 h-4" />
                                        Şık Ekle
                                    </button>
                                )}

                                {/* Soru Puanı */}
                                <div className="mt-4">
                                    <label className="block font-nunito text-white text-sm mb-2">
                                        Soru Puanı
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={question.points}
                                        onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                                        className="w-32 px-4 py-2 bg-dark-800 border border-neutral-600 text-white font-nunito
                                        placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                        ))}

                        {questions.length === 0 && (
                            <div className="text-center py-8 text-neutral-400">
                                <Icon icon="pixelarticons:file-plus" className="w-12 h-12 mx-auto mb-2" />
                                <p>Henüz soru eklenmemiş. Yeni soru eklemek için yukarıdaki butonu kullanın.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Button
                        variant='outline'
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            // İptal işlemi
                        }}
                    >
                        İptal
                    </Button>
                    <Button type="submit">
                        Sınavı Yayınla
                    </Button>
                </div>
            </form>
        </>
    )
}

(AddExam as any).Layout = 'panel'

export default AddExam
