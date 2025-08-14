import GlassCard from '@/components/ui/GlassCard';

const TransactionItem = ({ transaction }) => {
  const typeColors = {
    deposit: 'text-[#06b6d4]',
    withdrawal: 'text-[#f59e0b]',
    entry: 'text-[#8b5cf6]',
    win: 'text-[#ff00ff]',
  };
  
  const statusColors = {
    completed: 'bg-[#10b981]/20 text-[#10b981]',
    pending: 'bg-[#f59e0b]/20 text-[#f59e0b]',
    failed: 'bg-[#ef4444]/20 text-[#ef4444]',
  };
  
  const typeIcons = {
    deposit: '+',
    withdrawal: '-',
    entry: '-',
    win: '+',
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#8b5cf6]/20">
      <div>
        <div className="flex items-center">
          <span className={`font-medium ${typeColors[transaction.type]}`}>
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
          </span>
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${statusColors[transaction.status]}`}>
            {transaction.status}
          </span>
        </div>
        <p className="text-sm text-[#c084fc]">
          {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
      <div className={`text-lg font-medium ${typeColors[transaction.type]}`}>
        {typeIcons[transaction.type]}${transaction.amount}
      </div>
    </div>
  );
};

const RecentTransactions = () => {
  const transactions = [
    { id: 'tx1', type: 'deposit', amount: 50, date: '2023-06-10T14:30:00Z', status: 'completed' },
    { id: 'tx2', type: 'withdrawal', amount: 20, date: '2023-06-08T11:20:00Z', status: 'pending' },
    { id: 'tx3', type: 'entry', amount: 10, date: '2023-06-05T18:45:00Z', status: 'completed' },
    { id: 'tx4', type: 'win', amount: 75, date: '2023-06-02T21:15:00Z', status: 'completed' },
  ];

  return (
    <GlassCard className="p-0 overflow-hidden bg-gradient-to-b from-[#ffffff]/10 to-transparent border border-[#8b5cf6]/30 backdrop-blur-xl">
      <div className="max-h-96 overflow-y-auto">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
      
      <div className="p-4 bg-[#8b5cf6]/10 border-t border-[#8b5cf6]/20 text-center">
        <button className="text-[#c084fc] hover:text-white transition-colors">
          View All Transactions
        </button>
      </div>
    </GlassCard>
  );
};

export default RecentTransactions;