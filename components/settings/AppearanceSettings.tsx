import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface AppearanceSettings {
    theme: 'dark' | 'light' | 'system';
    fontSize: number;
}

const AppearanceSettings = () => {
    const [settings, setSettings] = useState<AppearanceSettings>({
        theme: 'dark',
        fontSize: 16
    });

    const handleThemeChange = (theme: AppearanceSettings['theme']) => {
        setSettings(prev => ({ ...prev, theme }));
    };

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings(prev => ({ ...prev, fontSize: Number(e.target.value) }));
    };

    return (
        <div className="bg-dark-800 border border-neutral-600 p-6">
            <h2 className="text-xl text-white font-pixelify mb-4">Görünüm Ayarları</h2>
            <div className="space-y-6">
                {/* Tema Seçimi */}
                <div>
                    <label className="block font-nunito text-white mb-2">Tema</label>
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => handleThemeChange('dark')}
                            className={`p-4 bg-dark rounded-lg text-center transition-all ${settings.theme === 'dark'
                                    ? 'border-2 border-orange-primary'
                                    : 'border border-neutral-600 hover:border-orange-primary/50'
                                }`}
                        >
                            <Icon
                                icon="pixelarticons:moon"
                                className={`w-8 h-8 mx-auto mb-2 ${settings.theme === 'dark' ? 'text-orange-primary' : 'text-white'
                                    }`}
                            />
                            <span className="text-white">Koyu</span>
                        </button>
                        <button
                            onClick={() => handleThemeChange('light')}
                            className={`p-4 bg-dark rounded-lg text-center transition-all ${settings.theme === 'light'
                                    ? 'border-2 border-orange-primary'
                                    : 'border border-neutral-600 hover:border-orange-primary/50'
                                }`}
                        >
                            <Icon
                                icon="pixelarticons:sun"
                                className={`w-8 h-8 mx-auto mb-2 ${settings.theme === 'light' ? 'text-orange-primary' : 'text-white'
                                    }`}
                            />
                            <span className="text-white">Açık</span>
                        </button>
                        <button
                            onClick={() => handleThemeChange('system')}
                            className={`p-4 bg-dark rounded-lg text-center transition-all ${settings.theme === 'system'
                                    ? 'border-2 border-orange-primary'
                                    : 'border border-neutral-600 hover:border-orange-primary/50'
                                }`}
                        >
                            <Icon
                                icon="pixelarticons:monitor"
                                className={`w-8 h-8 mx-auto mb-2 ${settings.theme === 'system' ? 'text-orange-primary' : 'text-white'
                                    }`}
                            />
                            <span className="text-white">Sistem</span>
                        </button>
                    </div>
                </div>

                {/* Font Boyutu */}
                <div>
                    <label className="block font-nunito text-white mb-2">
                        Font Boyutu
                        <span className="ml-2 text-neutral-400">({settings.fontSize}px)</span>
                    </label>
                    <input
                        type="range"
                        min="12"
                        max="20"
                        value={settings.fontSize}
                        onChange={handleFontSizeChange}
                        className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-orange-primary"
                    />
                    <div className="flex justify-between text-neutral-400 text-sm mt-1">
                        <span>12px</span>
                        <span>16px</span>
                        <span>20px</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppearanceSettings;
