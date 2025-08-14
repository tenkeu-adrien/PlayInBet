'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import TournamentBracket from '@/components/TournamentBracket';
import { FiAward, FiUser } from 'react-icons/fi';

const tournaments = [
  {
    id: '1',
    name: 'Tournois Hebdomadaire Valorant',
    game: 'Valorant',
    prize: 500,
    entryFee: 25,
    startTime: '2023-07-15T18:00:00Z',
    participants: 32,
    maxParticipants: 64,
    status: 'open',
    brackets: {
      rounds: [
        {
          name: 'Finale',
          matches: [
            { player1: 'Joueur A', player2: 'Joueur B', winner: null }
          ]
        },
        {
          name: 'Demi-finales',
          matches: [
            { player1: 'Joueur A', player2: 'Joueur C', winner: 'Joueur A' },
            { player1: 'Joueur B', player2: 'Joueur D', winner: 'Joueur B' }
          ]
        },
        {
          name: 'Quarts de finale',
          matches: [
            { player1: 'Joueur A', player2: 'Joueur E', winner: 'Joueur A' },
            { player1: 'Joueur B', player2: 'Joueur F', winner: 'Joueur B' },
            { player1: 'Joueur C', player2: 'Joueur G', winner: 'Joueur C' },
            { player1: 'Joueur D', player2: 'Joueur H', winner: 'Joueur D' }
          ]
        }
      ]
    }
  }
];

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const filteredTournaments = tournaments.filter(t => 
    activeTab === 'all' || t.status === activeTab
  );

  const handleJoinTournament = async (id) => {
    setLoading(true);
    try {
      // Simuler l'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/tournaments/${id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tournois</h1>
        <button 
          className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white px-6 py-2 rounded-lg"
          onClick={() => router.push('/tournaments/create')}
        >
          Créer un tournoi
        </button>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'open', 'in-progress', 'completed'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg capitalize ${activeTab === tab ? 'bg-[#6366f1] text-white' : 'bg-[#1f2937] hover:bg-[#1f2937]/80'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {filteredTournaments.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            Aucun tournoi trouvé
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTournaments.map(tournament => (
              <GlassCard key={tournament.id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-2">{tournament.name}</h2>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="bg-[#1f2937] px-3 py-1 rounded-full text-sm">
                        {tournament.game}
                      </span>
                      <span className="flex items-center text-[#f59e0b]">
                        <span className="mr-1">${tournament.prize}</span>
                        <FiAward />
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">{tournament.participants}/{tournament.maxParticipants}</span>
                        <FiUser />
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Commence le {new Date(tournament.startTime).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex justify-end">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        tournament.status === 'open' ? 'bg-[#10b981]/20 text-[#10b981]' :
                        tournament.status === 'in-progress' ? 'bg-[#06b6d4]/20 text-[#06b6d4]' :
                        'bg-[#ef4444]/20 text-[#ef4444]'
                      }`}>
                        {tournament.status.replace('-', ' ')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleJoinTournament(tournament.id)}
                      disabled={loading || tournament.status !== 'open'}
                      className={`w-full mt-4 py-2 rounded-lg ${
                        tournament.status === 'open' ? 
                        'bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 text-white' :
                        'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {loading ? 'Chargement...' : 
                        tournament.status === 'open' ? 'Rejoindre' : 
                        tournament.status === 'in-progress' ? 'En cours' : 'Terminé'}
                    </button>
                  </div>
                </div>
                
                {activeTab !== 'all' && (
                  <div className="mt-6">
                    <TournamentBracket brackets={tournament.brackets} />
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}