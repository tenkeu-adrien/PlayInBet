'use client'
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { FiSend, FiClock, FiUsers, FiAward, FiMessageSquare } from 'react-icons/fi';

// Données fictives pour un duel
const mockDuel = {
  id: '123',
  game: 'Fortnite',
  mode: 'Battle Royale Solo',
  status: 'En cours',
  endTime: new Date(Date.now() + 3600000).toISOString(), // 1 heure dans le futur
  players: [
    { id: '1', username: 'ProGamer99', avatar: 'P' },
    { id: '2', username: 'NinjaWarior', avatar: 'N' },
    { id: '3', username: 'VictoryQueen', avatar: 'V' },
  ],
  maxPlayers: 4,
  prize: 50
};

// Messages initiaux fictifs
const initialMessages = [
  {
    id: 1,
    user: 'ProGamer99',
    avatar: 'P',
    text: 'Prêt à gagner ce duel !',
    timestamp: new Date(Date.now() - 60000).toISOString()
  },
  {
    id: 2,
    user: 'NinjaWarior',
    avatar: 'N',
    text: 'Bon courage à tous !',
    timestamp: new Date(Date.now() - 30000).toISOString()
  }
];

export default function DuelRoomPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [duel, setDuel] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setDuel(mockDuel);
      
      // Calculer le temps restant
      const endTime = new Date(mockDuel.endTime).getTime();
      const now = new Date().getTime();
      setTimeLeft(Math.max(0, Math.floor((endTime - now) / 1000)));
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    // Ajouter le nouveau message
    const newMessage = {
      id: Date.now(),
      user: user.username,
      avatar: user.username.charAt(0),
      text: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (!duel) return <div className="text-center py-8 text-[#ef4444]">Duel non trouvé</div>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations du duel */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">{duel.game}</h1>
                <p className="text-gray-400">{duel.mode}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-[#f59e0b]">
                  <FiClock className="mr-2" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
                <div className="bg-[#10b981]/20 text-[#10b981] px-3 py-1 rounded-full text-sm">
                  {duel.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1f2937] p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <FiUsers className="mr-2" />
                  <span>Joueurs</span>
                </div>
                <div className="text-xl font-bold">
                  {duel.players.length}/{duel.maxPlayers}
                </div>
              </div>
              <div className="bg-[#1f2937] p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <FiAward className="mr-2" />
                  <span>Prix</span>
                </div>
                <div className="text-xl font-bold">${duel.prize}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Participants:</h3>
              <div className="flex flex-wrap gap-3">
                {duel.players.map(player => (
                  <div key={player.id} className="flex items-center bg-[#1f2937] px-3 py-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">{player.avatar}</span>
                    </div>
                    <span>{player.username}</span>
                  </div>
                ))}
                {/* Ajouter le joueur actuel s'il n'est pas déjà dans la liste */}
                {user && !duel.players.some(p => p.id === user.id) && (
                  <div className="flex items-center bg-[#1f2937] px-3 py-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">{user.username.charAt(0)}</span>
                    </div>
                    <span>{user.username}</span>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Zone de capture d'écran */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold mb-4">Preuve de victoire</h2>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
              <p className="text-gray-400 mb-4">Déposez votre capture d'écran ici</p>
              <button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white px-4 py-2 rounded-lg">
                Uploader une image
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Chat intégré */}
        <GlassCard className="p-6 h-full">
          <h2 className="text-xl font-bold mb-4">Chat du duel</h2>
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#8b5cf6] flex items-center justify-center mr-3">
                  <span className="text-xs font-bold">{msg.avatar}</span>
                </div>
                <div>
                  <div className="font-medium">{msg.user}</div>
                  <div className="text-sm">{msg.text}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-[#1f2937] border border-white/10 rounded-l-lg px-4 py-2 focus:outline-none"
              placeholder="Envoyer un message..."
            />
            <button 
              type="submit"
              className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white px-4 py-2 rounded-r-lg flex items-center"
            >
              <FiSend />
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}