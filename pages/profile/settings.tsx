import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import ProfileSettings from '@/components/settings/ProfileSettings'
import SecuritySettings from '@/components/settings/SecuritySettings'
import NotificationSettings from '@/components/settings/NotificationSettings'
import AppearanceSettings from '@/components/settings/AppearanceSettings'
import PrivacySettings from '@/components/settings/PrivacySettings'

interface TabConfig {
    id: string;
    label: string;
    icon: string;
    component: React.ComponentType<{ userData?: any }>;
}

interface UserData {
    _id: string;
    email: string;
    username: string;
    name?: string;
    profilePicture?: string;
    bannerPicture?: string;
    location?: string;
    bio?: string;
    isVerified: boolean;
    roles: string[];
    notifications?: Array<{
        _id: string;
        type: string;
        default: string[];
        period: string;
    }>;
    privacy: {
        showActive: boolean;
        showProfilePicture: boolean;
        showBannerPicture: boolean;
        showProfile: boolean;
        showLocation: boolean;
        showStatics: boolean;
    };
    updatedAt: string;
    createdAt: string;
}

const Settings: NextPage = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [hasChanges, setHasChanges] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Local storage'dan user bilgilerini al
                const localUser = localStorage.getItem('user')
                if (!localUser) return

                const { _id } = JSON.parse(localUser)

                // API'den detaylı bilgileri çek
                const response = await fetch('http://localhost:3000/api/auth/findOneById', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: _id }),
                })

                const data = await response.json()
                if (data.success) {
                    // Default resimler için kontrol
                    const userData = {
                        ...data.user,
                        profilePicture: data.user.profilePicture || "/images/defaultAvatar.png",
                        bannerPicture: data.user.bannerPicture || "/images/login.png"
                    }
                    setUserData(userData)
                }
            } catch (error) {
                console.error('Kullanıcı bilgileri alınamadı:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const tabs: TabConfig[] = [
        { id: 'profile', label: 'Profil Bilgileri', icon: 'pixelarticons:user', component: ProfileSettings },
        { id: 'security', label: 'Güvenlik', icon: 'pixelarticons:lock', component: SecuritySettings },
        { id: 'notifications', label: 'Bildirimler', icon: 'pixelarticons:notification', component: NotificationSettings },
        { id: 'appearance', label: 'Görünüm', icon: 'pixelarticons:card-text', component: AppearanceSettings },
        { id: 'privacy', label: 'Gizlilik', icon: 'pixelarticons:downasaur', component: PrivacySettings },
    ]

    const handleSaveChanges = async () => {
        if (!userData) return

        try {
            // API'ye değişiklikleri gönder
            const response = await fetch('http://localhost:3000/api/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const data = await response.json()
            if (data.success) {
                setHasChanges(false)
            }
        } catch (error) {
            console.error('Değişiklikler kaydedilemedi:', error)
        }
    }

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || tabs[0].component

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <Icon icon="pixelarticons:clock" className="w-8 h-8 text-orange-light animate-spin" />
            </div>
        )
    }

    return (
        <div className='max-w-7xl container mx-auto py-16'>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-pixelify text-4xl">
                    <span className="text-orange-light">Hesap</span>
                    <span className="text-white"> Ayarları</span>
                </h1>
                {hasChanges && (
                    <Button onClick={handleSaveChanges} type="submit">
                        <Icon icon="pixelarticons:save" className="w-5 h-5 mr-2" />
                        Değişiklikleri Kaydet
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            relative px-4 py-2.5 font-nunito whitespace-nowrap transition-all duration-200
                            hover:text-white flex items-center gap-2 group
                            ${activeTab === tab.id ? 'text-white' : 'text-neutral-400'}
                        `}
                    >
                        <div className={`
                            absolute inset-0 rounded-full transition-all duration-200 -z-10
                            ${activeTab === tab.id
                                ? 'bg-orange-primary/20 border border-orange-primary'
                                : 'bg-transparent hover:bg-dark-700'
                            }
                        `} />
                        <div className={`
                            w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200
                            ${activeTab === tab.id
                                ? 'bg-orange-primary text-white'
                                : 'bg-dark-700 text-neutral-400 group-hover:text-white'
                            }
                        `}>
                            <Icon icon={tab.icon} className="w-4 h-4" />
                        </div>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
                <ActiveComponent userData={userData} />
            </div>
        </div>
    )
}

export default Settings
