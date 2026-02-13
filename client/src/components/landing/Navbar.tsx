import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Gauge, TreePine, Award, Sparkles, ShieldCheck } from "lucide-react";
import { ContentModal, ContactModal } from "../modals/ContentModals";

const solucoesData = [
  {
    titulo: "Economize até 100%",
    descricao: "Gere sua própria energia solar e reduza sua conta de luz.",
    descricaoLonga: "Através das nossas usinas remotas, você gera sua própria energia limpa sem precisar de telhado. O sistema é monitorado por IA para garantir a máxima eficiência e economia.",
    icone: Sun,
    imagens: ["/assets/solucao1_1.jpg", "/assets/solucao1_2.jpg"],
    link: "https://ecoenergiza.com.br/usinas"
  },
  {
    titulo: "Desconto na Conta",
    descricao: "Receba descontos diretos sem instalação.",
    descricaoLonga: "Ideal para quem mora de aluguel ou não tem espaço. Você se associa a uma de nossas usinas e recebe os créditos diretamente na sua fatura da concessionária.",
    icone: Gauge,
    imagens: ["/assets/solucao2_1.jpg"],
    link: "https://ecoenergiza.com.br/descontos"
  }
];

const sobreData = [
  {
    titulo: "Nossa Missão",
    descricao: "Digitalizar o acesso à energia limpa.",
    descricaoLonga: "A EcoEnergiza nasceu com o propósito de democratizar o acesso à energia sustentável através da tecnologia e inteligência artificial, criando um ecossistema transparente e eficiente.",
    icone: Sparkles,
    imagens: ["/assets/sobre1.jpg"]
  },
  {
    titulo: "Segurança e Tecnologia",
    descricao: "Monitoramento 24/7 com IA.",
    descricaoLonga: "Utilizamos as tecnologias mais modernas de IoT e IA para garantir que cada kWh gerado seja aproveitado ao máximo, trazendo segurança e previsibilidade para nossos associados.",
    icone: ShieldCheck,
    imagens: ["/assets/sobre2.jpg"]
  }
];

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalSolucoes, setModalSolucoes] = useState(false);
  const [modalSobre, setModalSobre] = useState(false);
  const [modalContato, setModalContato] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="/" className="flex items-center no-underline">
            <img src="/assets/logo.png" alt="EcoEnergiza" className="h-28 md:h-36 lg:h-44 w-auto object-contain transition-all" style={{ marginTop: "10px" }} />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {scrolled && (
              <motion.a initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} href="#inicio" className="text-sm font-black no-underline hover:opacity-60" style={{ color: "#004e3a" }}>Início</motion.a>
            )}
            <button onClick={() => setModalSolucoes(true)} className="text-sm font-black hover:opacity-60 bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Soluções</button>
            <button onClick={() => setModalSobre(true)} className="text-sm font-black hover:opacity-60 bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Sobre</button>
            <button onClick={() => setModalContato(true)} className="text-sm font-black hover:opacity-60 bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Contato</button>
          </div>

          <div className="hidden md:block w-[120px]"></div>

          <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden bg-transparent border-none p-2 cursor-pointer relative z-[110]" style={{ color: "#004e3a" }}>
            <div className="w-6 h-6 flex items-center justify-center relative">
              <motion.div animate={menuAberto ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} className="absolute w-6 h-0.5 bg-current" />
              <motion.div animate={menuAberto ? { opacity: 0 } : { opacity: 1 }} className="absolute w-6 h-0.5 bg-current" />
              <motion.div animate={menuAberto ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} className="absolute w-6 h-0.5 bg-current" />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {menuAberto && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-white shadow-xl border-t border-gray-100">
              <div className="px-6 py-8 flex flex-col gap-6">
                {scrolled && <a href="#inicio" className="text-lg font-black no-underline" style={{ color: "#004e3a" }} onClick={() => setMenuAberto(false)}>Início</a>}
                <button onClick={() => { setModalSolucoes(true); setMenuAberto(false); }} className="text-lg font-black text-left bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Soluções</button>
                <button onClick={() => { setModalSobre(true); setMenuAberto(false); }} className="text-lg font-black text-left bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Sobre</button>
                <button onClick={() => { setModalContato(true); setMenuAberto(false); }} className="text-lg font-black text-left bg-transparent border-none cursor-pointer" style={{ color: "#004e3a" }}>Contato</button>
                <button onClick={() => { onOpenLogin(); setMenuAberto(false); }} className="mt-4 px-6 py-4 rounded-2xl text-lg font-black text-white border-none w-full shadow-lg" style={{ backgroundColor: "#009865" }}>Acessar Conta</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContentModal isOpen={modalSolucoes} onClose={() => setModalSolucoes(false)} title="Nossas Soluções" items={solucoesData} />
      <ContentModal isOpen={modalSobre} onClose={() => setModalSobre(false)} title="Sobre a EcoEnergiza" items={sobreData} />
      <ContactModal isOpen={modalContato} onClose={() => setModalContato(false)} />
    </>
  );
}
