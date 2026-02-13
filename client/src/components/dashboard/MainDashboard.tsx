import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, FileText, LogOut, 
  Zap, Sun, Moon, ChevronRight, X,
  LayoutDashboard, Users, Calendar, DollarSign, BookOpen, BarChart,
  Home as HomeIcon, PieChart, Award, Wallet, Search, Bell, Menu, Plus,
  Smartphone, CreditCard, Landmark, QrCode, FileCheck, Camera, CheckCircle2,
  Factory, Settings2, Edit3
} from 'lucide-react';
import { DynamicAnimation } from '../animations/DynamicAnimation';
import { GenerationModal, ConsumptionModal, PrivatePlantModal } from '../modals/BusinessModals';

interface MainDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenConsultant: () => void;
  isAdmin?: boolean;
}

type TabId = 'inicio' | 'dados' | 'seguranca' | 'perfil' | 'indicacoes' | 'moedas' | 'consultor' | 'adm';

export default function MainDashboard({ onLogout, theme, toggleTheme, onOpenConsultant, isAdmin = false }: MainDashboardProps) {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [usinaAtiva, setUsinaAtiva] = useState(false);
  const [casaAtiva, setCasaAtiva] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showConsModal, setShowConsModal] = useState(false);
  const [showPrivatePlantModal, setShowPrivatePlantModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [footerTabs, setFooterTabs] = useState<TabId[]>(['inicio', 'indicacoes', 'seguranca', 'perfil']);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const userName = "Alex Silva";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const adminCards = [
    { id: 'textos', titulo: 'Editar Textos', icone: Edit3, cor: 'bg-blue-500' },
    { id: 'leads', titulo: 'Gestão Leads', icone: Users, cor: 'bg-green-500' },
    { id: 'agenda', titulo: 'Agenda Geral', icone: Calendar, cor: 'bg-purple-500' },
    { id: 'orcamentos', titulo: 'Orçamentos', icone: DollarSign, cor: 'bg-yellow-500' },
    { id: 'config', titulo: 'Configurações', icone: Settings2, cor: 'bg-orange-500' },
    { id: 'performance', titulo: 'Performance', icone: BarChart, cor: 'bg-pink-500' },
  ];

  const allTabs: { id: TabId; label: string; icon: any }[] = [
    { id: 'inicio', label: 'Início', icon: HomeIcon },
    { id: 'dados', label: 'Dados', icon: PieChart },
    { id: 'indicacoes', label: 'Indicações', icon: Users },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'moedas', label: 'Moedas', icon: Wallet },
    { id: 'consultor', label: 'Consultor', icon: Award },
    { id: 'adm', label: 'ADM', icon: Settings2 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-items-center">
              <DynamicAnimation 
                type="generation" 
                state={usinaAtiva ? 'active' : 'inactive'} 
                label="Geração de Energia" 
                value="124.5" unit="kWh" 
                isAtivo={usinaAtiva}
                onClick={() => setShowGenModal(true)} 
              />
              <DynamicAnimation 
                type="consumption" 
                state={casaAtiva ? 'active' : 'inactive'} 
                label="Consumo da Casa" 
                value="842.1" unit="kWh" 
                isAtivo={casaAtiva}
                onClick={() => setShowConsModal(true)} 
              />
              <DynamicAnimation 
                type="private_plant" 
                state="active" 
                label="Usina Particular" 
                value="Gestão" unit="Ativa" 
                isAtivo={true}
                onClick={() => setShowPrivatePlantModal(true)} 
              />
              <DynamicAnimation 
                type="consultant" 
                state="active" 
                label="Renda Extra" 
                value="15%" unit="Comissão" 
                isAtivo={true}
                onClick={onOpenConsultant} 
              />
            </div>
          </div>
        );
      case 'perfil':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-[#009865]">
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black text-[#004e3a] dark:text-white leading-tight">
                    {userName}
                  </h2>
                  <p className="text-sm font-bold text-gray-400">alex.silva@email.com</p>
                  {isAdmin && (
                    <button 
                      onClick={() => setActiveTab('adm')}
                      className="mt-2 self-start px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-black uppercase tracking-wider"
                    >
                      Acessar Painel ADM
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Meus Dados', icon: User, tab: 'dados' },
                  { label: 'Segurança', icon: Shield, tab: 'seguranca' },
                  { label: 'Personalizar Rodapé', icon: Settings, action: 'customize' },
                ].map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => {
                      if (item.tab) setActiveTab(item.tab as TabId);
                      if (item.action === 'customize') {
                        const availableTabs: TabId[] = ['inicio', 'moedas', 'consultor', 'perfil', 'adm', 'seguranca', 'indicacoes'];
                        const currentIdx = availableTabs.indexOf(footerTabs[1]);
                        const nextTabs: TabId[] = ['inicio', availableTabs[(currentIdx + 1) % availableTabs.length], 'seguranca', 'perfil'];
                        setFooterTabs(nextTabs);
                        alert("Rodapé alterado para: " + nextTabs.join(', '));
                      }
                    }}
                    className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-[#009865]" />
                      <span className="font-black text-sm text-[#004e3a] dark:text-white">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                ))}
              </div>

              <button 
                onClick={onLogout}
                className="w-full mt-8 py-4 flex items-center justify-center gap-3 text-red-500 font-black text-sm border-2 border-red-50 dark:border-red-900/20 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Sair da Conta
              </button>
            </div>
          </motion.div>
        );
      case 'adm':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Painel Administrativo</h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Gestão da Plataforma EcoEnergiza</p>
                </div>
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                  <Settings2 className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {adminCards.map((card) => (
                  <button 
                    key={card.id} 
                    onClick={() => alert(`Abrindo: ${card.titulo}`)}
                    className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all group"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${card.cor} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                      <card.icone className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-black text-sm text-[#004e3a] dark:text-white">{card.titulo}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'seguranca':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-[#009865] mx-auto mb-4" />
                <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">Segurança e Verificação</h2>
                <p className="text-sm text-gray-400 font-bold">Mantenha sua conta protegida e verificada</p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
                  <FileCheck className="w-10 h-10 text-gray-400" />
                  <div className="text-center">
                    <p className="font-black text-[#004e3a] dark:text-white">Envio de Documentos</p>
                    <p className="text-xs text-gray-400">RG, CNH ou Passaporte (Frente e Verso)</p>
                  </div>
                  <button className="px-6 py-2 bg-[#009865] text-white rounded-full font-black text-xs uppercase">Fazer Upload</button>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
                  <Camera className="w-10 h-10 text-gray-400" />
                  <div className="text-center">
                    <p className="font-black text-[#004e3a] dark:text-white">Reconhecimento Facial</p>
                    <p className="text-xs text-gray-400">Selfie para validação de identidade</p>
                  </div>
                  <button className="px-6 py-2 bg-[#004e3a] text-white rounded-full font-black text-xs uppercase">Iniciar Biometria</button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 font-black uppercase tracking-widest">Em desenvolvimento...</p>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col min-h-screen pb-24 lg:pb-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar com Saldos Lado a Lado */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('perfil')}
              className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-[#009865] shrink-0"
            >
              <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
            </button>
            <div className="hidden sm:flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-[#004e3a] dark:text-white truncate text-sm md:text-base">
                  {userName}
                </span>
                <Award className="w-4 h-4 text-yellow-500 shrink-0" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Saldos Lado a Lado no Desktop */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setShowGenModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-100 dark:border-green-800 transition-all hover:scale-105"
              >
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className={`text-[10px] sm:text-xs font-black text-[#004e3a] dark:text-green-400 ${!usinaAtiva ? 'blur-[4px]' : ''}`}>
                  124.5 <span className="opacity-50">kWh</span>
                </span>
              </button>
              <button 
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-full border border-yellow-100 dark:border-yellow-800 transition-all hover:scale-105"
              >
                <Wallet className="w-3 h-3 text-yellow-600" />
                <span className="text-[10px] sm:text-xs font-black text-[#004e3a] dark:text-yellow-500">
                  0,00 <span className="opacity-50">ECO</span>
                </span>
              </button>
            </div>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 pt-28 px-6 max-w-7xl mx-auto w-full">
        {renderTabContent()}
      </main>

      {/* Rodapé de Navegação Customizável */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-8 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {footerTabs.map((tabId) => {
            const tab = allTabs.find(t => t.id === tabId) || allTabs[0];
            return (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'text-[#009865] scale-110' : 'text-gray-400'}`}
              >
                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modais de Negócio */}
      <GenerationModal 
        isOpen={showGenModal} 
        onClose={() => setShowGenModal(false)} 
        onActivate={() => setUsinaAtiva(true)}
      />
      <ConsumptionModal 
        isOpen={showConsModal} 
        onClose={() => setShowConsModal(false)} 
        onActivate={() => setCasaAtiva(true)}
        isAtivo={casaAtiva}
      />
      <PrivatePlantModal 
        isOpen={showPrivatePlantModal} 
        onClose={() => setShowPrivatePlantModal(false)} 
      />

      {/* Modal de Moedas */}
      <AnimatePresence>
        {showWalletModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setShowWalletModal(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowWalletModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100/50 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
              
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                  <Wallet className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-black text-[#004e3a] dark:text-yellow-500">Minha Carteira ECO</h3>
                
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-inner">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Saldo Disponível</p>
                  <p className="text-4xl font-black text-[#004e3a] dark:text-white">0,00 <span className="text-sm opacity-50">ECO</span></p>
                </div>

                <div className="space-y-4 text-left">
                  <p className="text-xs font-black text-gray-400 uppercase ml-2">Histórico Recente</p>
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center h-20 border border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-gray-400">Nenhuma transação encontrada.</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Converter em Desconto</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
