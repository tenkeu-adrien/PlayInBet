'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CompanyHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden mt-26">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/team-photo.jpg" // Remplacez par votre photo d'équipe
          alt="Équipe S'Group"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl font-light tracking-widest text-[#0066FF] mb-2">
            DEPUIS 2022
          </p>
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-[#0066FF]">S'Group</span> <span className="font-light">- Une Success Story</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-xl md:text-2xl leading-relaxed mb-10">
            De nos débuts visionnaires en 2022 à notre position actuelle de leader,
            nous avons construit un écosystème d'excellence où l'innovation rencontre
            l'exécution parfaite.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: "4", label: "Filiales" },
              { value: "50+", label: "Collaborateurs" },
              { value: "100%", label: "Engagement" },
              { value: "∞", label: "Ambitions" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#0066FF] mb-2">{item.value}</p>
                <p className="text-sm md:text-base uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Flèche indicateur */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Effets visuels */}
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 -right-20 w-80 h-80 bg-[#0066FF] rounded-full filter blur-[100px] opacity-20"
      />
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#0066FF] rounded-full filter blur-[100px] opacity-20"
      />
    </section>
  );
}