import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

type PageWithLayout = {
  Layout?: boolean;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Giriş Yap | PixelSınav</title>
      </Head>
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

            <form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="font-nunito text-neutral-300 block mb-2">
                    E-posta Adresin
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
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
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-neutral-500 focus:ring-2 focus:ring-orange-light focus:outline-none focus:border-orange-light font-nunito text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition-colors"
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
                    className="h-4 w-4 rounded border-neutral-600 bg-dark-800 text-primary focus:ring-orange-light focus:outline-none"
                  />
                  <label orange-light="remember-me" className="ml-2 font-nunito text-sm text-neutral-300">
                    Beni hatırla
                  </label>
                </div>
                <Link href="/forgot-password" className="font-nunito text-sm text-neutral-300 hover:underline">
                  Şifreni mi unuttun?
                </Link>
              </div>

              <Button type="submit" className="w-md cursor-pointer justify-center">
                Giriş Yap
              </Button>

              <p className="font-nunito text-neutral-400">
                Daha kayıt olmadın mı? {" "}
                <Link href="/register" className="text-orange-light hover:text-orange-light/70 transition-colors">
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
