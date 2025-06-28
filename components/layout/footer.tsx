import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 max-w-7xl mx-auto container">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo/logo.png"
              alt="Pixel Sınav Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Şirket Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-pixelify text-xl mb-4">Şirket</h3>
            <ul className="space-y-2 font-nunito">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/vizyon-misyon" className="text-gray-300 hover:text-white">
                  Vizyon & Misyon
                </Link>
              </li>
              <li>
                <Link href="/kariyer" className="text-gray-300 hover:text-white">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-gray-300 hover:text-white">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="/yardim-merkezi" className="text-gray-300 hover:text-white">
                  Yardım Merkezi
                </Link>
              </li>
            </ul>
          </div>

          {/* Hemen Başla Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-pixelify text-xl mb-4">Hemen Başla</h3>
            <ul className="space-y-2 font-nunito">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/dersler" className="text-gray-300 hover:text-white">
                  Dersler
                </Link>
              </li>
              <li>
                <Link href="/sinavlar" className="text-gray-300 hover:text-white">
                  Sınavlar
                </Link>
              </li>
              <li>
                <Link href="/kategoriler" className="text-gray-300 hover:text-white">
                  Kategoriler
                </Link>
              </li>
              <li>
                <Link href="/yardim" className="text-gray-300 hover:text-white">
                  Yardım
                </Link>
              </li>
            </ul>
          </div>

          {/* Takip Edin Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-pixelify text-xl mb-4">Takip Edin</h3>
            <ul className="space-y-2 font-nunito">
              <li>
                <span className="text-gray-300">Github</span>
              </li>
              <li>
                <span className="text-gray-300">Instagram</span>
              </li>
              <li>
                <span className="text-gray-300">Reddit</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center font-nunito text-gray-400">
            <p>© 2025 Pixel Sınav</p>
            <p>
              Bu platform{" "}
              <Link href="https://www.pavsever.com" className="font-pixelify text-orange-light hover:text-orange-primary">
                Poyraz
              </Link>{" "}
              tarafından tasarlandı ve kodlandı.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;