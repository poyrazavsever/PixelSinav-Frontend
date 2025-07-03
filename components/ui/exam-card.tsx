import Link from "next/link";
import { Icon } from '@iconify/react';

interface ExamCardProps {
    image: string;
    category: string;
    title: string;
    slug: string;
    duration: string;
    questionCount: number;
    difficulty: string;
}

const ExamCard = ({ image, category, title, slug, duration, questionCount, difficulty }: ExamCardProps) => {
    return (
        <Link
            href={`/exams/${slug}`}
            className="block bg-gray/30 rounded-xl border border-gray overflow-hidden transition-all duration-300 hover:border-orange-primary/50 group"
        >
            {/* Card Image */}
            <div className="p-2 relative w-full aspect-[16/9] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full rounded-xl"
                />

                {/* Exam Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-dark/80 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2 text-white">
                        <Icon icon="pixelarticons:clock" className="h-5 w-5 text-orange-primary" />
                        <span className="text-sm font-nunito">{duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Icon icon="pixelarticons:question" className="h-5 w-5 text-orange-primary" />
                        <span className="text-sm font-nunito">{questionCount} Soru</span>
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
                {/* Category */}
                <p className="text-text font-nunito mb-2">
                    {category}
                </p>

                {/* Title */}
                <h3 className="text-white font-nunito text-xl mb-4">
                    {title}
                </h3>

                {/* Difficulty Badge */}
                <div className="flex flex-wrap gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-nunito border ${difficulty === 'Kolay' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                            difficulty === 'Orta' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                                'bg-red-500/20 text-red-500 border-red-500/30'
                        }`}>
                        {difficulty}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ExamCard;
