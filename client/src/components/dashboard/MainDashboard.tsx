import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, FileText, LogOut, 
  Zap, Sun, Moon, ChevronRight, X, ChevronUp,
  LayoutDashboard, Users, Calendar, DollarSign, BookOpen, BarChart,
  Home as HomeIcon, PieChart, Award, Wallet, Search, Bell, Menu, Plus,
  Smartphone, CreditCard, Landmark, QrCode, FileCheck, Camera, CheckCircle2,
  Factory, Settings2, Edit3, Briefcase, Filter, Search as SearchIcon, Clock, TrendingUp, History, Eye, EyeOff, Coins
} from 'lucide-react';
import { DynamicAnimation } from '../animations/DynamicAnimation';
import { GenerationModal, ConsumptionModal, PrivatePlantModal } from '../modals/BusinessModals';
import BusinessModals from '../modals/BusinessModals';

interface MainDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenConsultant: () => void;
  isAdmin?: boolean;
}

type TabId = 'inicio' | 'dados' | 'seguranca' | 'perfil' | 'indicacoes' | 'moedas' | 'consultor' | 'adm' | 'agenda' | 'crm';

const BalanceModal = ({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: 'kwh' | 'eco' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-md p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        <div className="text-center space-y-6">
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${type === 'kwh' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
            {type === 'kwh' ? <Zap className="w-8 h-8" /> : <Wallet className="w-8 h-8" />}
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">Histórico de {type === 'kwh' ? 'Consumo' : 'Moedas'}</h2>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Últimos 30 dias</p>
          </div>
          <div className="space-y-3 text-left">
            {[
              { date: '14 Fev', val: type === 'kwh' ? '- 12.4 kWh' : '+ 50 ECO', label: 'Uso Diário' },
              { date: '13 Fev', val: type === 'kwh' ? '- 15.1 kWh' : '+ 45 ECO', label: 'Uso Diário' },
              { date: '12 Fev', val: type === 'kwh' ? '- 10.8 kWh' : '+ 120 ECO', label: 'Bônus Indicação' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">{item.date}</p>
                  <p className="font-bold text-sm dark:text-white">{item.label}</p>
                </div>
                <p className={`font-black ${item.val.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.val}</p>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Fechar</button>
        </div>
      </motion.div>
    </div>
  );
};

export default function MainDashboard({ onLogout, theme, toggleTheme, onOpenConsultant, isAdmin = false }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    return (localStorage.getItem("activeTab") as TabId) || 'inicio';
  });
  const [usinaAtiva, setUsinaAtiva] = useState(() => {
    return localStorage.getItem("usinaAtiva") === "true";
  });
  const [casaAtiva, setCasaAtiva] = useState(() => {
    return localStorage.getItem("casaAtiva") === "true";
  });
  const [isSaldoVisivel, setIsSaldoVisivel] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showConsModal, setShowConsModal] = useState(false);
  const [showPrivatePlantModal, setShowPrivatePlantModal] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState<{ open: boolean, type: 'kwh' | 'eco' }>({ open: false, type: 'kwh' });
  const [footerTabs, setFooterTabs] = useState<TabId[]>(() => {
    const saved = localStorage.getItem("footerTabs");
    if (saved) return JSON.parse(saved);
    return ['inicio', 'indicacoes', 'seguranca', 'perfil', ...(isAdmin ? ['adm'] : [])];
  });
  const [isFooterDrawerOpen, setIsFooterDrawerOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [editingTabIndex, setEditingTabIndex] = useState<number | null>(null);
  const [agendaView, setAgendaView] = useState<'list' | 'grid'>('list');

  const userName = "Alex Silva";

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
    localStorage.setItem("usinaAtiva", usinaAtiva.toString());
    localStorage.setItem("casaAtiva", casaAtiva.toString());
    localStorage.setItem("footerTabs", JSON.stringify(footerTabs));
  }, [activeTab, usinaAtiva, casaAtiva, footerTabs]);

  const allTabs: { id: TabId; label: string; icon: any }[] = [
    { id: 'inicio', label: 'Início', icon: HomeIcon },
    { id: 'dados', label: 'Dados', icon: PieChart },
    { id: 'indicacoes', label: 'Indicações', icon: Users },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'moedas', label: 'Moedas', icon: Wallet },
    { id: 'consultor', label: 'Consultor', icon: Award },
    ...(isAdmin ? [{ id: 'adm' as const, label: 'ADM', icon: Settings2 }] : []),
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'crm', label: 'CRM', icon: Briefcase },
  ];

  const visibleFooterTabs = useMemo(() => {
    let count = footerTabs.length;
    if (count % 2 !== 0) {
      count = Math.max(2, count - 1);
    }
    return footerTabs.slice(0, count);
  }, [footerTabs]);

  const activeTabLabel = useMemo(() => {
    return allTabs.find(t => t.id === activeTab)?.label || 'Início';
  }, [activeTab]);

  const renderNavbar = () => (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 rounded-b-[2.5rem] ${theme === 'dark' ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-100'} backdrop-blur-md shadow-lg border-b py-2`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <img src="/assets/logo.png" alt="EcoEnergiza" className="h-12 md:h-16 w-auto object-contain md:scale-100 scale-[1.25] origin-left" />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-3 px-2 md:px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 whitespace-nowrap overflow-hidden">
            <div 
              className="flex items-center gap-1 md:gap-2 pr-2 md:pr-3 border-r border-gray-200 dark:border-gray-600 cursor-pointer"
              onClick={() => setShowBusinessModal(true)}
            >
              <Zap className="w-3 md:w-4 h-3 md:h-4 text-yellow-500 flex-shrink-0" />
              <span className={`text-[9px] md:text-xs font-black ${!isSaldoVisivel ? 'blur-[3px]' : ''}`}>2.450 kWh</span>
            </div>
            <div 
              className="flex items-center gap-1 md:gap-2 pr-2 md:pr-3 border-r border-gray-200 dark:border-gray-600 cursor-pointer"
              onClick={() => setShowBusinessModal(true)}
            >
              <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-[#009865] flex-shrink-0" />
              <span className={`text-[9px] md:text-xs font-black ${!isSaldoVisivel ? 'blur-[3px]' : ''}`}>R$ 1.240,00</span>
            </div>
            <div 
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
              onClick={() => setShowBusinessModal(true)}
            >
              <Coins className="w-3 md:w-4 h-3 md:h-4 text-yellow-600 flex-shrink-0" />
              <span className={`text-[9px] md:text-xs font-black ${!isSaldoVisivel ? 'blur-[3px]' : ''}`}>0,00 ECO</span>
            </div>
            <button onClick={() => setIsSaldoVisivel(!isSaldoVisivel)} className="ml-1 text-gray-400 hover:text-[#009865] flex-shrink-0">
              {isSaldoVisivel ? <Eye className="w-3 md:w-4 h-3 md:h-4" /> : <EyeOff className="w-3 md:w-4 h-3 md:h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-gray-100 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            
            <div className="flex items-center gap-2 md:gap-3 relative">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-[#004e3a] dark:text-white uppercase leading-none">Alex Silva</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <Award className="w-3 h-3 text-yellow-500" />
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Nível Prata</span>
                </div>
              </div>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-2xl bg-[#009865] border-2 border-white dark:border-gray-800 shadow-lg overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img src="https://i.pravatar.cc/100?img=12" alt="Perfil" className="w-full h-full object-cover" />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-16 right-0 z-[150] bg-white dark:bg-gray-900 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden min-w-[200px]`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => { setIsProfileMenuOpen(false); }}
                      className="w-full px-6 py-4 text-left text-sm font-black text-[#004e3a] dark:text-white uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 flex items-center gap-3"
                    >
                      <Edit3 className="w-4 h-4" />
                      Alterar Dados
                    </button>
                    <button 
                      onClick={() => { setIsProfileMenuOpen(false); }}
                      className="w-full px-6 py-4 text-left text-sm font-black text-[#004e3a] dark:text-white uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair da Conta
                    </button>
                    <button 
                      onClick={() => { setIsProfileMenuOpen(false); }}
                      className="w-full px-6 py-4 text-left text-sm font-black text-red-500 uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                    >
                      <X className="w-4 h-4" />
                      Excluir Conta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={onLogout} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors hidden md:block">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-around px-4 mt-2 border-t border-gray-100 dark:border-gray-800 pt-2">
        {visibleFooterTabs.map((tabId) => {
          const tab = allTabs.find(t => t.id === tabId);
          if (!tab) return null;
          const isActive = activeTab === tabId;
          return (
            <button 
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`flex-1 flex flex-col items-center justify-center py-2 relative ${isActive ? 'text-[#009865]' : 'text-gray-400'}`}
            >
              <tab.icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
              {isActive && (
                <motion.div 
                  layoutId="nav-active-indicator" 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-[#009865] rounded-t-full" 
                />
              )}
            </button>
          );
        })}
        <button 
          onClick={() => { setEditingTabIndex(null); setIsFooterDrawerOpen(true); }}
          className="flex-1 flex flex-col items-center justify-center py-2 text-gray-400"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );

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
                value={isSaldoVisivel && usinaAtiva ? "124.5" : "0.0"} unit="kWh" 
                isAtivo={usinaAtiva}
                onClick={() => setShowGenModal(true)} 
              />
              <DynamicAnimation 
                type="consumption" 
                state={casaAtiva ? 'active' : 'inactive'} 
                label="Consumo da Casa" 
                value={isSaldoVisivel && casaAtiva ? "842.1" : "0.0"} unit="kWh" 
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
                label="Consultor" 
                value="15%" unit="Comissão" 
                isAtivo={true}
                onClick={() => setActiveTab('consultor')} 
              />
            </div>
          </div>
        );
      default:
        return <div className="p-10 text-center font-black text-[#004e3a] dark:text-white uppercase tracking-widest">Conteúdo em Desenvolvimento</div>;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {renderNavbar()}

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-20 left-0 right-0 z-50 py-4 text-center border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
      >
        <p className="text-sm font-black text-[#004e3a] dark:text-white uppercase tracking-[0.3em]">
          {activeTabLabel}
        </p>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 md:pt-40 pb-32">
        <header className="mb-16 hidden md:block">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#009865]/10 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-[#009865]" />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Visão Geral</p>
              </div>
              <h1 className="text-5xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter leading-none">
                Olá, bem-vindo!
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-[#009865] border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden shrink-0">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Perfil" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#004e3a] dark:text-white">Alex Silva</p>
                    <span className="px-3 py-0.5 bg-white dark:bg-gray-800 rounded-full text-[10px] font-black text-[#009865] border border-gray-100 dark:border-gray-700 uppercase tracking-widest">Usuário Associado</span>
                  </div>
                </div>
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-[#004e3a] dark:text-white uppercase tracking-widest">Sistema Online</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className={`text-[10px] font-black ${!isSaldoVisivel ? 'blur-sm' : ''}`}>2.450 kWh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setUsinaAtiva(!usinaAtiva)}
                className={`px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center gap-3 ${
                  usinaAtiva 
                    ? 'bg-[#004e3a] text-white' 
                    : 'bg-white dark:bg-gray-800 text-[#004e3a] dark:text-white border border-gray-100 dark:border-gray-700'
                }`}
              >
                {usinaAtiva ? <Shield className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {usinaAtiva ? 'Sistema Ativo' : 'Ativar Sistema'}
              </button>
              <button className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-[#004e3a] dark:text-white shadow-lg">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {renderTabContent()}
      </main>

      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-[200] p-6 pointer-events-none">
        <div className="max-w-lg mx-auto w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 dark:border-gray-800 p-2 flex items-center justify-between pointer-events-auto relative">
          {visibleFooterTabs.map((tabId, idx) => {
            const tab = allTabs.find(t => t.id === tabId);
            if (!tab) return null;
            return (
              <button 
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                onContextMenu={(e) => { e.preventDefault(); setEditingTabIndex(idx); setIsFooterDrawerOpen(true); }}
                className={`flex-1 flex flex-col items-center justify-center py-3 rounded-[2.5rem] transition-all relative ${activeTab === tabId ? 'bg-[#004e3a] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tabId ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[8px] font-black uppercase tracking-widest mt-1">{tab.label}</span>
                {activeTab === tabId && (
                  <motion.div layoutId="footer-active" className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
          
          <button 
            onClick={() => { setEditingTabIndex(null); setIsFooterDrawerOpen(true); }}
            className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#009865] hover:text-white transition-all ml-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFooterDrawerOpen && (
          <div className="fixed inset-0 z-[300] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm pt-20" onClick={() => setIsFooterDrawerOpen(false)}>
            <motion.div 
              initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 rounded-b-[2.5rem] w-full max-w-2xl p-8 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">
                  {editingTabIndex !== null ? `Alterar Botão ${editingTabIndex + 1}` : 'Todas as Funcionalidades'}
                </h3>
                <button onClick={() => setIsFooterDrawerOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X className="w-5 h-5 text-gray-400" /></button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                {allTabs.map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => {
                      if (editingTabIndex !== null) {
                        const newTabs = [...footerTabs];
                        newTabs[editingTabIndex] = tab.id;
                        setFooterTabs(newTabs);
                      } else {
                        setActiveTab(tab.id);
                      }
                      setIsFooterDrawerOpen(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-[1.5rem] border-2 transition-all ${activeTab === tab.id ? 'bg-[#009865]/10 border-[#009865] text-[#009865]' : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-200'}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-center line-clamp-2">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button onClick={onLogout} className="flex items-center gap-3 text-red-500 font-black text-xs uppercase tracking-widest">
                  <LogOut className="w-5 h-5" /> Sair da Conta
                </button>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">EcoEnergiza v2.4.0</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GenerationModal isOpen={showGenModal} onClose={() => setShowGenModal(false)} />
      <ConsumptionModal isOpen={showConsModal} onClose={() => setShowConsModal(false)} />
      <PrivatePlantModal isOpen={showPrivatePlantModal} onClose={() => setShowPrivatePlantModal(false)} />
      <BusinessModals isOpen={showBusinessModal} onClose={() => setShowBusinessModal(false)} />
      <BalanceModal isOpen={showBalanceModal.open} onClose={() => setShowBalanceModal({ ...showBalanceModal, open: false })} type={showBalanceModal.type} />
    </div>
  );
}
