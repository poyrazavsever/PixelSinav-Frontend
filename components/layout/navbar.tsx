import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface User {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  roles: string[];
  profilePicture?: string | null;
  notifications: any[];
  privacy: {
    showActive: boolean;
    showProfilePicture: boolean;
    showBannerPicture: boolean;
    showProfile: boolean;
    showLocation: boolean;
    showStatics: boolean;
    _id: string;
  };
  updatedAt: string;
  createdAt: string;
}

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkında', href: '/about' },
    { name: 'Öğren', href: '/learn' },
    { name: 'Sınavlar', href: '/exams' },
  ]

  useEffect(() => {
    const fetchUser = async () => {

      const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)._id : null;

      console.log('User ID:', userId);


      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/auth/findOneById', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId })
        });

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Başarıyla çıkış yaptınız!');
    router.push('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='py-6 flex items-center justify-between max-w-7xl mx-auto container'>
      <div className='flex items-center gap-4'>
        <Link href="/">
          <img src="/logo/logo.png" alt="navbar logo" className='w-12 h-12 mr-4' />
        </Link>

        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className='text-text hover:text-orange-light transition-colors duration-200'
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {!isLoading && (
          user ? (
            <>
              {user.roles.includes('teacher') ? (
                <Button
                  variant='outline'
                  href='/panel'
                  icon="pixelarticons:command"
                >
                  Panel
                </Button>
              ) : (
                <Button
                  variant='outline'
                  href='/become-teacher'
                  icon="pixelarticons:graduate"
                >
                  Öğretmen Ol
                </Button>
              )}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer group"
                >
                  <img
                    src={user.profilePicture || "/images/defaultAvatar.png"}
                    alt="Profil"
                    className="w-10 h-10 rounded-full border-2 border-orange-light group-hover:border-orange-600 transition-colors"
                  />
                  <Icon
                    icon="pixelarticons:chevron-down"
                    className={`w-5 h-5 text-orange-light transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className={`absolute right-0 mt-2 w-48 rounded-lg bg-dark-800 border border-neutral-700 bg-gray shadow-lg py-1 z-50 transform transition-all duration-200 origin-top-right ${isDropdownOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                  <Link
                    href={`/profile/${user._id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-orange-light/10 hover:text-orange-light transition-colors"
                  >
                    <Icon icon="pixelarticons:user" className="w-5 h-5" />
                    Profil
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-orange-light/10 hover:text-orange-light transition-colors"
                  >
                    <Icon icon="pixelarticons:command" className="w-5 h-5" />
                    Ayarlar
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-orange-light/10 hover:text-orange-light transition-colors border-t border-neutral-700 cursor-pointer"
                  >
                    <Icon icon="pixelarticons:logout" className="w-5 h-5" />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Button
              variant='filled'
              href='/auth/login'
              icon="pixelarticons:arrow-right"
            >
              Giriş Yap
            </Button>
          )
        )}
      </div>
    </nav>
  )
}

export default Navbar