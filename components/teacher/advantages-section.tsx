import { Icon } from '@iconify/react';

const advantages = [
    {
        icon: 'pixelarticons:book-open',
        title: 'Kendi İçeriklerinizi Oluşturun',
        description: 'Uzmanlık alanınızda özgün dersler ve sınavlar hazırlayın.'
    },
    {
        icon: 'pixelarticons:users',
        title: 'Geniş Öğrenci Ağı',
        description: 'Binlerce öğrenciye ulaşın ve eğitim yolculuklarında onlara rehberlik edin.'
    },
    {
        icon: 'pixelarticons:money',
        title: 'Esnek Kazanç',
        description: 'İçerikleriniz üzerinden pasif gelir elde edin.'
    },
    {
        icon: 'pixelarticons:clock',
        title: 'Esnek Çalışma',
        description: 'Kendi programınızı oluşturun, dilediğiniz zaman içerik üretin.'
    }
];

const AdvantagesSection = () => {
    return (
        <section className="py-16 bg-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-pixelify text-white mb-4">
                        Öğretmen Olmanın Avantajları
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        PixelSınav'da öğretmen olarak katılın ve eğitim dünyasına katkıda bulunurken
                        birçok avantajdan yararlanın.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {advantages.map((advantage, index) => (
                        <div
                            key={index}
                            className="p-6 bg-dark border border-neutral-700 rounded-lg hover:border-orange-primary/50 transition-colors"
                        >
                            <Icon
                                icon={advantage.icon}
                                className="w-12 h-12 text-orange-light mb-4"
                            />
                            <h3 className="text-xl text-white font-nunito mb-2">
                                {advantage.title}
                            </h3>
                            <p className="text-neutral-400">
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvantagesSection;
