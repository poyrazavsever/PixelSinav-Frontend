import React, { useState } from 'react';

interface NotificationSettings {
    newLessons: boolean;
    examReminders: boolean;
    messages: boolean;
}

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState<NotificationSettings>({
        newLessons: true,
        examReminders: true,
        messages: false
    });

    const handleToggle = (setting: keyof NotificationSettings) => {
        setNotifications(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    return (
        <div className="bg-dark-800 border border-neutral-600 p-6">
            <h2 className="text-xl text-white font-pixelify mb-4">Bildirim Tercihleri</h2>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-nunito">Yeni Ders Bildirimleri</h3>
                        <p className="text-neutral-400 text-sm">İlgilendiğiniz kategorilerde yeni dersler eklendiğinde bildirim alın.</p>
                    </div>
                    <div className="relative inline-flex">
                        <input
                            type="checkbox"
                            checked={notifications.newLessons}
                            onChange={() => handleToggle('newLessons')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                            after:transition-all peer-checked:bg-orange-primary"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-nunito">Sınav Hatırlatıcıları</h3>
                        <p className="text-neutral-400 text-sm">Kayıtlı olduğunuz sınavlar başlamadan önce hatırlatma alın.</p>
                    </div>
                    <div className="relative inline-flex">
                        <input
                            type="checkbox"
                            checked={notifications.examReminders}
                            onChange={() => handleToggle('examReminders')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                            after:transition-all peer-checked:bg-orange-primary"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-nunito">Mesaj Bildirimleri</h3>
                        <p className="text-neutral-400 text-sm">Yeni mesaj aldığınızda bildirim alın.</p>
                    </div>
                    <div className="relative inline-flex">
                        <input
                            type="checkbox"
                            checked={notifications.messages}
                            onChange={() => handleToggle('messages')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                            after:transition-all peer-checked:bg-orange-primary"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
