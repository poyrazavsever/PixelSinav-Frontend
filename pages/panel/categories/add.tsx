import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'

interface CategoryFormData {
    name: string
    description: string
    color: string
    icon: string
    slug: string
    status: 'active' | 'inactive'
    displayOrder: number
    metaTitle: string
    metaDescription: string
}

const predefinedColors = [
    '#FF6B6B', // Kırmızı
    '#4ECDC4', // Turkuaz
    '#45B7D1', // Mavi
    '#96CEB4', // Yeşil
    '#FFEEAD', // Sarı
    '#D4A5A5', // Pembe
    '#9B59B6', // Mor
    '#E67E22', // Turuncu
    '#1ABC9C', // Zümrüt
    '#34495E'  // Lacivert
]

const predefinedIcons = [
    { icon: 'pixelarticons:calculator', name: 'Hesap Makinesi' },
    { icon: 'pixelarticons:book-open', name: 'Kitap' },
    { icon: 'pixelarticons:clock', name: 'Saat' },
    { icon: 'pixelarticons:edit', name: 'Kalem' },
    { icon: 'pixelarticons:code', name: 'Kod' },
    { icon: 'pixelarticons:device-tv-smart', name: 'TV' },
    { icon: 'pixelarticons:music', name: 'Müzik' },
    { icon: 'pixelarticons:gamepad', name: 'Oyun' },
    { icon: 'pixelarticons:coffee', name: 'Kahve' },
    { icon: 'pixelarticons:camera', name: 'Kamera' }
]

const AddCategory: NextPage = () => {
    const [selectedColor, setSelectedColor] = React.useState(predefinedColors[0])
    const [selectedIcon, setSelectedIcon] = React.useState(predefinedIcons[0].icon)
    const [slug, setSlug] = React.useState('')

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setSlug(generateSlug(name))
    }

    return (
        <>
            <h1 className="font-pixelify text-4xl mb-8">
                <span className="text-orange-light">Yeni</span>
                <span className="text-white"> Kategori</span>
            </h1>

            <form>
                {/* Temel Bilgiler */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <h2 className="text-xl text-white font-pixelify mb-4">Temel Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kategori Adı */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Kategori Adı
                            </label>
                            <input
                                type="text"
                                placeholder="Matematik"
                                onChange={handleNameChange}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>

                        {/* URL */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                URL (Otomatik Oluşturulur)
                            </label>
                            <input
                                type="text"
                                value={slug}
                                readOnly
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-neutral-400 font-nunito"
                            />
                        </div>

                        {/* Sıralama */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Görüntülenme Sırası
                            </label>
                            <input
                                type="number"
                                min="1"
                                placeholder="1"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>

                        {/* Durum */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Durum
                            </label>
                            <select className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none">
                                <option value="active">Aktif</option>
                                <option value="inactive">Pasif</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Görsel Özelleştirme */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <h2 className="text-xl text-white font-pixelify mb-4">Görsel Özelleştirme</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Renk Seçimi */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Kategori Rengi
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {predefinedColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-lg transition-all ${selectedColor === color
                                                ? 'ring-2 ring-orange-primary ring-offset-2 ring-offset-dark scale-110'
                                                : 'hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* İkon Seçimi */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Kategori İkonu
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {predefinedIcons.map(({ icon, name }) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setSelectedIcon(icon)}
                                        title={name}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all
                                            ${selectedIcon === icon
                                                ? 'bg-orange-primary text-white'
                                                : 'text-neutral-400 hover:text-white hover:bg-dark'
                                            }`}
                                    >
                                        <Icon icon={icon} className="w-6 h-6" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Açıklama */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <h2 className="text-xl text-white font-pixelify mb-4">Açıklama</h2>
                    <textarea
                        rows={4}
                        placeholder="Kategori hakkında açıklama yazın..."
                        className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                        placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                    />
                </div>

                {/* SEO Ayarları */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-8">
                    <h2 className="text-xl text-white font-pixelify mb-4">SEO Ayarları</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Meta Başlık
                            </label>
                            <input
                                type="text"
                                placeholder="Meta başlığı yazın..."
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Meta Açıklama
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Meta açıklaması yazın..."
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        type="button"
                    >
                        İptal
                    </Button>
                    <Button>
                        Kategoriyi Kaydet
                    </Button>
                </div>
            </form>
        </>
    )
}

(AddCategory as any).Layout = 'panel'

export default AddCategory
