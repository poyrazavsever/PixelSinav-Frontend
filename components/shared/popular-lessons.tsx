import { motion } from "framer-motion";
import LessonCard from "../ui/lesson-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

const popularLessons = [
  {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
    category: "Matematik",
    title: "Matematik 1. Dereceden Denklemler",
    slug: "matematik-1-dereceden-denklemler",
    badges: ["Başlangıç", "MAT 101 Bağıl"],
  },
  {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
    category: "Matematik",
    title: "Matematik 1. Dereceden Denklemler",
    slug: "matematik-1-dereceden-denklemler-2",
    badges: ["Başlangıç", "MAT 101 Bağıl"],
  },
  {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
    category: "Matematik",
    title: "Matematik 1. Dereceden Denklemler",
    slug: "matematik-1-dereceden-denklemler-3",
    badges: ["Başlangıç", "MAT 101 Bağıl"],
  },
  {
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.matematikkalesi.net%2Fimages%2Forjinal%2520yayinlari%2520tyt%2Forijinal%2520tyt%25201%2520denklemler%2520ve%2520esitsizlikler%2520test%25201%2F01.jpg&f=1&nofb=1&ipt=21380e5f3c600e0cfd8aace5f8ac0f14e49017a89806aaf29e24f123564242e4",
    category: "Matematik",
    title: "Matematik 1. Dereceden Denklemler",
    slug: "matematik-1-dereceden-denklemler-4",
    badges: ["Başlangıç", "MAT 101 Bağıl"],
  },
];

const PopularLessons = () => {
  return (
    <section className="max-w-7xl mx-auto container py-24">

      <div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-pixelify mb-12"
            variants={itemVariants}
          >
            <span className="text-orange-light">Popüler</span>{" "}
            <span className="text-white">Dersler</span>
          </motion.h2>

          {/* Scrollable Cards Container */}
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
              {popularLessons.map((lesson, index) => (
                <motion.div 
                  key={index} 
                  className="w-[300px] flex-shrink-0"
                  variants={itemVariants}
                >
                  <LessonCard {...lesson} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default PopularLessons;
