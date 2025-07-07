import React from 'react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
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

const SecuritySettings: React.FC<ProfileSettingsProps> = ({ userData }) => {

    const handleChangePassword = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/forgot-password', {
                email: userData?.email
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success('Şifre sıfırlama bağlantısı gönderildi!');
        } catch (error) {
            console.error('Şifre sıfırlama hatası:', error);
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };

    const handleVerifyMail = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/verify-email', {
                email: userData?.email
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success('E-posta doğrulama bağlantısı gönderildi!');
        } catch (error) {
            console.error('E-posta doğrulama hatası:', error);
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="space-y-6">
            {/* Şifre Değiştirme */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                <h2 className="text-xl text-white font-pixelify mb-4">Şifre Değiştir</h2>
                <Button variant='filled' onClick={handleChangePassword}>Şifre Sıfırlama Bağlantısı Al</Button>
            </div>


            {/* Email Doğrula */}
            <div className="bg-dark-800 border border-neutral-600 p-6">
                {
                    userData?.isVerified ? (
                        <h2 className="text-xl text-green-500 font-pixelify mb- 4">E-posta Adresiniz Doğrulandı</h2>
                    ) : ( <>
                            <h2 className="text-xl text-white font-pixelify mb-4">E-Postanı Doğrula</h2>
                            <Button variant='filled' onClick={handleVerifyMail}>E-Posta Doğrulama Bağlantısı</Button>
                    
                    </> )
                }
            </div>
        </div>
    );
};

export default SecuritySettings;
