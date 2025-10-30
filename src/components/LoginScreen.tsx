import { Leaf, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '8px',
              height: '8px',
              animationDelay: `${Math.random() * 2}s`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div 
          className="rounded-3xl shadow-2xl p-8 md:p-12"
          style={{
            background: 'rgba(34, 197, 94, 0.12)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            boxShadow: '0 20px 40px rgba(31, 38, 135, 0.3)'
          }}
        >
          {/* Logo and title */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-6 shadow-lg"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Leaf className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">CO₂ Token Platform</h1>
            <p className="text-green-200/80">Tokenización de Huella de Carbono</p>
          </div>

          {/* Description */}
          <div 
            className="rounded-xl p-4 mb-6"
            style={{
              background: 'rgba(34, 197, 94, 0.08)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <p className="text-green-100/90 text-center">
              Inicia sesión para medir y tokenizar tu huella de CO₂ de la caña de azúcar
            </p>
          </div>

          {/* Connect wallet button */}
          <button
            onClick={onLogin}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(16, 185, 129) 100%)',
              color: 'white',
              padding: '1.5rem 2rem',
              borderRadius: '0.75rem',
              border: 'none',
              boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3)';
            }}
          >
            <Wallet className="mr-2 h-5 w-5" />
            Iniciar con wallet
          </button>

          {/* Wallet options */}
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-green-200/60">
            <span>Stellar</span>
            <span>•</span>
            <span>Freighter</span>
            <span>•</span>
            <span>WalletConnect</span>
          </div>

          {/* Info tooltip */}
          <div className="mt-6 text-center">
            <p className="text-xs text-green-200/50">
              💡 Usamos tu wallet para vincular tus tokens de CO₂ verificados
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}