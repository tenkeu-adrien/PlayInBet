'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Gestion du scroll pour la navbar sticky
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Fermeture du menu mobile en changeant de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Liens de navigation
  const navLinks = [
    { name: 'Accueil', href: '/' },
    { 
      name: 'À propos', 
      href: '/about',
      subLinks: [
        { name: 'Histoire', href: '/about#histoire' },
        { name: 'Vision & Valeurs', href: '/about#vision' },
        { name: 'Fondateur', href: '/about#fondateur' }
      ]
    },
    { name: 'Filiales', href: '/filiales' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`fixed w-full z-50 ${scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-blue-700'} border-b ${scrolled ? 'border-gray-800' : 'border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image 
                src="/logos/sgroup-main.svg" 
                alt="S’Group" 
                width={140} 
                height={40}
                className="h-10 w-auto"
              />
            </motion.div>
          </a>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  className={`flex items-center px-1 py-2 text-xl font-medium ${pathname === link.href ? 'text-[#0066FF]' : 'text-white hover:text-[#0066FF]'} transition-colors`}
                >
                  {link.name}
                  {link.subLinks && (
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>

                {/* Sous-menu (dropdown) */}
                {link.subLinks && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 0, y: -10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-black/90 backdrop-blur-md border border-gray-800 invisible group-hover:visible transition-all duration-300"
                  >
                    <div className="py-1">
                      {link.subLinks.map((subLink) => (
                        <a
                          key={subLink.name}
                          href={subLink.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-[#0066FF] hover:bg-gray-800/50"
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Bouton mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-black/95 backdrop-blur-md overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <div key={link.name}>
              <a
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? 'bg-gray-900 text-[#0066FF]' : 'text-white hover:bg-gray-800'}`}
              >
                {link.name}
              </a>
              {link.subLinks && isOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {link.subLinks.map((subLink) => (
                    <a
                      key={subLink.name}
                      href={subLink.href}
                      className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800"
                    >
                      {subLink.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}