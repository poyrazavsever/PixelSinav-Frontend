import Link from "next/link";

interface LessonCardProps {
  image: string;
  category: string;
  title: string;
  slug: string;
  badges: string[];
}

const LessonCard = ({ image, category, title, slug, badges }: LessonCardProps) => {
  return (
    <Link 
      href={`/learn/${slug}`} 
      className="block bg-gray/30 rounded-xl border border-gray overflow-hidden transition-all duration-300 hover:border-[#D65A31]/50 group"
    >
      {/* Card Image */}
      <div className="p-2 relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-xl"
        />
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

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-[#D65A31] text-white text-sm font-nunito border border-[#F08967]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default LessonCard;
