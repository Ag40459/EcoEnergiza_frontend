import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimationCard from './AnimationCard';

interface GeneracaoEnergiaProps {
  isActive: boolean;
  isLoading?: boolean;
  progress?: number;
  energyValue?: number;
  onClick?: () => void;
}

export default function GeneracaoEnergia({
  isActive,
  isLoading = false,
  progress = 0,
  energyValue = 4.2,
  onClick,
}: GeneracaoEnergiaProps) {
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const checkDaytime = () => {
      const hour = new Date().getHours();
      setIsDaytime(hour >= 6 && hour < 18);
    };

    checkDaytime();
    const interval = setInterval(checkDaytime, 60000);
    return () => clearInterval(interval);
  }, []);

  const EnergyRay = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute left-1/2 bottom-1/4 w-1 h-12 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full shadow-lg"
      style={{ transform: 'translateX(-50%)', filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, -80, -80] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
      }}
    />
  );

  const SleepZzz = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute left-1/2 bottom-1/4 text-2xl font-bold text-blue-300"
      style={{ transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, -80, -80] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
      }}
    >
      Zzz
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
        <svg
          className="w-32 h-32"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="100"
            cy="40"
            r="25"
            fill={isDaytime ? '#FCD34D' : '#E0E7FF'}
            animate={{
              opacity: isDaytime ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            filter={isDaytime ? 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.8))' : 'drop-shadow(0 0 8px rgba(224, 231, 255, 0.6))'}
          />

          <rect x="60" y="80" width="80" height="60" fill="#1E40AF" opacity="0.8" rx="4" />

          <motion.rect
            x="70"
            y="90"
            width="12"
            height="40"
            fill="#60A5FA"
            animate={{
              opacity: isActive ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          <motion.rect
            x="90"
            y="90"
            width="12"
            height="40"
            fill="#60A5FA"
            animate={{
              opacity: isActive ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
          />

          <motion.rect
            x="110"
            y="90"
            width="12"
            height="40"
            fill="#60A5FA"
            animate={{
              opacity: isActive ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
          />

          <rect x="50" y="150" width="100" height="8" fill="#6B7280" rx="2" />
        </svg>

        {isDaytime ? (
          <>
            <EnergyRay delay={0} />
            <EnergyRay delay={4.5} />
          </>
        ) : (
          <>
            <SleepZzz delay={0} />
            <SleepZzz delay={4.5} />
          </>
        )}

        <motion.div
          className={`text-center ${isActive ? 'opacity-100' : 'opacity-30 blur-lg'}`}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-500 uppercase tracking-wide">Energia Gerada</p>
          <p className="text-3xl font-bold text-emerald-600">{energyValue} kW</p>
        </motion.div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <motion.div
                className="w-12 h-12 bg-blue-500 rounded-full"
                animate={{ x: [-20, 20] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.div
                className="w-12 h-12 bg-blue-600 rounded-full"
                animate={{ x: [20, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </div>
        )}
      </div>
    </AnimationCard>
  );
}
