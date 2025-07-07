import { Icon } from '@iconify/react';

const requirements = [
    {
        title: 'Eğitim ve Uzmanlık',
        description: 'İlgili alanda lisans derecesi veya sertifika',
        icon: 'pixelarticons:bookmark'
    },
    {
        title: 'Deneyim',
        description: 'En az 1 yıl öğretmenlik veya eğitmenlik deneyimi',
        icon: 'pixelarticons:clock'
    },
    {
        title: 'Teknik Beceriler',
        description: 'Temel bilgisayar ve internet kullanımı',
        icon: 'pixelarticons:device-tv'
    },
    {
        title: 'İletişim',
        description: 'Akıcı Türkçe ve iyi iletişim becerileri',
        icon: 'pixelarticons:message'
    }
];

const RequirementsSection = () => {
    return (
        <section className="py-16 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-pixelify text-white mb-4">
                        Öğretmen Olmanın Şartları
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Platformumuzda öğretmen olmak için aşağıdaki kriterleri sağlamanız gerekmektedir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {requirements.map((req, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-6 bg-dark-800 border border-neutral-700 rounded-lg"
                        >
                            <div className="p-3 bg-orange-primary/10 rounded-lg">
                                <Icon
                                    icon={req.icon}
                                    className="w-8 h-8 text-orange-light"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl text-white font-nunito mb-2">
                                    {req.title}
                                </h3>
                                <p className="text-neutral-400">
                                    {req.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RequirementsSection;
