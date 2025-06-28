import Image from "next/image";
import { Button } from "./button";

interface LessonCardProps {
  image: string;
  category: string;
  title: string;
  slug: string;
  badges: string[];
}

const LessonCard = ({ image, category, title, slug, badges }: LessonCardProps) => {
  return (
    <div className="bg-gray-800/10 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-orange-primary/50 group">
      {/* Card Image */}
      <div className="relative w-full aspect-[16/9] rounded-t-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Category */}
        <p className="text-gray-400 font-nunito mb-2">
          {category}
        </p>

        {/* Title */}
        <h3 className="text-white font-pixelify text-2xl mb-4">
          {title}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800/30 text-orange-primary text-sm font-nunito rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="filled"
            href={`/dersler/${slug}`}
            className="flex-1"
          >
            Başlangıç
          </Button>
          <Button
            variant="outline"
            href={`/dersler/${slug}/detay`}
            className="flex-1"
          >
            MAT 101 Bağıl
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
