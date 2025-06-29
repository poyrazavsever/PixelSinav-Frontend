import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

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

const features = [
  {
    title: "Kişiselleştirilmiş Öğrenme",
    description: "Her öğrencinin kendi hızında ilerleyebileceği, kendine özgü öğrenme yolculuğu.",
    icon: "pixelarticons:book-open"
  },
  {
    title: "Anlık Geri Bildirim",
    description: "Yapay zeka destekli sistemimiz ile anında detaylı geri bildirimler alın.",
    icon: "pixelarticons:message"
  },
  {
    title: "7/24 Destek",
    description: "Akıllı asistanımız ile istediğiniz zaman yardım alın.",
    icon: "pixelarticons:clock"
  }
];

const AboutPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-dark-primary min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-pixelify text-white mb-6"
              variants={itemVariants}
            >
              <span>Biz Kimiz ve </span>
              <span className="text-orange-primary">Ne Yapıyoruz?</span>
            </motion.h1>
            
            <motion.p 
              className="text-text font-nunito text-lg md:text-xl mb-8 max-w-3xl"
              variants={itemVariants}
            >
              Eğitimde fırsat eşitliğini sağlamak ve her öğrencinin potansiyelini
              maksimuma çıkarmak için çalışan bir teknoloji şirketiyiz.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray py-24 relative ">
        {/* Dots Pattern Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-dark-primary/20 p-8 rounded-xl border border-orange-primary/20"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-orange-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Icon icon={feature.icon} className="w-6 h-6 text-orange-light" />
                </div>
                <h3 className="text-white font-pixelify text-2xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-text font-nunito">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-primary py-24 mx-auto max-w-7xl container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="flex-1"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-pixelify text-white mb-6">
                <span>Hemen </span>
                <span className="text-orange-primary">Başlamak İster misin?</span>
              </h2>
              <p className="text-text font-nunito mb-8">
                Ücretsiz hesap oluştur ve platformumuzu keşfetmeye başla.
                İlk dersine hemen başlayabilirsin!
              </p>
              <div className="flex gap-4">
                <Button variant="filled" href="/register">
                  Ücretsiz Başla
                </Button>
                <Button 
                  variant="outline" 
                  href="/contact"
                  icon="pixelarticons:mail"
                >
                  Bize Ulaş
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
            >
              <Image
                src="/images/ctta.png"
                alt="Start Learning"
                width={400}
                height={400}
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;
