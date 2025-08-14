import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-background to-dark">
          {children}
        </main>
      </div>
    </div>
  )
}