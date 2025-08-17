'use client'
import { useState, useEffect, useRef } from 'react';
import { 
  FiHome, FiAward, FiDollarSign, FiPlusSquare, FiSearch, FiMenu, 
  FiLogIn, FiUserPlus, FiMessageSquare, FiSend, FiChevronLeft, 
  FiChevronRight, FiUser, FiShoppingBag, FiBarChart2, FiSettings, 
  FiCreditCard, FiGift, FiCheckCircle, FiXCircle, FiClock, FiUpload, 
  FiFilter, FiShoppingCart, FiUsers, FiBookOpen, FiShield, FiBell,
  FiTrello, FiX, FiEdit, FiEye, FiTrash2, FiStar, FiHelpCircle
} from 'react-icons/fi';
import { RiChatSmileLine } from 'react-icons/ri';
import { SiPaypal, SiStripe } from 'react-icons/si';
import { FaBitcoin } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardPage() {
  // États principaux
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(false);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('duels');
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leaderboardType, setLeaderboardType] = useState('wins');
  const [shopCategory, setShopCategory] = useState('all');
  const [showKYCForm, setShowKYCForm] = useState(false);
  const [kycStatus, setKycStatus] = useState('unverified'); // 'unverified', 'pending', 'verified'

  // Données du profil
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
    verified: false,
    avatar: '/default-avatar.png'
  });

  // Données financières
  const [walletBalance, setWalletBalance] = useState(1250.50);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('paypal');
  const [withdrawEmail, setWithdrawEmail] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'deposit', amount: 100, date: '2023-06-10', status: 'completed', method: 'stripe' },
    { id: 2, type: 'withdrawal', amount: 50, date: '2023-06-08', status: 'completed', method: 'paypal' },
    { id: 3, type: 'win', amount: 250, date: '2023-06-05', status: 'completed', game: 'Valorant' },
    { id: 4, type: 'entry', amount: 15, date: '2023-06-03', status: 'completed', game: 'Fortnite' },
    { id: 5, type: 'purchase', amount: 25, date: '2023-05-28', status: 'completed', item: 'Ticket Or' },
  ]);

  // Données de la boutique
  const [shopItems, setShopItems] = useState([
    { id: 1, name: 'Ticket Bronze', price: 5, category: 'tickets', description: 'Accès aux duels basiques', icon: <FiTrello /> },
    { id: 2, name: 'Ticket Argent', price: 15, category: 'tickets', description: 'Accès aux duels intermédiaires', icon: <FiTrello /> },
    { id: 3, name: 'Ticket Or', price: 25, category: 'tickets', description: 'Accès aux duels premium', icon: <FiTrello /> },
    { id: 4, name: 'Skin Épique', price: 10, category: 'skins', description: 'Skin exclusif pour votre profil', icon: <FiUser /> },
    { id: 5, name: 'Booster XP', price: 8, category: 'boosters', description: '+20% d\'XP pendant 7 jours', icon: <FiStar /> },
    { id: 6, name: 'Emote Victoire', price: 5, category: 'emotes', description: 'Nouvelle emote de victoire', icon: <RiChatSmileLine /> },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'Bienvenue sur PlayInBet!', message: 'Commencez à jouer et gagnez des récompenses', read: false, timestamp: new Date() },
    { id: 2, type: 'success', title: 'Duel terminé!', message: 'Vous avez gagné 20$ contre JohnDoe', read: false, timestamp: new Date(Date.now() - 3600000) },
    { id: 3, type: 'warning', title: 'Tournoi à venir', message: 'Le tournoi d\'été commence demain', read: false, timestamp: new Date(Date.now() - 7200000) }
  ]);

  // Chat
  const [chats, setChats] = useState([
    { id: '1', user: 'JohnDoe', lastMessage: 'Hey, prêt pour notre duel?', unread: 2, avatar: '/avatar1.png' },
    { id: '2', user: 'GameMaster', lastMessage: 'Le tournoi commence dans 1h', unread: 0, avatar: '/avatar2.png' },
    { id: '3', user: 'ProGamer99', lastMessage: 'GG! Revanche?', unread: 1, avatar: '/avatar3.png' },
    { id: '4', user: 'Newbie123', lastMessage: 'Merci pour les conseils!', unread: 0, avatar: '/avatar4.png' },
    { id: '5', user: 'TournamentBot', lastMessage: 'Votre prochain match est programmé', unread: 3, avatar: '/avatar5.png' },
  ]);

  const [activeChatMessages, setActiveChatMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const messagesEndRef = useRef(null);

  // Données des duels
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
      timeLeft: 600,
      participants: ['ProGamer42', 'JohnDoe', 'GameMaster', 'Newbie123']
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
      timeLeft: 300,
      participants: ['ProGamer42', 'JohnDoe', 'GameMaster', 'Newbie123', 'Player1', 'Player2']
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
      timeLeft: 0,
      winner: 'ProGamer99',
      participants: ['ProGamer42', 'JohnDoe', 'GameMaster', 'Newbie123', 'Player1', 'Player2', 'Player3', 'Player4']
    },
    {
      id: '4',
      game: 'CS:GO',
      mode: 'Competitive',
      entryFee: 20,
      prize: 100,
      players: 2,
      maxPlayers: 2,
      status: 'waiting',
      startTime: '2023-06-16T15:00:00Z',
      timeLeft: 1200,
      participants: ['ProGamer42']
    },
    {
      id: '5',
      game: 'Dota 2',
      mode: 'Ranked',
      entryFee: 25,
      prize: 125,
      players: 4,
      maxPlayers: 4,
      status: 'waiting',
      startTime: '2023-06-17T14:00:00Z',
      timeLeft: 1800,
      participants: ['ProGamer42', 'Player5']
    }
  ]);

  // Données des tournois
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
      registered: true
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
      registered: true
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
      registered: false
    },
    {
      id: 't4',
      name: 'Tournoi Express',
      game: 'Fortnite',
      prizePool: 2000,
      participants: 24,
      maxParticipants: 50,
      startDate: '2023-06-18T16:00:00Z',
      status: 'registration',
      registered: false
    }
  ]);

  // Classement
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, username: 'TopGamer', wins: 128, losses: 32, winRate: 80, earnings: 12500 },
    { rank: 2, username: 'ProPlayer', wins: 115, losses: 40, winRate: 74, earnings: 9800 },
    { rank: 3, username: 'GameMaster', wins: 98, losses: 45, winRate: 69, earnings: 8700 },
    { rank: 4, username: 'Ninja', wins: 95, losses: 50, winRate: 66, earnings: 8200 },
    { rank: 5, username: 'Shroud', wins: 88, losses: 42, winRate: 68, earnings: 7900 },
    { rank: 6, username: 'ProGamer42', wins: 85, losses: 38, winRate: 69, earnings: 7600 },
    { rank: 7, username: 'Myth', wins: 78, losses: 45, winRate: 63, earnings: 7200 },
    { rank: 8, username: 'Tfue', wins: 75, losses: 50, winRate: 60, earnings: 6800 },
    { rank: 9, username: 'Pokimane', wins: 68, losses: 42, winRate: 62, earnings: 6500 },
    { rank: 10, username: 'TimTheTatman', wins: 65, losses: 55, winRate: 54, earnings: 6200 },
  ]);

  // Slideshow
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
      button: "Créer un Duel"
    },
    {
      title: "Portefeuille Sécurisé",
      subtitle: "Déposez, retirez et suivez vos gains",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1626224569750-c8ccdb5fa681?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Déposer des fonds"
    }
  ];

  // Détection mobile et initialisation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setLeftSidebarExpanded(true);
        setRightSidebarExpanded(true);
      } else {
        setLeftSidebarExpanded(false);
        setRightSidebarExpanded(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll vers le bas des messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatMessages]);

  // Fonctions de base
  const toggleLeftSidebar = () => {
    setLeftSidebarExpanded(!leftSidebarExpanded);
  };

  const toggleRightSidebar = () => {
    setRightSidebarExpanded(!rightSidebarExpanded);
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

  // Fonctions de chat
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
        addNotification({
          type: 'info',
          title: 'Nouveau message',
          message: `Réponse de ${chats.find(c => c.id === activeChat)?.user || 'un contact'}`
        });
      }, 2000);
    }
  };

  // Fonctions financières
  const handleDeposit = (amount, method) => {
    setWalletBalance(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: 'deposit',
        amount: amount,
        date: new Date().toISOString(),
        status: 'completed',
        method: method
      },
      ...prev
    ]);
    addNotification({
      type: 'success',
      title: 'Dépôt réussi',
      message: `$${amount} déposés via ${method}`
    });
    setShowPaymentModal(false);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (amount && amount > 0 && amount <= walletBalance) {
      setWalletBalance(prev => prev - amount);
      setTransactions(prev => [
        {
          id: Date.now(),
          type: 'withdrawal',
          amount: amount,
          date: new Date().toISOString(),
          status: 'completed',
          method: withdrawMethod
        },
        ...prev
      ]);
      addNotification({
        type: 'success',
        title: 'Retrait effectué',
        message: `Vous avez retiré $${amount.toFixed(2)} avec succès`
      });
      setWithdrawAmount('');
    } else {
      addNotification({
        type: 'error',
        title: 'Erreur de retrait',
        message: 'Montant invalide ou solde insuffisant'
      });
    }
  };

  // Fonctions de boutique
  const handleBuyItem = (item) => {
    if (walletBalance >= item.price) {
      setWalletBalance(prev => prev - item.price);
      setTransactions(prev => [
        {
          id: Date.now(),
          type: 'purchase',
          amount: item.price,
          date: new Date().toISOString(),
          status: 'completed',
          item: item.name
        },
        ...prev
      ]);
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

  // Fonctions de duels et tournois
  const handleJoinDuel = (duel) => {
    if (duel.status === 'waiting') {
      if (duel.players >= duel.maxPlayers) {
        addNotification({
          type: 'error',
          title: 'Duel complet',
          message: 'Ce duel a atteint son nombre maximum de participants'
        });
        return;
      }

      if (walletBalance < duel.entryFee) {
        addNotification({
          type: 'error',
          title: 'Fonds insuffisants',
          message: 'Vous n\'avez pas assez d\'argent pour rejoindre ce duel'
        });
        return;
      }

      // Débiter le portefeuille
      setWalletBalance(prev => prev - duel.entryFee);
      
      // Ajouter la transaction
      setTransactions(prev => [
        {
          id: Date.now(),
          type: 'entry',
          amount: duel.entryFee,
          date: new Date().toISOString(),
          status: 'completed',
          game: duel.game
        },
        ...prev
      ]);
      
      // Mettre à jour le duel
      setDuels(prev => 
        prev.map(d => 
          d.id === duel.id 
            ? { 
                ...d, 
                players: d.players + 1,
                participants: [...d.participants, profileData.username]
              } 
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
      if (tournament.participants >= tournament.maxParticipants) {
        addNotification({
          type: 'error',
          title: 'Tournoi complet',
          message: 'Ce tournoi a atteint son nombre maximum de participants'
        });
        return;
      }

      const entryFee = tournament.prizePool / 20; // Simuler des frais d'entrée
      
      if (walletBalance < entryFee) {
        addNotification({
          type: 'error',
          title: 'Fonds insuffisants',
          message: 'Vous n\'avez pas assez d\'argent pour rejoindre ce tournoi'
        });
        return;
      }

      // Débiter le portefeuille
      setWalletBalance(prev => prev - entryFee);
      
      // Ajouter la transaction
      setTransactions(prev => [
        {
          id: Date.now(),
          type: 'entry',
          amount: entryFee,
          date: new Date().toISOString(),
          status: 'completed',
          game: tournament.game
        },
        ...prev
      ]);
      
      // Mettre à jour le tournoi
      setTournaments(prev => 
        prev.map(t => 
          t.id === tournament.id 
            ? { 
                ...t, 
                participants: t.participants + 1,
                registered: true
              } 
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

  const handleCreateDuel = (formData) => {
    const newDuel = {
      id: `d${Date.now()}`,
      game: formData.game,
      mode: formData.mode,
      entryFee: formData.entryFee,
      prize: formData.prize,
      players: 1,
      maxPlayers: formData.maxPlayers,
      status: 'waiting',
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 heure dans le futur
      timeLeft: formData.duration * 60,
      participants: [profileData.username]
    };
    
    setDuels(prev => [newDuel, ...prev]);
    addNotification({
      type: 'success',
      title: 'Duel créé!',
      message: `Votre duel ${newDuel.game} est maintenant en attente de joueurs`
    });
  };

  // Fonctions de profil et KYC
  const handleProfileUpdate = (updatedData) => {
    setProfileData(prev => ({ ...prev, ...updatedData }));
    addNotification({
      type: 'success',
      title: 'Profil mis à jour',
      message: 'Vos informations ont été enregistrées'
    });
  };

  const submitKYC = (documents) => {
    setKycStatus('pending');
    addNotification({
      type: 'info',
      title: 'Vérification KYC',
      message: 'Vos documents ont été soumis pour vérification'
    });
    
    // Simuler la vérification après 5 secondes
    setTimeout(() => {
      setKycStatus('verified');
      addNotification({
        type: 'success',
        title: 'KYC Vérifié',
        message: 'Votre identité a été vérifiée avec succès'
      });
    }, 5000);
  };

  // Fonctions de notification
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

  // Fonctions de filtrage
  const filteredDuels = duels.filter(duel => {
    const matchesGame = gameFilter === 'all' || duel.game.toLowerCase() === gameFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || duel.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      duel.game.toLowerCase().includes(searchQuery.toLowerCase()) || 
      duel.mode.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGame && matchesStatus && matchesSearch;
  });

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesGame = gameFilter === 'all' || tournament.game.toLowerCase() === gameFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGame && matchesStatus && matchesSearch;
  });

  const filteredShopItems = shopItems.filter(item => {
    return shopCategory === 'all' || item.category === shopCategory;
  });

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (leaderboardType === 'wins') return b.wins - a.wins;
    if (leaderboardType === 'earnings') return b.earnings - a.earnings;
    return b.winRate - a.winRate;
  });

  // Composants
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

    const isParticipating = duel.participants.includes(profileData.username);

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
                {duel.participants.slice(0, 3).map((p, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs text-white">
                    {p.charAt(0)}
                  </div>
                ))}
                {duel.participants.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">
                    +{duel.participants.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {duel.players}/{duel.maxPlayers} joueurs
              </span>
            </div>
            
            <button 
              onClick={() => handleJoinDuel(duel)}
              className={`px-3 py-1 text-sm rounded-lg ${
                duel.status === 'waiting' 
                  ? isParticipating
                    ? 'bg-purple-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-white/5 text-gray-300'
              }`}
            >
              {duel.status === 'waiting' 
                ? isParticipating ? 'Participant' : 'Rejoindre' 
                : 'Voir'}
            </button>
          </div>
        </div>
      </div>
    );
  };

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
                  ? tournament.registered
                    ? 'bg-purple-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-white/5 text-gray-300'
              }`}
            >
              {tournament.status === 'registration' 
                ? tournament.registered ? "Inscrit" : "S'inscrire" 
                : 'Voir'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const WalletSummary = () => {
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
            onClick={() => setShowPaymentModal(true)}
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

  const RecentTransactions = () => {
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

    const getMethodIcon = (method) => {
      switch (method) {
        case 'paypal': return <SiPaypal className="text-blue-500" />;
        case 'stripe': return <SiStripe className="text-purple-500" />;
        case 'bitcoin': return <FaBitcoin className="text-orange-500" />;
        default: return <FiCreditCard className="text-gray-400" />;
      }
    };

    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Dernières transactions</h2>
        
        <div className="space-y-4">
          {transactions.slice(0, 5).map(transaction => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-white/10">
              <div className="flex items-center">
                {transaction.method && (
                  <div className="mr-3">
                    {getMethodIcon(transaction.method)}
                  </div>
                )}
                <div>
                  <p className="text-white">{getTransactionType(transaction.type)}</p>
                  <p className="text-sm text-gray-400">
                    {transaction.game && `${transaction.game} • `}
                    {transaction.item && `${transaction.item} • `}
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
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
          onClick={() => changeTab('transactions')}
        >
          Voir toutes les transactions
        </button>
      </div>
    );
  };

  const WithdrawForm = () => {
    return (
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
            <select 
              value={withdrawMethod}
              onChange={(e) => setWithdrawMethod(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="paypal">PayPal</option>
              <option value="bank">Virement bancaire</option>
              <option value="crypto">Crypto-monnaie</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">
              {withdrawMethod === 'paypal' ? 'Email PayPal' : 
               withdrawMethod === 'bank' ? 'IBAN' : 
               'Adresse de portefeuille crypto'}
            </label>
            <input
              type="text"
              value={withdrawEmail}
              onChange={(e) => setWithdrawEmail(e.target.value)}
              placeholder={
                withdrawMethod === 'paypal' ? 'votre@email.com' : 
                withdrawMethod === 'bank' ? 'FR76 XXXX XXXX XXXX XXXX XXXX XX' : 
                '0x... ou bc1...'
              }
              className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
            disabled={!withdrawAmount || parseFloat(withdrawAmount) > walletBalance || !withdrawEmail}
          >
            Demander un retrait
          </button>
        </form>
      </div>
    );
  };

  const CreateDuelForm = () => {
    const [formData, setFormData] = useState({
      game: 'valorant',
      mode: '1v1',
      entryFee: 10,
      prize: 20,
      maxPlayers: 2,
      duration: 10
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'entryFee' || name === 'prize' || name === 'maxPlayers' || name === 'duration' 
          ? parseInt(value) 
          : value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.entryFee <= 0 || formData.prize <= formData.entryFee) {
        addNotification({
          type: 'error',
          title: 'Erreur',
          message: 'Les gains doivent être supérieurs à la mise d\'entrée'
        });
        return;
      }
      handleCreateDuel(formData);
      changeTab('duels');
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
                  name="game"
                  value={formData.game}
                  onChange={handleChange}
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
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
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
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Gains ($)</label>
                <input
                  type="number"
                  name="prize"
                  value={formData.prize}
                  onChange={handleChange}
                  min={formData.entryFee + 1}
                  max="1000"
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Nombre maximum de joueurs</label>
                <input
                  type="number"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  min="2"
                  max="16"
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Durée (minutes)</label>
                <select 
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
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
            {duels.filter(d => d.status === 'waiting' && d.participants.includes(profileData.username)).map(duel => (
              <DuelCard key={duel.id} duel={duel} />
            ))}
          </div>
        </div>
      </div>
    );
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
                value={shopCategory}
                onChange={(e) => setShopCategory(e.target.value)}
                className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tous les articles</option>
                <option value="tickets">Tickets</option>
                <option value="skins">Skins</option>
                <option value="emotes">Emotes</option>
                <option value="boosters">Boosters</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShopItems.map(item => (
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
                      className={`py-2 px-4 rounded-lg ${
                        walletBalance >= item.price
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                      onClick={() => handleBuyItem(item)}
                      disabled={walletBalance < item.price}
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
                {transactions
                  .filter(t => t.type === 'purchase')
                  .slice(0, 5)
                  .map((transaction, i) => (
                    <tr key={i} className="border-b border-white/10 last:border-0">
                      <td className="py-3 text-white">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="py-3 text-white">{transaction.item}</td>
                      <td className="py-3 text-white">${transaction.amount}</td>
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

  const ProfileTab = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ ...profileData });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleProfileUpdate(formData);
      setEditMode(false);
    };

    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Mon Profil</h2>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center text-indigo-400 hover:text-indigo-300"
              >
                <FiEdit className="mr-2" />
                Modifier
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setEditMode(false);
                    setFormData({ ...profileData });
                  }}
                  className="flex items-center text-gray-400 hover:text-gray-300"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg"
                >
                  Enregistrer
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-3xl text-white mb-4">
                {profileData.username.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-white">{profileData.username}</h3>
              <p className="text-gray-400">Niveau {profileData.level}</p>
              
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${(profileData.xp % 1000) / 10}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{profileData.xp % 1000}/1000 XP</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-white">{profileData.wins}</p>
                  <p className="text-xs text-gray-400">Victoires</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-white">{profileData.losses}</p>
                  <p className="text-xs text-gray-400">Défaites</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Nom d'utilisateur</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Pays</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg"
                      >
                        <option>France</option>
                        <option>Canada</option>
                        <option>Belgique</option>
                        <option>Suisse</option>
                        <option>États-Unis</option>
                      </select>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Téléphone</p>
                    <p className="text-white">{profileData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Pays</p>
                    <p className="text-white">{profileData.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Taux de victoire</p>
                    <p className="text-white">{profileData.winRate}%</p>
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-3">Vérification KYC</h4>
                {kycStatus === 'unverified' && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-yellow-400 font-medium">Non vérifié</p>
                        <p className="text-yellow-400/80 text-sm mt-1">Vérifiez votre identité pour retirer vos gains</p>
                      </div>
                      <button 
                        onClick={() => setShowKYCForm(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Vérifier
                      </button>
                    </div>
                  </div>
                )}
                
                {kycStatus === 'pending' && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <FiClock className="text-blue-400 mr-3" />
                      <div>
                        <p className="text-blue-400 font-medium">En cours de vérification</p>
                        <p className="text-blue-400/80 text-sm mt-1">Votre identité est en cours de vérification</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {kycStatus === 'verified' && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <FiCheckCircle className="text-green-400 mr-3" />
                      <div>
                        <p className="text-green-400 font-medium">Identité vérifiée</p>
                        <p className="text-green-400/80 text-sm mt-1">Votre compte est entièrement vérifié</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Historique des parties</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-gray-400 font-normal">Date</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Jeu</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Mode</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Résultat</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Gains</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => {
                  const games = ['Valorant', 'Fortnite', 'League of Legends', 'CS:GO', 'Dota 2'];
                  const modes = ['1v1', '2v2', 'Battle Royale', 'Competitive', 'Ranked'];
                  const results = ['Victoire', 'Défaite'];
                  const amounts = [0, 10, 15, 20, 25, 50];
                  
                  return (
                    <tr key={i} className="border-b border-white/10 last:border-0">
                      <td className="py-3 text-white">{new Date(Date.now() - (i * 86400000)).toLocaleDateString()}</td>
                      <td className="py-3 text-white">{games[i]}</td>
                      <td className="py-3 text-white">{modes[i]}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          results[Math.floor(Math.random() * results.length)] === 'Victoire'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {results[Math.floor(Math.random() * results.length)]}
                        </span>
                      </td>
                      <td className="py-3 text-white">
                        {amounts[Math.floor(Math.random() * amounts.length)] > 0 
                          ? `+$${amounts[Math.floor(Math.random() * amounts.length)]}`
                          : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const LeaderboardTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Classement des Joueurs</h2>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">Trier par:</span>
              <select 
                value={leaderboardType}
                onChange={(e) => setLeaderboardType(e.target.value)}
                className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="wins">Victoires</option>
                <option value="earnings">Gains</option>
                <option value="winRate">Taux de victoire</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-400 font-normal">Rang</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Joueur</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Victoires</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Défaites</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Taux</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Gains</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((player, index) => (
                  <tr 
                    key={player.rank} 
                    className={`border-b border-white/10 hover:bg-white/5 ${
                      player.username === profileData.username ? 'bg-indigo-500/10' : ''
                    }`}
                  >
                    <td className="py-4">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-700 text-white' :
                        'bg-white/5 text-white'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 text-white">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs text-white mr-3">
                          {player.username.charAt(0)}
                        </div>
                        {player.username}
                        {player.username === profileData.username && (
                          <span className="ml-2 bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">Vous</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 text-white">{player.wins}</td>
                    <td className="py-4 text-white">{player.losses}</td>
                    <td className="py-4 text-white">{player.winRate}%</td>
                    <td className="py-4 text-white">${player.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button className="text-gray-400 hover:text-white flex items-center">
              <FiChevronLeft className="mr-1" />
              Précédent
            </button>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(page => (
                <button 
                  key={page}
                  className={`w-8 h-8 rounded-full ${
                    page === 1 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="text-gray-400 hover:text-white flex items-center">
              Suivant
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Vos statistiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-4 rounded-lg">
              <p className="text-gray-400">Classement</p>
              <p className="text-2xl font-bold text-white">
                #{sortedLeaderboard.findIndex(p => p.username === profileData.username) + 1}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 rounded-lg">
              <p className="text-gray-400">Victoires</p>
              <p className="text-2xl font-bold text-white">{profileData.wins}</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 rounded-lg">
              <p className="text-gray-400">Gains totaux</p>
              <p className="text-2xl font-bold text-white">
                ${transactions
                  .filter(t => t.type === 'win')
                  .reduce((sum, t) => sum + t.amount, 0)
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KYCForm = () => {
    const [documents, setDocuments] = useState({
      idFront: null,
      idBack: null,
      selfie: null
    });

    const handleFileChange = (e, type) => {
      if (e.target.files[0]) {
        setDocuments(prev => ({
          ...prev,
          [type]: URL.createObjectURL(e.target.files[0])
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      submitKYC(documents);
      setShowKYCForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Vérification d'identité</h2>
            <button 
              onClick={() => setShowKYCForm(false)}
              className="text-gray-400 hover:text-white"
            >
              <FiX />
            </button>
          </div>
          
          <p className="text-gray-400 mb-6">
            Pour des raisons de sécurité, nous devons vérifier votre identité avant que vous puissiez retirer des fonds.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Recto de la pièce d'identité</label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center">
                  {documents.idFront ? (
                    <img 
                      src={documents.idFront} 
                      alt="ID Front" 
                      className="max-h-40 mx-auto mb-2"
                    />
                  ) : (
                    <div className="py-8">
                      <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-400 text-sm">Glissez-déposez ou cliquez pour téléverser</p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'idFront')}
                    className="hidden"
                    id="idFront"
                    accept="image/*"
                    required
                  />
                  <label 
                    htmlFor="idFront"
                    className="inline-block bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Sélectionner un fichier
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Verso de la pièce d'identité</label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center">
                  {documents.idBack ? (
                    <img 
                      src={documents.idBack} 
                      alt="ID Back" 
                      className="max-h-40 mx-auto mb-2"
                    />
                  ) : (
                    <div className="py-8">
                      <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-400 text-sm">Glissez-déposez ou cliquez pour téléverser</p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'idBack')}
                    className="hidden"
                    id="idBack"
                    accept="image/*"
                    required
                  />
                  <label 
                    htmlFor="idBack"
                    className="inline-block bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Sélectionner un fichier
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Selfie avec pièce d'identité</label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center">
                  {documents.selfie ? (
                    <img 
                      src={documents.selfie} 
                      alt="Selfie" 
                      className="max-h-40 mx-auto mb-2"
                    />
                  ) : (
                    <div className="py-8">
                      <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-400 text-sm">Glissez-déposez ou cliquez pour téléverser</p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'selfie')}
                    className="hidden"
                    id="selfie"
                    accept="image/*"
                    required
                  />
                  <label 
                    htmlFor="selfie"
                    className="inline-block bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Sélectionner un fichier
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
                disabled={!documents.idFront || !documents.idBack || !documents.selfie}
              >
                Soumettre pour vérification
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const PaymentModal = () => {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-[#1e293b] border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Déposer des fonds</h2>
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <FiX />
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Montant ($)</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(parseInt(e.target.value) || 0)}
              min="5"
              max="1000"
              className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Méthode de paiement</label>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setPaymentMethod('stripe')}
                className={`p-3 border rounded-lg flex flex-col items-center ${
                  paymentMethod === 'stripe' 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <SiStripe className="text-2xl text-purple-500 mb-1" />
                <span className="text-xs text-white">Carte Bancaire</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 border rounded-lg flex flex-col items-center ${
                  paymentMethod === 'paypal' 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <SiPaypal className="text-2xl text-blue-500 mb-1" />
                <span className="text-xs text-white">PayPal</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 border rounded-lg flex flex-col items-center ${
                  paymentMethod === 'crypto' 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <FaBitcoin className="text-2xl text-orange-500 mb-1" />
                <span className="text-xs text-white">Crypto</span>
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => handleDeposit(paymentAmount, paymentMethod || 'stripe')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
            disabled={!paymentAmount || paymentAmount < 5}
          >
            Déposer ${paymentAmount}
          </button>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            En déposant des fonds, vous acceptez nos conditions d'utilisation
          </p>
        </div>
      </div>
    );
  };

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
        <div className="
        absolute 
        mt-2 
        w-80 md:w-96 
        bg-[#1e293b] border border-white/10 rounded-xl shadow-lg z-50
        left-1/2 -translate-x-1/2   /* centre sur mobile */
        sm:left-auto sm:right-0 sm:translate-x-0  /* redevient à droite sur écran >= sm */
      ">
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <h2 className="text-xl font-bold">Tournois en cours</h2>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    value={gameFilter}
                    onChange={(e) => setGameFilter(e.target.value)}
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                  >
                    <option value="all">Tous les jeux</option>
                    <option value="Valorant">Valorant</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="CS:GO">CS:GO</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="registration">Inscriptions</option>
                    <option value="ongoing">En cours</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </div>
        );
      case 'create-duel':
        return <CreateDuelForm />;
      case 'profile':
        return <ProfileTab />;
      case 'shop':
        return <ShopTab />;
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Historique des transactions</h2>
              <RecentTransactions extended />
            </div>
          </div>
        );
      default: // 'duels'
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <h2 className="text-xl font-bold">Duels actifs</h2>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    value={gameFilter}
                    onChange={(e) => setGameFilter(e.target.value)}
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                  >
                    <option value="all">Tous les jeux</option>
                    <option value="Valorant">Valorant</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="CS:GO">CS:GO</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <FiFilter className="text-gray-400 mr-2" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="waiting">En attente</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminés</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDuels.map((duel) => (
                <DuelCard key={duel.id} duel={duel} />
              ))}
            </div>
          </div>
        );
    }
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            >
              <FiLogIn className="text-xl" />
            </Link>
            <Link
              href="/"
              className="flex items-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              title="Inscription"
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
              activeTab === 'wallet' || activeTab === 'withdraw' || activeTab === 'transactions'
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
              {leftSidebarExpanded && <span className="ml-3">Paramètres</span>}
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
                onClick={() => {
                  if (currentSlide === 0) changeTab('leaderboard');
                  if (currentSlide === 1) changeTab('create-duel');
                  if (currentSlide === 2) setShowPaymentModal(true);
                }}
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

        {/* Contenu dynamique */}
        <div className="px-4 md:px-6">
          {renderContent()}
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
                  {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs text-white">
                    {chat.user.charAt(0)}
                  </div> */}
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

      {/* Modals */}
      {showKYCForm && <KYCForm />}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
}