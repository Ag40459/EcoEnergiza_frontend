import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimationCardProps {
  children: ReactNode;
  isActive: boolean;
  isLoading?: boolean;
  progress?: number;
  onClick?: () => void;
  className?: string;
}

export default function AnimationCard({
  children,
  isActive,
  isLoading = false,
  progress = 0,
  onClick,
  className = '',
}: AnimationCardProps) {
  return (
    <motion.div
      className={`relative w-full h-64 bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-20">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{
          opacity: isActive ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10" />
      )}
    </motion.div>
  );
}
