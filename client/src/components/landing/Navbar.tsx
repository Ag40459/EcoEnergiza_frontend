import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sun, Gauge, TreePine, ChevronRight } from "lucide-react";

const solucoes = [
  {
    titulo: "Economize até 100%",
    descricao: "Gere sua própria energia solar e reduza sua conta de luz a praticamente zero.",
    icone: Sun,
    cor: "#009865",
  },
  {
    titulo: "Desconto na Conta",
    descricao: "Receba descontos na sua conta de energia sem precisar instalar nada no seu telhado.",
    icone: Gauge,
    cor: "#00b876",
  },
  {
    titulo: "Impacto Positivo",
    descricao: "Contribua para uma cidade mais sustentável e reduza a emissão de CO₂ na sua região.",
    icone: TreePine,
    cor: "#007a52",
  },
];

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [solucoesAberto, setSolucoesAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-gray-100"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2 no-underline">
            {/* Logo aumentada em 40% (de h-20 para h-28 em mobile, h-32 para h-44 em desktop) mantendo navbar h-20 */}
            <img 
              src="/assets/logo.png" 
              alt="EcoEnergiza" 
              className="h-28 md:h-36 lg:h-44 w-auto object-contain transition-all" 
              style={{ marginTop: "10px" }}
            />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {/* Ocultar Início quando não houver rolagem */}
            {scrolled && (
              <motion.a 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                href="#inicio" 
                className="text-sm font-semibold no-underline hover:opacity-60" 
                style={{ color: "#004e3a" }}
              >
                Início
              </motion.a>
            )}
            <button onClick={() => setSolucoesAberto(true)} className="text-sm font-semibold hover:opacity-60 bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Soluções</button>
            <a href="#sobre" className="text-sm font-semibold no-underline hover:opacity-60" style={{ color: "#004e3a" }}>Sobre</a>
            <a href="#contato" className="text-sm font-semibold no-underline hover:opacity-60" style={{ color: "#004e3a" }}>Contato</a>
          </div>

          <div className="hidden md:block w-[120px]"></div>

          <button 
            onClick={() => setMenuAberto(!menuAberto)} 
            className="md:hidden bg-transparent border-none p-2 cursor-pointer relative z-[110]" 
            style={{ color: "#004e3a" }}
          >
            <div className="w-6 h-6 flex items-center justify-center relative">
              <motion.div
                animate={menuAberto ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                className="absolute w-6 h-0.5 bg-current"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={menuAberto ? { opacity: 0 } : { opacity: 1 }}
                className="absolute w-6 h-0.5 bg-current"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={menuAberto ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                className="absolute w-6 h-0.5 bg-current"
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {menuAberto && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-white shadow-xl border-t border-gray-100">
              <div className="px-6 py-8 flex flex-col gap-6">
                {scrolled && (
                  <a href="#inicio" className="text-lg font-bold no-underline" style={{ color: "#004e3a" }} onClick={() => setMenuAberto(false)}>Início</a>
                )}
                <button onClick={() => { setSolucoesAberto(true); setMenuAberto(false); }} className="text-lg font-bold text-left bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Soluções</button>
                <a href="#sobre" className="text-lg font-bold no-underline" style={{ color: "#004e3a" }} onClick={() => setMenuAberto(false)}>Sobre</a>
                <a href="#contato" className="text-lg font-bold no-underline" style={{ color: "#004e3a" }} onClick={() => setMenuAberto(false)}>Contato</a>
                <button onClick={() => { onOpenLogin(); setMenuAberto(false); }} className="mt-4 px-6 py-4 rounded-2xl text-lg font-bold text-white border-none w-full shadow-lg" style={{ backgroundColor: "#009865" }}>Acessar Conta</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {solucoesAberto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSolucoesAberto(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-xl relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold" style={{ color: "#004e3a" }}>Nossas Soluções</h2>
                <button onClick={() => setSolucoesAberto(false)} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 border-none cursor-pointer hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-4">
                {solucoes.map((solucao, index) => (
                  <button key={index} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 text-left w-full transition-all cursor-pointer bg-white hover:bg-gray-50">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${solucao.cor}15` }}>
                      <solucao.icone className="w-7 h-7" style={{ color: solucao.cor }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-1" style={{ color: "#004e3a" }}>{solucao.titulo}</h3>
                      <p className="text-sm leading-relaxed opacity-80" style={{ color: "#006044" }}>{solucao.descricao}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 shrink-0 opacity-40" style={{ color: "#009865" }} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
