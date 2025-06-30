import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

interface SectionContent {
    id: string
    content: string
}

interface Lesson {
    id: string
    title: string
    description: string
    category: string
    difficulty: string
    sections: Section[]
    status: 'published' | 'draft'
    createdAt: string
    updatedAt: string
}

interface Section {
    id: string
    title: string
    description: string
    xpPoints: number
}

// Mock data
const mockLessons: Lesson[] = [
    {
        id: '1',
        title: 'Matematik 101: Temel Kavramlar',
        description: 'Temel matematik kavramlarının anlatıldığı giriş dersi.',
        category: 'Matematik',
        difficulty: 'Başlangıç',
        status: 'published',
        createdAt: '2025-06-30',
        updatedAt: '2025-06-30',
        sections: [
            {
                id: '1',
                title: 'Sayılar ve Sayı Sistemleri',
                description: 'Doğal sayılar, tam sayılar ve rasyonel sayılar.',
                xpPoints: 1000
            },
            {
                id: '2',
                title: 'Temel İşlemler',
                description: 'Toplama, çıkarma, çarpma ve bölme işlemleri.',
                xpPoints: 800
            },
            {
                id: '3',
                title: 'Üslü Sayılar',
                description: 'Üslü sayıların özellikleri ve işlemleri.',
                xpPoints: 1200
            }
        ]
    }
]

const LessonContents: NextPage = () => {
    const [lessons] = useState<Lesson[]>(mockLessons)
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [sectionContents, setSectionContents] = useState<SectionContent[]>([])
    const [isPreview, setIsPreview] = useState(false)

    const handleSectionClick = (sectionId: string) => {
        const existingContent = sectionContents.find(sc => sc.id === sectionId)
        setEditContent(existingContent?.content || '')
        setSelectedSection(sectionId)
        setIsModalOpen(true)
    }

    const handleSaveContent = () => {
        if (!selectedSection) return

        setSectionContents(prev => {
            const existing = prev.find(sc => sc.id === selectedSection)
            if (existing) {
                return prev.map(sc =>
                    sc.id === selectedSection ? { ...sc, content: editContent } : sc
                )
            }
            return [...prev, { id: selectedSection, content: editContent }]
        })

        setIsModalOpen(false)
        setSelectedSection(null)
        setEditContent('')
    }

    const getSection = (sectionId: string) => {
        return selectedLesson?.sections.find(s => s.id === sectionId)
    }

    const getSectionContent = (sectionId: string) => {
        return sectionContents.find(sc => sc.id === sectionId)?.content || ''
    }

    return (
        <>
            <h1 className="font-pixelify text-4xl mb-8">
                <span className="text-orange-light">Ders</span>
                <span className="text-white"> İçerikleri</span>
            </h1>

            {!selectedLesson ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className="bg-dark-800 border border-neutral-600 p-6 rounded-lg hover:border-orange-primary/50 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-dark border border-neutral-600 text-sm rounded">
                                <span className="text-neutral-400">ID: </span>
                                <span className="text-orange-light">#{lesson.id}</span>
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded ${
                                    lesson.status === 'published'
                                        ? 'bg-green-500/20 text-green-500'
                                        : 'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                    {lesson.status === 'published' ? 'Yayında' : 'Taslak'}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-xl text-white font-pixelify mb-2 group-hover:text-orange-light transition-colors">
                            {lesson.title}
                        </h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            {lesson.description}
                        </p>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-dark border border-neutral-600 text-sm">
                                <span className="text-neutral-400">Kategori: </span>
                                <span className="text-orange-light">{lesson.category}</span>
                            </span>
                            <span className="px-3 py-1 bg-dark border border-neutral-600 text-sm">
                                <span className="text-neutral-400">Zorluk: </span>
                                <span className="text-orange-light">{lesson.difficulty}</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-neutral-400">
                            <span>
                                Oluşturulma: {new Date(lesson.createdAt).toLocaleDateString('tr-TR')}
                            </span>
                            <Icon
                                icon="pixelarticons:arrow-right"
                                className="w-5 h-5 text-neutral-400 group-hover:text-orange-light transition-colors"
                            />
                        </div>
                            </div>
                ))}
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <button
                                onClick={() => setSelectedLesson(null)}
                                className="flex items-center gap-2 text-neutral-400 hover:text-white mb-4"
                            >
                                <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
                                <span>Geri Dön</span>
                            </button>
                            <h2 className="text-3xl font-pixelify">
                                <span className="text-orange-light">{selectedLesson.title}</span>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedLesson.sections.map((section) => (
                            <div
                                key={section.id}
                                className="bg-dark-800 border border-neutral-600 p-6 rounded-lg hover:border-orange-primary/50 transition-colors cursor-pointer"
                                onClick={() => !isPreview && handleSectionClick(section.id)}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-pixelify text-orange-light">
                                        {section.xpPoints} XP
                                    </span>
                                    {getSectionContent(section.id) ? (
                                        <span className="text-green-500 flex items-center gap-2">
                                            <Icon icon="pixelarticons:check" />
                                            <span className="text-sm">İçerik Girildi</span>
                                        </span>
                                    ) : (
                                        <span className="text-yellow-500 flex items-center gap-2">
                                            <Icon icon="pixelarticons:file-plus" />
                                            <span className="text-sm">İçerik Bekleniyor</span>
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl text-white font-pixelify mb-2">{section.title}</h3>
                                <p className="text-neutral-400 text-sm mb-4">{section.description}</p>

                                {isPreview && getSectionContent(section.id) && (
                                    <div className="mt-4 border-t border-neutral-600 pt-4">
                                        <div className="md-content">
                                            <ReactMarkdown>{getSectionContent(section.id)}</ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Content Editor Modal */}
            {isModalOpen && selectedSection && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-dark-800 border border-neutral-600 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="p-6 border-b border-neutral-600">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-pixelify text-white">
                                    {getSection(selectedSection)?.title} - İçerik Düzenleme
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    <Icon icon="pixelarticons:close" className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm text-neutral-400">
                                        Markdown Formatında İçerik
                                    </label>
                                    <a
                                        href="https://www.markdownguide.org/basic-syntax/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-light text-sm hover:text-orange-primary"
                                    >
                                        Markdown Rehberi
                                    </a>
                                </div>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={15}
                                    className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                                    placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none
                                    resize-none rounded-lg"
                                    placeholder="# Başlık
## Alt Başlık

Normal paragraf metni.

**Kalın metin** ve *italik metin*.

- Liste öğesi 1
- Liste öğesi 2

1. Numaralı liste
2. İkinci öğe

> Alıntı metni

`kod örneği`

[Link](https://example.com)

![Resim açıklaması](resim-url)"
                                />
                            </div>

                            <div className="border-t border-neutral-600 pt-4 mb-4">
                                <h4 className="text-white font-pixelify mb-2">Önizleme</h4>
                                <div className="bg-dark border border-neutral-600 rounded-lg p-4">
                                    <div className="md-content">
                                        <ReactMarkdown>{editContent}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    İptal
                                </Button>
                                <Button
                                    onClick={handleSaveContent}
                                    icon="pixelarticons:check"
                                >
                                    İçeriği Kaydet
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

(LessonContents as any).Layout = 'panel'

export default LessonContents
