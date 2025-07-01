import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'

interface Category {
    id: number
    name: string
    slug: string
    description: string
    totalLessons: number
    totalExams: number
    createdAt: string
    updatedAt: string
    color: string
}

const ManageCategories: NextPage = () => {
    // Mock data for categories
    const categories: Category[] = [
        {
            id: 1,
            name: 'Matematik',
            slug: 'matematik',
            description: 'Temel matematik, cebir, geometri ve analiz konuları',
            totalLessons: 25,
            totalExams: 12,
            createdAt: '2025-06-30',
            updatedAt: '2025-06-30',
            color: '#FF6B6B'
        },
        {
            id: 2,
            name: 'Fizik',
            slug: 'fizik',
            description: 'Mekanik, elektrik, manyetizma ve modern fizik konuları',
            totalLessons: 18,
            totalExams: 8,
            createdAt: '2025-06-30',
            updatedAt: '2025-06-30',
            color: '#4ECDC4'
        },
        {
            id: 3,
            name: 'Kimya',
            slug: 'kimya',
            description: 'Organik, anorganik kimya ve element özellikleri',
            totalLessons: 15,
            totalExams: 6,
            createdAt: '2025-06-30',
            updatedAt: '2025-06-30',
            color: '#45B7D1'
        }
    ]

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-pixelify text-4xl">
                    <span className="text-orange-light">Kategorileri</span>
                    <span className="text-white"> Yönet</span>
                </h1>

                <button
                    onClick={() => window.location.href = '/panel/categories/add'}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-primary text-white font-nunito hover:bg-orange-primary/90 transition-colors"
                >
                    <Icon icon="pixelarticons:plus" className="w-5 h-5" />
                    Yeni Kategori
                </button>
            </div>

            {/* Search */}
            <div className="bg-dark-800 border border-gray p-4 mb-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Kategori Ara"
                        className="flex-1 px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
                        placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    />
                    <select
                        className="w-48 px-4 py-2 bg-dark bg-gray border border-gray text-white font-nunito
                        focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    >
                        <option value="">Sıralama</option>
                        <option value="name-asc">İsim (A-Z)</option>
                        <option value="name-desc">İsim (Z-A)</option>
                        <option value="lessons">Ders Sayısı</option>
                        <option value="exams">Sınav Sayısı</option>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                    </select>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-dark-800 border border-neutral-600 p-6 rounded-lg hover:border-orange-primary/50 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                                <h3 className="text-xl text-white font-pixelify group-hover:text-orange-light transition-colors">
                                    {category.name}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                                    <Icon icon="pixelarticons:edit" className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                                    <Icon icon="pixelarticons:trash" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <p className="text-neutral-400 text-sm mb-6">
                            {category.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm">
                            <div className="px-3 py-1 bg-dark border border-neutral-600">
                                <Icon icon="pixelarticons:book-open" className="w-4 h-4 text-orange-light inline-block mr-2" />
                                <span className="text-white">{category.totalLessons} Ders</span>
                            </div>
                            <div className="px-3 py-1 bg-dark border border-neutral-600">
                                <Icon icon="pixelarticons:file-text" className="w-4 h-4 text-orange-light inline-block mr-2" />
                                <span className="text-white">{category.totalExams} Sınav</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-neutral-600 text-sm text-neutral-400">
                            <p>Oluşturulma: {new Date(category.createdAt).toLocaleDateString('tr-TR')}</p>
                            <p>Son Güncelleme: {new Date(category.updatedAt).toLocaleDateString('tr-TR')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

(ManageCategories as any).Layout = 'panel'

export default ManageCategories
