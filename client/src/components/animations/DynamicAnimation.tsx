import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, Home, Award, Factory, Plus, ChevronRight, Lock, UserCheck } from 'lucide-react';

interface DynamicAnimationProps {
  type: 'generation' | 'consumption' | 'consultant' | 'private_plant';
  state: 'active' | 'inactive' | 'progress';
  label: string;
  value: string;
  unit: string;
  isAtivo?: boolean;
  onClick?: () => void;
}

export const DynamicAnimation: React.FC<DynamicAnimationProps> = ({ 
  type, state, label, value, unit, isAtivo = false, onClick 
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'generation':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 pt-12">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10"
            >
              <Sun className="w-16 h-16 text-yellow-500 fill-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
            </motion.div>

            <div className="relative mt-12">
              <div className="w-48 h-32 bg-blue-900 rounded-xl border-4 border-gray-300 relative overflow-hidden transform skew-x-12">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-blue-600/30 border border-blue-400/20"></div>
                  ))}
                </div>
                {isAtivo && (
                  <motion.div 
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white"
                  />
                )}
              </div>
              <div className="w-4 h-12 bg-gray-400 mx-auto mt-[-4px]"></div>
              <div className="w-16 h-2 bg-gray-500 mx-auto rounded-full"></div>
            </div>

            <div className={`mt-6 text-center ${!isAtivo ? 'blur-md select-none pointer-events-none' : ''}`}>
              <p className="text-3xl font-black text-[#004e3a] dark:text-white">{value} <span className="text-sm opacity-50">{unit}</span></p>
            </div>
          </div>
        );
      case 'consumption':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 pt-12">
            <div className="relative">
              <div className="relative w-40 h-40">
                <div className="absolute bottom-0 w-full h-24 bg-orange-100 dark:bg-orange-900/20 rounded-lg border-4 border-orange-200 dark:border-orange-800"></div>
                <div className="absolute top-4 left-0 right-0 h-20 bg-red-600 rounded-lg transform -rotate-45 translate-y-2 origin-bottom-left border-b-4 border-red-800"></div>
                <div className="absolute top-4 left-0 right-0 h-20 bg-red-600 rounded-lg transform rotate-45 translate-y-2 origin-bottom-right border-b-4 border-red-800"></div>
                
                <motion.div 
                  animate={{ backgroundColor: isAtivo ? ['#fef3c7', '#fcd34d', '#fef3c7'] : '#e5e7eb' }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-8 left-6 w-8 h-8 rounded-md border-2 border-orange-200"
                />
                <motion.div 
                  animate={{ backgroundColor: isAtivo ? ['#fef3c7', '#fcd34d', '#fef3c7'] : '#e5e7eb' }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-8 right-6 w-8 h-8 rounded-md border-2 border-orange-200"
                />
              </div>
            </div>
            <div className={`mt-6 text-center ${!isAtivo ? 'blur-md select-none pointer-events-none' : ''}`}>
              <p className="text-3xl font-black text-[#004e3a] dark:text-white">{value} <span className="text-sm opacity-50">{unit}</span></p>
            </div>
          </div>
        );
      case 'consultant':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 pt-12">
            <div className="w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4 relative">
              <UserCheck className="w-16 h-16 text-[#009865]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-[#009865] rounded-full"
              />
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Consultor</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Seja um Consultor</p>
            </div>
          </div>
        );
      case 'private_plant':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 pt-12">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-[2.5rem] flex items-center justify-center mb-4 relative overflow-hidden">
              <Factory className="w-16 h-16 text-blue-600" />
              <motion.div 
                animate={{ y: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              />
              <div className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-[#004e3a] dark:text-white">Gestão Particular</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Cadastre sua Usina</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full max-w-sm aspect-square bg-white dark:bg-gray-800 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col relative group z-0"
    >
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
        <span className="px-4 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-full text-[10px] font-black text-[#004e3a] dark:text-green-400 uppercase tracking-widest border border-gray-100 dark:border-gray-700">
          {label}
        </span>
        {!isAtivo && type !== 'consultant' && type !== 'private_plant' && (
          <Lock className="w-3 h-3 text-gray-300" />
        )}
      </div>
      
      {renderIcon()}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="px-6 py-2 bg-[#004e3a] text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          Ver Detalhes <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.button>
  );
};
