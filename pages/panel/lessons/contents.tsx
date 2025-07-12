import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import type { Options } from 'easymde'
import toast from 'react-hot-toast'

const SimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), { ssr: false })

interface Lesson {
    _id?: string
    id?: string
    title: string
    description: string
    category: string
    difficulty?: string
    difficultyLevel?: string
    sections: Section[]
    status: 'published' | 'draft' | 'DRAFT' | 'PUBLISHED'
    createdAt: string
    updatedAt: string
}

interface Section {
    sectionId: string
    title: string
    description: string
    xpPoints: number
    content?: string
    order?: number
}

const LessonContents: NextPage = () => {
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [isPreview, setIsPreview] = useState(false)
    const [loading, setLoading] = useState(false)

    // Tüm dersleri getir
    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true)
            try {
                const userStr = localStorage.getItem('user')
                if (!userStr) return
                const user = JSON.parse(userStr)
                const userId = user._id
                const res = await fetch(`http://localhost:3000/api/lessons/teacher/${userId}`)
                const data = await res.json()
                if (data.lessons) {
                    setLessons(data.lessons)
                }
            } catch (err) {
                setLessons([])
                toast.error('Dersler alınamadı. Lütfen tekrar deneyin.')
                console.error('Dersler alınamadı:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchLessons()
    }, [])

    // Seçili dersi getir
    useEffect(() => {
        const fetchLesson = async () => {
            if (!selectedLesson) return
            setLoading(true)
            try {
                const lessonId = selectedLesson._id || selectedLesson.id
                const res = await fetch(`http://localhost:3000/api/lessons/${lessonId}`)
                const data = await res.json()
                if (data.lesson) {
                    setSelectedLesson(data.lesson)
                }
            } catch (err) {
                toast.error('Ders bilgileri alınamadı. Lütfen tekrar deneyin.')
                console.error('Ders bilgileri alınamadı:', err)
            } finally {
                setLoading(false)
            }
        }
        if (selectedLesson) fetchLesson()
    }, [])

    // Section'a tıklayınca modal aç
    const handleSectionClick = (sectionId: string) => {
        const section = selectedLesson?.sections.find(s => s.sectionId === sectionId)
        setEditContent(section?.content || '')
        setSelectedSection(sectionId)
        setIsModalOpen(true)
    }

    // İçeriği kaydet
    const handleSaveContent = async () => {
        if (!selectedSection || !selectedLesson) return
        const userStr = localStorage.getItem('user')
        const userId = userStr ? JSON.parse(userStr)._id : undefined
        if (!userId) {
            toast.error('Kullanıcı bilgisi bulunamadı.')
            return
        }

        const updatedSections = selectedLesson.sections.map(section =>
            section.sectionId === selectedSection
                ? { ...section, content: editContent }
                : section
        )
        const {
            title,
            category,
            difficulty,
            difficultyLevel,
            tags,
            image,
            description,
            status
        } = selectedLesson as any

        // Fallbacks for difficultyLevel, tags, image
        const lessonDifficulty = difficultyLevel || difficulty || ''
        const lessonTags = Array.isArray(tags) ? tags : []
        const lessonImage = image || ''

        // Prepare sections with only required fields
        const apiSections = updatedSections.map(s => ({
            title: s.title,
            content: s.content || '',
            description: s.description,
            order: s.order ?? 0,
            xpPoints: s.xpPoints
        }))

        const updatedLesson = {
            title,
            category,
            difficultyLevel: lessonDifficulty,
            tags: lessonTags,
            image: lessonImage,
            description,
            status: (status || '').toUpperCase(),
            sections: apiSections
        }

        const accessToken = localStorage.getItem('accessToken')
        try {
            setLoading(true)
            const lessonId = selectedLesson._id || selectedLesson.id
            const res = await fetch(`http://localhost:3000/api/lessons/${lessonId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updatedLesson)
                }
            )
            if (res.ok) {
                const data = await res.json()
                if (data.lesson) {
                    setSelectedLesson(data.lesson)
                } else {
                    setSelectedLesson({ ...selectedLesson, sections: updatedSections })
                }
                toast.success('İçerik başarıyla kaydedildi.')
            } else {
                const errData = await res.json()
                toast.error('İçerik kaydedilemedi: ' + (errData.message || 'Bilinmeyen hata'))
            }
        } catch (err) {
            toast.error('İçerik kaydedilemedi. Lütfen tekrar deneyin.')
            console.error('İçerik kaydetme hatası:', err)
        } finally {
            setIsModalOpen(false)
            setSelectedSection(null)
            setEditContent('')
            setLoading(false)
        }
    }

    const getSection = (sectionId: string) => {
        return selectedLesson?.sections.find(s => s.sectionId === sectionId)
    }

    const getSectionContent = (sectionId: string) => {
        return selectedLesson?.sections.find(s => s.sectionId === sectionId)?.content || ''
    }

    const editorOptions: Options = {
        spellChecker: false,
        autofocus: true,
        status: ['lines', 'words'],
        toolbar: ['bold', 'italic', 'strikethrough', '|',
            'heading-1', 'heading-2', 'heading-3', '|',
            'unordered-list', 'ordered-list', '|',
            'link', 'image', 'table', 'code', 'quote', '|',
            'preview', 'side-by-side', 'fullscreen', '|',
            'guide'] as Options['toolbar'],
        placeholder: `# Ders İçeriği\n\n## Giriş\nDersin giriş bölümünü buraya yazın...\n\n## Ana Konu\nAna içeriği buraya yazın...\n\n## Örnekler\n- Örnek 1\n- Örnek 2\n\n## Alıştırmalar\n1. İlk alıştırma\n2. İkinci alıştırma\n\n## Özet\nDersin özetini buraya yazın...`,
        minHeight: '300px',
        maxHeight: '500px',
        renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true,
        },
        previewRender: (plainText: string) => {
            return plainText
        },
        indentWithTabs: false,
        tabSize: 4,
        lineWrapping: true,
        inputStyle: 'contenteditable',
        autosave: {
            enabled: true,
            delay: 1000,
            uniqueId: `section-${selectedSection}`,
        }
    }

    return (
        <>
            <h1 className="font-pixelify text-4xl mb-8">
                <span className="text-orange-light">Ders</span>
                <span className="text-white"> İçerikleri</span>
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Icon icon="eos-icons:loading" className="w-8 h-8 animate-spin text-orange-light mx-auto mb-4" />
                    <p className="text-neutral-400">Yükleniyor...</p>
                </div>
            ) : (
                !selectedLesson ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson._id || lesson.id}
                                onClick={() => setSelectedLesson(lesson)}
                                className="bg-dark-800 border border-neutral-600 p-6 rounded-lg hover:border-orange-primary/50 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-dark border border-neutral-600 text-sm rounded">
                                        <span className="text-neutral-400">ID: </span>
                                        <span className="text-orange-light">#{lesson._id || lesson.id}</span>
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 text-xs rounded ${lesson.status?.toString().toLowerCase().includes('publish')
                                            ? 'bg-green-500/20 text-green-500'
                                            : 'bg-yellow-500/20 text-yellow-500'
                                            }`}>
                                            {lesson.status?.toString().toLowerCase().includes('publish') ? 'Yayında' : 'Taslak'}
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
                                        <span className="text-orange-light">{lesson.difficulty || lesson.difficultyLevel}</span>
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
                                    key={section.sectionId}
                                    className="bg-dark-800 border border-neutral-600 p-6 rounded-lg hover:border-orange-primary/50 transition-colors cursor-pointer"
                                    onClick={() => handleSectionClick(section.sectionId)}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-pixelify text-orange-light">
                                            {section.xpPoints} XP
                                        </span>
                                        {getSectionContent(section.sectionId) ? (
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
                                    {isPreview && getSectionContent(section.sectionId) && (
                                        <div className="mt-4 border-t border-neutral-600 pt-4">
                                            <div className="md-content">
                                                <ReactMarkdown>{getSectionContent(section.sectionId)}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )
            )}
            {/* Content Editor Modal */}
            {isModalOpen && selectedSection && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-dark-800 border border-neutral-600 bg-gray rounded-lg w-full max-w-4xl max-h-[90vh] overflow-scroll">
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
                                {isPreview ? (
                                    <div className="bg-dark border border-neutral-600 rounded-lg p-4 text-neutral-400 mb-2">
                                        <div className="mb-2">Düzenleme için <b>Düzenle</b> moduna geçin.</div>
                                        <ReactMarkdown>{editContent}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <SimpleMdeEditor
                                        value={editContent}
                                        onChange={setEditContent}
                                        options={editorOptions}
                                        className="markdown-editor"
                                    />
                                )}
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
