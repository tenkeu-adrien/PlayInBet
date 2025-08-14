"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div className=" px-4 text-gray-100 bg-gray-900">
      {/* Hero Section - Full Width */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center mb-28"
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src="/about.jpg"
          alt="Équipe S'Group"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-[#0066FF]">À propos</span> <span className="text-white">de S'Group</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Pionniers dans la création de synergies innovantes entre les secteurs clés de l'économie numérique.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <a href="#histoire" className="bg-[#0066FF] hover:bg-[#0055DD] text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Notre histoire
            </a>
            <a href="#valeurs" className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-lg font-medium transition-colors">
              Nos valeurs
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Container */}
      <div className="relative pb-20 max-w-6xl mx-auto">
        {/* Blue Background Block */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-[#0066FF]/20 to-transparent -z-10"></div>

        {/* Notre Histoire */}
        <motion.section
          id="histoire"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-28"
        >
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-8 text-[#0066FF] relative inline-block">
                Notre Histoire
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066FF] to-[#0066FF]/20"></span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-200">
                  Fondé en <span className="font-semibold text-white">janvier 2022</span>, S'Group est le fruit d'une vision ambitieuse visant à révolutionner l'écosystème des services professionnels par une approche intégrée.
                </p>
                <p className="text-lg leading-relaxed text-gray-200">
                  En seulement deux ans, nous avons bâti un réseau de quatre filiales spécialisées, chacune leader dans son domaine, tout en maintenant une cohésion stratégique remarquable.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { value: "4", label: "Filiales spécialisées" },
                    { value: "50+", label: "Collaborateurs experts" },
                    { value: "200+", label: "Clients satisfaits" },
                    { value: "100%", label: "Engagement qualité" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 backdrop-blur-sm"
                    >
                      <p className="text-2xl font-bold text-[#0066FF]">{stat.value}</p>
                      <p className="text-sm text-gray-300">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="md:w-1/2 relative h-96 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image 
                src="/images/office-building.jpg" 
                alt="Siège social S'Group" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <p className="text-white text-lg font-medium">Notre siège social à Paris, cœur de notre écosystème</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vision & Valeurs */}
        <motion.section 
          id="valeurs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Notre <span className="text-[#0066FF]">Philosophie</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Une vision claire soutenue par des valeurs fondamentales qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Vision Stratégique",
                  desc: "Devenir le leader européen des services intégrés d'ici 2030 en combinant innovation technologique et expertise sectorielle.",
                  icon: "🔭"
                },
                {
                  title: "Mission",
                  desc: "Offrir à nos clients des solutions transversales qui simplifient leur croissance tout en maximisant leur efficacité opérationnelle.",
                  icon: "🎯"
                },
                {
                  title: "Approche",
                  desc: "Une méthodologie agile centrée sur l'humain, combinant le meilleur des expertises spécialisées et des solutions globales.",
                  icon: "🔄"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex items-start gap-4 backdrop-blur-sm"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
              <Image
                src="/images/team-collaboration.jpg"
                alt="Équipe S'Group en collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end p-8">
                <div>
                  <p className="text-white text-lg mb-2">"L'intelligence collective au service de l'excellence"</p>
                  <p className="text-gray-300 text-sm">Notre équipe pluridisciplinaire en session de travail</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Valeurs fondamentales */}
        <motion.section 
          className="mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Nos <span className="text-[#0066FF]">Valeurs Fondamentales</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Innovation", 
                desc: "Nous investissons 15% de notre chiffre d'affaires en R&D pour anticiper les besoins futurs de nos clients.",
                color: "from-blue-900/30 to-blue-900/10"
              },
              { 
                title: "Excellence", 
                desc: "Certifiés ISO 9001, nous maintenons des standards qualité inégalés dans tous nos services.",
                color: "from-purple-900/30 to-purple-900/10"
              },
              { 
                title: "Synergie", 
                desc: "Nos filiales partagent connaissances et ressources pour offrir des solutions intégrées uniques.",
                color: "from-teal-900/30 to-teal-900/10"
              },
              { 
                title: "Intégrité", 
                desc: "Une éthique irréprochable guide chacune de nos décisions et relations clients.",
                color: "from-emerald-900/30 to-emerald-900/10"
              },
              { 
                title: "Agilité", 
                desc: "Structure lean nous permettant de nous adapter rapidement aux évolutions de marché.",
                color: "from-amber-900/30 to-amber-900/10"
              },
              { 
                title: "Impact", 
                desc: "Nous mesurons notre succès à l'aune de la valeur créée pour nos clients et la société.",
                color: "from-red-900/30 to-red-900/10"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${item.color} p-8 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm`}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#0066FF]">0{i+1}</span>
                  <span className="text-white">{item.title}</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mot du Fondateur */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl mb-28"
        >
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
          <div className="bg-gradient-to-r from-[#0066FF]/20 to-black/80 backdrop-blur-sm p-12 relative">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#0066FF] flex-shrink-0"
              >
                <Image 
                  src="/images/fondateur.jpg" 
                  alt="Fondateur S'Group" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0066FF]/20 mix-blend-overlay"></div>
              </motion.div>
              <div>
                <blockquote className="text-2xl leading-relaxed italic mb-6 text-white font-light">
                  "S'Group incarne la conviction qu'en connectant intelligemment les expertises, nous pouvons créer des solutions bien plus puissantes que la simple somme de leurs parties. Notre succès réside dans cette alchimie unique entre spécialisation et vision globale."
                </blockquote>
                <div>
                  <p className="font-bold text-lg">— Pierre Martin</p>
                  <p className="text-gray-300">Président Directeur Général & Fondateur</p>
                  <div className="flex gap-2 mt-4">
                    <a href="#" className="text-[#0066FF] hover:text-white transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Engagement RSE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 rounded-2xl p-12 border border-gray-700 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Notre <span className="text-[#0066FF]">Engagement</span> RSE
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Chez S'Group, nous croyons que la performance économique doit aller de pair avec la responsabilité sociale et environnementale.
              </p>
              <ul className="space-y-4">
                {[
                  "Politique zéro papier dans 80% de nos processus",
                  "Programme de formation continue pour nos collaborateurs",
                  "Partenariats avec des écoles pour favoriser l'insertion professionnelle",
                  "Compensation carbone de 120% de nos émissions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#0066FF] mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden border border-gray-700">
              <Image
                src="/images/sustainability.jpg"
                alt="Engagement RSE S'Group"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <p className="text-white font-medium">Notre engagement pour un avenir durable</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}