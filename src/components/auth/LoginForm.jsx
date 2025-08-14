"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En production, vous auriez une vraie vérification ici
      if (email && password) {
        router.push('/dashboard/duels');
      } else {
        throw new Error('Email et mot de passe requis');
      }
    } catch (err) {
      setError(err.message || 'Échec de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1f2937] border border-white/10 rounded-xl overflow-hidden backdrop-blur-lg shadow-xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Connexion</h2>
              <p className="text-gray-400">Accédez à votre compte PlayInBet</p>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#6366f1] rounded focus:ring-[#6366f1] border-gray-600"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Se souvenir de moi
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#6366f1] hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6366f1] hover:bg-[#6366f1]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Pas encore de compte?{' '}
              <Link href="/" className="text-[#8b5cf6] hover:underline">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;