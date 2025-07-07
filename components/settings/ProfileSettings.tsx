import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface ProfileSettingsProps {
    userData?: {
        _id?: string;
        email?: string;
        username?: string;
        name?: string;
        isVerified?: boolean;
        roles?: string[];
        bio?: string;
        location?: string;
        profilePicture?: string;
        bannerPicture?: string;
        privacy?: {
            showActive?: boolean;
            showProfilePicture?: boolean;
            showBannerPicture?: boolean;
            showProfile?: boolean;
            showLocation?: boolean;
            showStatics?: boolean;
        };
        createdAt?: string;
        updatedAt?: string;
    };
}

interface ProfileData {
    username: string;
    name: string;
    bio: string;
    location: string;
    profilePicture: string;
    bannerPicture: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userData }) => {
    const [profileData, setProfileData] = useState<ProfileData>({
        username: userData?.username || '',
        name: userData?.name || '',
        bio: userData?.bio || '',
        location: userData?.location || '',
        profilePicture: userData?.profilePicture || '/images/defaultAvatar.png',
        bannerPicture: userData?.bannerPicture || '/images/login.png'
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (userData) {
            setProfileData({
                username: userData.username || '',
                name: userData.name || '',
                bio: userData.bio || '',
                location: userData.location || '',
                profilePicture: userData.profilePicture || '/images/defaultAvatar.png',
                bannerPicture: userData.bannerPicture || '/images/login.png',
            });
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (type: 'profile' | 'banner') => {
        // TODO: Implement image upload logic
        console.log(`Uploading ${type} image`);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('accessToken');
            const { data } = await axios.put(
                'http://localhost:3000/api/auth/update',
                profileData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setMessage({ type: 'success', text: 'Profil başarıyla güncellendi!' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Bir hata oluştu.' });
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Banner ve Profil Fotoğrafı */}
            <div className="bg-dark-800 border border-neutral-600 rounded-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-r from-orange-primary/20 to-purple-600/20">
                    <img
                        src={profileData.bannerPicture}
                        alt="Profil Banner"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <button
                        onClick={() => handleImageUpload('banner')}
                        className="absolute bottom-5 right-5 p-2 bg-dark-800/80 group text-white transition-colors rounded-full cursor-pointer hover:bg-dark-700/80"
                    >
                        <Icon icon="pixelarticons:camera" className="w-8 h-8" />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="relative -mt-12 mb-4 flex items-end gap-4">
                        <div className="relative">
                            <img
                                src={profileData.profilePicture}
                                alt="Profil Fotoğrafı"
                                className="w-24 h-24 rounded-full border-4 border-dark-800 bg-dark"
                            />
                            <button
                                onClick={() => handleImageUpload('profile')}
                                className="absolute -bottom-2 -right-2 p-2 bg-orange-primary text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
                            >
                                <Icon icon="pixelarticons:edit" className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-pixelify text-white">{profileData.username}</h2>
                                    {userData?.isVerified && (
                                        <Icon icon="pixelarticons:check-double" className="w-6 h-6 text-orange-light" />
                                    )}
                                </div>
                                {userData?.roles && (
                                    <span className={`px-3 py-1 rounded-full text-sm font-nunito ${userData.roles.includes('2') ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                                            userData.roles.includes('1') ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                                                'bg-orange-light/20 text-orange-light border-orange-light/30'
                                        }`}>
                                        {userData.roles.includes('2') ? 'Admin' :
                                            userData.roles.includes('1') ? 'Öğretmen' : 'Öğrenci'}
                                    </span>
                                )}
                            </div>
                            <p className="text-neutral-400 mt-2">{profileData.bio || "Biyografi bulunmuyor..."}</p>
                            {profileData.location && (
                                <div className="flex items-center gap-2 mt-3 text-neutral-500 font-nunito">
                                    <Icon icon="pixelarticons:pin" className="w-4 h-4" />
                                    <span>{profileData.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Kişisel Bilgiler */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-white font-pixelify">Kişisel Bilgiler</h2>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        icon={loading ? "pixelarticons:clock" : "pixelarticons:check"}
                    >
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                </div>

                {message && (
                    <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-nunito text-white mb-2">Ad Soyad</label>
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-nunito text-white mb-2">Kullanıcı Adı</label>
                        <input
                            type="text"
                            name="username"
                            value={profileData.username}
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
                            name="bio"
                            value={profileData.bio}
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
