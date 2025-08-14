'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="relative mt-32"> {/* Augmentation de l'espace pour le débordement */}

      {/* Section bleue semi-débordante */}
      <div className="absolute -top-32 left-0 right-0 h-64 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-full"
        >
          {/* Conteneur avec effet de débordement contrôlé */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4">
            <div className="bg-gradient-to-r from-[#0066FF] to-blue-600 rounded-t-3xl shadow-xl h-full">
              <div className="h-1/2"></div> {/* Partie vide pour le débordement */}
              
              {/* Contenu visible */}
              <div className="p-8 md:p-10 bg-white/5 backdrop-blur-sm rounded-t-3xl">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  {/* Bulle de dialogue avec effet 3D */}
                  <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg"
                  >
                    <div className="absolute -top-3 left-8 w-6 h-6 bg-white/10 border-l border-t border-white/20 transform rotate-45"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Restez informé des dernières actualités RH!
                    </h3>
                    <p className="text-white/80 mt-2 text-sm md:text-base">
                      Recevez nos insights directement dans votre boîte mail.
                    </p>
                  </motion.div>

                  {/* Formulaire premium */}
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex-1 max-w-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          placeholder="Email professionnel"
                          className="w-full px-5 py-3 rounded-full bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-500 text-gray-800"
                        />
                        <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 5px 15px rgba(255,255,255,0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white text-[#0066FF] font-semibold px-6 py-3 rounded-full whitespace-nowrap shadow-md hover:shadow-lg transition-all"
                      >
                        S'inscrire
                      </motion.button>
                    </div>
                    <p className="text-white/60 text-xs mt-2 text-center sm:text-left">
                      Vos données sont sécurisées. Désabonnement à tout moment.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer original (inchangé) */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-32 pb-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 pt-16">
          {/* Logo + Description */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-2"
          >
            <div className="relative h-12 w-48 mb-6">
              <Image 
                src="/logos/sgroup-main.svg" 
                alt="S’Group" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400">
              Groupe pluridisciplinaire fondé en 2022, alliant innovation et excellence opérationnelle.
            </p>
          </motion.div>

          {/* Liens */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {['Accueil', 'À propos', 'Filiales', 'Contact'].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-[#0066FF] transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@sgroup.com" className="hover:text-[#0066FF] transition-colors">contact@sgroup.com</a>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Akwa - Douala</p>
              </div>
              <div className="flex space-x-4 mt-4 pt-2">
                {['linkedin', 'instagram', 'facebook'].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="block w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-all"
                  >
                    <Image
                      src={`/${social}.png`} 
                      alt={social} 
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* Mentions légales */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} S’Group. Tous droits réservés.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#0066FF] transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-[#0066FF] transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}