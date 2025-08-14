import Link from 'next/link'
import { FiUsers, FiAward, FiClock } from 'react-icons/fi'
import PrimaryButton from '@/components/ui/PrimaryButton'
import SecondaryButton from '@/components/ui/SecondaryButton'

const statusColors = {
  waiting: 'bg-warning/20 text-warning',
  'in-progress': 'bg-accent/20 text-accent',
  completed: 'bg-success/20 text-success',
}

export default function DuelCard({ duel }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{duel.game}</h3>
            <p className="text-gray-400">{duel.mode}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[duel.status]}`}>
            {duel.status.replace('-', ' ')}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <FiUsers className="mr-2" />
              <span>
                {duel.players}/{duel.maxPlayers} players
              </span>
            </div>
            <div className="flex items-center text-gray-400">
              <FiClock className="mr-2" />
              <span>{new Date(duel.startTime).toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiAward className="mr-2 text-warning" />
              <span className="font-medium">${duel.prize} prize</span>
            </div>
            <span className="text-gray-400">${duel.entryFee} entry</span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex justify-between">
        <SecondaryButton className="w-full mr-2">Details</SecondaryButton>
        <Link href={`/dashboard/duels/${duel.id}`} className="w-full ml-2">
          <PrimaryButton className="w-full">
            {duel.status === 'completed' ? 'Results' : 'Join'}
          </PrimaryButton>
        </Link>
      </div>
    </div>
  )
}