import Image from "next/image";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section className="bg-gray pt-4 relative">
      {/* Dots Pattern Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-7xl container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left relative z-10">
            <h2 className="text-4xl md:text-5xl font-pixelify mb-6">
              <span className="text-white">Zaman </span>
              <span className="text-orange-light">Kaybetmeden,</span>
              <br />
              <span className="text-white">Hemen </span>
              <span className="text-orange-light">Başla</span>
            </h2>
            
            <p className="text-text font-nunito text-lg mb-8 max-w-xl">
              Sağ taraftaki akıllı dostun bu süreçte sana yardımcı olacak, 7/24 takıldığın,
              anlamadığın yerde yardımcı olacak. Çözemediğin soruları çözecek.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="filled" href="/login">
                Giriş Yap
              </Button>
              <Button 
                variant="outline"
                icon="pixelarticons:arrow-right"
                href="/exams"
              >
                Sınavlara Göz At
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/images/ctta.png"
              alt="AI Assistant"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
