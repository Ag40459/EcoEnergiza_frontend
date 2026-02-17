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
      className="w-full h-full flex items-center justify-center p-6 lg:p-20 overflow-hidden relative"
      style={{
        background: coresGradiente[corIndex],
        transition: "background 3s ease-in-out",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-[180px] md:h-[220px] lg:h-[280px] mb-8 flex items-start justify-center lg:justify-start">
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
                  <Zap className="w-5 h-5 text-yellow-500" mb-1 />
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
            {/* Celular Mockup com Imagem do Dashboard */}
            <div className="w-[320px] h-[640px] bg-[#004e3a] rounded-[3.5rem] border-[12px] border-[#003d2e] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden relative mx-auto">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#003d2e] rounded-b-[1.5rem] z-20"></div>
              
              {/* Conteúdo Simulado do Dashboard */}
              <div className="w-full h-full bg-gray-50 flex flex-col">
                <div className="p-6 pt-10 bg-white border-b border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#009865] flex items-center justify-center text-white font-black">AS</div>
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Olá, Alex Silva</p>
                  <h2 className="text-xl font-black text-[#004e3a]">Meu Dashboard</h2>
                </div>
                
                <div className="flex-1 p-6 space-y-4 overflow-hidden">
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-[10px] font-black text-gray-400 uppercase">Geração Mensal</span>
                    </div>
                    <p className="text-2xl font-black text-[#004e3a]">1.240 <span className="text-xs opacity-50">kWh</span></p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="w-3/4 h-full bg-[#009865]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                      <p className="text-[8px] font-black text-green-600 uppercase">Economia</p>
                      <p className="text-sm font-black text-[#004e3a]">R$ 850,00</p>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                      <p className="text-[8px] font-black text-blue-600 uppercase">Impacto</p>
                      <p className="text-sm font-black text-[#004e3a]">12 Árvores</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-4">Consumo em Tempo Real</p>
                    <div className="flex items-end gap-1 h-20">
                      {[30, 50, 40, 80, 60, 90, 45, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#009865]/20 rounded-t-lg relative group">
                          <div className="absolute bottom-0 left-0 right-0 bg-[#009865] rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos Flutuantes */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-24 bg-white shadow-2xl rounded-[1.5rem] p-5 flex items-center gap-4 border border-gray-100 z-30"
            >
              <div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Sua Usina</p>
                <p className="text-sm font-black text-[#004e3a]">Ativa & Gerando</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-32 bg-white shadow-2xl rounded-[1.5rem] p-5 flex items-center gap-4 border border-gray-100 z-30"
            >
              <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Certificado</p>
                <p className="text-sm font-black text-[#004e3a]">100% Sustentável</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#009865] opacity-[0.05] rounded-full blur-[120px] -z-0"></div>
    </section>
  );
}
