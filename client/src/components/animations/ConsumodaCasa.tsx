import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimationCard from './AnimationCard';

interface ConsumodaCasaProps {
  isActive: boolean;
  isLoading?: boolean;
  progress?: number;
  consumptionValue?: number;
  onClick?: () => void;
}

export default function ConsumodaCasa({
  isActive,
  isLoading = false,
  progress = 0,
  consumptionValue = 2.5,
  onClick,
}: ConsumodaCasaProps) {
  const [displayValue, setDisplayValue] = useState(consumptionValue);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        const variation = (Math.random() - 0.5) * 0.4;
        return Math.max(0, prev + variation);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  const EnergySymbol = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute left-1/2 bottom-1/4 text-3xl font-bold text-red-500"
      style={{ transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, -70, -70] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      ⚡ -
    </motion.div>
  );

  return (
    <AnimationCard
      isActive={isActive}
      isLoading={isLoading}
      progress={progress}
      onClick={onClick}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 p-6">
        {isLoading && (
          <div className="absolute top-4 left-0 right-0 px-6 z-10">
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#009865]"
              />
            </div>
            <p className="text-[8px] font-black text-center mt-1 text-gray-400 uppercase tracking-tighter">Instalação em progresso...</p>
          </div>
        )}

        <svg
          className="w-32 h-32"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="40" y="60" width="120" height="100" fill="#D2B48C" rx="8" />

          <rect x="50" y="70" width="30" height="25" fill="#87CEEB" rx="2" />
          <rect x="110" y="70" width="30" height="25" fill="#87CEEB" rx="2" />

          <path
            d="M 60 100 L 100 130 L 140 100 Z"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="2"
          />

          <rect x="85" y="145" width="30" height="20" fill="#696969" rx="2" />

          <motion.circle
            cx="100"
            cy="155"
            r="8"
            fill="#FF6B6B"
            animate={{
              opacity: isActive ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />

          <motion.rect
            x="88"
            y="140"
            width="24"
            height="28"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            rx="2"
            animate={{
              opacity: isActive ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <motion.text
            x="100"
            y="160"
            textAnchor="middle"
            className="text-xs font-bold fill-gray-700"
            animate={{
              opacity: isActive ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            kWh
          </motion.text>
        </svg>

        <EnergySymbol delay={0} />
        <EnergySymbol delay={3.5} />

        <motion.div
          className={`text-center ${isActive ? 'opacity-100' : 'opacity-30 blur-lg'}`}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-500 uppercase tracking-wide">Consumo Atual</p>
          <p className="text-3xl font-bold text-red-600">{displayValue.toFixed(1)} kWh</p>
          <p className="text-xs text-gray-400 mt-1">Residência Principal</p>
        </motion.div>
      </div>
    </AnimationCard>
  );
}
