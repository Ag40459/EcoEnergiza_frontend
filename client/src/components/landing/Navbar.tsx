/*
 * Design: Clean Orgânico - EcoEnergiza
 * Navbar minimalista com logo, menu e botão Acessar
 * Modal de Soluções com cards expansíveis
 * Cores: Verde esmeralda #009865, texto #004e3a
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Menu, Sun, Gauge, TreePine, ChevronRight } from "lucide-react";

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

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [solucoesAberto, setSolucoesAberto] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#009865" }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: "#004e3a" }}>
              EcoEnergiza
            </span>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#inicio" className="text-sm font-semibold no-underline transition-opacity hover:opacity-60" style={{ color: "#004e3a" }}>
              Início
            </a>
            <button
              onClick={() => setSolucoesAberto(true)}
              className="text-sm font-semibold transition-opacity hover:opacity-60 bg-transparent border-none cursor-pointer"
              style={{ color: "#004e3a" }}
            >
              Soluções
            </button>
            <a href="#sobre" className="text-sm font-semibold no-underline transition-opacity hover:opacity-60" style={{ color: "#004e3a" }}>
              Sobre
            </a>
            <a href="#contato" className="text-sm font-semibold no-underline transition-opacity hover:opacity-60" style={{ color: "#004e3a" }}>
              Contato
            </a>
          </div>

          {/* Botão Acessar Desktop */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-2.5 rounded-full text-sm font-bold text-white border-none cursor-pointer shadow-sm"
              style={{ backgroundColor: "#009865" }}
            >
              Acessar
            </motion.button>
          </div>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden bg-transparent border-none p-2 cursor-pointer"
            style={{ color: "#004e3a" }}
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {menuAberto && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden overflow-hidden bg-white shadow-xl border-t border-gray-100"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <a href="#inicio" className="text-lg font-bold no-underline" style={{ color: "#004e3a" }}
                  onClick={() => setMenuAberto(false)}>
                  Início
                </a>
                <button
                  onClick={() => { setSolucoesAberto(true); setMenuAberto(false); }}
                  className="text-lg font-bold text-left bg-transparent border-none cursor-pointer"
                  style={{ color: "#004e3a" }}
                >
                  Soluções
                </button>
                <a href="#sobre" className="text-lg font-bold no-underline" style={{ color: "#004e3a" }}
                  onClick={() => setMenuAberto(false)}>
                  Sobre
                </a>
                <a href="#contato" className="text-lg font-bold no-underline" style={{ color: "#004e3a" }}
                  onClick={() => setMenuAberto(false)}>
                  Contato
                </a>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-4 rounded-2xl text-lg font-bold text-white border-none w-full shadow-lg"
                  style={{ backgroundColor: "#009865" }}
                >
                  Acessar Conta
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modal de Soluções */}
      <AnimatePresence>
        {solucoesAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 78, 58, 0.4)", backdropFilter: "blur(8px)" }}
            onClick={() => setSolucoesAberto(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-xl relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold" style={{ color: "#004e3a" }}>
                  Nossas Soluções
                </h2>
                <button
                  onClick={() => setSolucoesAberto(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 border-none cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ color: "#004e3a" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cards de Soluções */}
              <div className="flex flex-col gap-4">
                {solucoes.map((solucao, index) => {
                  const Icone = solucao.icone;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 6, backgroundColor: "#f0faf5" }}
                      className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 text-left w-full transition-all cursor-pointer bg-white"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ backgroundColor: `${solucao.cor}15` }}
                      >
                        <Icone className="w-7 h-7" style={{ color: solucao.cor }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1" style={{ color: "#004e3a" }}>
                          {solucao.titulo}
                        </h3>
                        <p className="text-sm leading-relaxed opacity-80" style={{ color: "#006044" }}>
                          {solucao.descricao}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 shrink-0 opacity-40" style={{ color: "#009865" }} />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
