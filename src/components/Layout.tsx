import { Building2, User, LogOut, Leaf, Home, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (screen: 'dashboard' | 'purchase') => void;
  onLogout: () => void;
  currentScreen: 'dashboard' | 'purchase';
}

export function Layout({ children, onNavigate, onLogout, currentScreen }: LayoutProps) {
  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 p-6 flex flex-col relative z-10"
        style={{
          background: 'rgba(34, 197, 94, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(34, 197, 94, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold">CO₂ Token</h2>
            <p className="text-green-200/60 text-sm">Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center justify-start gap-3 p-3 rounded-xl transition-all duration-300 ${
              currentScreen === 'dashboard'
                ? 'text-green-300'
                : 'text-white/70 hover:text-white'
            }`}
            style={{
              background: currentScreen === 'dashboard' 
                ? 'rgba(34, 197, 94, 0.25)' 
                : 'rgba(34, 197, 94, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${currentScreen === 'dashboard' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(34, 197, 94, 0.15)'}`
            }}
            onMouseEnter={(e) => {
              if (currentScreen !== 'dashboard') {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentScreen !== 'dashboard') {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
              }
            }}
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>

          <button
            onClick={() => onNavigate('purchase')}
            className={`w-full flex items-center justify-start gap-3 p-3 rounded-xl transition-all duration-300 ${
              currentScreen === 'purchase'
                ? 'text-green-300'
                : 'text-white/70 hover:text-white'
            }`}
            style={{
              background: currentScreen === 'purchase' 
                ? 'rgba(34, 197, 94, 0.25)' 
                : 'rgba(34, 197, 94, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${currentScreen === 'purchase' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(34, 197, 94, 0.15)'}`
            }}
            onMouseEnter={(e) => {
              if (currentScreen !== 'purchase') {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentScreen !== 'purchase') {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
              }
            }}
          >
            <ShoppingCart className="w-5 h-5" />
            Comprar Tokens
          </button>

          <div className="h-px bg-green-500/20 my-4" />

          <button
            className="w-full flex items-center justify-start gap-3 p-3 rounded-xl transition-all duration-300 text-white/70 hover:text-white"
            style={{
              background: 'rgba(34, 197, 94, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
            }}
          >
            <Building2 className="w-5 h-5" />
            Empresa
          </button>

          <button
            className="w-full flex items-center justify-start gap-3 p-3 rounded-xl transition-all duration-300 text-white/70 hover:text-white"
            style={{
              background: 'rgba(34, 197, 94, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
            }}
          >
            <User className="w-5 h-5" />
            Perfil
          </button>
        </nav>

        {/* Wallet info */}
        <div className="mt-auto">
          <div 
            className="rounded-xl p-4 mb-4"
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <p className="text-green-200/60 text-sm mb-1">Wallet Conectada</p>
            <p className="text-white text-sm font-mono truncate">0x742d...4a3f</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-start gap-3 p-3 rounded-xl transition-all duration-300 text-red-300 hover:text-red-200"
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
            }}
          >
            <LogOut className="w-5 h-5" />
            Desconectar
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto relative z-10">
        <div className="w-full min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}