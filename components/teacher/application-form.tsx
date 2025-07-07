import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        expertise: '',
        cv: null as File | null,
        certificates: [] as File[]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (!files) return;

        if (name === 'cv') {
            setFormData(prev => ({ ...prev, cv: files[0] }));
        } else if (name === 'certificates') {
            setFormData(prev => ({ ...prev, certificates: Array.from(files) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // TODO: API isteği
    };

    return (
        <section className="py-16 bg-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-0">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-pixelify text-white mb-4">
                        Başvuru Formu
                    </h2>
                    <p className="text-neutral-400">
                        Öğretmen olmak için başvurunuzu yapın. Tüm alanları eksiksiz doldurunuz.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-dark-800 border border-neutral-700 rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 rounded-lg text-white 
                                placeholder:text-neutral-500 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                E-posta
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 rounded-lg text-white 
                                placeholder:text-neutral-500 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 rounded-lg text-white 
                                placeholder:text-neutral-500 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Eğitim Bilgileri
                            </label>
                            <input
                                type="text"
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                placeholder="Ör: Bilgisayar Mühendisliği - X Üniversitesi"
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 rounded-lg text-white 
                                placeholder:text-neutral-500 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-6 mb-6">
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Deneyim
                            </label>
                            <textarea
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="Önceki öğretmenlik/eğitmenlik deneyimlerinizi açıklayın..."
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 rounded-lg text-white 
                                placeholder:text-neutral-500 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none h-32"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Uzmanlık Alanları
                            </label>
                            <textarea
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleInputChange}
                                placeholder="Ders verebileceğiniz konuları ve uzmanlık alanlarınızı belirtin..."
                                className="w-full px-4 py-3 bg-dark border border-neutral-600 rounded-lg text-white 
                                placeholder:text-neutral-500 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none h-32"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                CV
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="cv"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="cv-upload"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                                <label
                                    htmlFor="cv-upload"
                                    className="flex items-center justify-center px-4 py-3 bg-dark border border-neutral-600 
                                    rounded-lg text-neutral-400 cursor-pointer hover:border-orange-primary focus:outline-none transition-colors"
                                >
                                    <Icon icon="pixelarticons:file-plus" className="w-5 h-5 mr-2" />
                                    {formData.cv ? formData.cv.name : 'CV Yükle (PDF, DOC)'}
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Sertifikalar
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="certificates"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="cert-upload"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    multiple
                                />
                                <label
                                    htmlFor="cert-upload"
                                    className="flex items-center justify-center px-4 py-3 bg-dark border border-neutral-600 
                                    rounded-lg text-neutral-400 cursor-pointer hover:border-orange-primary focus:outline-none transition-colors"
                                >
                                    <Icon icon="pixelarticons:file-plus" className="w-5 h-5 mr-2" />
                                    {formData.certificates.length > 0
                                        ? `${formData.certificates.length} dosya seçildi`
                                        : 'Diploma/Sertifika Yükle (PDF, JPG)'}
                                </label>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="filled"
                        icon="pixelarticons:external-link"
                    >
                        Başvuruyu Gönder
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default ApplicationForm;
