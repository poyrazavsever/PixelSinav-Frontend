import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";

interface RegisterResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: string;
        email: string;
        isVerified: boolean;
        roles: string[];
        privacy: {
            showActive: boolean;
            showProfilePicture: boolean;
            showBannerPicture: boolean;
            showProfile: boolean;
            showLocation: boolean;
            showStatics: boolean;
            _id: string;
        };
    };
}

type PageWithLayout = {
    Layout?: boolean;
};

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Şifre kontrolü
        if (formData.password !== formData.confirmPassword) {
            toast.error("Şifreler eşleşmiyor!");
            return;
        }

        // Şartlar kabul edildi mi?
        if (!formData.terms) {
            toast.error("Kullanım koşullarını kabul etmelisiniz!");
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading("Kayıt işlemi yapılıyor...");

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data: RegisterResponse = await response.json();

            if (data.success) {
                toast.success(data.message);
                // Token'ı localStorage'a kaydet
                localStorage.setItem("accessToken", data.token);
                // Kullanıcı bilgilerini localStorage'a kaydet
                localStorage.setItem("user", JSON.stringify(data.user));
                // Ana sayfaya yönlendir
                router.push("/");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            toast.dismiss(loadingToast);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Kayıt Ol | PixelSınav</title>
            </Head>
            <Toaster position="top-right" />
            <div className="min-h-screen flex">
                {/* Sol Kolon - Login Formu */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-dark"
                >
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h1 className="font-pixelify text-4xl text-orange-light mb-2">
                                Kayıt Ol
                            </h1>
                            <p className="font-nunito text-neutral-300">
                                Zaten hesabın var mı?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="font-nunito text-neutral-300 block mb-2">
                                        Kullanıcı Adı
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                                        placeholder="Kullanıcı Adınız"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="font-nunito text-neutral-300 block mb-2">
                                        E-posta Adresin
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                                        placeholder="ornek@pixelsinav.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="font-nunito text-neutral-300 block mb-2">
                                        Şifre
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-orange-light transition-colors"
                                        >
                                            <Icon
                                                icon={showPassword ? "pixelarticons:eye-closed" : "pixelarticons:eye"}
                                                className="w-5 h-5"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="font-nunito text-neutral-300 block mb-2">
                                        Şifre Tekrar
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-neutral-600 bg-dark-800 text-orange-light focus:ring-orange-light focus:outline-none"
                                />
                                <label htmlFor="terms" className="ml-2 font-nunito text-sm text-neutral-300">
                                    <Link href="/terms" className="text-orange-light hover:text-orange-light/70 transition-colors">
                                        Kullanım koşulları
                                    </Link>
                                    'nı okudum ve kabul ediyorum
                                </label>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full cursor-pointer justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Icon icon="pixelarticons:clock" className="w-5 h-5 animate-spin" />
                                        Kayıt yapılıyor...
                                    </span>
                                ) : (
                                    "Kayıt Ol"
                                )}
                            </Button>

                            <p className="font-nunito text-neutral-400">
                                Zaten hesabın var mı? {" "}
                                <Link href="/login" className="text-orange-light hover:text-orange-light/70 transition-colors">
                                    Giriş yap
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>

                {/* Sağ Kolon - Pixel Art Görsel */}
                <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent">
                        <img
                            src="/images/login.png"
                            alt="Pixel Art Background"
                            className="w-full h-full object-cover opacity-50 scale-125"
                        />
                    </div>
                    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
                        <Link href="/" className="inline-block">
                            <img src="/logo/logo.png" alt="PixelSınav Logo" className="h-12" />
                        </Link>
                        <div className="space-y-4">
                            <h2 className="font-pixelify text-4xl text-white">Pixel Sınav Ailesine Katıl!</h2>
                            <p className="font-nunito text-lg text-white/80">
                                Derslerini pixel pixel tamamla, başarıya ulaş.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

(RegisterPage as PageWithLayout).Layout = false;

export default RegisterPage;
