import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Section {
    sectionId: string
    title: string
    content: string
    description: string
    order: number
    xpPoints: number
}

interface Lesson {
    _id: string
    title: string
    category: string
    difficultyLevel: string
    status: 'PUBLISHED' | 'DRAFT'
    enrollmentCount: number
    updatedAt: string
    sections: Section[]
}

const ManageLessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
        if (user) {
            const parsed = JSON.parse(user)
            setUserId(parsed._id)
        }
    }, [])

    useEffect(() => {
        if (!userId) return

        const fetchLessons = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/lessons/teacher/${userId}`)
                setLessons(data.lessons)
            } catch (error) {
                console.error('Dersler alınamadı:', error)
            }
        }

        fetchLessons()
    }, [userId])

    const deleteLesson = async (id: string) => {
        if (!confirm('Bu dersi silmek istediğinize emin misiniz?')) return

        try {
            const accessToken = typeof window !== 'undefined'
                ? localStorage.getItem('accessToken')
                : null

            if (!accessToken) {
                alert('Giriş yapmanız gerekiyor.')
                return
            }

            await axios.delete(`http://localhost:3000/api/lessons/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            toast.success('Ders başarıyla silindi.')

            setLessons(prev => prev.filter(lesson => lesson._id !== id))
        } catch (error) {
            console.error('Silme işlemi başarısız:', error)
            toast.error('Ders silme işlemi başarısız.')
        }
    }


    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-pixelify text-4xl">
                    <span className="text-orange-light">Dersleri</span>
                    <span className="text-white"> Yönet</span>
                </h1>

                <button
                    onClick={() => window.location.href = '/panel/lessons/add'}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-primary text-white font-nunito hover:bg-orange-primary/90 transition-colors"
                >
                    <Icon icon="pixelarticons:plus" className="w-5 h-5" />
                    Yeni Ders
                </button>
            </div>

            <div className="bg-dark-800 border border-gray">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark">
                            <tr className="border-b border-gray">
                                <th className="text-left p-4 text-white font-nunito">Ders</th>
                                <th className="text-left p-4 text-white font-nunito">Kategori</th>
                                <th className="text-left p-4 text-white font-nunito">Seviye</th>
                                <th className="text-left p-4 text-white font-nunito">Durum</th>
                                <th className="text-left p-4 text-white font-nunito">Öğrenci</th>
                                <th className="text-left p-4 text-white font-nunito">Toplam XP</th>
                                <th className="text-left p-4 text-white font-nunito">Son Güncelleme</th>
                                <th className="text-right p-4 text-white font-nunito">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson) => (
                                <tr key={lesson._id} className="border-b border-gray hover:bg-dark/50">
                                    <td className="p-4 text-white font-nunito">{lesson.title}</td>
                                    <td className="p-4 text-neutral-400 font-nunito">{lesson.category}</td>
                                    <td className="p-4 text-neutral-400 font-nunito">{lesson.difficultyLevel}</td>
                                    <td className="p-4 font-nunito">
                                        <span className={`px-2 py-1 text-sm 
                      ${lesson.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {lesson.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-neutral-400 font-nunito">{lesson.enrollmentCount}</td>
                                    <td className="p-4 text-neutral-400 font-nunito">
                                        {lesson.sections.reduce((acc, sec) => acc + sec.xpPoints, 0)} XP
                                    </td>
                                    <td className="p-4 text-neutral-400 font-nunito">
                                        {new Date(lesson.updatedAt).toLocaleDateString('tr-TR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            {/* <button> düzenleme kaldırıldı */}
                                            <button
                                                onClick={() => deleteLesson(lesson._id)}
                                                className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                                            >
                                                <Icon icon="pixelarticons:trash" className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {lessons.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-neutral-400 font-nunito">
                                        Henüz bir ders oluşturulmamış.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

(ManageLessons as any).Layout = 'panel'

export default ManageLessons
