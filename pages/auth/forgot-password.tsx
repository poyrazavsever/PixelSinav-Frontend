import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
  statusCode?: number;
}

type PageWithLayout = {
  Layout?: boolean;
};

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Mail gönderiliyor...");

    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ForgotPasswordResponse = await response.json();

      if (data.success) {
        toast.success(data.message);
        router.push("/");
      } else {
        toast.error(data.message || "Bir hata oluştu");
      }
    } catch (err) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Şifremi Unuttum | PixelSınav</title>
      </Head>
      <Toaster />
      <div className="min-h-screen flex">
        {/* Sol Kolon - Pixel Art Görsel */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent">
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
              <h2 className="font-pixelify text-4xl text-white">Unutkan mısın?</h2>
              <p className="font-nunito text-lg text-white/80">
                Endişelenme! E-posta adresini gir, sana yeni şifre oluşturman için bir bağlantı gönderelim.
              </p>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-dark"
        >
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="font-pixelify text-4xl text-orange-light mb-2">
                Şifremi Unuttum
              </h1>
              <p className="font-nunito text-neutral-300">
                E-posta adresini girerek şifreni sıfırlayabilirsin
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="font-nunito text-neutral-300 block mb-2">
                    E-posta Adresin
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                    placeholder="ornek@pixelsinav.com"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full sm:w-md cursor-pointer justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <img src="/loader.gif" alt="loading" className="w-5 h-5" />
                    Gönderiliyor...
                  </span>
                ) : (
                  "Şifremi Sıfırla"
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
      </div>
    </>
  );
};

(ForgotPassword as PageWithLayout).Layout = false;

export default ForgotPassword;