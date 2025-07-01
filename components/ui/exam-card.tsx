import Link from "next/link";

interface ExamCardProps {
  image: string;
  category: string;
  title: string;
  slug: string;
  badges: string[];
  duration: string;
  questionCount: number;
}

const ExamCard = ({ image, category, title, slug, badges, duration, questionCount }: ExamCardProps) => {
  return (
    <Link 
      href={`/sinavlar/${slug}`} 
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
            <span className="text-orange-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
              </svg>
            </span>
            <span className="text-sm font-nunito">{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="text-orange-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
                <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"/>
              </svg>
            </span>
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

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-orange-primary text-white text-sm font-nunito border border-orange-light"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ExamCard;
