import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Icon } from '@iconify/react';
import ExamCard from '@/components/ui/exam-card';
import LessonCard from '@/components/ui/lesson-card';

const tabs = [
  { id: 'lessons', label: 'Dersler' },
  { id: 'exams', label: 'Sınavlar' },
];

// Örnek data
const sampleLesson = {
  image: "/images/login.png",
  category: "Matematik",
  title: "Türev ve İntegral",
  slug: "turev-integral",
  badges: ["Türev", "İntegral", "Matematik"],
};

const sampleExam = {
  image: "/images/login.png",
  category: "Matematik",
  title: "Türev Sınavı",
  slug: "turev-sinavi",
  duration: "45 dakika",
  questionCount: 20,
  difficulty: "Orta",
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('lessons');

  const tabVariants = {
    inactive: { opacity: 0, y: 20 },
    active: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <>
      <Head>
        <title>Profil | PixelSınav</title>
      </Head>

      <div className="min-h-screen bg-dark">
        {/* Banner Bölümü */}
        <div className="h-48 sm:h-64 w-full overflow-hidden">
          <img
            src="/images/login.png"
            alt="Profil Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* İçerik Alanı */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0">
          {/* Profil Bilgileri */}
          <div className="bg-dark-800 rounded-xl p-6 -mt-8 border border-neutral-700 bg-gray relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative -mt-16">
                <img
                  src="/images/defaultAvatar.png"
                  alt="Profil Fotoğrafı"
                  className="w-32 h-32 rounded-full border-4 border-dark-800 bg-dark"
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-green-500 border-4 border-dark-800" />
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                  <h1 className="text-3xl font-pixelify text-white">poyrazavsever</h1>
                  <span className="px-3 py-1 rounded-full text-sm font-nunito bg-orange-light/20 text-orange-light border border-orange-light/30">
                    Öğrenci
                  </span>
                </div>
                <p className="text-neutral-400 font-nunito mt-2 max-w-2xl">
                  Matematik ve Fizik alanında kendimi geliştiriyorum. PixelSınav ile başarıya ulaşmak için çalışıyorum! 🚀
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 border-t border-neutral-700">
              <div className="flex gap-8 -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-4 font-nunito relative cursor-pointer ${
                      activeTab === tab.id
                        ? 'text-orange-light'
                        : 'text-neutral-400 hover:text-neutral-300'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-light"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab İçerikleri */}
          <div className="py-8">
            {activeTab === 'lessons' && (
              <motion.div
                variants={tabVariants}
                initial="inactive"
                animate="active"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <LessonCard {...sampleLesson} />
              </motion.div>
            )}

            {activeTab === 'exams' && (
              <motion.div
                variants={tabVariants}
                initial="inactive"
                animate="active"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <ExamCard {...sampleExam} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;