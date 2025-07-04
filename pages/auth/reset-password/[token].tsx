import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
  statusCode?: number;
}

type PageWithLayout = {
  Layout?: boolean;
};

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      toast.error("Yeni şifreniz eski şifrenizle aynı olamaz!");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Şifreniz güncelleniyor...");

    try {
      const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data: ResetPasswordResponse = await response.json();

      if (data.success) {
        toast.success(data.message);
        // 3 saniye bekle ve login sayfasına yönlendir
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        toast.error(data.message || "Bir hata oluştu");
      }
    } catch (err) {
      toast.error("Şifre sıfırlama sırasında bir hata oluştu.");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Şifre Sıfırlama | PixelSınav</title>
      </Head>
      <Toaster position="top-right" />
      <div className="min-h-screen flex">
        {/* Sol Kolon - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-dark"
        >
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="font-pixelify text-4xl text-orange-light mb-2">
                Şifre Sıfırlama
              </h1>
              <p className="font-nunito text-neutral-300">
                Yeni şifreni oluştur ve hesabına tekrar erişim sağla
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="font-nunito text-neutral-300 block mb-2">
                    Eski Şifren
                  </label>
                  <div className="relative">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type={showOldPassword ? "text" : "password"}
                      required
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-orange-light transition-colors"
                    >
                      <Icon
                        icon={showOldPassword ? "pixelarticons:eye-closed" : "pixelarticons:eye"}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="font-nunito text-neutral-300 block mb-2">
                    Yeni Şifren
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-orange-light transition-colors"
                    >
                      <Icon
                        icon={showNewPassword ? "pixelarticons:eye-closed" : "pixelarticons:eye"}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="font-nunito text-neutral-300 block mb-2">
                    Yeni Şifre Tekrar
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full sm:w-md cursor-pointer justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Icon icon="pixelarticons:clock" className="w-5 h-5 animate-spin" />
                    Güncelleniyor...
                  </span>
                ) : (
                  "Şifremi Güncelle"
                )}
              </Button>

              <p className="font-nunito text-neutral-400">
                Şifreni hatırladın mı? {" "}
                <Link href="/auth/login" className="text-orange-light hover:text-orange-light/70 transition-colors">
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
              <h2 className="font-pixelify text-4xl text-white">Güvenlik Önemli!</h2>
              <p className="font-nunito text-lg text-white/80">
                Güçlü bir şifre seç ve hesabını güvende tut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

(ResetPassword as PageWithLayout).Layout = false;

export default ResetPassword;