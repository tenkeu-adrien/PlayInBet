'use client'
import { useState, useEffect } from 'react';
import { 
  FiHome, FiAward, FiDollarSign, FiPlusSquare, FiSearch, FiMenu, 
  FiLogIn, FiUserPlus, FiMessageSquare, FiSend, FiChevronLeft, 
  FiChevronRight, FiUser, FiShoppingBag, FiBarChart2, FiSettings, 
  FiCreditCard, FiGift, FiCheckCircle, FiXCircle, FiClock, FiUpload, 
  FiFilter, FiShoppingCart,  FiUsers, FiBookOpen, FiShield,
  FiTrello
} from 'react-icons/fi';
import { RiChatSmileLine } from 'react-icons/ri';
import Link from 'next/link';

export default function DashboardPage() {
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(false);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('duels');
  const [kycModalOpen, setKycModalOpen] = useState(false);
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

  const toggleLeftSidebar = () => {
    setLeftSidebarExpanded(!leftSidebarExpanded);
  };

  const toggleRightSidebar = () => {
    setRightSidebarExpanded(!rightSidebarExpanded);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount && amount > 0 && amount <= walletBalance) {
      setWalletBalance(prev => prev - amount);
      setWithdrawAmount('');
      alert(`Retrait de $${amount.toFixed(2)} effectué avec succès!`);
    }
  };

  const handleBuyItem = (item) => {
    if (walletBalance >= item.price) {
      setWalletBalance(prev => prev - item.price);
      alert(`Achat réussi: ${item.name}!`);
    } else {
      alert('Fonds insuffisants pour cet achat');
    }
  };

  useEffect(() => {
    // Simulation de chargement des articles de la boutique
    setShopItems([
      { id: 1, name: 'Ticket Bronze', price: 5, description: 'Entrée pour tournois bas niveau', icon: <FiGift className="text-yellow-600" /> },
      { id: 2, name: 'Ticket Argent', price: 15, description: 'Entrée pour tournois moyen niveau', icon: <FiGift className="text-gray-400" /> },
      { id: 3, name: 'Ticket Or', price: 30, description: 'Entrée pour tournois haut niveau', icon: <FiGift className="text-yellow-400" /> },
      { id: 4, name: 'Skin Épique', price: 25, description: 'Skin exclusif pour votre profil', icon: <FiUser className="text-purple-500" /> },
      { id: 5, name: 'Emote Spéciale', price: 10, description: 'Emote animée exclusive', icon: <FiUsers className="text-blue-500" /> },
      { id: 6, name: 'Pack Débutant', price: 50, description: '5 tickets bronze + skin spécial', icon: <FiShoppingBag className="text-green-500" /> },
    ]);
  }, []);

  const slides = [
    {
      title: "Competitive Gaming Platform",
      subtitle: "Join tournaments and win big prizes",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Upgrade Now"
    },
    {
      title: "1v1 Duels",
      subtitle: "Challenge players and prove your skills",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Create Tournament"
    },
    {
      title: "Secure Wallet",
      subtitle: "Deposit, withdraw and track your earnings",
      bgImage: "bg-[url('https://images.unsplash.com/photo-1626224569750-c8ccdb5fa681?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]",
      button: "Create Match"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
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
            
            <button className={`px-3 py-1 text-sm rounded-lg ${
              duel.status === 'waiting' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-white/5 text-gray-300'
            }`}>
              {duel.status === 'waiting' ? 'Rejoindre' : 'Voir'}
            </button>
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
            
            <button className={`px-3 py-1 text-sm rounded-lg ${
              tournament.status === 'registration' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-white/5 text-gray-300'
            }`}>
              {tournament.status === 'registration' ? "S'inscrire" : 'Voir'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Composant WalletSummary
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
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
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
        
        <button className="mt-4 w-full py-2 text-center text-indigo-400 hover:text-indigo-300">
          Voir toutes les transactions
        </button>
      </div>
    );
  };

  // Composant WithdrawForm
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
    );
  };

  // Composant ProfileTab
  const ProfileTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0 md:mr-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {profileData.username.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-white">{profileData.username}</h2>
                <p className="text-gray-400">Niveau {profileData.level}</p>
              </div>
            </div>
            
            <div className="flex-1 bg-white/5 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Progression</span>
                <span className="text-white">{profileData.xp}/2000 XP</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                  style={{ width: `${(profileData.xp / 2000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-white">{profileData.wins}</p>
              <p className="text-gray-400">Victoires</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-white">{profileData.losses}</p>
              <p className="text-gray-400">Défaites</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-white">{profileData.winRate}%</p>
              <p className="text-gray-400">Taux de victoire</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-white">42</p>
              <p className="text-gray-400">Tournois</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4">Informations du compte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 block mb-1">Email</label>
                <p className="text-white">{profileData.email}</p>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Téléphone</label>
                <p className="text-white">{profileData.phone}</p>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Pays</label>
                <p className="text-white">{profileData.country}</p>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Vérification KYC</label>
                <div className="flex items-center">
                  {profileData.verified 
                    ? <FiCheckCircle className="text-green-500 mr-2" /> 
                    : <FiXCircle className="text-red-500 mr-2" />}
                  <span className={profileData.verified ? "text-green-500" : "text-red-500"}>
                    {profileData.verified ? "Vérifié" : "Non vérifié"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg"
              onClick={() => setKycModalOpen(true)}
            >
              Vérifier mon identité
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg">
              Modifier le profil
            </button>
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
                  <th className="text-left py-2 text-gray-400 font-normal">Type</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Mise</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Gain</th>
                  <th className="text-left py-2 text-gray-400 font-normal">Statut</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/10 last:border-0">
                    <td className="py-3 text-white">2023-06-{10 + i}</td>
                    <td className="py-3 text-white">Valorant</td>
                    <td className="py-3 text-white">1v1 Duel</td>
                    <td className="py-3 text-white">$10</td>
                    <td className="py-3 text-white">$20</td>
                    <td className="py-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        Gagné
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

  // Composant ShopTab
  const ShopTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Boutique PlayInBet</h2>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">Filtrer:</span>
              <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
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

  // Composant LeaderboardTab
  const LeaderboardTab = () => {
    const leaderboardData = [
      { rank: 1, username: 'ProGamer99', level: 45, wins: 128, winRate: 89, earnings: 4250 },
      { rank: 2, username: 'NinjaWarrior', level: 42, wins: 115, winRate: 86, earnings: 3890 },
      { rank: 3, username: 'EliteShooter', level: 40, wins: 105, winRate: 84, earnings: 3520 },
      { rank: 4, username: 'DuelMaster', level: 38, wins: 98, winRate: 82, earnings: 3250 },
      { rank: 5, username: 'ChampionX', level: 36, wins: 92, winRate: 80, earnings: 2980 },
      { rank: 6, username: 'VictoryKing', level: 34, wins: 85, winRate: 78, earnings: 2750 },
      { rank: 7, username: 'StrategyPro', level: 32, wins: 78, winRate: 75, earnings: 2480 },
      { rank: 8, username: 'FastFingerz', level: 30, wins: 72, winRate: 73, earnings: 2250 },
      { rank: 9, username: 'GameOverlord', level: 28, wins: 68, winRate: 70, earnings: 2100 },
      { rank: 10, username: 'BattleLegend', level: 26, wins: 62, winRate: 68, earnings: 1950 },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Classement des joueurs</h2>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">Trier par:</span>
              <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Gains</option>
                <option>Victoires</option>
                <option>Taux de victoire</option>
                <option>Niveau</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-400 font-normal">Rang</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Joueur</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Niveau</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Victoires</th>
                  <th className="text-left py-3 text-gray-400 font-normal">% Victoires</th>
                  <th className="text-left py-3 text-gray-400 font-normal">Gains</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map(player => (
                  <tr key={player.rank} className={`border-b border-white/10 ${player.rank <= 3 ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : ''}`}>
                    <td className="py-4">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        player.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        player.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        player.rank === 3 ? 'bg-gradient-to-r from-amber-700 to-amber-800' : 'bg-white/5'
                      }`}>
                        <span className="font-bold text-white">{player.rank}</span>
                      </div>
                    </td>
                    <td className="py-4 text-white font-medium">{player.username}</td>
                    <td className="py-4 text-white">{player.level}</td>
                    <td className="py-4 text-white">{player.wins}</td>
                    <td className="py-4 text-white">{player.winRate}%</td>
                    <td className="py-4 text-white">${player.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg">
              Précédent
            </button>
            <span className="text-gray-400">Page 1 sur 5</span>
            <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg">
              Suivant
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Votre position</h3>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-white mr-4">#42</div>
              <div>
                <p className="text-white">ProGamer42</p>
                <p className="text-gray-400">Top 15% des joueurs</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Prochain niveau</span>
                <span className="text-white">#38 (+4 places)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                  style={{ width: '65%' }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Récompenses</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-600/20 to-amber-700/20 border border-amber-500/30 rounded-lg p-4 text-center">
                <FiTrello className="text-2xl text-amber-400 mx-auto mb-2" />
                <p className="text-white font-medium">Top 50</p>
                <p className="text-xs text-amber-300">+5% gains bonus</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-4 text-center">
                <FiGift className="text-2xl text-indigo-400 mx-auto mb-2" />
                <p className="text-white font-medium">Top 100</p>
                <p className="text-xs text-indigo-300">Ticket Or offert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant CreateDuelForm
  const CreateDuelForm = () => {
    const [game, setGame] = useState('valorant');
    const [mode, setMode] = useState('1v1');
    const [entryFee, setEntryFee] = useState(10);
    const [prize, setPrize] = useState(20);
    const [maxPlayers, setMaxPlayers] = useState(2);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Duel créé: ${game} - ${mode} - Mise: $${entryFee} - Gains: $${prize}`);
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

  // Composant KYCVerificationModal
  const KYCVerificationModal = () => {
    if (!kycModalOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Vérification d'identité (KYC)</h2>
              <button 
                onClick={() => setKycModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiXCircle className="text-xl" />
              </button>
            </div>
            <p className="text-gray-400 mt-2">Sécurisez votre compte en vérifiant votre identité</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-400 mb-2">Prénom</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Date de naissance</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Pays</label>
                <select className="w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>France</option>
                  <option>Canada</option>
                  <option>Belgique</option>
                  <option>Suisse</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-4">Documents d'identité</h3>
            <p className="text-gray-400 mb-4">Téléchargez une copie claire et lisible des documents suivants :</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-dashed border-white/20 rounded-xl p-6 text-center">
                <FiUpload className="text-3xl text-indigo-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-2">Pièce d'identité recto</p>
                <p className="text-gray-400 text-sm mb-3">(Carte d'identité, passeport ou permis de conduire)</p>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg">
                  Télécharger
                </button>
              </div>
              
              <div className="border border-dashed border-white/20 rounded-xl p-6 text-center">
                <FiUpload className="text-3xl text-indigo-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-2">Pièce d'identité verso</p>
                <p className="text-gray-400 text-sm mb-3">(Carte d'identité, passeport ou permis de conduire)</p>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg">
                  Télécharger
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setKycModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white py-2 px-6 rounded-lg"
              >
                Annuler
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg">
                Soumettre la vérification
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour afficher le contenu dynamique
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
                <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2">
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
        return <ProfileTab />;
      case 'shop':
        return <ShopTab />;
      case 'leaderboard':
        return <LeaderboardTab />;
      default: // 'duels'
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Duels actifs</h2>
              <div className="flex items-center">
                <FiFilter className="text-gray-400 mr-2" />
                <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2">
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-[#1e293b] backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center space-x-6">
          <button 
            onClick={toggleLeftSidebar} 
            className="flex items-center text-gray-400 hover:text-white space-x-2"
          >
            <FiMenu className="text-xl" />
            <span className="text-sm">Menu</span>
          </button>
          
          <div className="h-6 w-px bg-white/20"></div>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
            PlayInBet
          </h1>

          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 rounded-full bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
       
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/(auth)/login"
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
          
          <div className="h-6 w-px bg-white/20"></div>
          
          <button 
            onClick={toggleRightSidebar} 
            className="text-gray-400 hover:text-white flex items-center space-x-2"
          >
            <FiMessageSquare className="text-xl" />
            <span className="text-sm hidden md:inline">Chat</span>
          </button>
        </div>
      </header>

      {/* Fixed Left Sidebar */}
      <div className={`fixed top-16 bottom-0 ${leftSidebarExpanded ? 'w-64' : 'w-20'} p-4 bg-[#1e293b] backdrop-blur-lg border-r border-white/10 transition-all duration-300 z-40 overflow-y-auto`}>
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

          <div className="pt-4 border-t border-white/10 mt-4">
            <button
              className="flex items-center p-3 rounded-lg transition-all duration-200 w-full text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <FiSettings className="text-lg" />
              {leftSidebarExpanded && <span className="ml-3">Paramètres</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 pt-24 pb-6 transition-all duration-300 ${leftSidebarExpanded ? 'ml-64' : 'ml-20'} ${rightSidebarExpanded ? 'mr-64' : 'mr-20'}`}>
        {/* Slideshow Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mx-6 mb-8">
          <div className={`absolute inset-0 ${slides[currentSlide].bgImage} bg-cover bg-center transition-opacity duration-500`}>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col text-center px-8">
              <h1 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h1>
              <p className="text-xl text-gray-300 mb-6">{slides[currentSlide].subtitle}</p>
              <button 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors duration-300"
              >
                {slides[currentSlide].button}
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4">
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
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Contenu dynamique basé sur l'onglet sélectionné */}
        <div className="px-6">
          {renderContent()}
        </div>
      </div>

      {/* Fixed Right Chat Sidebar */}
      <div className={`fixed top-16 right-0 bottom-0 ${rightSidebarExpanded ? 'w-64' : 'w-20'} p-4 bg-[#1e293b] backdrop-blur-lg border-l border-white/10 transition-all duration-300 z-40`}>
        <div className="flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between">
            {rightSidebarExpanded ? (
              <h2 className="text-lg font-bold text-white">Messages</h2>
            ) : (
              <RiChatSmileLine className="text-xl text-white mx-auto" />
            )}
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={`flex items-center p-2 rounded-lg cursor-pointer mb-2 ${activeChat === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex-shrink-0"></div>
                {rightSidebarExpanded && (
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">{chat.user}</p>
                    <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {rightSidebarExpanded && (
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
          )}
        </div>
      </div>
      
      {/* Modale KYC */}
      <KYCVerificationModal />
    </div>
  );
}

// Données statiques
const chats = [
  { id: '1', user: 'JohnDoe', lastMessage: 'Hey, prêt pour notre duel?', unread: 2 },
  { id: '2', user: 'GameMaster', lastMessage: 'Le tournoi commence dans 1h', unread: 0 },
  { id: '3', user: 'ProGamer99', lastMessage: 'GG! Revanche?', unread: 1 },
  { id: '4', user: 'Newbie123', lastMessage: 'Merci pour les conseils!', unread: 0 },
  { id: '5', user: 'TournamentBot', lastMessage: 'Votre prochain match est programmé', unread: 3 },
];

const duels = [
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
    timeLeft: 600 // 10 minutes en secondes
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
    timeLeft: 300 // 5 minutes en secondes
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
  },
  {
    id: '4',
    game: 'Counter-Strike: GO',
    mode: '5v5 Competitive',
    entryFee: 20,
    prize: 100,
    players: 8,
    maxPlayers: 10,
    status: 'waiting',
    startTime: '2023-06-16T15:00:00Z',
    timeLeft: 1800 // 30 minutes en secondes
  },
  {
    id: '5',
    game: 'Dota 2',
    mode: 'All Pick',
    entryFee: 10,
    prize: 50,
    players: 8,
    maxPlayers: 10,
    status: 'in-progress',
    startTime: '2023-06-15T20:30:00Z',
    timeLeft: 900 // 15 minutes en secondes
  },
];

const tournaments = [
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
  },
  {
    id: 't4',
    name: 'Tournoi Express',
    game: 'Fortnite',
    prizePool: 2500,
    participants: 24,
    maxParticipants: 32,
    startDate: '2023-06-18T18:00:00Z',
    status: 'ongoing',
  },
];