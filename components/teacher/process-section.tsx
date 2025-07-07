import { Icon } from '@iconify/react';

const steps = [
    {
        number: '01',
        title: 'Başvuru Formu',
        description: 'Gerekli bilgileri doldurun ve belgelerinizi yükleyin.'
    },
    {
        number: '02',
        title: 'İnceleme',
        description: 'Başvurunuz ekibimiz tarafından incelenecek.'
    },
    {
        number: '03',
        title: 'Görüşme',
        description: 'Uygun adaylarla online test case verilecek.'
    },
    {
        number: '04',
        title: 'Onay',
        description: 'Başarılı adaylar öğretmen paneline erişim kazanacak.'
    }
];

const ProcessSection = () => {
    return (
        <section className="py-16 bg-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-pixelify text-white mb-4">
                        Başvuru Süreci
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        PixelSınav'da öğretmen olma yolculuğunuz 4 kolay adımda tamamlanır.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative"
                        >

                            <div className="relative z-10 text-center p-6">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-primary flex items-center justify-center font-pixelify text-xl text-white">
                                    {step.number}
                                </div>
                                <h3 className="text-xl text-white font-nunito mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
