"use client"
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

const statusColors = {
  registration: { bg: 'bg-[#06b6d4]/20', text: 'text-[#06b6d4]', label: 'Registration Open' },
  ongoing: { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]', label: 'Ongoing' },
  completed: { bg: 'bg-[#10b981]/20', text: 'text-[#10b981]', label: 'Completed' },
};

const TournamentCard = ({ tournament }) => {
  const status = statusColors[tournament.status];
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-gradient-to-b from-[#ffffff]/10 to-[#ffffff]/5 border border-[#8b5cf6]/30 rounded-xl overflow-hidden backdrop-blur-xl"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
            <p className="text-[#c084fc]">{tournament.game}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#e0e0ff]">
              <FiAward className="mr-2 text-[#f59e0b]" />
              <span>${tournament.prizePool} Prize Pool</span>
            </div>
            <div className="flex items-center text-[#e0e0ff]">
              <FiUsers className="mr-2" />
              <span>
                {tournament.participants}/{tournament.maxParticipants} Players
              </span>
            </div>
          </div>

          <div className="flex items-center text-[#e0e0ff]">
            <FiCalendar className="mr-2" />
            <span>Starts: {new Date(tournament.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#8b5cf6]/10 px-5 py-3 border-t border-[#8b5cf6]/20">
        <Link href={`/tournaments/${tournament.id}`}>
          <button 
            type="button"
            className={`w-full ${
              tournament.status === 'registration' 
                ? 'bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] hover:opacity-90' 
                : 'bg-[#1f2937] cursor-not-allowed'
            } text-white py-2 rounded-lg transition-opacity`}
            disabled={tournament.status !== 'registration'}
          >
            {tournament.status === 'registration' ? 'Register Now' : 'View Details'}
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TournamentCard;