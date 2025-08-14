import LoginForm from '@/components/auth/LoginForm'
import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      {/* <GlassCard>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back lorem</h1>
          <p className="text-gray-400">Log in to your PlayInBet account</p>
        </div>
        </GlassCard> */}
        <LoginForm />
        {/* <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/" className="text-primary hover:underline">
            Sign up
          </Link>
        </div> */}
   
    </div>
  )
}