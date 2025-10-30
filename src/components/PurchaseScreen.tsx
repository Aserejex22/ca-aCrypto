import { useState } from 'react';
import { Wallet, Coins, CheckCircle2, ArrowRight, Leaf, Info } from 'lucide-react';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './Layout';
import { Progress } from './ui/progress';

interface PurchaseScreenProps {
  onNavigate: (screen: 'dashboard' | 'purchase') => void;
  onLogout: () => void;
}

type Step = 1 | 2 | 3;

export function PurchaseScreen({ onNavigate, onLogout }: PurchaseScreenProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [co2Amount, setCo2Amount] = useState([10]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const pricePerTon = 25; // USDC per ton
  const totalPrice = co2Amount[0] * pricePerTon;

  const handleSliderChange = (newValue: number[]) => {
    console.log('Slider changed to:', newValue);
    setCo2Amount(newValue);
  };

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 3000);
    }, 2500);
  };

  const steps = [
    { number: 1, title: 'Cantidad', icon: Coins },
    { number: 2, title: 'Wallet', icon: Wallet },
    { number: 3, title: 'Confirmar', icon: CheckCircle2 },
  ];

  return (
    <Layout onNavigate={onNavigate} onLogout={onLogout} currentScreen="purchase">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Comprar Créditos de CO₂</h1>
          <p className="text-green-200/70">Adquiere tokens verificados de reducción de carbono</p>
        </div>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-green-500 border-green-400 text-white'
                        : 'bg-white/10 border-white/20 text-white/50'
                    }`}
                    animate={currentStep === step.number ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                  <p className={`text-sm mt-2 ${currentStep >= step.number ? 'text-green-300' : 'text-white/50'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select amount */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div 
                className="p-8 rounded-2xl"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                <h3 className="text-white text-xl font-semibold mb-6">Selecciona la cantidad de CO₂</h3>
                
                {/* Token visualization */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-500/30 rounded-xl">
                        <Leaf className="w-8 h-8 text-green-300" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Token CO₂</p>
                        <p className="text-green-200/70 text-sm">1 token = 1 tonelada</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-lg font-semibold">{co2Amount[0]} ton</p>
                      <p className="text-green-400 font-bold">${totalPrice} USDC</p>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="space-y-4">
                    <div className="px-2 relative">
                      {/* Custom HTML Range Slider */}
                      <input
                        type="range"
                        min={1}
                        max={100}
                        step={1}
                        value={co2Amount[0]}
                        onChange={(e) => handleSliderChange([parseInt(e.target.value)])}
                        className="w-full h-3 rounded-lg cursor-pointer slider-custom"
                        style={{
                          background: `linear-gradient(to right, 
                            rgb(34, 197, 94) 0%, 
                            rgb(34, 197, 94) ${(co2Amount[0] - 1) / 99 * 100}%, 
                            rgba(255, 255, 255, 0.3) ${(co2Amount[0] - 1) / 99 * 100}%, 
                            rgba(255, 255, 255, 0.3) 100%)`,
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none'
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-green-200/60 px-2">
                      <span>1 ton</span>
                      <span>100 ton</span>
                    </div>
                    {/* Progress indicator */}
                    <div className="text-center text-sm text-green-300 font-medium">
                      Seleccionado: {co2Amount[0]} toneladas = ${totalPrice} USDC
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                <div 
                  className="rounded-xl p-4 mb-6 space-y-2"
                  style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                  }}
                >
                  <div className="flex justify-between text-green-200/70">
                    <span>Precio por tonelada:</span>
                    <span>${pricePerTon} USDC</span>
                  </div>
                  <div className="flex justify-between text-green-200/70">
                    <span>Cantidad:</span>
                    <span>{co2Amount[0]} ton</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice} USDC</span>
                  </div>
                </div>

                {/* Info box */}
                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 mb-6">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-200/90 text-sm">
                    Estos créditos provienen de cultivos de caña de azúcar certificados y están verificados en blockchain
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
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
                  Continuar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Connect wallet */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div 
                className="p-8 rounded-2xl"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                <h3 className="text-white text-xl font-semibold mb-6">Verificar Wallet</h3>

                {/* Wallet connected status */}
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <Wallet className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Wallet Conectada</p>
                      <p className="text-green-200/70 text-sm font-mono">0x742d...4a3f</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verificada y lista para transacciones</span>
                  </div>
                </div>

                {/* Summary */}
                <div 
                  className="rounded-xl p-6 mb-6"
                  style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                  }}
                >
                  <p className="text-green-200/70 mb-4">Resumen de compra:</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">CO₂ a adquirir:</span>
                      <span className="text-white">{co2Amount[0]} toneladas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Precio total:</span>
                      <span className="text-white">${totalPrice} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Red:</span>
                      <span className="text-white">Stellar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Gas estimado:</span>
                      <span className="text-white">~0.00001 XLM</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{
                      flex: '1',
                      border: '2px solid rgba(34, 197, 94, 0.3)',
                      background: 'rgba(34, 197, 94, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                    }}
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    style={{
                      flex: '1',
                      background: 'linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(16, 185, 129) 100%)',
                      color: 'white',
                      padding: '0.75rem 1rem',
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
                    Continuar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm transaction */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div 
                className="p-8 rounded-2xl"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                <h3 className="text-white text-xl font-semibold mb-6">Confirmar Transacción</h3>

                {!isProcessing && !isCompleted && (
                  <>
                    {/* Final summary */}
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="p-4 bg-green-500/30 rounded-2xl">
                          <Coins className="w-12 h-12 text-green-300" />
                        </div>
                      </div>
                      <div className="text-center mb-4">
                        <p className="text-white text-lg font-semibold mb-1">{co2Amount[0]} Tokens CO₂</p>
                        <p className="text-green-400 text-xl font-bold">${totalPrice} USDC</p>
                      </div>
                    </div>

                    <div 
                      className="rounded-xl p-4 mb-6"
                      style={{
                        background: 'rgba(34, 197, 94, 0.05)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(34, 197, 94, 0.1)'
                      }}
                    >
                      <p className="text-white/70 text-sm mb-3">
                        Al confirmar, se creará una transacción en blockchain que:
                      </p>
                      <ul className="space-y-2 text-green-200/70 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Transferirá ${totalPrice} USDC desde tu wallet</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Minteará {co2Amount[0]} tokens CO₂ a tu dirección</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Registrará la transacción en el contrato inteligente</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(2)}
                        style={{
                          flex: '1',
                          border: '2px solid rgba(34, 197, 94, 0.3)',
                          background: 'rgba(34, 197, 94, 0.1)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          padding: '1rem 1.5rem',
                          borderRadius: '0.75rem',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
                          e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                        }}
                      >
                        Atrás
                      </button>
                      <button
                        onClick={handlePurchase}
                        style={{
                          flex: '1',
                          background: 'linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(16, 185, 129) 100%)',
                          color: 'white',
                          padding: '1rem 1.5rem',
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
                        Firmar Transacción
                      </button>
                    </div>
                  </>
                )}

                {isProcessing && (
                  <div className="text-center py-8">
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Wallet className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Procesando Transacción</h3>
                    <p className="text-green-200/70 mb-6">Esperando confirmación en blockchain...</p>
                    <Progress value={66} className="w-full max-w-xs mx-auto" />
                  </div>
                )}

                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">¡Transacción Confirmada!</h3>
                    <p className="text-green-200/70 mb-4">
                      Has adquirido {co2Amount[0]} tokens CO₂ exitosamente
                    </p>
                    <p className="text-green-400 text-sm">Redirigiendo al dashboard...</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}