import React, { useState } from 'react'
import LessonCard from '@/components/ui/lesson-card'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { FilterButton } from '@/components/ui/filter-button'

const Learn = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isEvalOpen, setIsEvalOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('')
    const [selectedEval, setSelectedEval] = useState('')

    // Mock data for lessons
    const mathLessons = [
        {
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
            category: "Matematik",
            title: "Matematik 1. Dereceden Denklemler",
            slug: "matematik-1-dereceden-denklemler",
            badges: ["MAT 101 Başlangıç", "Denklemler"]
        },
        {
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
            category: "Matematik",
            title: "Matematik 2. Dereceden Denklemler",
            slug: "matematik-2-dereceden-denklemler",
            badges: ["MAT 102 Orta", "Denklemler"]
        },
        {
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
            category: "Matematik",
            title: "Fonksiyonlar ve Grafikler",
            slug: "fonksiyonlar-ve-grafikler",
            badges: ["MAT 103 İleri", "Fonksiyonlar"]
        }
    ];

    const physicsLessons = [
        {
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
            category: "Fizik",
            title: "Temel Fizik Kavramları",
            slug: "temel-fizik-kavramlari",
            badges: ["FİZ 101 Başlangıç", "Mekanik"]
        },
        {
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
            category: "Fizik",
            title: "Hareket ve Kuvvet",
            slug: "hareket-ve-kuvvet",
            badges: ["FİZ 102 Orta", "Dinamik"]
        },
        {
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
            category: "Fizik",
            title: "Enerji ve Momentum",
            slug: "enerji-ve-momentum",
            badges: ["FİZ 103 İleri", "Enerji"]
        }
    ];

    return (
        <>
            <Head>
                <title>Dersler | PixelSınav</title>
            </Head>
            <div className="max-w-7xl container mx-auto px-4 py-8 min-h-screen bg-dark">
                {/* Search and Filter Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Ders Ara"
                            className="w-full md:w-[300px] px-4 py-3 bg-dark-800 border border-gray text-white font-nunito transition-all duration-300
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                        <Icon
                            icon="pixelarticons:search"
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        {/* Kategori Filtresi */}
                        <FilterButton
                            value={selectedFilter}
                            placeholder="Kategorilere Göre Filtrele"
                            options={['Matematik', 'Fizik'].map(item => ({ label: item, value: item }))}
                            onChange={setSelectedFilter}
                        />

                        {/* Değerlendirme Filtresi */}
                        <FilterButton
                            value={selectedEval}
                            placeholder="Değerlendirme"
                            options={[
                                { label: 'Başlangıç', value: 'beginner' },
                                { label: 'Orta', value: 'intermediate' },
                                { label: 'İleri', value: 'advanced' }
                            ]}
                            onChange={setSelectedEval}
                        />
                    </div>
                </div>

                {/* Mathematics Section */}
                <section className="mb-16">
                    <h2 className="font-pixelify text-4xl mb-8">
                        <span className="text-orange-light">Matematik</span>
                        <span className="text-white"> Dersleri</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mathLessons.map((lesson, index) => (
                            <LessonCard
                                key={index}
                                image={lesson.image}
                                category={lesson.category}
                                title={lesson.title}
                                slug={lesson.slug}
                                badges={lesson.badges}
                            />
                        ))}
                    </div>
                </section>

                {/* Physics Section */}
                <section className="mb-16">
                    <h2 className="font-pixelify text-4xl mb-8">
                        <span className="text-orange-light">Fizik</span>
                        <span className="text-white"> Dersleri</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {physicsLessons.map((lesson, index) => (
                            <LessonCard
                                key={index}
                                image={lesson.image}
                                category={lesson.category}
                                title={lesson.title}
                                slug={lesson.slug}
                                badges={lesson.badges}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Learn