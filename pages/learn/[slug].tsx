import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Button } from '@/components/ui/button'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            ticks: {
                stepSize: 20,
                color: '#9ca3af',
            },
            grid: {
                color: 'rgba(75, 85, 99, 0.3)',
                borderColor: 'rgba(75, 85, 99, 0.3)'
            }
        },
        x: {
            ticks: {
                color: '#9ca3af',
            },
            grid: {
                color: 'rgba(75, 85, 99, 0.3)',
                borderColor: 'rgba(75, 85, 99, 0.3)'
            }
        }
    },
}

const data = {
    labels: ['%4', '%35', '%38'],
    datasets: [
        {
            data: [4, 35, 38],
            backgroundColor: ['#ef4444', '#22c55e', '#3b82f6'],
            borderRadius: 8,
        },
    ],
}

const timeData = {
    labels: ['%4'],
    datasets: [
        {
            data: [4],
            backgroundColor: ['#f97316'],
            borderRadius: 8,
        },
    ],
}

const scoreData = {
    labels: ['%35'],
    datasets: [
        {
            data: [35],
            backgroundColor: ['#22c55e'],
            borderRadius: 8,
        },
    ],
}

const LearnDetail = () => {
    const [openSection, setOpenSection] = useState<number | null>(null)

    const toggleSection = (num: number) => {
        setOpenSection(openSection === num ? null : num)
    }

    return (
        <div className="container mx-auto max-w-7xl py-16 font-nunito">
            <div className="relative">
                {/* Pixel Art Banner */}
                <div className="mb-8 h-72 w-full overflow-hidden rounded-xl">
                    <Image
                        src="/images/login.png"
                        alt="Pixel Forest"
                        width={1200}
                        height={400}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="w-full flex items-center justify-between pt-4 pb-12">
                    <h2 className='font-nunito font-medium text-2xl text-neutral-200'>Matematik 1. Dereceden Denklemler</h2>
                    <Button variant="filled" icon="material-symbols:arrow-right-alt-rounded">
                        Devam Et
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-1">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <div key={num}>
                                <motion.button
                                    className={`flex bg-gray w-full items-center justify-between rounded-t-lg px-4 py-3 text-left ${openSection === num ? 'bg-gray' : ''
                                        }`}
                                    onClick={() => toggleSection(num)}
                                    whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-pixelify text-xl text-green-500">Bölüm {num}</span>
                                        <span className="text-sm text-neutral-300">Denklem Temel Kavramlar</span>
                                    </div>
                                    <motion.svg
                                        className="h-5 w-5 text-neutral-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        animate={{ rotate: openSection === num ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </motion.button>

                                <AnimatePresence>
                                    {openSection === num && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden bg-gray rounded-b-lg w-full"
                                        >
                                            <div className="p-4 w-full">
                                                <p className="text-sm text-gray-300">
                                                    Bölüm hakkında kısa bir yazı gelecek örneğin bunun gibi bir şey olacak.
                                                </p>
                                                <div className="mt-3">
                                                    <span className="text-xs text-neutral-300">2000xp</span>
                                                </div>
                                                <Button className="mt-4">
                                                    Bölümü Tamamladın! →
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg bg-gray p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <Image
                                    src="/images/login.png"
                                    alt="Profile"
                                    width={48}
                                    height={48}
                                    className="rounded-full w-12 h-12"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">@p.avsever</h3>
                                    <p className="text-sm text-neutral-300">Eğitim Tamamlama Yüzden</p>
                                </div>
                            </div>
                            <Bar options={options} data={data} height={100} />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="rounded-lg bg-gray p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white">Eğitim Tamamlama Yüzden</h3>
                                    <span className="rounded-full bg-orange-500/20 px-2 py-1 text-sm font-medium text-orange-light">%4</span>
                                </div>
                                <Bar options={options} data={timeData} height={100} />
                            </div>
                            <div className="rounded-lg bg-gray p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white">Sınav Tamamlama Yüzden</h3>
                                    <span className="rounded-full bg-green-500/20 px-2 py-1 text-sm font-medium text-green-500">%35</span>
                                </div>
                                <Bar options={options} data={scoreData} height={100} />
                            </div>
                        </div>

                        <div className="rounded-lg bg-gray p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">Sertifika Durumu</h3>
                                <span className="text-orange-500 font-pixelify">Tamamlanmadı</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearnDetail