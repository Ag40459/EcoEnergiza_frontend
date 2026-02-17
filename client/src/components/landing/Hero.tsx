import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowRight, Zap, Shield, Award } from "lucide-react";

const mensagens = [
  "Bem-vindo à EcoEnergiza!",
  "Sua jornada rumo à energia 100% limpa começa aqui.",
  "Economize até 95% na sua conta de luz hoje mesmo.",
  "Gestão inteligente e sustentável para sua casa ou empresa.",
  "Seja um consultor e ajude a transformar o planeta.",
  "Soluções completas em energia solar fotovoltaica.",
];

const coresGradiente = [
  "linear-gradient(135deg, #e8f5e9 0%, #e0f2f1 50%, #f1f8e9 100%)",
  "linear-gradient(135deg, #fff9c4 0%, #e8f5e9 50%, #e1f5fe 100%)",
  "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%)",
  "linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 50%, #fffde7 100%)",
];

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const { displayedText } = useTypewriter({
    messages: mensagens,
    typingSpeed: 55,
    deletingSpeed: 30,
    pauseAfterType: 3500,
    pauseAfterDelete: 400,
  });

  const [corIndex, setCorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCorIndex((prev) => (prev + 1) % coresGradiente.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="w-full min-h-screen flex items-center justify-center p-6 lg:p-20 overflow-hidden relative"
      style={{
        background: coresGradiente[corIndex],
        transition: "background 3s ease-in-out",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10 py-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="min-h-[180px] md:min-h-[220px] lg:min-h-[280px] mb-8 flex items-start justify-center lg:justify-start">
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
                style={{ color: "#004e3a" }}
              >
                {displayedText}
                <span
                  className="typing-cursor inline-block w-[4px] h-[0.9em] ml-2 align-middle"
                  style={{ backgroundColor: "#009865" }}
                />
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="flex items-center gap-3 px-10 py-5 rounded-[2rem] font-black text-white shadow-2xl transition-all border-none cursor-pointer text-lg uppercase tracking-wider"
                style={{ 
                  backgroundColor: "#009865",
                  boxShadow: "0 20px 40px -10px rgba(0, 152, 101, 0.5)"
                }}
              >
                Comece Agora
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <div className="hidden sm:flex items-center gap-6 ml-4">
                <div className="flex flex-col items-center">
                  <Shield className="w-5 h-5 text-[#009865] mb-1" />
                  <span className="text-[10px] font-black text-[#004e3a] uppercase">Seguro</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mb-1" />
                  <span className="text-[10px] font-black text-[#004e3a] uppercase">Rápido</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#009865] opacity-[0.05] rounded-full blur-[120px] -z-0"></div>
    </section>
  );
}
