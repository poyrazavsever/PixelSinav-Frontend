import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface SecurityState {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
    sessions: {
        id: string;
        device: string;
        location: string;
        ip: string;
        isActive: boolean;
    }[];
}

const SecuritySettings = () => {
    const [securityData, setSecurityData] = useState<SecurityState>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,
        sessions: [
            {
                id: '1',
                device: 'Windows - Chrome',
                location: 'İstanbul, TR',
                ip: '192.168.1.1',
                isActive: true
            },
            {
                id: '2',
                device: 'iOS - Safari',
                location: 'Ankara, TR',
                ip: '192.168.1.2',
                isActive: false
            }
        ]
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSecurityData(prev => ({ ...prev, [name]: value }));
    };

    const toggleTwoFactor = () => {
        setSecurityData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
    };

    const handleSessionTerminate = (sessionId: string) => {
        setSecurityData(prev => ({
            ...prev,
            sessions: prev.sessions.filter(session => session.id !== sessionId)
        }));
    };

    return (
        <div className="space-y-6">
            {/* Şifre Değiştirme */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                <h2 className="text-xl text-white font-pixelify mb-4">Şifre Değiştir</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block font-nunito text-white mb-2">Mevcut Şifre</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-nunito text-white mb-2">Yeni Şifre</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-nunito text-white mb-2">Yeni Şifre (Tekrar)</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 bg-dark border border-neutral-600 text-white font-nunito
                            placeholder:text-neutral-400 focus:border-orange-primary focus:ring-1 focus:ring-orange-primary focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* İki Faktörlü Doğrulama */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl text-white font-pixelify">İki Faktörlü Doğrulama</h2>
                        <p className="text-neutral-400 text-sm mt-1">
                            Hesabınıza ekstra güvenlik katmanı ekleyin.
                        </p>
                    </div>
                    <div className="relative inline-flex">
                        <input
                            type="checkbox"
                            checked={securityData.twoFactorEnabled}
                            onChange={toggleTwoFactor}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                            after:transition-all peer-checked:bg-orange-primary"></div>
                    </div>
                </div>
            </div>

            {/* Oturum Geçmişi */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                <h2 className="text-xl text-white font-pixelify mb-4">Oturum Geçmişi</h2>
                <div className="space-y-4">
                    {securityData.sessions.map(session => (
                        <div key={session.id} className="flex justify-between items-center p-4 bg-dark">
                            <div>
                                <p className="text-white">{session.device}</p>
                                <p className="text-sm text-neutral-400">{session.location} • {session.ip}</p>
                            </div>
                            {session.isActive ? (
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-sm">Aktif</span>
                            ) : (
                                <button
                                    onClick={() => handleSessionTerminate(session.id)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Oturumu Kapat
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
