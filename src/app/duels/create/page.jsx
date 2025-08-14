'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { FiUpload, FiX, FiAward, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CreateDuelPage() {
  const [game, setGame] = useState('');
  const [mode, setMode] = useState('');
  const [entryFee, setEntryFee] = useState(5);
  const [prize, setPrize] = useState(25);
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/duels/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          game,
          mode,
          entryFee,
          prize,
          maxPlayers,
          screenshot
        })
      });

      if (!response.ok) throw new Error('Erreur lors de la création du duel');

      const data = await response.json();
      router.push(`/duels/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => setScreenshot(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
<motion.div 
  className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4"

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="p-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border border-[#38bdf8]/20 shadow-lg">
        <motion.h1 
          className="text-3xl font-extrabold mb-6 text-[#38bdf8]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          🎮 Créer un nouveau duel
        </motion.h1>
        
        {error && (
          <motion.div 
            className="mb-4 p-3 bg-[#ef4444]/20 text-[#ef4444] rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Jeu */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium mb-2 text-[#38bdf8]">Jeu</label>
            <select
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full bg-[#1e293b] border border-[#38bdf8]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#38bdf8]"
              required
            >
              <option value="">Sélectionner un jeu</option>
              <option value="Fortnite">Fortnite</option>
              <option value="Valorant">Valorant</option>
              <option value="League of Legends">League of Legends</option>
              <option value="CS:GO">CS:GO</option>
            </select>
          </motion.div>

          {/* Mode de jeu */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.15 }}
          >
            <label className="block text-sm font-medium mb-2 text-[#38bdf8]">Mode de jeu</label>
            <input
              type="text"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-[#1e293b] border border-[#38bdf8]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#38bdf8]"
              placeholder="Battle Royale, Deathmatch, etc."
              required
            />
          </motion.div>

          {/* Mise et prix */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium mb-2 flex items-center text-[#38bdf8]">
                <FiAward className="mr-2" /> Mise d'entrée ($)
              </label>
              <input
                type="number"
                min="1"
                value={entryFee}
                onChange={(e) => setEntryFee(Number(e.target.value))}
                className="w-full bg-[#1e293b] border border-[#38bdf8]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#38bdf8]"
                required
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-medium mb-2 flex items-center text-[#38bdf8]">
                <FiAward className="mr-2" /> Prix à gagner ($)
              </label>
              <input
                type="number"
                min={entryFee}
                value={prize}
                onChange={(e) => setPrize(Number(e.target.value))}
                className="w-full bg-[#1e293b] border border-[#38bdf8]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#38bdf8]"
                required
              />
            </motion.div>
          </div>

          {/* Max joueurs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-2 flex items-center text-[#38bdf8]">
              <FiUsers className="mr-2" /> Nombre maximum de joueurs
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full bg-[#1e293b] border border-[#38bdf8]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#38bdf8]"
              required
            />
          </motion.div>

          {/* Screenshot */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.35 }}
          >
            <label className="block text-sm font-medium mb-2 flex items-center text-[#38bdf8]">
              <FiUpload className="mr-2" /> Capture d'écran (optionnel)
            </label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer bg-[#1e293b] border border-[#38bdf8]/30 rounded-lg px-4 py-2 hover:bg-[#0f172a] transition-colors">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                Choisir un fichier
              </label>
              {screenshot && (
                <div className="flex items-center">
                  <span className="text-sm mr-2 text-white">Image sélectionnée</span>
                  <button 
                    type="button" 
                    onClick={() => setScreenshot(null)}
                    className="text-[#ef4444] hover:text-[#ef4444]/80"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center shadow-md shadow-[#38bdf8]/30"
            >
              {loading ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                '🚀 Créer le duel'
              )}
            </button>
          </motion.div>
        </form>
      </GlassCard>
    </motion.div>
  );
}
