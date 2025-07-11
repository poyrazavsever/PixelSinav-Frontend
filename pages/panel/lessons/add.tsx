import React from 'react'
import { Icon } from '@iconify/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'

interface LessonSection {
    id?: string // Frontend için gerekli
    title: string         // 3-100 karakter
    content: string       // Markdown içerik (min 10 karakter)
    description: string   // 10-1000 karakter
    order: number        // Minimum 1
    xpPoints: number     // 0-5000 arası
}

interface CreateLessonDto {
    title: string              // 3-100 karakter
    category: string           // Boş olamaz
    difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
    tags: string[]            // En az 1 etiket
    image: string | null       // Resim URL'i
    description: string       // 10-2000 karakter
    sections: LessonSection[] // En az 1 bölüm
    userId?: string          // Backend'de eklenecek
    teacherId?: string       // Backend'de eklenecek
    status?: 'DRAFT' | 'PUBLISHED'
}

const MAX_TOTAL_XP = 5000;

const AddLesson: NextPage = () => {
    const router = useRouter()
    const [dragActive, setDragActive] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
    const [sections, setSections] = React.useState<LessonSection[]>([])
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        title: '',
        category: '',
        difficultyLevel: 'BEGINNER' as const,
        tags: '',
        description: '',
    })

    const totalXP = sections.reduce((sum, section) => sum + section.xpPoints, 0)
    const remainingXP = MAX_TOTAL_XP - totalXP

    const addSection = () => {
        const newSection: LessonSection = {
            id: Date.now().toString(),
            title: '',
            content: '',
            description: '',
            order: sections.length + 1,
            xpPoints: Math.min(1000, remainingXP)
        }
        setSections([...sections, newSection])
    }

    const removeSection = (id: string) => {
        const updatedSections = sections.filter(section => section.id !== id)
            .map((section, index) => ({
                ...section,
                order: index + 1
            }));
        setSections(updatedSections)
    }

    const updateSection = (id: string, field: keyof Omit<LessonSection, 'id' | 'order'>, value: string | number) => {
        if (field === 'xpPoints') {
            const numValue = typeof value === 'string' ? parseInt(value) : value;
            const otherSectionsXP = sections.reduce((sum, section) =>
                section.id !== id ? sum + section.xpPoints : sum, 0);

            if (otherSectionsXP + numValue > MAX_TOTAL_XP) {
                return; // XP limitini aşıyorsa güncelleme yapma
            }
        }

        setSections(sections.map(section =>
            section.id === id ? { ...section, [field]: value } : section
        ));
    }

    const handleSectionDragEnd = (result: any) => {
        if (!result.destination) return

        const items = Array.from(sections)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setSections(items)
    }

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Temel form validasyonu
        if (!formData.title || !formData.category || !formData.description || sections.length === 0) {
            toast.error('Lütfen tüm zorunlu alanları doldurun');
            return;
        }

        // Karakter uzunluğu kontrolleri
        if (formData.title.length < 3 || formData.title.length > 100) {
            toast.error('Ders adı 3-100 karakter arasında olmalıdır');
            return;
        }

        if (formData.description.length < 10 || formData.description.length > 2000) {
            toast.error('Ders açıklaması 10-2000 karakter arasında olmalıdır');
            return;
        }

        // Tag kontrolü
        const tags = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        if (tags.length === 0) {
            toast.error('En az bir etiket eklemelisiniz');
            return;
        }

        // Section validasyonu
        const validSections = sections.every(section =>
            section.title.length >= 3 &&
            section.title.length <= 100 &&
            section.description.length >= 10 &&
            section.description.length <= 1000 &&
            section.xpPoints > 0 &&
            section.xpPoints <= 5000
        );

        if (!validSections) {
            toast.error('Lütfen bölüm bilgilerini kontrol edin');
            return;
        }

        const userStr = localStorage.getItem('user');
        if (!userStr) {
            toast.error('Oturum bulunamadı');
            return;
        }

        const user = JSON.parse(userStr);
        const token = localStorage.getItem('accessToken');

        setLoading(true);
        try {
            // API'nin beklediği formatta veriyi hazırla
            const requestData: CreateLessonDto = {
                title: formData.title,
                category: formData.category,
                difficultyLevel: formData.difficultyLevel as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
                description: formData.description,
                tags: tags,
                image: selectedImage ? selectedImage.split('/').pop() || 'default-image.jpg' : 'default-image.jpg',
                sections: sections.map(section => ({
                    title: section.title,
                    content: 'Bu bölümün içeriği yakında eklenecektir. Ekip çalışanlarımız içeriği en kısa sürede hazırlayacaktır. Anlayışınız için teşekkür ederiz.',
                    description: section.description,
                    order: section.order,
                    xpPoints: section.xpPoints
                })),
                status: 'DRAFT',
                userId: user._id
            };

            console.log('Gönderilen veri:', JSON.stringify(requestData, null, 2));

            const response = await axios.post('http://localhost:3000/api/lessons', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.success('Ders başarıyla oluşturuldu!');
                router.push('/panel/lessons/manage');
            }
        } catch (error: any) {
            console.error('Ders oluşturma hatası:', error);
            if (error.response?.status === 401) {
                toast.error('Oturumunuzun süresi dolmuş olabilir, lütfen tekrar giriş yapın');
            } else if (error.response?.status === 403) {
                toast.error('Bu işlem için yetkiniz bulunmuyor');
            } else {
                toast.error(error.response?.data?.message || 'Ders oluşturulurken bir hata oluştu');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="font-pixelify text-4xl mb-8">
                <span className="text-orange-light">Yeni</span>
                <span className="text-white"> Ders Ekle</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Ders Adı */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Ders Adı
                            </label>                                <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Matematik 101: Temel Kavramlar"
                                minLength={3}
                                maxLength={100}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                    placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Kategori
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            >
                                <option value="">Kategori Seçin</option>
                                <option value="MATH">Matematik</option>
                                <option value="PHYSICS">Fizik</option>
                                <option value="CHEMISTRY">Kimya</option>
                            </select>
                        </div>

                        {/* Zorluk Seviyesi */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Zorluk Seviyesi
                            </label>
                            <select
                                name="difficultyLevel"
                                value={formData.difficultyLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            >
                                <option value="">Zorluk Seçin</option>
                                <option value="BEGINNER">Başlangıç</option>
                                <option value="INTERMEDIATE">Orta</option>
                                <option value="ADVANCED">İleri</option>
                            </select>
                        </div>

                        {/* Etiketler */}
                        <div>
                            <label className="block font-nunito text-white mb-2">
                                Etiketler
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Etiketleri virgülle ayırın"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
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
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Ders hakkında kısa bir açıklama yazın..."
                        className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                        placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        required
                        minLength={10}
                        maxLength={2000}
                    />
                </div>

                {/* Bölümler */}
                <div className="bg-dark-800 border border-neutral-600 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <label className="block font-nunito text-white text-lg mb-1">
                                Ders Bölümleri
                            </label>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="px-3 py-1 bg-dark border border-neutral-600">
                                    <span className="font-pixelify text-neutral-400">Toplam XP:</span>
                                    <span className="font-nunito text-orange-light ml-2">{totalXP}</span>
                                </div>
                                <div className="px-3 py-1 bg-dark border border-neutral-600">
                                    <span className="font-pixelify text-neutral-400">Kalan XP:</span>
                                    <span className={`font-nunito ml-2 ${remainingXP < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        {remainingXP}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button
                            icon='pixelarticons:plus'
                            onClick={(e) => {
                                e.preventDefault();
                                addSection();
                            }}
                            disabled={remainingXP <= 0 ? true : false}
                            type="button"
                        >
                            Yeni Bölüm
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className="bg-dark border border-neutral-600 p-4"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            icon="pixelarticons:drag"
                                            className="w-5 h-5 text-neutral-400 cursor-move"
                                        />
                                        <span className="font-pixelify text-orange-light">
                                            BÖLÜM {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 bg-dark-800 px-3 py-1 border border-neutral-600 bg-gray">
                                            <input
                                                type="text"
                                                value={section.xpPoints}
                                                onChange={(e) => section.id && updateSection(section.id, 'xpPoints', parseInt(e.target.value))}
                                                className="w-12 bg-transparent border-none text-white font-nunito focus:outline-none text-right"
                                            />
                                            <span className="text-orange-light font-pixelify text-sm">XP</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => section.id && removeSection(section.id)}
                                            className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                                        >
                                            <Icon icon="pixelarticons:close" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            value={section.title}
                                            onChange={(e) => section.id && updateSection(section.id, 'title', e.target.value)}
                                            placeholder="Bölüm Başlığı"
                                            minLength={3}
                                            maxLength={100}
                                            className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            value={section.description}
                                            onChange={(e) => section.id && updateSection(section.id, 'description', e.target.value)}
                                            placeholder="Bölüm hakkında kısa bir açıklama yazın..."
                                            minLength={10}
                                            maxLength={1000}
                                            rows={2}
                                            className="w-full px-4 py-3 bg-dark border border-neutral-600 bg-gray text-white font-nunito
                                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {sections.length === 0 && (
                            <div className="text-center py-8 border-2 border-dashed border-neutral-600">
                                <Icon
                                    icon="pixelarticons:file-plus"
                                    className="w-12 h-12 mx-auto text-neutral-400 mb-2"
                                />
                                <p className="text-neutral-400 font-nunito">
                                    Henüz bölüm eklenmemiş. Yeni bir bölüm eklemek için yukarıdaki butonu kullanın.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Button
                        variant='outline'
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        İptal
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        icon={loading ? "pixelarticons:clock" : "pixelarticons:check"}
                    >
                        {loading ? 'Yayınlanıyor...' : 'Dersi Yayınla'}
                    </Button>
                </div>
            </form>
        </>
    )
}

(AddLesson as any).Layout = 'panel'

export default AddLesson
