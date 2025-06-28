import { motion } from "framer-motion";
import { Button } from "../ui/button";

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

const HeroSection = () => {
  return (
    <section className="bg-dark-primary min-h-[55vh] flex items-center">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-pixelify text-white mb-6"
            variants={itemVariants}
          >
            <span>Sınavlara </span>
            <span className="text-orange-primary">Hazırlanmanın</span>
            <br />
            <span>En </span>
            <span className="text-orange-primary">Akıllı </span>
            <span>Yolu</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 font-nunito text-lg md:text-xl mb-12 max-w-2xl"
            variants={itemVariants}
          >
            Kendi hızında çalış, zamana karşı yarış, sonuçlarını anında gör. 
            Öğrenciler için sade, eğitmenler için güçlü bir sınav platformu.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Button
              variant="filled"
              icon="pixelarticons:arrow-right"
              href="/sinavlara-goz-at"
            >
              Sınavlara Göz At
            </Button>
            <Button
              variant="outline"
              href="/egitmen-kayit"
            >
              Eğitmen Olarak Katıl
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
