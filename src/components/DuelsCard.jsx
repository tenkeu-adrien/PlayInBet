'use client'
import React from 'react';
import Link from 'next/link';
import { FiUsers, FiAward, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const statusColors = {
  waiting: { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]', label: 'Waiting' },
  'in-progress': { bg: 'bg-[#06b6d4]/20', text: 'text-[#06b6d4]', label: 'In Progress' },
  completed: { bg: 'bg-[#10b981]/20', text: 'text-[#10b981]', label: 'Completed' },
};

const DuelCard = ({ duel }) => {
  const status = statusColors[duel.status];
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-gradient-to-b from-[#ffffff]/10 to-[#ffffff]/5 border border-[#8b5cf6]/30 rounded-xl overflow-hidden backdrop-blur-xl"
    >
      <div 
        className="h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${duel.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{duel.game}</h3>
          <p className="text-[#c084fc]">{duel.mode}</p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-[#e0e0ff]">
              <FiUsers className="mr-2" />
              <span>
                {duel.players}/{duel.maxPlayers} players
              </span>
            </div>
            <div className="flex items-center text-[#e0e0ff]">
              <FiClock className="mr-2" />
              <span>{new Date(duel.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <FiAward className="mr-2 text-[#f59e0b]" />
              <span className="font-medium text-white">${duel.prize} prize</span>
            </div>
            <span className="text-[#e0e0ff]">${duel.entryFee} entry</span>
          </div>
        </div>
      </div>

      <div className="bg-[#8b5cf6]/10 px-5 py-3 border-t border-[#8b5cf6]/20 flex gap-3">
        <button 
          type="button" 
          className="flex-1 bg-transparent border border-[#8b5cf6] text-[#e0e0ff] hover:bg-[#8b5cf6]/20 transition-colors py-2 rounded-lg"
        >
          Details
        </button>
        <Link href={`/duels/${duel.id}`} className="flex-1">
          <button 
            type="button" 
            className="w-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] text-white hover:opacity-90 transition-opacity py-2 rounded-lg"
          >
            {duel.status === 'completed' ? 'Results' : 'Join'}
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DuelCard;