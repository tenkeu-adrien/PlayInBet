import { FiArrowUp, FiArrowDown, FiDollarSign } from 'react-icons/fi';

const WalletSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance */}
      <div className="bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 mb-1">Total Balance</h3>
            <p className="text-3xl font-bold">$245.50</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <FiDollarSign className="text-xl text-primary" />
          </div>
        </div>
        <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Withdraw Funds
        </button>
      </div>

      {/* Recent Earnings */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 mb-1">Recent Earnings</h3>
            <p className="text-3xl font-bold text-green-400">+$75.00</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10">
            <FiArrowUp className="text-xl text-green-400" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">From duels and tournaments</p>
      </div>

      {/* Active Deposits */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 mb-1">Pending Withdrawals</h3>
            <p className="text-3xl font-bold text-yellow-400">$20.00</p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10">
            <FiArrowDown className="text-xl text-yellow-400" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">Processing time: 1-3 days</p>
      </div>
    </div>
  );
};

export default WalletSummary;