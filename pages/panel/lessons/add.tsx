import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'

interface LessonFormData {
    title: string
    category: string
    description: string
    difficulty: string
    image: File | null
    content: string
}

const AddLesson: NextPage = () => {
    const [dragActive, setDragActive] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type.startsWith('image/')) {
                setSelectedImage(URL.createObjectURL(file))
            }
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <>
            <h1 className="font-pixelify text-4xl mb-8">
                <span className="text-orange-light">Yeni</span>
                <span className="text-white"> Ders Ekle</span>
            </h1>

            <form>
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Ders Adı */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Ders Adı
                            </label>
                            <input
                                type="text"
                                placeholder="Matematik 101: Temel Kavramlar"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Kategori
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            >
                                <option value="">Kategori Seçin</option>
                                <option value="matematik">Matematik</option>
                                <option value="fizik">Fizik</option>
                                <option value="kimya">Kimya</option>
                            </select>
                        </div>

                        {/* Zorluk Seviyesi */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Zorluk Seviyesi
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            >
                                <option value="">Zorluk Seçin</option>
                                <option value="beginner">Başlangıç</option>
                                <option value="intermediate">Orta</option>
                                <option value="advanced">İleri</option>
                            </select>
                        </div>

                        {/* Etiketler */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Etiketler
                            </label>
                            <input
                                type="text"
                                placeholder="Etiketleri virgülle ayırın"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Görsel Yükleme Alanı */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <label className="block font-nunito text-white mb-4">
                        Ders Görseli
                    </label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 bg-gray text-center cursor-pointer transition-colors
            ${dragActive ? '' : 'border-neutral-600 hover:border-orange-primary/50 hover:bg-orange-primary/5'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {selectedImage ? (
                            <div className="relative">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="max-h-48 mx-auto"
                                />
                                <button
                                    type="button"
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-2 right-2 p-2 bg-dark/80 text-white rounded-full hover:bg-orange-primary"
                                >
                                    <Icon icon="pixelarticons:close" className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Icon icon="pixelarticons:image" className="w-12 h-12 mx-auto text-orange-light" />
                                <div>
                                    <p className="font-nunito text-white">
                                        Görseli sürükleyin veya
                                        <label className="text-orange-primary ml-1 cursor-pointer">
                                            seçin
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </p>
                                    <p className="text-neutral-300 text-sm mt-2">PNG, JPG veya GIF (max. 2MB)</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ders Açıklaması */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <label className="block font-nunito text-white mb-2">
                        Ders Açıklaması
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Ders hakkında kısa bir açıklama yazın..."
                        className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    />
                </div>

                {/* İçerik */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-8">
                    <label className="block font-nunito text-white mb-2">
                        Ders İçeriği
                    </label>
                    <textarea
                        rows={8}
                        placeholder="Dersin detaylı içeriğini yazın..."
                        className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-3 border border-neutral-600 bg-gray text-white font-nunito hover:bg-gray/10 transition-colors"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-orange-primary text-white font-nunito hover:bg-orange-primary/90 transition-colors"
                    >
                        Dersi Yayınla
                    </button>
                </div>
            </form>
        </>
    )
}

(AddLesson as any).Layout = 'panel'

export default AddLesson
