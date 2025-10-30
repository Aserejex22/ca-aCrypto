import { ShoppingCart, Leaf, TrendingDown, MapPin, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from './Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardScreenProps {
  onNavigate: (screen: 'dashboard' | 'purchase') => void;
  onLogout: () => void;
}

const emissionsData = [
  { month: 'Ene', co2: 120 },
  { month: 'Feb', co2: 95 },
  { month: 'Mar', co2: 80 },
  { month: 'Abr', co2: 65 },
  { month: 'May', co2: 50 },
  { month: 'Jun', co2: 35 },
];

const recentRecords = [
  { id: 1, date: '2025-10-28', tons: 12.5, location: 'Cultivo A - Sector Norte' },
  { id: 2, date: '2025-10-25', tons: 8.3, location: 'Cultivo B - Sector Sur' },
  { id: 3, date: '2025-10-22', tons: 15.7, location: 'Cultivo C - Sector Este' },
  { id: 4, date: '2025-10-20', tons: 10.2, location: 'Cultivo A - Sector Oeste' },
];

export function DashboardScreen({ onNavigate, onLogout }: DashboardScreenProps) {
  return (
    <Layout onNavigate={onNavigate} onLogout={onLogout} currentScreen="dashboard">
      <div className="w-full space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Panel de Control</h1>
          <p className="text-green-200/70 text-lg">Gestiona tus créditos de CO₂ tokenizados</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div 
              className="p-6 transition-all duration-300 hover:scale-105 rounded-2xl"
              style={{
                background: 'rgba(34, 197, 94, 0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(34, 197, 94, 0.25)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200/70 text-sm mb-1">CO₂ Tokenizado Hoy</p>
                  <p className="text-2xl font-bold text-white">12.5 ton</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="p-6 transition-all duration-300 hover:scale-105 rounded-2xl"
              style={{
                background: 'rgba(59, 130, 246, 0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(59, 130, 246, 0.25)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200/70 text-sm mb-1">Total Comprado</p>
                  <p className="text-2xl font-bold text-white">46.7 ton</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div 
              className="p-6 transition-all duration-300 hover:scale-105 rounded-2xl"
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(16, 185, 129, 0.25)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200/70 text-sm mb-1">Emisiones Reducidas</p>
                  <p className="text-2xl font-bold text-white">-42%</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main action card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="p-8 cursor-pointer hover:scale-105 transition-all duration-300 group rounded-2xl"
            onClick={() => onNavigate('purchase')}
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(5, 150, 105, 0.15))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-green-500/30 rounded-2xl group-hover:bg-green-500/40 transition-colors">
                <ShoppingCart className="w-8 h-8 text-green-300" />
              </div>
              <div className="text-green-200/60 text-sm">Acción rápida</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Comprar Créditos</h3>
            <p className="text-green-200/70 mb-4">
              Adquiere tokens de CO₂ verificados de cultivos de caña de azúcar
            </p>
            <button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-200 p-3 rounded-xl transition-colors">
              Ir a Compra →
            </button>
          </div>
        </motion.div>

        {/* Two column layout for chart and records */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
          {/* Emissions chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="h-full"
          >
            <div 
              className="p-6 rounded-2xl h-full flex flex-col"
              style={{
                background: 'rgba(34, 197, 94, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Emisiones Reducidas (últimos 6 meses)</h3>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={emissionsData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="co2" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fill="url(#colorCo2)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Recent records */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="h-full"
          >
            <div 
              className="p-6 rounded-2xl h-full flex flex-col"
              style={{
                background: 'rgba(34, 197, 94, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Registros Recientes</h3>
              <div className="space-y-3 flex-1 overflow-auto">
                {recentRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl transition-colors"
                    style={{
                      background: 'rgba(34, 197, 94, 0.06)',
                      border: '1px solid rgba(34, 197, 94, 0.15)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{record.location}</p>
                        <p className="text-green-200/60 text-sm">{record.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{record.tons} ton</p>
                      <p className="text-green-200/50 text-sm">CO₂</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}