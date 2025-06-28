import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
};

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
      <motion.div 
        className="absolute left-0 bottom-0 w-48 h-48 md:w-64 md:h-64"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={imageVariants}
      >
        <Image
          src="/images/hero.png"
          alt="Pixel Art Dog"
          fill
          className="object-contain"
        />
      </motion.div>
      
      {/* Dots Pattern Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <motion.div 
        className="container mx-auto px-4 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
