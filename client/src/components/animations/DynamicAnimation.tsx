import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, AlertTriangle, Construction, Sun, Moon } from 'lucide-react';

export type AnimationState = 'inactive' | 'progress' | 'active' | 'alert';
export type AnimationType = 'generation' | 'consumption' | 'consultant';

interface DynamicAnimationProps {
  type: AnimationType;
  state: AnimationState;
  label: string;
  value: string;
  unit: string;
  onClick: () => void;
  isAtivo?: boolean;
}

export const DynamicAnimation: React.FC<DynamicAnimationProps> = ({ 
  type, 
  state, 
  label, 
  value, 
  unit, 
  onClick, 
  isAtivo = false 
}) => {
  const [isCiclo, setIsCiclo] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour < 6 || hour >= 18);
  }, []);

  const handleClick = () => {
    if (isAtivo) {
      setIsCiclo(!isCiclo);
    } else {
      onClick();
    }
  };

  const getGif = () => {
    if (type === 'generation') {
      if (state === 'progress') return "/assets/gifs/usina_obra.gif";
      if (state === 'alert') return "/assets/gifs/usina_alerta.gif";
      return isNight ? "/assets/gifs/usina_noite.gif" : "/assets/gifs/usina_dia.gif";
    }
    if (type === 'consumption') {
      if (state === 'progress') return "/assets/gifs/casa_obra.gif";
      return isNight ? "/assets/gifs/casa_noite.gif" : "/assets/gifs/casa_dia.gif";
    }
    return "/assets/gifs/consultor.gif";
  };

  return (
    <div className="flex flex-col items-center gap-6 group cursor-pointer w-full max-w-[300px]" onClick={handleClick}>
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* GIF Principal - Nunca fica embaçado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={getGif()} 
            alt={label} 
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as any).style.display = 'none';
              (e.target as any).nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback visual se o GIF quebrar */}
          <div className="hidden w-48 h-48 bg-green-50 dark:bg-green-900/10 rounded-full items-center justify-center border-4 border-dashed border-green-200 animate-pulse">
             {type === 'generation' ? <Zap className="w-20 h-20 text-yellow-500" /> : <Construction className="w-20 h-20 text-blue-500" />}
          </div>
        </div>

        {/* Elemento Celestial */}
        <div className="absolute top-4 right-4 z-20">
          {isNight ? <Moon className="text-blue-300 w-5 h-5" /> : <Sun className="text-yellow-400 w-5 h-5" />}
        </div>

        {/* Raios de Energia subindo (para usina ativa) */}
        {type === 'generation' && state === 'active' && !isNight && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: -100, opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                className="absolute left-1/2 -translate-x-1/2 text-yellow-400"
              >
                <div className="flex flex-col items-center">
                  <Zap className="w-6 h-6 fill-current" />
                  <span className="text-[10px] font-black">+</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Overlay de Estado */}
        {state === 'progress' && (
          <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
            <div className="px-4 py-1 bg-blue-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-lg">Em Obra</div>
          </div>
        )}
        {state === 'alert' && (
          <div className="absolute top-0 right-0 z-20">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
          </div>
        )}
      </div>

      {/* Caixa de Saldo - Fica embaçada se não estiver ativo */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 w-full text-center relative overflow-hidden group-hover:scale-105 transition-transform">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isCiclo ? "Total Ciclo" : label}</h4>
        <div className="flex items-center justify-center gap-2">
          {!isAtivo && <Lock className="w-3 h-3 text-gray-300" />}
          <span className={`text-2xl font-black text-[#004e3a] dark:text-green-400 transition-all duration-500 ${!isAtivo ? 'blur-[8px] opacity-30' : ''}`}>
            {value} <span className="text-xs opacity-50">{unit}</span>
          </span>
        </div>
        {!isAtivo && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 dark:bg-gray-800/40 backdrop-blur-[2px]">
            <span className="text-[8px] font-black text-[#009865] uppercase tracking-tighter">Clique p/ Ativar</span>
          </div>
        )}
      </div>
    </div>
  );
};
