import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface FormData {
    userId: string;
    name: string;
    email: string;
    phone: string;
    eduInformation: string;
    experience: string;
    expertise: string;
    resume: string;
    certificates: string[];
}

const ApplicationForm = () => {
    const [formData, setFormData] = useState<FormData>({
        userId: '',
        name: '',
        email: '',
        phone: '',
        eduInformation: '',
        experience: '',
        expertise: '',
        resume: '',
        certificates: []
    });

    useEffect(() => {
        // Client tarafında çalıştığından emin oluyoruz
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (user) {
            setFormData(prev => ({
                ...prev,
                userId: user._id || '',
                email: user.email || ''
            }));
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [selectedCv, setSelectedCv] = useState<File | null>(null);
    const [selectedCertificates, setSelectedCertificates] = useState<File[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (!files) return;

        if (name === 'resume') {
            setSelectedCv(files[0]);
            setFormData(prev => ({ ...prev, resume: files[0].name }));
        } else if (name === 'certificates') {
            const fileArray = Array.from(files);
            setSelectedCertificates(fileArray);
            setFormData(prev => ({
                ...prev,
                certificates: fileArray.map(file => file.name)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kullanıcı doğrulama kontrolü
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (!user?.isVerified) {
            toast.error('Başvuru yapabilmek için önce e-posta adresinizi doğrulamanız gerekmektedir.');
            return;
        }

        setLoading(true);
        try {

            const response = await axios.post(
                'http://localhost:3000/api/application/apply',
                {
                    userId: formData.userId,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    eduInformation: formData.eduInformation,
                    experience: formData.experience,
                    expertise: formData.expertise,
                    resume: formData.resume || '',
                    certificates: formData.certificates || []
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            // Backend 200 dönüyorsa başarılı
            if (response.status === 200) {
                toast.success('Başvurunuz başarıyla gönderildi!');
                const userStr = localStorage.getItem('user');
                const user = userStr ? JSON.parse(userStr) : null;

                setFormData({
                    userId: user?._id || '',
                    name: '',
                    email: user?.email || '',
                    phone: '',
                    eduInformation: '',
                    experience: '',
                    expertise: '',
                    resume: '',
                    certificates: []
                });
                setSelectedCv(null);
                setSelectedCertificates([]);
            } else {
                toast.error(response.data?.message || 'Başvuru gönderilirken bir hata oluştu.');
            }
        } catch (error: any) {

            // MongoDB duplicate key hatası veya özel duplicate mesajı kontrolü
            if (error.response?.data?.code === 11000 ||
                error.response?.status === 409 ||
                error.response?.status === 500
            ) {
                toast.error('Bu hesap ile daha önce başvuru yaptınız.');
            } else {
                toast.error(error.response?.data?.message || 'Başvuru gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-gray">
            <div className="max-w-4xl mx-auto px-4 sm:px-0">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-pixelify text-white mb-4">
                        Başvuru Formu
                    </h2>
                    <p className="text-neutral-400">
                        Öğretmen olmak için başvurunuzu yapın. Tüm alanları eksiksiz doldurunuz.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-neutral-800 border border-neutral-700 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-white font-nunito mb-2">
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray/50 border border-neutral-600 text-white 
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
                                readOnly
                                className="w-full px-4 py-3 bg-gray/30 border border-neutral-600 text-neutral-400 
                                cursor-not-allowed"
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
                                pattern="[0-9]{10,11}"
                                placeholder="5XX XXX XX XX"
                                title="Lütfen geçerli bir telefon numarası giriniz (5XX XXX XX XX formatında)"
                                className="w-full px-4 py-3 bg-gray/50 border border-neutral-600 text-white 
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
                                name="eduInformation"
                                value={formData.eduInformation}
                                onChange={handleInputChange}
                                placeholder="Ör: Bilgisayar Mühendisliği - X Üniversitesi"
                                className="w-full px-4 py-3 bg-gray/50 border border-neutral-600 text-white 
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
                                className="w-full px-4 py-3 bg-gray/50 border border-neutral-600 text-white 
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
                                className="w-full px-4 py-3 bg-gray/50 border border-neutral-600 text-white 
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
                                    name="resume"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="cv-upload"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                                <label
                                    htmlFor="cv-upload"
                                    className="flex items-center justify-center px-4 py-3 bg-gray/50 border border-neutral-600 
                                 text-neutral-400 cursor-pointer hover:border-orange-primary hover:text-orange-primary 
                                    focus:outline-none transition-all group"
                                >
                                    <Icon
                                        icon="pixelarticons:file-plus"
                                        className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                                    />
                                    {selectedCv ? selectedCv.name : 'CV Yükle (PDF, DOC)'}
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
                                    className="flex items-center justify-center px-4 py-3 bg-gray/50 border border-neutral-600 
                                 text-neutral-400 cursor-pointer hover:border-orange-primary focus:outline-none transition-colors"
                                >
                                    <Icon icon="pixelarticons:file-plus" className="w-5 h-5 mr-2" />
                                    {selectedCertificates.length > 0
                                        ? `${selectedCertificates.length} dosya seçildi`
                                        : 'Diploma/Sertifika Yükle (PDF, JPG)'}
                                </label>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="filled"
                        icon={loading ? "pixelarticons:clock" : "pixelarticons:external-link"}
                        disabled={loading}
                        className="w-full md:w-auto"
                    >
                        {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                    </Button>

                    {selectedCertificates.length > 0 && (
                        <div className="mt-4 p-4 bg-gray/50 rounded-lg border border-neutral-700">
                            <h3 className="text-white font-nunito mb-2">Seçilen Sertifikalar:</h3>
                            <div className="space-y-2">
                                {selectedCertificates.map((file, index) => (
                                    <div key={index} className="flex items-center text-neutral-400">
                                        <Icon icon="pixelarticons:file" className="w-4 h-4 mr-2" />
                                        {file.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default ApplicationForm;
