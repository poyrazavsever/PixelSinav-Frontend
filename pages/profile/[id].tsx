import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import ExamCard from '@/components/ui/exam-card';
import LessonCard from '@/components/ui/lesson-card';

interface User {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  roles: string[];
  profilePicture?: string;
  bannerPicture?: string;
  privacy: {
    showActive: boolean;
    showProfilePicture: boolean;
    showBannerPicture: boolean;
    showProfile: boolean;
    showLocation: boolean;
    showStatics: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

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
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('lessons');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        const response = await fetch('http://localhost:3000/api/auth/findOneById', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const getUserRole = (roles: string[]) => {
    if (roles.includes('2')) return 'Admin';
    if (roles.includes('1')) return 'Öğretmen';
    return 'Öğrenci';
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'Öğretmen':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default:
        return 'bg-orange-light/20 text-orange-light border-orange-light/30';
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center">
      <Icon icon="pixelarticons:clock" className="w-8 h-8 text-orange-light animate-spin" />
    </div>;
  }

  if (!user) {
    return <div className="min-h-[60vh] bg-dark flex items-center justify-center">
    <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
      <img
        src="/logo/logo.png"
        alt="Logo"
        className="w-20 h-20 object-contain opacity-80"
      />
      <h1 className="text-xl md:text-2xl text-neutral-300 font-semibold font-nunito">
        Kullanıcı Bulunamadı
      </h1>
      <p className="text-neutral-500 text-sm font-nunito">
        Aradığınız kullanıcı sistemde kayıtlı değil veya silinmiş olabilir.
      </p>
    </div>
  </div>
  ;
  }

  const userRole = getUserRole(user.roles);
  const roleBadgeColor = getRoleBadgeColor(userRole);

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
        <title>{user.username} | PixelSınav</title>
      </Head>

      <div className="min-h-screen bg-dark">
        {/* Banner Bölümü */}
        <div className="h-48 sm:h-64 w-full overflow-hidden">
          <img
            src={user.bannerPicture || "/images/login.png"}
            alt="Profil Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* İçerik Alanı */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profil Bilgileri */}
          <div className="bg-gray/80 rounded-xl p-6 -mt-8 border border-neutral-700 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative -mt-16">
                <img
                  src={user.profilePicture || "/images/defaultAvatar.png"}
                  alt="Profil Fotoğrafı"
                  className="w-32 h-32 rounded-full border-4 border-dark-800 bg-dark"
                />
                {user.privacy.showActive && (
                  <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-green-500 border-4 border-dark-800" />
                )}
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-pixelify text-white">{user.username}</h1>
                    {user.isVerified && (
                      <Icon icon="pixelarticons:check-double" className="w-6 h-6 text-orange-light" />
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-nunito ${roleBadgeColor}`}>
                    {userRole}
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