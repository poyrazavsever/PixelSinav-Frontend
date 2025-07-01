import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface Appearance{
    theme: 'dark' | 'light' | 'system';
}

const Appearance= () => {
    const [theme, setTheme] = useState<Appearance['theme']>('dark');

    const handleThemeChange = (theme: Appearance['theme']) => {
        setTheme(theme);
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
                            className={`p-4 bg-dark rounded-lg text-center transition-all ${theme === 'dark'
                                    ? 'border-2 border-orange-primary'
                                    : 'border border-neutral-600 hover:border-orange-primary/50'
                                }`}
                        >
                            <Icon
                                icon="pixelarticons:moon"
                                className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-orange-primary' : 'text-white'
                                    }`}
                            />
                            <span className="text-white">Koyu</span>
                        </button>
                        <button
                            onClick={() => handleThemeChange('light')}
                            className={`p-4 bg-dark rounded-lg text-center transition-all ${theme === 'light'
                                    ? 'border-2 border-orange-primary'
                                    : 'border border-neutral-600 hover:border-orange-primary/50'
                                }`}
                        >
                            <Icon
                                icon="pixelarticons:sun"
                                className={`w-8 h-8 mx-auto mb-2 ${theme === 'light' ? 'text-orange-primary' : 'text-white'
                                    }`}
                            />
                            <span className="text-white">Açık</span>
                        </button>
                        <button
                            onClick={() => handleThemeChange('system')}
                            className={`p-4 bg-dark rounded-lg text-center transition-all ${theme === 'system'
                                    ? 'border-2 border-orange-primary'
                                    : 'border border-neutral-600 hover:border-orange-primary/50'
                                }`}
                        >
                            <Icon
                                icon="pixelarticons:monitor"
                                className={`w-8 h-8 mx-auto mb-2 ${theme === 'system' ? 'text-orange-primary' : 'text-white'
                                    }`}
                            />
                            <span className="text-white">Sistem</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appearance
