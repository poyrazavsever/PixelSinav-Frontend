import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Toggle from '@/components/ui/toggle';

interface NotificationSettings {
    emailNewsletter: {
        enabled: boolean;
        frequency: 'daily' | 'weekly' | 'monthly';
        preferences: {
            newCourses: boolean;
            updates: boolean;
            promotions: boolean;
        };
    };
    platformNotifications: {
        newLessons: boolean;
        examReminders: boolean;
        messages: boolean;
    };
}

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNewsletter: {
            enabled: true,
            frequency: 'weekly',
            preferences: {
                newCourses: true,
                updates: true,
                promotions: false
            }
        },
        platformNotifications: {
            newLessons: true,
            examReminders: true,
            messages: false
        }
    });

    const handlePlatformToggle = (setting: keyof typeof notifications.platformNotifications) => {
        setNotifications(prev => ({
            ...prev,
            platformNotifications: {
                ...prev.platformNotifications,
                [setting]: !prev.platformNotifications[setting]
            }
        }));
    };

    const handleNewsletterToggle = () => {
        setNotifications(prev => ({
            ...prev,
            emailNewsletter: {
                ...prev.emailNewsletter,
                enabled: !prev.emailNewsletter.enabled
            }
        }));
    };

    const handleFrequencyChange = (frequency: NotificationSettings['emailNewsletter']['frequency']) => {
        setNotifications(prev => ({
            ...prev,
            emailNewsletter: {
                ...prev.emailNewsletter,
                frequency
            }
        }));
    };

    const handlePreferenceToggle = (pref: keyof typeof notifications.emailNewsletter.preferences) => {
        setNotifications(prev => ({
            ...prev,
            emailNewsletter: {
                ...prev.emailNewsletter,
                preferences: {
                    ...prev.emailNewsletter.preferences,
                    [pref]: !prev.emailNewsletter.preferences[pref]
                }
            }
        }));
    };

    return (
        <div className="space-y-8">
            {/* E-posta Bülteni Bölümü */}
            <div className="overflow-hidden">
                <div className="p-6 border rounded-lg border-neutral-600">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-xl text-white font-pixelify flex items-center gap-2">
                                <Icon icon="pixelarticons:mail" className="w-6 h-6" />
                                E-posta Bülteni
                            </h2>
                            <p className="text-neutral-400 mt-1">
                                Size özel eğitim içerikleri ve güncellemelerden haberdar olun
                            </p>
                        </div>
                        <Toggle
                            checked={notifications.emailNewsletter.enabled}
                            onChange={handleNewsletterToggle}
                        />
                    </div>

                    {notifications.emailNewsletter.enabled && (
                        <div className="space-y-6">
                            {/* Bildirim Sıklığı */}
                            <div>
                                <label className="block text-white font-nunito mb-3">Bildirim Sıklığı</label>
                                <div className="flex gap-3">
                                    {(['daily', 'weekly', 'monthly'] as const).map((frequency) => (
                                        <button
                                            key={frequency}
                                            onClick={() => handleFrequencyChange(frequency)}
                                            className={`px-4 py-2 rounded transition-colors ${
                                                notifications.emailNewsletter.frequency === frequency
                                                    ? 'bg-orange-primary text-white'
                                                    : 'bg-dark-800 text-neutral-400 hover:text-white'
                                            }`}
                                        >
                                            {{
                                                daily: 'Günlük',
                                                weekly: 'Haftalık',
                                                monthly: 'Aylık'
                                            }[frequency]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bildirim Tercihleri */}
                            <div>
                                <label className="block text-white font-nunito mb-3">Bildirim Tercihleri</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                                        <div>
                                            <h4 className="text-white font-nunito">Yeni Dersler</h4>
                                            <p className="text-sm text-neutral-400">Yeni eklenen içerikler</p>
                                        </div>
                                        <Toggle
                                            checked={notifications.emailNewsletter.preferences.newCourses}
                                            onChange={() => handlePreferenceToggle('newCourses')}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                                        <div>
                                            <h4 className="text-white font-nunito">Güncellemeler</h4>
                                            <p className="text-sm text-neutral-400">Platform haberleri</p>
                                        </div>
                                        <Toggle
                                            checked={notifications.emailNewsletter.preferences.updates}
                                            onChange={() => handlePreferenceToggle('updates')}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                                        <div>
                                            <h4 className="text-white font-nunito">Kampanyalar</h4>
                                            <p className="text-sm text-neutral-400">Özel fırsatlar</p>
                                        </div>
                                        <Toggle
                                            checked={notifications.emailNewsletter.preferences.promotions}
                                            onChange={() => handlePreferenceToggle('promotions')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Platform Bildirimleri Bölümü */}
            <div className="bg-dark-800 border border-neutral-600 rounded-lg p-6">
                <h2 className="text-xl text-white font-pixelify mb-6 flex items-center gap-2">
                    <Icon icon="pixelarticons:bell" className="w-6 h-6" />
                    Platform Bildirimleri
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                        <div>
                            <h3 className="text-white font-nunito">Yeni Ders Bildirimleri</h3>
                            <p className="text-neutral-400 text-sm">İlgilendiğiniz kategorilerde yeni dersler eklendiğinde bildirim alın.</p>
                        </div>
                        <Toggle
                            checked={notifications.platformNotifications.newLessons}
                            onChange={() => handlePlatformToggle('newLessons')}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                        <div>
                            <h3 className="text-white font-nunito">Sınav Hatırlatıcıları</h3>
                            <p className="text-neutral-400 text-sm">Kayıtlı olduğunuz sınavlar başlamadan önce hatırlatma alın.</p>
                        </div>
                        <Toggle
                            checked={notifications.platformNotifications.examReminders}
                            onChange={() => handlePlatformToggle('examReminders')}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                        <div>
                            <h3 className="text-white font-nunito">Mesaj Bildirimleri</h3>
                            <p className="text-neutral-400 text-sm">Yeni mesaj aldığınızda bildirim alın.</p>
                        </div>
                        <Toggle
                            checked={notifications.platformNotifications.messages}
                            onChange={() => handlePlatformToggle('messages')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
