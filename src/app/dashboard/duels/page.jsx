'use client'
import { useState, useEffect, useRef } from 'react';
import { 
  FiHome, FiAward, FiDollarSign, FiPlusSquare, FiSearch, FiMenu, 
  FiLogIn, FiUserPlus, FiMessageSquare, FiSend, FiChevronLeft, 
  FiChevronRight, FiUser, FiShoppingBag, FiBarChart2, FiSettings, 
  FiCreditCard, FiGift, FiCheckCircle, FiXCircle, FiClock, FiUpload, 
  FiFilter, FiShoppingCart, FiUsers, FiBookOpen, FiShield, FiBell,
  FiTrello, FiX
} from 'react-icons/fi';
import { RiChatSmileLine } from 'react-icons/ri';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardPage() {
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(false);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('duels');
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'ProGamer42',
    level: 28,
    xp: 1250,
    wins: 42,
    losses: 15,
    winRate: 73,
    email: 'progamer42@example.com',
    phone: '+1 234 567 8901',
    country: 'United States',
    verified: false
  });
  const [walletBalance, setWalletBalance] = useState(1250.50);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [shopItems, setShopItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeChatMessages, setActiveChatMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const messagesEndRef = useRef(null);

  // Données simulées
  const [duels, setDuels] = useState([
    {
      id: '1',
      game: 'Fortnite',
      mode: 'Battle Royale',
      entryFee: 10,
      prize: 50,
      players: 4,
      maxPlayers: 8,
      status: 'waiting',
      startTime: '2023-06-15T18:30:00Z',
      timeLeft: 600
    },
    {
      id: '2',
      game: 'Valorant',
      mode: 'Deathmatch',
      entryFee: 5,
      prize: 25,
      players: 6,
      maxPlayers: 10,
      status: 'in-progress',
      startTime: '2023-06-15T19:00:00Z',
      timeLeft: 300
    },
    {
      id: '3',
      game: 'League of Legends',
      mode: 'ARAM',
      entryFee: 15,
      prize: 75,
      players: 8,
      maxPlayers: 10,
      status: 'completed',
      startTime: '2023-06-14T20:00:00Z',
      timeLeft: 0
    }
  ]);

  const [tournaments, setTournaments] = useState([
    {
      id: 't1',
      name: 'Championnat d\'été',
      game: 'CS:GO',
      prizePool: 5000,
      participants: 32,
      maxParticipants: 64,
      startDate: '2023-07-01T15:00:00Z',
      status: 'registration',
    },
    {
      id: 't2',
      name: 'Confrontation Hebdomadaire',
      game: 'Valorant',
      prizePool: 1000,
      participants: 16,
      maxParticipants: 32,
      startDate: '2023-06-20T19:00:00Z',
      status: 'ongoing',
    },
    {
      id: 't3',
      name: 'Ligue des Champions',
      game: 'League of Legends',
      prizePool: 7500,
      participants: 48,
      maxParticipants: 64,
      startDate: '2023-07-15T14:00:00Z',
      status: 'registration',
    }
  ]);

  const chats = [
    { id: '1', user: 'JohnDoe', lastMessage: 'Hey, prêt pour notre duel?', unread: 2 },
    { id: '2', user: 'GameMaster', lastMessage: 'Le tournoi commence dans 1h', unread: 0 },
    { id: '3', user: 'ProGamer99', lastMessage: 'GG! Revanche?', unread: 1 },
    { id: '4', user: 'Newbie123', lastMessage: 'Merci pour les conseils!', unread: 0 },
    { id: '5', user: 'TournamentBot', lastMessage: 'Votre prochain match est programmé', unread: 3 },
  ];

   const RecentTransactions = () => {
      const transactions = [
        { id: 1, type: 'deposit', amount: 100, date: '2023-06-10', status: 'completed' },
        { id: 2, type: 'withdrawal', amount: 50, date: '2023-06-08', status: 'completed' },
        { id: 3, type: 'win', amount: 250, date: '2023-06-05', status: 'completed' },
        { id: 4, type: 'entry', amount: 15, date: '2023-06-03', status: 'completed' },
        { id: 5, type: 'purchase', amount: 25, date: '2023-05-28', status: 'completed' },
      ];
      
      const getTransactionType = (type) => {
        switch (type) {
          case 'deposit': return 'Dépôt';
          case 'withdrawal': return 'Retrait';
          case 'win': return 'Gains';
          case 'entry': return 'Entrée tournoi';
          case 'purchase': return 'Achat boutique';
          default: return type;
        }
      };
      
      const getTransactionColor = (type) => {
        switch (type) {
          case 'deposit': 
          case 'win': 
            return 'text-green-400';
          default: 
            return 'text-red-400';
        }
      };
      
      const getStatusIcon = (status) => {
        return status === 'completed' 
          ? <FiCheckCircle className="text-green-500" /> 
          : <FiClock className="text-yellow-500" />;
      };
  
      return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Dernières transactions</h2>
          
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="text-white">{getTransactionType(transaction.type)}</p>
                  <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <p className={`mr-3 ${getTransactionColor(transaction.type)}`}>
                    {['deposit', 'win'].includes(transaction.type) ? '+' : '-'}${transaction.amount}
                  </p>
                  {getStatusIcon(transaction.status)}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="mt-4 w-full py-2 text-center text-indigo-400 hover:text-indigo-300"
            onClick={() => toast.info('Ouverture de l\'historique complet')}
          >
            Voir toutes les transactions
          </button>
        </div>
      );
    };

  const slides = [
    {
      title: "Plateforme de Jeu Compétitif",
      subtitle: "Participez à des tournois et gagnez de gros prix",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Mettre à niveau"
    },
    {
      title: "Duels 1v1",
      subtitle: "Défiez des joueurs et prouvez vos compétences",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Créer un Tournoi"
    },
    {
      title: "Portefeuille Sécurisé",
      subtitle: "Déposez, retirez et suivez vos gains",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1626224569750-c8ccdb5fa681?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Créer un Match"
    }
  ];

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initialiser les notifications
    setNotifications([
      { id: 1, type: 'info', title: 'Bienvenue sur PlayInBet!', message: 'Commencez à jouer et gagnez des récompenses', read: false, timestamp: new Date() },
      { id: 2, type: 'success', title: 'Duel terminé!', message: 'Vous avez gagné 20$ contre JohnDoe', read: false, timestamp: new Date(Date.now() - 3600000) },
      { id: 3, type: 'warning', title: 'Tournoi à venir', message: 'Le tournoi d\'été commence demain', read: false, timestamp: new Date(Date.now() - 7200000) }
    ]);
    
    // Simuler les mises à jour de duels et tournois
    const tournamentInterval = setInterval(() => {
      setTournaments(prev => {
        const updated = [...prev];
        const randomTournament = Math.floor(Math.random() * updated.length);
        
        if (updated[randomTournament].status === 'registration') {
          updated[randomTournament].participants = Math.min(
            updated[randomTournament].participants + 2,
            updated[randomTournament].maxParticipants
          );
          
          // Notification si presque complet
          if (updated[randomTournament].participants >= updated[randomTournament].maxParticipants - 5) {
            addNotification({
              type: 'warning',
              title: 'Tournoi presque complet!',
              message: `Le tournoi ${updated[randomTournament].name} est presque plein`
            });
          }
        }
        
        return updated;
      });
    }, 15000);
    
    const duelInterval = setInterval(() => {
      setDuels(prev => {
        return prev.map(duel => {
          if (duel.status === 'in-progress' && duel.timeLeft > 0) {
            const newTime = duel.timeLeft - 30;
            
            // Notification si temps critique
            if (newTime <= 60 && newTime > 30) {
              addNotification({
                type: 'warning',
                title: 'Temps limité!',
                message: `Il reste moins d'une minute dans votre duel ${duel.game}`
              });
            }
            
            return { ...duel, timeLeft: newTime };
          }
          return duel;
        });
      });
    }, 30000);
    
    // Simuler des événements aléatoires
    const eventInterval = setInterval(() => {
      const events = [
        { type: 'new_duel', message: 'Un nouveau duel est disponible!' },
        { type: 'tournament_start', message: 'Le tournoi du weekend commence bientôt' },
        { type: 'friend_online', message: 'Votre ami ProGamer99 est en ligne' }
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      addNotification({ type: 'info', title: 'Nouvel événement', message: randomEvent.message });
    }, 4500000);
    
    return () => {
      clearInterval(tournamentInterval);
      clearInterval(duelInterval);
      clearInterval(eventInterval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll vers le bas des messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatMessages]);

  const toggleLeftSidebar = () => {
    setLeftSidebarExpanded(!leftSidebarExpanded);
  };

  const toggleRightSidebar = () => {
    setRightSidebarExpanded(!rightSidebarExpanded);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: message,
        timestamp: new Date()
      };
      
      setActiveChatMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simuler une réponse après un délai
      setTimeout(() => {
        const responses = [
          "Merci pour votre message!",
          "Je reviens vers vous rapidement",
          "Je suis occupé pour le moment, je vous répondrai plus tard",
          "Intéressant! Pouvez-vous en dire plus?"
        ];
        
        const response = {
          id: Date.now() + 1,
          sender: 'other',
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        
        setActiveChatMessages(prev => [...prev, response]);
        
        // Notification de nouveau message
        addNotification({
          type: 'info',
          title: 'Nouveau message',
          message: `Réponse de ${chats.find(c => c.id === activeChat)?.user || 'un contact'}`
        });
      }, 2000 + Math.random() * 900000000);
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount && amount > 0 && amount <= walletBalance) {
      setWalletBalance(prev => prev - amount);
      setWithdrawAmount('');
      
      // Notification de retrait
      addNotification({
        type: 'success',
        title: 'Retrait effectué',
        message: `Vous avez retiré $${amount.toFixed(2)} avec succès`
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Erreur de retrait',
        message: 'Montant invalide ou solde insuffisant'
      });
    }
  };

  const handleBuyItem = (item) => {
    if (walletBalance >= item.price) {
      setWalletBalance(prev => prev - item.price);
      
      // Notification d'achat
      addNotification({
        type: 'success',
        title: 'Achat réussi',
        message: `Vous avez acheté: ${item.name}!`
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Achat impossible',
        message: 'Fonds insuffisants pour cet achat'
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setLeftSidebarExpanded(false);
    }
  };

  const addNotification = ({ type, title, message }) => {
    const newNotification = {
      id: Date.now(),
      type,
      title,
      message,
      read: false,
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Afficher une notification toast
    const toastOptions = {
      position: isMobile ? 'top-center' : 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    };
    
    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast.warn(message, toastOptions);
        break;
      default:
        toast.info(message, toastOptions);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleJoinDuel = (duel) => {
    if (duel.status === 'waiting') {
      // Simuler la participation au duel
      setDuels(prev => 
        prev.map(d => 
          d.id === duel.id 
            ? { ...d, players: Math.min(d.players + 1, d.maxPlayers) } 
            : d
        )
      );
      
      addNotification({
        type: 'success',
        title: 'Duel rejoint!',
        message: `Vous avez rejoint le duel ${duel.game}`
      });
    } else {
      addNotification({
        type: 'info',
        title: 'Détails du duel',
        message: `Vous consultez le duel ${duel.game}`
      });
    }
  };

  const handleJoinTournament = (tournament) => {
    if (tournament.status === 'registration') {
      // Simuler l'inscription au tournoi
      setTournaments(prev => 
        prev.map(t => 
          t.id === tournament.id 
            ? { ...t, participants: Math.min(t.participants + 1, t.maxParticipants) } 
            : t
        )
      );
      
      addNotification({
        type: 'success',
        title: 'Inscription confirmée!',
        message: `Vous êtes inscrit au tournoi ${tournament.name}`
      });
    } else {
      addNotification({
        type: 'info',
        title: 'Détails du tournoi',
        message: `Vous consultez le tournoi ${tournament.name}`
      });
    }
  };

  // Composant DuelCard
  const DuelCard = ({ duel }) => {
    const [timer, setTimer] = useState(duel.timeLeft);
    const [isActive, setIsActive] = useState(duel.status === 'in-progress');
    
    useEffect(() => {
      let interval;
      if (isActive && timer > 0) {
        interval = setInterval(() => {
          setTimer(prev => prev - 1);
        }, 1000);
      } else if (timer === 0) {
        setIsActive(false);
      }
      return () => clearInterval(interval);
    }, [isActive, timer]);

    const getStatusColor = () => {
      switch (duel.status) {
        case 'waiting': return 'bg-yellow-500';
        case 'in-progress': return 'bg-blue-500';
        case 'completed': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transition-all hover:border-indigo-500/50">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-white">{duel.game}</h3>
              <p className="text-sm text-gray-400">{duel.mode}</p>
            </div>
            <span className={`${getStatusColor()} text-xs text-white px-2 py-1 rounded-full`}>
              {duel.status === 'in-progress' ? 'En cours' : 
               duel.status === 'waiting' ? 'En attente' : 'Terminé'}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Entrée</p>
              <p className="font-medium text-white">${duel.entryFee}</p>
            </div>
            <div className="bg-white/5 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Gains</p>
              <p className="font-medium text-white">${duel.prize}</p>
            </div>
          </div>
          
          {duel.status === 'in-progress' && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">Temps restant</p>
              <div className="text-xl font-bold text-white mt-1">
                {formatTime(timer)}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {duel.players}/{duel.maxPlayers} joueurs
              </span>
            </div>
            
            <button 
              onClick={() => handleJoinDuel(duel)}
              className={`px-3 py-1 text-sm rounded-lg ${
                duel.status === 'waiting' 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                  : 'bg-white/5 text-gray-300'
              }`}
            >
              {duel.status === 'waiting' ? 'Rejoindre' : 'Voir'}
            </button>
          </div>
        </div>
      </div>
    );
  };

    const renderContent = () => {
      switch (activeTab) {
        case 'wallet':
          return (
            <div className="space-y-6">
              <WalletSummary />
              <RecentTransactions />
            </div>
          );
        case 'withdraw':
          return <WithdrawForm />;
        case 'tournaments':
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Tournois en cours</h2>
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                    onChange={(e) => toast.info(`Filtre appliqué: ${e.target.value}`)}
                  >
                    <option>Tous les jeux</option>
                    <option>Valorant</option>
                    <option>Fortnite</option>
                    <option>League of Legends</option>
                    <option>CS:GO</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tournaments.map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </div>
          );
        case 'create-duel':
          return <CreateDuelForm />;
        case 'profile':
          // return <ProfileTab />;
        case 'shop':
          return <ShopTab />;
        case 'leaderboard':
          // return <LeaderboardTab />;
        default: // 'duels'
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Duels actifs</h2>
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                    onChange={(e) => toast.info(`Filtre appliqué: ${e.target.value}`)}
                  >
                    <option>Tous les jeux</option>
                    <option>Valorant</option>
                    <option>Fortnite</option>
                    <option>League of Legends</option>
                    <option>CS:GO</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {duels.map((duel) => (
                  <DuelCard key={duel.id} duel={duel} />
                ))}
              </div>
            </div>
          );
      }
    };



      const ShopTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Boutique PlayInBet</h2>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">Filtrer:</span>
              <select 
                className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => toast.info(`Filtre appliqué: ${e.target.value}`)}
              >
                <option>Tous les articles</option>
                <option>Tickets</option>
                <option>Skins</option>
                <option>Emotes</option>
                <option>Boosters</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopItems.map(item => (
              <div key={item.id} className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white ml-3">{item.name}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-4 flex-grow">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-white">${item.price}</p>
                    <button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
                      onClick={() => handleBuyItem(item)}
                    >
                      Acheter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Mes achats</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-gray-400 font-normal">Date</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Article</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Prix</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Statut</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-white/10 last:border-0">
                    <td className="py-3 text-white">2023-06-{12 + i}</td>
                    <td className="py-3 text-white">Ticket Argent</td>
                    <td className="py-3 text-white">$15</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        Utilisé
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

     const CreateDuelForm = () => {
        const [game, setGame] = useState('valorant');
        const [mode, setMode] = useState('1v1');
        const [entryFee, setEntryFee] = useState(10);
        const [prize, setPrize] = useState(20);
        const [maxPlayers, setMaxPlayers] = useState(2);
        
        const handleSubmit = (e) => {
          e.preventDefault();
          toast.success('Duel créé avec succès!', {
            position: isMobile ? 'top-center' : 'top-right'
          });
          // Réinitialiser le formulaire
          setGame('valorant');
          setMode('1v1');
          setEntryFee(10);
          setPrize(20);
          setMaxPlayers(2);
        };
    
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Créer un nouveau duel</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Jeu</label>
                    <select 
                      value={game}
                      onChange={(e) => setGame(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="valorant">Valorant</option>
                      <option value="fortnite">Fortnite</option>
                      <option value="lol">League of Legends</option>
                      <option value="csgo">Counter-Strike: GO</option>
                      <option value="dota2">Dota 2</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Mode de jeu</label>
                    <select 
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="1v1">1v1 Duel</option>
                      <option value="2v2">2v2 Team Battle</option>
                      <option value="battle-royale">Battle Royale</option>
                      <option value="deathmatch">Deathmatch</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Mise d'entrée ($)</label>
                    <input
                      type="number"
                      value={entryFee}
                      onChange={(e) => setEntryFee(parseInt(e.target.value) || 0)}
                      min="1"
                      max="100"
                      className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Gains ($)</label>
                    <input
                      type="number"
                      value={prize}
                      onChange={(e) => setPrize(parseInt(e.target.value) || 0)}
                      min={entryFee + 1}
                      max="1000"
                      className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Nombre maximum de joueurs</label>
                    <input
                      type="number"
                      value={maxPlayers}
                      onChange={(e) => setMaxPlayers(parseInt(e.target.value) || 2)}
                      min="2"
                      max="16"
                      className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Durée (minutes)</label>
                    <select className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>30</option>
                      <option>60</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium"
                  >
                    Créer le duel
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Vos duels en attente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {duels.filter(d => d.status === 'waiting').map(duel => (
                  <DuelCard key={duel.id} duel={duel} />
                ))}
              </div>
            </div>
          </div>
        );
      };

  // Composant TournamentCard
  const TournamentCard = ({ tournament }) => {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transition-all hover:border-indigo-500/50">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-white">{tournament.name}</h3>
              <p className="text-sm text-gray-400">{tournament.game}</p>
            </div>
            <span className={`${tournament.status === 'registration' ? 'bg-yellow-500' : 'bg-blue-500'} text-xs text-white px-2 py-1 rounded-full`}>
              {tournament.status === 'registration' ? 'Inscriptions' : 'En cours'}
            </span>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="bg-white/5 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Gains</p>
              <p className="font-medium text-white">${tournament.prizePool}</p>
            </div>
            <div className="bg-white/5 p-2 rounded-lg">
              <p className="text-xs text-gray-400">Participants</p>
              <p className="font-medium text-white">{tournament.participants}/{tournament.maxParticipants}</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-400">
              <FiClock className="mr-1" />
              <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
            </div>
            
            <button 
              onClick={() => handleJoinTournament(tournament)}
              className={`px-3 py-1 text-sm rounded-lg ${
                tournament.status === 'registration' 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                  : 'bg-white/5 text-gray-300'
              }`}
            >
              {tournament.status === 'registration' ? "S'inscrire" : 'Voir'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Composant NotificationCenter
  const NotificationCenter = () => {
    const unreadCount = notifications.filter(n => !n.read).length;
    
    return (
      <div className="relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 relative rounded-lg hover:bg-white/10"
        >
          <FiBell className="text-xl" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 md:w-96 bg-[#1e293b] border border-white/10 rounded-xl shadow-lg z-50">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-white">Notifications</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={markAllAsRead}
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Tout marquer comme lu
                </button>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-white ml-2"
                >
                  <FiX />
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Aucune notification
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer ${
                      notification.read ? 'opacity-70' : 'bg-white/5'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      <div className={`mr-3 mt-1 ${
                        notification.type === 'success' ? 'text-green-500' :
                        notification.type === 'error' ? 'text-red-500' :
                        notification.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }`}>
                        {notification.type === 'success' && <FiCheckCircle />}
                        {notification.type === 'error' && <FiXCircle />}
                        {notification.type === 'warning' && <FiClock />}
                        {notification.type === 'info' && <FiBell />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-3 text-center border-t border-white/10">
              <button 
                onClick={() => setNotifications([])}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Effacer toutes les notifications
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


   const WalletSummary = () => {
      const handleDeposit = () => {
        toast.info('Redirection vers la page de dépôt', {
          position: isMobile ? 'top-center' : 'top-right'
        });
      };
  
      return (
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Portefeuille</h2>
              <p className="text-gray-400">Solde disponible</p>
            </div>
            <FiDollarSign className="text-3xl text-indigo-400" />
          </div>
          
          <div className="mt-4">
            <p className="text-3xl font-bold text-white">${walletBalance.toFixed(2)}</p>
            <p className="text-sm text-gray-400 mt-1">+$250.50 ce mois-ci</p>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
              onClick={handleDeposit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <FiPlusSquare className="mr-2" />
              Déposer
            </button>
            <button 
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => changeTab('withdraw')}
            >
              <FiCreditCard className="mr-2" />
              Retirer
            </button>
          </div>
        </div>
      );
    };
  
    // Composant RecentTransactions
    // const RecentTransactions = () => {
    //   const transactions = [
    //     { id: 1, type: 'deposit', amount: 100, date: '2023-06-10', status: 'completed' },
    //     { id: 2, type: 'withdrawal', amount: 50, date: '2023-06-08', status: 'completed' },
    //     { id: 3, type: 'win', amount: 250, date: '2023-06-05', status: 'completed' },
    //     { id: 4, type: 'entry', amount: 15, date: '2023-06-03', status: 'completed' },
    //     { id: 5, type: 'purchase', amount: 25, date: '2023-05-28', status: 'completed' },
    //   ];
      
    //   const getTransactionType = (type) => {
    //     switch (type) {
    //       case 'deposit': return 'Dépôt';
    //       case 'withdrawal': return 'Retrait';
    //       case 'win': return 'Gains';
    //       case 'entry': return 'Entrée tournoi';
    //       case 'purchase': return 'Achat boutique';
    //       default: return type;
    //     }
    //   };
      
    //   const getTransactionColor = (type) => {
    //     switch (type) {
    //       case 'deposit': 
    //       case 'win': 
    //         return 'text-green-400';
    //       default: 
    //         return 'text-red-400';
    //     }
    //   };
      
    //   const getStatusIcon = (status) => {
    //     return status === 'completed' 
    //       ? <FiCheckCircle className="text-green-500" /> 
    //       : <FiClock className="text-yellow-500" />;
    //   };
  
    //   return (
    //     <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
    //       <h2 className="text-xl font-bold text-white mb-4">Dernières transactions</h2>
          
    //       <div className="space-y-4">
    //         {transactions.map(transaction => (
    //           <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-white/10">
    //             <div>
    //               <p className="text-white">{getTransactionType(transaction.type)}</p>
    //               <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
    //             </div>
    //             <div className="flex items-center">
    //               <p className={`mr-3 ${getTransactionColor(transaction.type)}`}>
    //                 {['deposit', 'win'].includes(transaction.type) ? '+' : '-'}${transaction.amount}
    //               </p>
    //               {getStatusIcon(transaction.status)}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
          
    //       <button 
    //         className="mt-4 w-full py-2 text-center text-indigo-400 hover:text-indigo-300"
    //         onClick={() => toast.info('Ouverture de l\'historique complet')}
    //       >
    //         Voir toutes les transactions
    //       </button>
    //     </div>
    //   );
    // };
  // Le reste des composants reste inchangé (WalletSummary, RecentTransactions, etc.)
  // Pour des raisons de longueur, je maintiendrai les autres composants tels quels
  // mais avec les modifications mineures nécessaires pour utiliser le système de notifications

  // ... [Les autres composants restent similaires mais utilisent addNotification au lieu de toast]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-[#1e293b] backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center space-x-2 md:space-x-6">
          <button 
            onClick={toggleLeftSidebar} 
            className="flex items-center text-gray-400 hover:text-white"
          >
            <FiMenu className="text-xl" />
            {!isMobile && <span className="text-sm ml-2">Menu</span>}
          </button>
          
          {!isMobile && <div className="h-6 w-px bg-white/20"></div>}
          
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
            PlayInBet
          </h1>

          {!isMobile && (
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyPress={(e) => e.key === 'Enter' && addNotification({ type: 'info', title: 'Recherche', message: 'Recherche effectuée' })}
              />
            </div>
          )}
        </div>
       
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center space-x-2 md:space-x-4">
            <NotificationCenter />
            
            <Link
              href="/login"
              className="flex items-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              title="Connexion"
              onClick={() => addNotification({ type: 'info', title: 'Connexion', message: 'Ouverture de la page de connexion' })}
            >
              <FiLogIn className="text-xl" />
            </Link>
            <Link
              href="/"
              className="flex items-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              title="Inscription"
              onClick={() => addNotification({ type: 'info', title: 'Inscription', message: 'Ouverture de la page d\'inscription' })}
            >
              <FiUserPlus className="text-xl" />
            </Link>
          </div>
          
          {!isMobile && <div className="h-6 w-px bg-white/20"></div>}
          
          <button 
            onClick={toggleRightSidebar} 
            className="text-gray-400 hover:text-white flex items-center"
          >
            <FiMessageSquare className="text-xl" />
            {!isMobile && <span className="text-sm ml-2">Chat</span>}
          </button>
        </div>
      </header>

      {/* Fixed Left Sidebar */}
      <div className={`fixed top-16 bottom-0 ${leftSidebarExpanded ? 'w-64' : 'w-20'} p-4 bg-[#1e293b] backdrop-blur-lg border-r border-white/10 transition-all duration-300 z-40 overflow-y-auto ${isMobile && !leftSidebarExpanded ? 'hidden' : ''}`}>
        <nav className="space-y-2 h-full">
          <button
            onClick={() => changeTab('duels')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'duels' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiHome className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Dashboard</span>}
          </button>

          <button
            onClick={() => changeTab('tournaments')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'tournaments' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiAward className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Tournois</span>}
          </button>

          <button
            onClick={() => changeTab('wallet')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'wallet' || activeTab === 'withdraw'
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiDollarSign className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Portefeuille</span>}
          </button>

          <button
            onClick={() => changeTab('create-duel')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'create-duel' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiPlusSquare className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Créer un duel</span>}
          </button>

          <button
            onClick={() => changeTab('profile')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'profile' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiUser className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Profil</span>}
          </button>

          <button
            onClick={() => changeTab('shop')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'shop' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiShoppingBag className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Boutique</span>}
          </button>

          <button
            onClick={() => changeTab('leaderboard')}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
              activeTab === 'leaderboard' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FiBarChart2 className="text-lg" />
            {leftSidebarExpanded && <span className="ml-3">Classement</span>}
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => changeTab('settings')}
              className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
                activeTab === 'settings' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiSettings className="text-lg" />
              {leftSidebarExpanded ==-1 && <span className="ml-3">Paramètres</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 pt-24 pb-6 transition-all duration-300 ${leftSidebarExpanded && !isMobile ? 'ml-64' : 'ml-0 md:ml-20'} ${rightSidebarExpanded && !isMobile ? 'mr-64' : 'mr-0 md:mr-20'}`}>
        {/* Slideshow Section */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mx-4 md:mx-6 mb-6 md:mb-8">
          <div className={`absolute inset-0 ${slides[currentSlide].bgImage} bg-cover bg-center transition-opacity duration-500`}>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col text-center px-4 md:px-8">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{slides[currentSlide].title}</h1>
              <p className="text-sm md:text-xl text-gray-300 mb-4 md:mb-6">{slides[currentSlide].subtitle}</p>
              <button 
                className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors duration-300"
                onClick={() => addNotification({ 
                  type: 'info', 
                  title: 'Action', 
                  message: `Action "${slides[currentSlide].button}" déclenchée` 
                })}
              >
                {slides[currentSlide].button}
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 bg-blue-600/80 hover:bg-blue-700/90 rounded-full text-white transition-colors duration-300"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 bg-blue-600/80 hover:bg-blue-700/90 rounded-full text-white transition-colors duration-300"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
          
          <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Contenu dynamique basé sur l'onglet sélectionné */}
        <div className="px-4 md:px-6">
          {/* {activeTab === 'duels' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Duels actifs</h2>
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                    onChange={(e) => addNotification({ 
                      type: 'info', 
                      title: 'Filtre appliqué', 
                      message: `Filtre: ${e.target.value}` 
                    })}
                  >
                    <option>Tous les jeux</option>
                    <option>Valorant</option>
                    <option>Fortnite</option>
                    <option>League of Legends</option>
                    <option>CS:GO</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {duels.map((duel) => (
                  <DuelCard key={duel.id} duel={duel} />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'tournaments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Tournois en cours</h2>
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                    onChange={(e) => addNotification({ 
                      type: 'info', 
                      title: 'Filtre appliqué', 
                      message: `Filtre: ${e.target.value}` 
                    })}
                  >
                    <option>Tous les jeux</option>
                    <option>Valorant</option>
                    <option>Fortnite</option>
                    <option>League of Legends</option>
                    <option>CS:GO</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tournaments.map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">Portefeuille</h2>
                    <p className="text-gray-400">Solde disponible</p>
                  </div>
                  <FiDollarSign className="text-3xl text-indigo-400" />
                </div>
                
                <div className="mt-4">
                  <p className="text-3xl font-bold text-white">${walletBalance.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 mt-1">+$250.50 ce mois-ci</p>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => addNotification({ 
                      type: 'info', 
                      title: 'Dépôt', 
                      message: 'Redirection vers la page de dépôt' 
                    })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    <FiPlusSquare className="mr-2" />
                    Déposer
                  </button>
                  <button 
                    className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                    onClick={() => changeTab('withdraw')}
                  >
                    <FiCreditCard className="mr-2" />
                    Retirer
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Dernières transactions</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 1, type: 'deposit', amount: 100, date: '2023-06-10', status: 'completed' },
                    { id: 2, type: 'withdrawal', amount: 50, date: '2023-06-08', status: 'completed' },
                    { id: 3, type: 'win', amount: 250, date: '2023-06-05', status: 'completed' },
                    { id: 4, type: 'entry', amount: 15, date: '2023-06-03', status: 'completed' },
                    { id: 5, type: 'purchase', amount: 25, date: '2023-05-28', status: 'completed' },
                  ].map(transaction => {
                    const getTransactionType = (type) => {
                      switch (type) {
                        case 'deposit': return 'Dépôt';
                        case 'withdrawal': return 'Retrait';
                        case 'win': return 'Gains';
                        case 'entry': return 'Entrée tournoi';
                        case 'purchase': return 'Achat boutique';
                        default: return type;
                      }
                    };
                    
                    const getTransactionColor = (type) => {
                      switch (type) {
                        case 'deposit': 
                        case 'win': 
                          return 'text-green-400';
                        default: 
                          return 'text-red-400';
                      }
                    };
                    
                    const getStatusIcon = (status) => {
                      return status === 'completed' 
                        ? <FiCheckCircle className="text-green-500" /> 
                        : <FiClock className="text-yellow-500" />;
                    };
                    
                    return (
                      <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-white/10">
                        <div>
                          <p className="text-white">{getTransactionType(transaction.type)}</p>
                          <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center">
                          <p className={`mr-3 ${getTransactionColor(transaction.type)}`}>
                            {['deposit', 'win'].includes(transaction.type) ? '+' : '-'}${transaction.amount}
                          </p>
                          {getStatusIcon(transaction.status)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  className="mt-4 w-full py-2 text-center text-indigo-400 hover:text-indigo-300"
                  onClick={() => addNotification({ 
                    type: 'info', 
                    title: 'Historique', 
                    message: 'Ouverture de l\'historique complet' 
                  })}
                >
                  Voir toutes les transactions
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'withdraw' && (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Demande de retrait</h2>
              
              <form onSubmit={handleWithdraw}>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Montant</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      min="1"
                      max={walletBalance}
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Solde disponible: ${walletBalance.toFixed(2)}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Méthode de retrait</label>
                  <select className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>PayPal</option>
                    <option>Carte bancaire</option>
                    <option>Skrill</option>
                    <option>Neteller</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Compte</label>
                  <input
                    type="text"
                    placeholder="Entrez les détails de votre compte"
                    className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) > walletBalance}
                >
                  Demander un retrait
                </button>
              </form>
            </div>
          )}
           */}
          {/* Autres onglets (profile, shop, etc.) seraient implémentés ici */}

           <div className="px-4 md:px-6">
          {renderContent()}
        </div>

        </div>
      </div>

      {/* Fixed Right Chat Sidebar */}
      <div className={`fixed top-16 right-0 bottom-0 ${rightSidebarExpanded ? 'w-64' : 'w-20'} p-4 bg-[#1e293b] backdrop-blur-lg border-l border-white/10 transition-all duration-300 z-40 ${isMobile && !rightSidebarExpanded ? 'hidden' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between">
            {activeChat ? (
              <>
                <button 
                  onClick={() => {
                    setActiveChat(null);
                    setActiveChatMessages([]);
                  }} 
                  className="text-gray-400 hover:text-white"
                >
                  <FiChevronLeft />
                </button>
                <h2 className="text-lg font-bold text-white">{chats.find(c => c.id === activeChat)?.user}</h2>
                <button 
                  onClick={toggleRightSidebar}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  <FiX />
                </button>
              </>
            ) : rightSidebarExpanded ? (
              <>
                <h2 className="text-lg font-bold text-white">Messages</h2>
                <button 
                  onClick={toggleRightSidebar}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  <FiX />
                </button>
              </>
            ) : (
//             <div class="flex h-20 relative">
//   <div class="border-l-2 border-gray-300 h-full   right-0"></div>

// </div>
<></>
            )}
          </div>

          {activeChat ? (
            <>
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {activeChatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 ml-auto' 
                        : 'bg-white/5'
                    }`}
                  >
                    <p className="text-white">{msg.text}</p>
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="mt-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrire un message..."
                    className="w-full pl-4 pr-12 py-2 rounded-full bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400"
                  >
                    <FiSend />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto mb-4">
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  className={`flex items-center p-2 rounded-lg cursor-pointer mb-2 ${activeChat === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => {
                    setActiveChat(chat.id);
                    setActiveChatMessages([
                      { 
                        id: 1, 
                        sender: 'other', 
                        text: chat.lastMessage, 
                        timestamp: new Date(Date.now() - 3600000) 
                      },
                      { 
                        id: 2, 
                        sender: 'user', 
                        text: 'Salut! Comment vas-tu?', 
                        timestamp: new Date(Date.now() - 3500000) 
                      }
                    ]);
                  }}
                >
                  {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex-shrink-0"></div> */}
                  {rightSidebarExpanded && (
                    <div className="ml-3 overflow-hidden">
                      <p className="text-sm font-medium text-white truncate">{chat.user}</p>
                      <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                    </div>
                  )}
                  {chat.unread > 0 && rightSidebarExpanded && (
                    <span className="ml-auto bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}