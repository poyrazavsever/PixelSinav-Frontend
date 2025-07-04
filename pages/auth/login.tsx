import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";

interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: {
    _id: string;
    email: string;
    roles: string[];
    isVerified: boolean;
  };
}

type PageWithLayout = {
  Layout?: boolean;
};

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (data.success) {
        // Token'ı localStorage'a kaydet
        localStorage.setItem("accessToken", data.accessToken);
        // Kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem("user", JSON.stringify(data.user));
        // Ana sayfaya yönlendir
        toast.success("Giriş başarılı!");
        router.push("/");
      } else {
        setError(data.message || "Giriş başarısız oldu.");
      }
    } catch (err) {
      toast.error("Giriş sırasında bir hata oluştu.");
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Giriş Yap | PixelSınav</title>
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
              <h2 className="font-pixelify text-4xl text-white">Pixel Sınav'a Hoş Geldin!</h2>
              <p className="font-nunito text-lg text-white/80">
                Derslerini pixel pixel tamamla, başarıya ulaş.
              </p>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Login Formu */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-dark"
        >
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="font-pixelify text-4xl text-orange-light mb-2">
                Giriş Yap
              </h1>
              <p className="font-nunito text-neutral-300">
                Hala giriş yapmadın mı?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 font-nunito text-sm">
                  {error}
                </div>
              )}
              
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
                <div>
                  <label htmlFor="password" className="font-nunito text-neutral-300 block mb-2">
                    Şifren
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-600 bg-dark-800 text-orange-light focus:ring-orange-light focus:outline-none"
                  />
                  <label htmlFor="remember-me" className="ml-2 font-nunito text-sm text-neutral-300">
                    Beni hatırla
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="font-nunito text-sm text-neutral-300 hover:text-orange-light transition-colors">
                  Şifreni mi unuttun?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full sm:w-md cursor-pointer justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Icon icon="pixelarticons:clock" className="w-5 h-5 animate-spin" />
                    Giriş yapılıyor...
                  </span>
                ) : (
                  "Giriş Yap"
                )}
              </Button>

              <p className="text-center font-nunito text-neutral-400">
                Daha kayıt olmadın mı? {" "}
                <Link href="/auth/register" className="text-orange-light hover:text-orange-light/70 transition-colors">
                  Kayıt ol
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

(LoginPage as PageWithLayout).Layout = false;

export default LoginPage;
