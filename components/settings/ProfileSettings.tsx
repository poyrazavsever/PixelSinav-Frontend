import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

interface ProfileData {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    about: string;
    profileImage: string;
    bannerImage: string;
}

const ProfileSettings = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: 'John Doe',
        email: 'ornek@email.com',
        phone: '+90 (555) 555 55 55',
        location: 'İstanbul, Türkiye',
        about: 'Merhaba! Ben bir eğitim tutkunuyum.',
        profileImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=b6e3f4',
        bannerImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (type: 'profile' | 'banner') => {
        // Implement image upload logic
        console.log(`Uploading ${type} image`);
    };

    return (
        <div className="space-y-6">
            {/* Banner ve Profil Fotoğrafı */}
            <div className="bg-dark-800 border border-neutral-600 rounded-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-r from-orange-primary/20 to-purple-600/20">
                    <img
                        src={profileData.bannerImage}
                        alt="Profil Banner"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <button
                        onClick={() => handleImageUpload('banner')}
                        className="absolute bottom-5 right-5 p-2 bg-dark-800/80 group text-white transition-colors rounded-full cursor-pointer"
                    >
                        <Icon icon="pixelarticons:camera" className="w-12 h-12" />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="relative -mt-12 mb-4 flex items-end gap-4">
                        <div className="relative">
                            <img
                                src={profileData.profileImage}
                                alt="Profil Fotoğrafı"
                                className="w-24 h-24 rounded-full border-4 border-dark-800"
                            />
                            <button
                                onClick={() => handleImageUpload('profile')}
                                className="absolute -bottom-2 -right-2 p-2 bg-orange-primary text-white rounded-full hover:bg-orange-light transition-colors cursor-pointer"
                            >
                                <Icon icon="pixelarticons:edit" className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-xl font-semibold text-white">{profileData.fullName}</h2>
                            <p className="text-neutral-400">{profileData.about}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kişisel Bilgiler */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                <h2 className="text-xl text-white font-pixelify mb-4">Kişisel Bilgiler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-nunito text-white mb-2">Ad Soyad</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-nunito text-white mb-2">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-nunito text-white mb-2">Telefon</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-nunito text-white mb-2">Konum</label>
                        <input
                            type="text"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-nunito text-white mb-2">Hakkımda</label>
                        <textarea
                            name="about"
                            value={profileData.about}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito h-32
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
