'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactPage() {
  const departments = [
    {
      name: "Support Client",
      email: "support@sgroup.com",
      phone: "  +237 659 59 69 60",
      hours: "24h/24, 7j/7",
      icon: "/icons/support.svg"
    },
    {
      name: "Relations Investisseurs",
      email: "investors@sgroup.com",
      phone: "  +237 659 59 69 70",
      hours: "Lun-Ven, 9h-18h",
      icon: "/icons/investors.svg"
    },
    {
      name: "Partenariats",
      email: "partnerships@sgroup.com",
      phone: "  +237 690 59 69 60",
      hours: "Lun-Ven, 9h-19h",
      icon: "/icons/partnership.svg"
    },
    {
      name: "Recrutement",
      email: "careers@sgroup.com",
      phone: "  +237 633 59 69 60",
      hours: "Lun-Ven, 8h30-18h30",
      icon: "/icons/career.svg"
    }
  ];

  const faqs = [
    {
      question: "Comment puis-je devenir partenaire de S'Group ?",
      answer: "Notre équipe Partenariats examine chaque demande stratégique. Contactez-nous via le formulaire en précisant votre secteur d'activité."
    },
    {
      question: "Quel est le délai de réponse moyen ?",
      answer: "Nous nous engageons à répondre sous 24h pour les demandes urgentes et sous 72h pour les autres requêtes."
    },
    {
      question: "Puis-je visiter vos locaux ?",
      answer: "Nous organisons des visites sur rendez-vous pour nos partenaires et investisseurs. Contactez-nous pour planifier."
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#0066FF] to-blue-700">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/contact-network.jpg"
            alt="Réseau de connexion"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connectons-nous
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Votre vision, notre expertise - créons ensemble l'avenir
          </p>
        </motion.div>
      </section>

      {/* Formulaire + Coordonnées */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Formulaire */}
            <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2 text-[#0066FF]">Écrivez-nous</h2>
              <p className="text-gray-600 mb-8">
                Notre équipe vous répondra dans les plus brefs délais
              </p>
              
              {/* Votre formulaire existant ici */}
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Demande générale</option>
                    <option value="partnership">Partenariat</option>
                    <option value="career">Recrutement</option>
                    <option value="investor">Relations investisseurs</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#0066FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                  Envoyer le message
                </motion.button>
              </form>
            </div>

            {/* Coordonnées */}
            <div className="space-y-12">
              <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-[#0066FF]">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0066FF]/20 p-3 rounded-full">
                      <Image 
                        src="/location.png" 
                        alt="Adresse"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Siège social</h3>
                      <p className="text-gray-300">Tour S'Group</p>
                      <p className="text-gray-300">Akwa-Douala</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0066FF]/20 p-3 rounded-full">
                      <Image 
                        src="/phone.png" 
                        alt="Téléphone"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Téléphone</h3>
                      <a href="tel:+33123456789" className="text-gray-300 hover:text-[#0066FF] transition-colors">
                        +237 659 59 69 60
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0066FF]/20 p-3 rounded-full">
                      <Image 
                        src="/email.png" 
                        alt="Email"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email général</h3>
                      <a href="mailto:contact@sgroup.com" className="text-gray-300 hover:text-[#0066FF] transition-colors">
                        contact@sgroup.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-bold mb-4">Réseaux sociaux</h3>
                  <div className="flex gap-4">
                    {['linkedin',  'facebook', 'instagram'].map((social) => (
                                <a 
                                  key={social} 
                                  href="#" 
                                  className="hover:opacity-75 transition-opacity"
                                >
                                  <Image
                                    src={`/${social}.png`}
                                    alt={social}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10"
                                  />
                                </a>
                              ))}
                  </div>
                </div>
              </div>

              {/* Carte */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99144060821!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623251234567!5m2!1sfr!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="filter grayscale-[20%] hover:grayscale-0 transition-all"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services par département */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            Contactez le <span className="text-[#0066FF]">bon service</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
              >
                <div className="p-8">
                  <div className="bg-[#0066FF]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Image 
                      src={dept.icon} 
                      alt={dept.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{dept.name}</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${dept.email}`} className="hover:text-[#0066FF] transition-colors">{dept.email}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="hover:text-[#0066FF] transition-colors">{dept.phone}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{dept.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            Questions <span className="text-[#0066FF]">fréquentes</span>
          </motion.h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-3 text-[#0066FF]">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0066FF] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Prêt à transformer votre vision en réalité ?
          </motion.h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rencontrons-nous pour discuter de votre projet
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#0066FF] px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            >
              Prendre rendez-vous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              +237 6 52 50 49 80
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}