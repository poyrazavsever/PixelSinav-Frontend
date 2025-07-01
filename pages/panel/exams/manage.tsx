import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'

interface Exam {
    id: number
    title: string
    category: string
    duration: number
    totalPoints: number
    questionsCount: number
    status: 'published' | 'draft'
    participants: number
    averageScore: number
    lastUpdated: string
}

const ManageExams: NextPage = () => {
    // Mock data for exams
    const exams: Exam[] = [
        {
            id: 1,
            title: 'Matematik Final Sınavı',
            category: 'Matematik',
            duration: 60,
            totalPoints: 100,
            questionsCount: 10,
            status: 'published',
            participants: 45,
            averageScore: 72.5,
            lastUpdated: '2 gün önce'
        },
        {
            id: 2,
            title: 'Fizik Vize Sınavı',
            category: 'Fizik',
            duration: 45,
            totalPoints: 50,
            questionsCount: 5,
            status: 'published',
            participants: 32,
            averageScore: 68.3,
            lastUpdated: '1 hafta önce'
        },
        {
            id: 3,
            title: 'Kimya Quiz',
            category: 'Kimya',
            duration: 30,
            totalPoints: 20,
            questionsCount: 4,
            status: 'draft',
            participants: 0,
            averageScore: 0,
            lastUpdated: '3 saat önce'
        }
    ]

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-pixelify text-4xl">
                    <span className="text-orange-light">Sınavları</span>
                    <span className="text-white"> Yönet</span>
                </h1>

                <button
                    onClick={() => window.location.href = '/panel/exams/add'}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-primary text-white font-nunito hover:bg-orange-primary/90 transition-colors"
                >
                    <Icon icon="pixelarticons:plus" className="w-5 h-5" />
                    Yeni Sınav
                </button>
            </div>

            {/* Filters */}
            <div className="bg-dark-800 border border-gray p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Sınav Ara"
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
                        <option value="">Tüm Durumlar</option>
                        <option value="published">Yayında</option>
                        <option value="draft">Taslak</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
                        focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    >
                        <option value="">Sıralama</option>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                        <option value="participants">Katılımcı Sayısı</option>
                        <option value="average">Ortalama Puan</option>
                    </select>
                </div>
            </div>

            {/* Exams Table */}
            <div className="bg-dark-800 border border-gray">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark">
                            <tr className="border-b border-gray">
                                <th className="text-left p-4 font-nunito text-white">Sınav</th>
                                <th className="text-left p-4 font-nunito text-white">Kategori</th>
                                <th className="text-left p-4 font-nunito text-white">Süre</th>
                                <th className="text-left p-4 font-nunito text-white">Soru</th>
                                <th className="text-left p-4 font-nunito text-white">Durum</th>
                                <th className="text-left p-4 font-nunito text-white">Katılımcı</th>
                                <th className="text-left p-4 font-nunito text-white">Ortalama</th>
                                <th className="text-left p-4 font-nunito text-white">Son Güncelleme</th>
                                <th className="text-right p-4 font-nunito text-white">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam) => (
                                <tr key={exam.id} className="border-b border-gray hover:bg-dark/50">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-nunito text-white">{exam.title}</p>
                                            <p className="text-sm text-neutral-400">{exam.totalPoints} Puan</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{exam.category}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{exam.duration} dk</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{exam.questionsCount}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-sm font-nunito
                                            ${exam.status === 'published'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                            }`}
                                        >
                                            {exam.status === 'published' ? 'Yayında' : 'Taslak'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{exam.participants}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">
                                            {exam.averageScore > 0 ? `${exam.averageScore}%` : '-'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-nunito text-neutral-400">{exam.lastUpdated}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-neutral-400 hover:text-white transition-colors"
                                                onClick={() => window.location.href = `/panel/exams/contents?id=${exam.id}`}>
                                                <Icon icon="pixelarticons:view" className="w-5 h-5" />
                                            </button>
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

(ManageExams as any).Layout = 'panel'

export default ManageExams
