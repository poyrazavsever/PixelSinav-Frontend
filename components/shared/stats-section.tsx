import Image from "next/image";
import { Icon } from "@iconify/react";

const stats = [
  {
    icon: "pixelarticons:book-open",
    title: "Deneme Sınavı",
    value: "154",
  },
  {
    icon: "pixelarticons:human-handsup",
    title: "Öğrenci",
    value: "54700+",
  },
  {
    icon: "pixelarticons:teach",
    title: "Öğretmen",
    value: "48",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-gray py-24 relative">
      <div className="absolute left-0 bottom-0 w-48 h-48 md:w-64 md:h-64">
        <Image
          src="/images/hero.png"
          alt="Pixel Art Dog"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Dots Pattern Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Icon
                icon={stat.icon}
                className="w-8 h-8 text-orange-light mb-4"
              />
              <h3 className="text-white font-pixelify text-xl mb-2">
                {stat.title}
              </h3>
              <p className="text-orange-primary font-nunito font-bold text-4xl">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
