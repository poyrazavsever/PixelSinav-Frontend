import Image from "next/image";
import { Button } from "../ui/button";
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
    transition: { 
      duration: 0.5
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5
    }
  }
};

const CTASection = () => {
  return (
    <section className="bg-gray pt-4 relative">
      {/* Dots Pattern Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <motion.div 
        className="max-w-7xl container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left relative z-10"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-pixelify mb-6"
              variants={itemVariants}
            >
              <span className="text-white">Zaman </span>
              <span className="text-orange-light">Kaybetmeden,</span>
              <br />
              <span className="text-white">Hemen </span>
              <span className="text-orange-light">Başla</span>
            </motion.h2>
            
            <motion.p 
              className="text-text font-nunito text-lg mb-8 max-w-xl"
              variants={itemVariants}
            >
              Sağ taraftaki akıllı dostun bu süreçte sana yardımcı olacak, 7/24 takıldığın,
              anlamadığın yerde yardımcı olacak. Çözemediğin soruları çözecek.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button variant="filled" href="/login">
                Giriş Yap
              </Button>
              <Button 
                variant="outline"
                icon="pixelarticons:arrow-right"
                href="/exams"
              >
                Sınavlara Göz At
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <Image
              src="/images/ctta.png"
              alt="AI Assistant"
              width={500}
              height={500}
              className="object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
