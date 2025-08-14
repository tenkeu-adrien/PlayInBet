'use client'
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { FiArrowUp, FiArrowDown, FiCreditCard, FiDollarSign, FiCheck } from 'react-icons/fi';

const WalletPage = () => {
  const [balance, setBalance] = useState(245.50);
  const [transactions, setTransactions] = useState([
    { id: 'tx1', type: 'deposit', amount: 50, date: '2023-06-10T14:30:00Z', status: 'completed' },
    { id: 'tx2', type: 'withdrawal', amount: 20, date: '2023-06-08T11:20:00Z', status: 'pending' },
    { id: 'tx3', type: 'entry', amount: 10, date: '2023-06-05T18:45:00Z', status: 'completed' },
    { id: 'tx4', type: 'win', amount: 75, date: '2023-06-02T21:15:00Z', status: 'completed' },
  ]);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [activeTab, setActiveTab] = useState('deposit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de délai API
    setTimeout(() => {
      const amount = Number(depositAmount);
      if (amount < 5) {
        setError('Le dépôt minimum est de 5$');
        setLoading(false);
        return;
      }
      
      const newTransaction = {
        id: `tx${Date.now()}`,
        type: 'deposit',
        amount: amount,
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      setBalance(prev => prev + amount);
      setTransactions(prev => [newTransaction, ...prev]);
      setDepositAmount('');
      setSuccessMessage(`Dépôt de $${amount.toFixed(2)} réussi !`);
      setError('');
      setLoading(false);
      
      // Effacer le message de succès après 3s
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de délai API
    setTimeout(() => {
      const amount = Number(withdrawAmount);
      
      if (amount < 10) {
        setError('Le retrait minimum est de 10$');
        setLoading(false);
        return;
      }
      
      if (amount > balance) {
        setError('Solde insuffisant');
        setLoading(false);
        return;
      }
      
      const newTransaction = {
        id: `tx${Date.now()}`,
        type: 'withdrawal',
        amount: amount,
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      setBalance(prev => prev - amount);
      setTransactions(prev => [newTransaction, ...prev]);
      setWithdrawAmount('');
      setSuccessMessage(`Demande de retrait de $${amount.toFixed(2)} envoyée !`);
      setError('');
      setLoading(false);
      
      // Effacer le message de succès après 3s
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Portefeuille</h1>
      
      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-300">Solde actuel</h2>
            <div className="text-4xl font-bold mt-2 flex items-center text-white">
              <FiDollarSign className="mr-2 text-[#10b981]" />
              {balance.toFixed(2)} $
            </div>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button 
              onClick={() => setActiveTab('deposit')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'deposit' 
                  ? 'bg-[#6366f1] text-white' 
                  : 'bg-[#1f2937] text-gray-300 hover:bg-white/10'
              }`}
            >
              Dépôt
            </button>
            <button 
              onClick={() => setActiveTab('withdraw')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'withdraw' 
                  ? 'bg-[#6366f1] text-white' 
                  : 'bg-[#1f2937] text-gray-300 hover:bg-white/10'
              }`}
            >
              Retrait
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#ef4444]/20 text-[#ef4444] rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-[#10b981]/20 text-[#10b981] rounded-lg flex items-center">
            <FiCheck className="mr-2" />
            {successMessage}
          </div>
        )}

        {activeTab === 'deposit' ? (
          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Montant à déposer ($)</label>
              <input
                type="number"
                min="5"
                step="0.01"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full bg-[#1f2937] text-white border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                placeholder="10.00"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-[#8b5cf6]/70' : 'bg-[#8b5cf6] hover:bg-[#8b5cf6]/90'
              } text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </span>
              ) : 'Déposer des fonds'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Montant à retirer ($)</label>
              <input
                type="number"
                min="10"
                max={balance}
                step="0.01"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full bg-[#1f2937] text-white border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                placeholder="10.00"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Solde disponible: ${balance.toFixed(2)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Méthode de retrait</label>
              <select
                className="w-full bg-[#1f2937] text-white border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6366f1] focus:outline-none"
                required
              >
                <option value="">Sélectionner</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Virement bancaire</option>
                <option value="crypto">Crypto-monnaie</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-[#8b5cf6]/70' : 'bg-[#8b5cf6] hover:bg-[#8b5cf6]/90'
              } text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </span>
              ) : 'Demander un retrait'}
            </button>
          </form>
        )}
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-300">Historique des transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-2 text-gray-400">Date</th>
                <th className="pb-2 text-gray-400">Type</th>
                <th className="pb-2 text-gray-400">Montant</th>
                <th className="pb-2 text-gray-400">Statut</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-400">
                    Aucune transaction
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/10 last:border-0 hover:bg-white/5">
                    <td className="py-3 text-gray-300">
                      {new Date(tx.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 capitalize text-gray-300">
                      {tx.type === 'deposit' ? 'Dépôt' : 
                       tx.type === 'withdrawal' ? 'Retrait' : 
                       tx.type === 'entry' ? 'Participation' : 'Gain'}
                    </td>
                    <td className={`py-3 font-medium ${
                      tx.type === 'deposit' || tx.type === 'win' 
                        ? 'text-[#10b981]' 
                        : 'text-[#ef4444]'
                    }`}>
                      {tx.type === 'deposit' || tx.type === 'win' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 'completed' ? 'bg-[#10b981]/20 text-[#10b981]' :
                        tx.status === 'pending' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' :
                        'bg-[#ef4444]/20 text-[#ef4444]'
                      }`}>
                        {tx.status === 'completed' ? 'Complété' : 
                         tx.status === 'pending' ? 'En attente' : 'Échoué'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default WalletPage;