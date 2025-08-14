'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Ce champ est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Ce champ est requis';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Ce champ est requis';
    if (!formData.message.trim()) newErrors.message = 'Ce champ est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulaire soumis:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-10">
      <div className="flex flex-col md:flex-row">
        {/* Formulaire - Partie Gauche */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Contactez-nous</h3>
          
          {isSubmitted && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200"
            >
              Merci ! Votre message a bien été envoyé.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all`}
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all`}
              />
              {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all`}
              ></textarea>
              {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 102, 255, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0066FF] text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Envoyer le message
            </motion.button>
          </form>
        </motion.div>

        {/* Coordonnées - Partie Droite */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 bg-[#0E2148] text-white p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-8">Nos coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Image 
                    src="/location.png" 
                    alt="Adresse"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adresse</h4>
                  <p className="text-white/90"><br />Akwa - Douala</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Image 
                    src="/phone.png" 
                    alt="Téléphone"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Téléphone</h4>
                  <a href="tel:+33123456789" className="text-white/90 hover:text-white transition-colors">
                    +237 651563040
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Image 
                    src="/email.png" 
                    alt="Email"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:contact@sgroup.com" className="text-white/90 hover:text-white transition-colors">
                    contact@sgroup.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                {['linkedin', 'facebook', 'instagram'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                  >
                    <Image
                      src={`/${social}.png`}
                      alt={social}
                      width={20}
                      height={20}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Carte miniature */}
            {/* <div className="mt-10 bg-white/10 rounded-xl overflow-hidden border border-white/20">
              <Image
                src="/map.png"
                alt="Localisation"
                width={400}
                height={200}
                className="w-full h-auto"
              />
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}