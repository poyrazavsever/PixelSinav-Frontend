import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="bg-dark-primary min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-pixelify text-white mb-6">
            <span>Sınavlara </span>
            <span className="text-orange-primary">Hazırlanmanın</span>
            <br />
            <span>En </span>
            <span className="text-orange-primary">Akıllı </span>
            <span>Yolu</span>
          </h1>
          
          <p className="text-gray-300 font-nunito text-lg md:text-xl mb-12 max-w-2xl">
            Kendi hızında çalış, zamana karşı yarış, sonuçlarını anında gör. 
            Öğrenciler için sade, eğitmenler için güçlü bir sınav platformu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="filled"
              icon="pixelarticons:arrow-right"
              href="/sinavlara-goz-at"
            >
              Sınavlara Göz At
            </Button>
            <Button
              variant="outline"
              href="/egitmen-kayit"
            >
              Eğitmen Olarak Katıl
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
