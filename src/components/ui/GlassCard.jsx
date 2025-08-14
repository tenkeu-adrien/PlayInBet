export default function GlassCard({ children, className = '' }) {
    return (
      <div
        className={`bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden ${className}`}
      >
        {children}
      </div>
    )
  }