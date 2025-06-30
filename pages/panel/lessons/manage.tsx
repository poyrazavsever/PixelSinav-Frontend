import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'

interface Lesson {
    id: number
    title: string
    category: string
    difficulty: string
    status: 'published' | 'draft'
    students: number
    completionRate: number
    lastUpdated: string
}

const ManageLessons: NextPage = () => {
    // Mock data for lessons
    const lessons: Lesson[] = [
        {
            id: 1,
            title: 'Matematik 101: Temel Kavramlar',
            category: 'Matematik',
            difficulty: 'Başlangıç',
            status: 'published',
            students: 156,
            completionRate: 75,
            lastUpdated: '2 gün önce'
        },
        {
            id: 2,
            title: 'Fizik: Hareket ve Kuvvet',
            category: 'Fizik',
            difficulty: 'Orta',
            status: 'published',
            students: 89,
            completionRate: 60,
            lastUpdated: '1 hafta önce'
        },
        {
            id: 3,
            title: 'Kimya: Periyodik Tablo',
            category: 'Kimya',
            difficulty: 'İleri',
            status: 'draft',
            students: 0,
            completionRate: 0,
            lastUpdated: '3 saat önce'
        }
    ]

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

            {/* Filters */}
            <div className="bg-dark-800 border border-gray p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Ders Ara"
                        className="px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    />
                    <select
                        className="px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
            focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    >
                        <option value="">Tüm Kategoriler</option>
                        <option value="matematik">Matematik</option>
                        <option value="fizik">Fizik</option>
                        <option value="kimya">Kimya</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
            focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    >
                        <option value="">Tüm Seviyeler</option>
                        <option value="beginner">Başlangıç</option>
                        <option value="intermediate">Orta</option>
                        <option value="advanced">İleri</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
            focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    >
                        <option value="">Tüm Durumlar</option>
                        <option value="published">Yayında</option>
                        <option value="draft">Taslak</option>
                    </select>
                </div>
            </div>

            {/* Lessons Table */}
            <div className="bg-dark-800 border border-gray">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark">
                            <tr className="border-b border-gray">
                                <th className="text-left p-4 font-nunito text-white">Ders</th>
                                <th className="text-left p-4 font-nunito text-white">Kategori</th>
                                <th className="text-left p-4 font-nunito text-white">Seviye</th>
                                <th className="text-left p-4 font-nunito text-white">Durum</th>
                                <th className="text-left p-4 font-nunito text-white">Öğrenci</th>
                                <th className="text-left p-4 font-nunito text-white">Tamamlama</th>
                                <th className="text-left p-4 font-nunito text-white">Son Güncelleme</th>
                                <th className="text-right p-4 font-nunito text-white">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson) => (
                                <tr key={lesson.id} className="border-b border-gray hover:bg-dark/50">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-nunito text-white">{lesson.title}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{lesson.category}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{lesson.difficulty}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-sm font-nunito
                      ${lesson.status === 'published'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                            }`}
                                        >
                                            {lesson.status === 'published' ? 'Yayında' : 'Taslak'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{lesson.students}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-dark rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-orange-primary"
                                                    style={{ width: `${lesson.completionRate}%` }}
                                                />
                                            </div>
                                            <span className="font-nunito text-neutral-400 text-sm">
                                                {lesson.completionRate}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{lesson.lastUpdated}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                                                <Icon icon="pixelarticons:edit" className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                                                <Icon icon="pixelarticons:trash" className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

(ManageLessons as any).Layout = 'panel'

export default ManageLessons
