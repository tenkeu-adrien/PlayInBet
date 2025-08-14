'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const filiales = [
  {
    name: "Tréso",
    sector: "Fintech",
    description: "Solutions innovantes de gestion de trésorerie et d'optimisation financière pour les entreprises.",
    logo: "/logos/treso.svg",
    stats: [
      { value: "10MF", label: "Transactions mensuelles" },
      { value: "200+", label: "Clients entreprises" },
      { value: "98%", label: "Satisfaction clients" }
    ],
    achievements: [
      "Prix de l'Innovation Financière 2023",
      "Certification ISO 27001",
      "Partenariat avec la Banque de France"
    ]
  },
  {
    name: "weGo",
    sector: "Mobilité",
    description: "Plateforme de transport durable et partagé révolutionnant les déplacements urbains.",
    logo: "/logos/zego.svg",
    stats: [
      { value: "15K", label: "Utilisateurs actifs" },
      { value: "500+", label: "Véhicules verts" },
      { value: "4.9/5", label: "Note moyenne" }
    ],
    achievements: [
      "Trophée de la Mobilité Durable 2023",
      "Partenariat avec 20 villes françaises",
      "Flotte 100% électrique dès 2024"
    ]
  },
  {
    name: "ASF",
    sector: "Restauration",
    description: "Restauration rapide premium avec des circuits courts et des ingrédients locaux.",
    logo: "/logos/asf.svg",
    stats: [
      { value: "30", label: "Points de vente" },
      { value: "95%", label: "Produits locaux" },
      { value: "1M", label: "Clients/mois" }
    ],
    achievements: [
      "Label Restaurant Durable 2023",
      "Meilleure Chaîne Fast-Casual 2022",
      "100% des emballages compostables"
    ]
  },
  {
    name: "S'Consulting",
    sector: "Conseil",
    description: "Accompagnement stratégique sur mesure pour la transformation digitale et organisationnelle.",
    logo: "/logos/consulting.svg",
    stats: [
      { value: "80", label: "Consultants experts" },
      { value: "120+", label: "Projets annuels" },
      { value: "100%", label: "Clients renouvelés" }
    ],
    achievements: [
      "Top 10 des Cabinets de Conseil 2023",
      "Certifié Great Place to Work",
      "Prix de l'Excellence Client"
    ]
  }
];

export default function FilialesPage() {
  return (
    <div className="bg-grayy-900 text-white bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-24 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/filiales.png"
            alt="Écosystème S'Group"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Notre <span className="text-[#0066FF]">Écosystème</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Quatre expertises complémentaires, une seule vision : transformer les industries par l'innovation.
          </p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="mb-10 pt-10 bg-gray-900 px-10 h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center bg-gray-800/50 p-12 rounded-2xl border border-gray-700"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                La puissance de <span className="text-[#0066FF]">l'interconnexion</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Depuis 2022, S'Group a construit un réseau de filiales stratégiques où chaque entité renforce les autres, 
                créant des synergies uniques sur le marché.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#0066FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Télécharger notre brochure
                </button>
                <button className="border border-[#0066FF] text-[#0066FF] px-6 py-3 rounded-lg font-medium hover:bg-[#0066FF]/10 transition-colors">
                  Voir notre vidéo
                </button>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden border border-gray-700">
              <Image
                src="/images/synergy-concept.jpg"
                alt="Synergies S'Group"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid des Filiales */}
      <section className="mb-24 bg-gray-900 h-[70vh]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center pt-10"
          >
            Découvrez nos <span className="text-[#0066FF]">Filiales</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filiales.map((filiale, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-[#0066FF]/50 transition-all shadow-lg"
              >
                <div className="p-8">
                  <div className="relative h-20 w-20 mb-6">
                    <Image 
                      src={filiale.logo} 
                      alt={filiale.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{filiale.name}</h3>
                  <p className="text-[#0066FF] mb-4">{filiale.sector}</p>
                  <p className="text-gray-300 mb-6">{filiale.description}</p>
                  <a 
                    href={`/filiales/${filiale.name.toLowerCase()}`} 
                    className="inline-flex items-center text-[#0066FF] hover:text-blue-400 font-medium group"
                  >
                    En savoir plus
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Détails par Filiale */}
      {filiales.map((filiale, index) => (
        <section key={index} className={`mb-24 bg-gray-900 ${index % 2 === 0 ? 'bg-[#0066FF]/10' : 'bg-gray-800/50'}`}>
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={`${index % 2 === 0 ? 'md:order-2' : ''}`}>
                <div className="relative h-96 rounded-xl overflow-hidden border-2 border-gray-700/50 shadow-2xl">
                  <Image
                    src={`/images/${filiale.name.toLowerCase()}-showcase.jpg`}
                    alt={filiale.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 mr-4">
                    <Image 
                      src={filiale.logo} 
                      alt={filiale.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">{filiale.name}</h3>
                </div>
                <h4 className="text-xl text-[#0066FF] mb-4">{filiale.sector}</h4>
                <p className="text-gray-300 mb-8">{filiale.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {filiale.stats.map((stat, i) => (
                    <div key={i} className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 hover:border-[#0066FF]/50 transition-colors">
                      <p className="text-2xl font-bold text-[#0066FF]">{stat.value}</p>
                      <p className="text-xs uppercase tracking-wider text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h5 className="font-semibold mb-3 text-lg">Réalisations majeures :</h5>
                  <ul className="space-y-3">
                    {filiale.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start bg-gray-900/30 p-3 rounded-lg border border-gray-800 hover:border-[#0066FF]/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg className="w-5 h-5 text-[#0066FF] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0066FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                  Découvrir {filiale.name}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Final */}
      <section className="py-20 mt-10 bg-gradient-to-r from-[#0066FF] to-blue-800 ">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Prêt à collaborer avec l'une de nos filiales ?
          </motion.h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nos équipes sont à votre disposition pour discuter de vos besoins spécifiques.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-[#0066FF] px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
          >
            Prendre contact
          </motion.button>
        </div>
      </section>
    </div>
  );
}