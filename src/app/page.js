'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validation simple côté client
      if (password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En production, vous auriez une vraie inscription ici
      if (username && email && password) {
        router.push('/dashboard');
      } else {
        throw new Error('Tous les champs sont requis');
      }
    } catch (err) {
      setError(err.message || "Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1f2937] border border-white/10 rounded-xl overflow-hidden backdrop-blur-lg shadow-xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Inscription</h2>
              <p className="text-gray-400">Créez votre compte PlayInBet</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center bg-[#ef4444]/20 text-[#ef4444] p-3 rounded-lg mb-6"
              >
                <FiAlertCircle className="mr-2" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-500" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="Votre pseudo"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#6366f1] rounded focus:ring-[#6366f1] border-gray-600"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-[#6366f1] hover:underline">
                    conditions d'utilisation
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "S'inscrire"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Déjà un compte?{' '}
              <Link href="/login" className="text-[#6366f1] hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}