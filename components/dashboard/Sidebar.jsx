'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { FiHome, FiSwords, FiAward, FiUser, FiWallet, FiShoppingBag, FiBarChart2, FiLogOut } from 'react-icons/fi'

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Duels', href: '/dashboard/duels', icon: FiSwords },
    { name: 'Tournaments', href: '/dashboard/tournaments', icon: FiAward },
    { name: 'Profile', href: '/dashboard/profile', icon: FiUser },
    { name: 'Wallet', href: '/dashboard/wallet', icon: FiWallet },
    { name: 'Shop', href: '/dashboard/shop', icon: FiShoppingBag },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: FiBarChart2 },
  ]

  return (
    <div className="w-64 bg-dark/80 backdrop-blur-lg border-r border-white/10 flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          PlayInBet
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname.startsWith(item.href) ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'}`}
          >
            <item.icon className="mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-danger/20 hover:text-danger transition-colors"
        >
          <FiLogOut className="mr-3" />
          Log out
        </button>
      </div>
    </div>
  )
}