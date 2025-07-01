import React, { useState } from 'react'
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
    component: React.ComponentType;
}

const Settings: NextPage = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [hasChanges, setHasChanges] = useState(false)

    const tabs: TabConfig[] = [
        { id: 'profile', label: 'Profil Bilgileri', icon: 'pixelarticons:user', component: ProfileSettings },
        { id: 'security', label: 'Güvenlik', icon: 'pixelarticons:lock', component: SecuritySettings },
        { id: 'notifications', label: 'Bildirimler', icon: 'pixelarticons:bell', component: NotificationSettings },
        { id: 'appearance', label: 'Görünüm', icon: 'pixelarticons:brush', component: AppearanceSettings },
        { id: 'privacy', label: 'Gizlilik', icon: 'pixelarticons:shield-check', component: PrivacySettings },
    ]

    const handleSaveChanges = () => {
        // Save changes to backend
        console.log('Saving changes...')
        setHasChanges(false)
    }

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || tabs[0].component

    return (
        <>
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
                        className={`px-4 py-2 font-nunito whitespace-nowrap transition-colors rounded
                            ${activeTab === tab.id
                                ? 'bg-orange-primary text-white'
                                : 'bg-dark-800 text-neutral-400 hover:text-white'
                            }`}
                    >
                        <Icon icon={tab.icon} className="w-5 h-5 inline-block mr-2" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
                <ActiveComponent />
            </div>
        </>
    )
}

(Settings as any).Layout = 'panel'

export default Settings
