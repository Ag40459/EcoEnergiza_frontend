import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, HardHat, Lock, Unlock, Sun, Moon } from 'lucide-react';

export type AnimationState = 'inactive' | 'in_progress' | 'active' | 'alert';
export type AnimationType = 'generation' | 'consumption' | 'consultant';

interface DynamicAnimationProps {
  type: AnimationType;
  state: AnimationState;
  label?: string;
  value?: string;
  unit?: string;
  progress?: number;
  onClick?: () => void;
}

export const DynamicAnimation: React.FC<DynamicAnimationProps> = ({
  type,
  state,
  label,
  value,
  unit,
  progress = 0,
  onClick
}) => {
  const [isNight, setIsNight] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour < 6 || hour >= 18);
    
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
    }, type === 'consumption' ? 3000 : 4500);
    
    return () => clearInterval(interval);
  }, [type]);

  const renderRays = () => {
    if (state !== 'active' || isNight) return null;
    return (
      <motion.div
        key={`ray-${pulseKey}`}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: -50 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-400 font-bold"
      >
        <div className="flex flex-col items-center">
          <span className="text-xl">⚡</span>
          <span className="text-xs">+</span>
        </div>
      </motion.div>
    );
  };

  const renderConsumptionEffect = () => {
    if (state !== 'active') return null;
    return (
      <motion.div
        key={`cons-${pulseKey}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0, 1, 0], y: 30 }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-red-500 font-bold"
      >
        <div className="flex flex-col items-center">
          <span className="text-xl">⚡</span>
          <span className="text-xs">-</span>
        </div>
      </motion.div>
    );
  };

  const getVisuals = () => {
    const baseClass = "relative w-full aspect-square rounded-3xl overflow-hidden flex flex-col items-center justify-center transition-all duration-500";
    const contentClass = state === 'inactive' ? "blur-[2px] opacity-40 grayscale" : "opacity-100";
    
    return { baseClass, contentClass };
  };

  const { baseClass, contentClass } = getVisuals();

  return (
    <div className="flex flex-col gap-2 w-full max-w-[280px]">
      {state === 'in_progress' && (
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-green-500 h-full"
          />
        </div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseClass} bg-white shadow-sm border border-gray-100 cursor-pointer`}
      >
        {/* Fundo Sensível ao Horário */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-slate-900/5' : 'bg-blue-50/30'}`} />
        
        {/* Elemento Celestial */}
        <div className="absolute top-4 right-4">
          {isNight ? (
            <Moon className="text-blue-200 w-6 h-6 animate-pulse" />
          ) : (
            <Sun className="text-yellow-400 w-6 h-6 animate-spin-slow" />
          )}
        </div>

        {/* Animação Principal */}
        <div className={`z-10 flex flex-col items-center gap-4 ${contentClass}`}>
          {type === 'generation' && (
            <div className="relative">
              {renderRays()}
              <img src="/assets/usina.png" alt="Usina" className="w-32 h-32 object-contain" />
              {state === 'in_progress' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <HardHat className="text-green-600 w-10 h-10 animate-bounce" />
                </div>
              )}
            </div>
          )}

          {type === 'consumption' && (
            <div className="relative">
              {renderConsumptionEffect()}
              <img src="/assets/casa.png" alt="Casa" className="w-32 h-32 object-contain" />
              {state === 'in_progress' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <HardHat className="text-blue-600 w-10 h-10 animate-bounce" />
                </div>
              )}
            </div>
          )}

          {type === 'consultant' && (
            <div className="relative">
              <img src="/assets/consultor.png" alt="Consultor" className="w-32 h-32 object-contain" />
              {state === 'inactive' && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                  OPORTUNIDADE
                </div>
              )}
            </div>
          )}

          {/* Dados */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {state === 'inactive' ? <Lock className="w-3 h-3 text-gray-400" /> : <Unlock className="w-3 h-3 text-green-500" />}
              <span className={`text-2xl font-black ${state === 'inactive' ? 'text-gray-300' : 'text-[#004e3a]'}`}>
                {value || '000'}
              </span>
              <span className="text-xs font-bold opacity-60">{unit}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-40">{label}</p>
          </div>
        </div>

        {/* Alerta */}
        {state === 'alert' && (
          <div className="absolute inset-0 bg-red-50/20 flex items-center justify-center">
            <AlertTriangle className="text-red-500 w-12 h-12 animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
