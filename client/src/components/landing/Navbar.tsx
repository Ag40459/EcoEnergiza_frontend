import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sun, Moon, Zap, Shield, TrendingUp, Cpu, Globe, Users, Heart, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentModal, ContactModal } from '../modals/ContentModals';

interface NavbarProps {
  onOpenLogin: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ onOpenLogin, theme, toggleTheme }: NavbarProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalSolucoes, setModalSolucoes] = useState(false);
  const [modalSobre, setModalSobre] = useState(false);
  const [modalContato, setModalContato] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solucoesData = [
    { 
      titulo: "Usina Remota", 
      dor: "Não tenho espaço para painéis solares no meu telhado ou moro em apartamento.",
      icone: Zap,
      descricaoLonga: "Nossa solução de Usina Remota permite que você gere sua própria energia em nossas fazendas solares e receba os créditos diretamente na sua conta de luz, sem precisar instalar nada na sua residência.",
      beneficios: ["Sem instalação no telhado", "Ideal para apartamentos", "Economia imediata", "Gestão via App"],
      imagens: ["https:
    },
    { 
      titulo: "Smart Metering", 
      dor: "Minha conta de luz é uma surpresa todo mês e não sei onde estou gastando mais.",
      icone: Cpu,
      descricaoLonga: "Com o nosso Smart Meter, você acompanha seu consumo em tempo real, identifica aparelhos 'vilões' e recebe alertas inteligentes para economizar antes mesmo da conta chegar.",
      beneficios: ["Monitoramento Real-time", "Alertas de Consumo", "Identificação de Aparelhos", "Fácil Instalação"],
      imagens: ["https:
    },
    { 
      titulo: "Créditos de Carbono", 
      dor: "Quero ajudar o planeta mas não sei como monetizar minhas ações sustentáveis.",
      icone: Globe,
      descricaoLonga: "Transformamos sua geração de energia limpa em ativos digitais e créditos de carbono que podem ser negociados ou usados para abater custos, incentivando a sustentabilidade lucrativa.",
      beneficios: ["Monetização Sustentável", "Ativos Digitais", "Impacto Ambiental Positivo", "Transparência Blockchain"],
      imagens: ["https:
    }
  ];

  const sobreData = [
    { 
      titulo: "Nossa Missão", 
      dor: "O sistema elétrico atual é arcaico, centralizado e pouco transparente.",
      icone: Heart,
      descricaoLonga: "Nascemos para democratizar o acesso à energia inteligente. Nossa missão é colocar o controle do ecossistema energético nas mãos do consumidor através de tecnologia de ponta e IA.",
      beneficios: ["Transparência", "Democratização", "Inovação Constante", "Foco no Cliente"],
      imagens: ["https:
    },
    { 
      titulo: "Tecnologia Ecolote", 
      dor: "Como confiar que os dados de geração e economia são reais?",
      icone: Shield,
      descricaoLonga: "Utilizamos uma infraestrutura robusta de microserviços, Kafka e processamento em tempo real para garantir que cada watt gerado e cada centavo economizado seja auditável e preciso.",
      beneficios: ["Dados em Tempo Real", "Segurança Bancária", "Escalabilidade", "Precisão Absoluta"],
      imagens: ["https:
    }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 rounded-b-[2.5rem] ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2' : 'bg-white dark:bg-gray-900 py-4'} border-b border-gray-100 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="/" className="flex items-center no-underline shrink-0">
            <img src="/assets/logo.png" alt="EcoEnergiza" className="h-28 md:h-36 lg:h-44 w-auto object-contain transition-all" style={{ marginTop: "10px" }} />
          </a>

          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => setModalSolucoes(true)} className="text-sm font-black text-[#004e3a] dark:text-gray-300 hover:text-[#009865] uppercase tracking-widest transition-colors">Soluções</button>
            <button onClick={() => setModalSobre(true)} className="text-sm font-black text-[#004e3a] dark:text-gray-300 hover:text-[#009865] uppercase tracking-widest transition-colors">Sobre</button>
            <button onClick={() => setModalContato(true)} className="text-sm font-black text-[#004e3a] dark:text-gray-300 hover:text-[#009865] uppercase tracking-widest transition-colors">Contato</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            <button 
              onClick={onOpenLogin}
              className="hidden md:block px-8 py-3 bg-[#004e3a] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-900/20 hover:scale-105 active:scale-95 transition-all"
            >
              Acessar Conta
            </button>
            <button onClick={() => setMenuAberto(!menuAberto)} className="lg:hidden p-2 text-[#004e3a] dark:text-white">
              {menuAberto ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuAberto && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 rounded-b-[2rem]">
              <div className="px-6 py-8 flex flex-col gap-6">
                <button onClick={() => { setModalSolucoes(true); setMenuAberto(false); }} className="text-lg font-black text-left text-[#004e3a] dark:text-white uppercase tracking-widest">Soluções</button>
                <button onClick={() => { setModalSobre(true); setMenuAberto(false); }} className="text-lg font-black text-left text-[#004e3a] dark:text-white uppercase tracking-widest">Sobre</button>
                <button onClick={() => { setModalContato(true); setMenuAberto(false); }} className="text-lg font-black text-left text-[#004e3a] dark:text-white uppercase tracking-widest">Contato</button>
                <button onClick={() => { onOpenLogin(); setMenuAberto(false); }} className="mt-4 px-6 py-4 rounded-2xl text-lg font-black text-white bg-[#009865] shadow-lg">Acessar Conta</button>
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
