import React, { useState } from 'react';

interface PrivacySettings {
    profileVisibility: 'public' | 'friends' | 'private';
    onlineStatus: 'public' | 'friends' | 'private';
    statsSharing: 'public' | 'friends' | 'private';
}

const PrivacySettings = () => {
    const [privacy, setPrivacy] = useState<PrivacySettings>({
        profileVisibility: 'public',
        onlineStatus: 'friends',
        statsSharing: 'friends'
    });

    const handleSettingChange = (setting: keyof PrivacySettings, value: PrivacySettings[keyof PrivacySettings]) => {
        setPrivacy(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    return (
        <div className="bg-dark-800 border border-neutral-600 p-6">
            <h2 className="text-xl text-white font-pixelify mb-4">Gizlilik Ayarları</h2>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-nunito">Profil Görünürlüğü</h3>
                        <p className="text-neutral-400 text-sm">Profilinizi kimler görebilir?</p>
                    </div>
                    <select
                        value={privacy.profileVisibility}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value as PrivacySettings['profileVisibility'])}
                        className="px-4 py-2 bg-dark border border-neutral-600 text-white font-nunito
                        focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none rounded"
                    >
                        <option value="public">Herkes</option>
                        <option value="friends">Sadece Arkadaşlar</option>
                        <option value="private">Sadece Ben</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-nunito">Çevrimiçi Durum</h3>
                        <p className="text-neutral-400 text-sm">Çevrimiçi durumunuzu kimler görebilir?</p>
                    </div>
                    <select
                        value={privacy.onlineStatus}
                        onChange={(e) => handleSettingChange('onlineStatus', e.target.value as PrivacySettings['onlineStatus'])}
                        className="px-4 py-2 bg-dark border border-neutral-600 text-white font-nunito
                        focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none rounded"
                    >
                        <option value="public">Herkes</option>
                        <option value="friends">Sadece Arkadaşlar</option>
                        <option value="private">Hiç Kimse</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-nunito">İstatistik Paylaşımı</h3>
                        <p className="text-neutral-400 text-sm">Ders ve sınav istatistiklerinizi kimler görebilir?</p>
                    </div>
                    <select
                        value={privacy.statsSharing}
                        onChange={(e) => handleSettingChange('statsSharing', e.target.value as PrivacySettings['statsSharing'])}
                        className="px-4 py-2 bg-dark border border-neutral-600 text-white font-nunito
                        focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none rounded"
                    >
                        <option value="public">Herkes</option>
                        <option value="friends">Sadece Arkadaşlar</option>
                        <option value="private">Sadece Ben</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PrivacySettings;
