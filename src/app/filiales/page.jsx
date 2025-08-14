"use client"
import FilialesPage from '@/components/FilialesPage';
import { motion } from 'framer-motion';
import Image from 'next/image';

const filiales = [
  {
    name: "Tréso",
    sector: "Fintech",
    desc: "Solutions de gestion financière innovantes pour les entreprises",
    logo: "/logos/tréso.svg",
    link: "#"
  },
    {
      name: "weGo",
      sector: "Mobilité",
      desc: "Plateforme de transport durable et partagé",
      logo: "/logos/zego.svg"
    },
    {
      name: "ASF",
      sector: "Restauration",
      desc: "Restauration rapide de qualité avec circuits courts",
      logo: "/logos/asf.svg"
    },
    {
      name: "S'Consulting",
      sector: "Conseil",
      desc: "Accompagnement stratégique sur mesure",
      logo: "/logos/consulting.svg"
    }
  // ... (Zego, ASF, S’consulting)
];

export default function Filiales() {
  return (
    <div className="max-ww-4xl mx-auto px-v4 py-20 ">


{/* <div className=" text-white h-[400px] w-full bg-black mb-10">
      <div className=" px-4 text-center">
      <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold pt-20">
            Notre <span className="text-[#0066FF]">Écosystème</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Quatre expertises complémentaires, une seule vision : transformer les industries par l'innovation.
          </p>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </motion.div>
      </div>

    
    </div> */}

<FilialesPage />



    </div>
  );
}