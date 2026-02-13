import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, FileText, LogOut, 
  Zap, Sun, Moon, ChevronRight, X, ChevronUp,
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
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [usinaAtiva, setUsinaAtiva] = useState(false);
  const [casaAtiva, setCasaAtiva] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showConsModal, setShowConsModal] = useState(false);
  const [showPrivatePlantModal, setShowPrivatePlantModal] = useState(false);
  const [footerTabs, setFooterTabs] = useState<TabId[]>(['inicio', 'indicacoes', 'seguranca', 'perfil']);
  const [isFooterDrawerOpen, setIsFooterDrawerOpen] = useState(false);
  const [editingTabIndex, setEditingTabIndex] = useState<number | null>(null);

  const userName = "Alex Silva";

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
                  <h2 className="text-2xl font-black text-[#004e3a] dark:text-white leading-tight">{userName}</h2>
                  <p className="text-sm font-bold text-gray-400">alex.silva@email.com</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={() => setActiveTab('seguranca')} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Shield className="w-5 h-5 text-[#009865]" />
                    <span className="font-black text-sm text-[#004e3a] dark:text-white">Segurança</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
                <button onClick={onLogout} className="w-full mt-4 py-4 flex items-center justify-center gap-3 text-red-500 font-black text-sm border-2 border-red-50 rounded-2xl">
                  <LogOut className="w-5 h-5" /> Sair da Conta
                </button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return <div className="text-center py-20 font-black text-[#004e3a] dark:text-white uppercase">Em breve: {activeTab}</div>;
    }
  };

  const handleTabChange = (index: number, newTabId: TabId) => {
    const newTabs = [...footerTabs];
    newTabs[index] = newTabId;
    setFooterTabs(newTabs);
    setEditingTabIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-32">
      {/* Navbar com bordas arredondadas e saldos lado a lado */}
      <nav className="fixed top-0 left-0 right-0 z-[50] bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 rounded-b-[2.5rem] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-2xl border border-green-100">
              <Zap className="w-4 h-4 text-[#009865]" />
              <span className="text-xs font-black text-[#004e3a] dark:text-green-400">124.5 kWh</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-2xl border border-yellow-100">
              <Wallet className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-black text-yellow-700 dark:text-yellow-500">850 ECO</span>
            </div>
            <button onClick={toggleTheme} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32">
        {renderTabContent()}
      </main>

      {/* Footer Customizável com Gaveta */}
      <footer className="fixed bottom-0 left-0 right-0 z-[100]">
        <AnimatePresence>
          {isFooterDrawerOpen && (
            <motion.div 
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              className="bg-white dark:bg-gray-900 rounded-t-[3rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-[#004e3a] dark:text-white uppercase tracking-widest text-sm">Personalizar Rodapé</h3>
                <button onClick={() => setIsFooterDrawerOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {allTabs.map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => editingTabIndex !== null && handleTabChange(editingTabIndex, tab.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${footerTabs.includes(tab.id) ? 'bg-green-50 border-[#009865]' : 'bg-gray-50 border-transparent'} border-2`}
                  >
                    <tab.icon className={`w-6 h-6 ${footerTabs.includes(tab.id) ? 'text-[#009865]' : 'text-gray-400'}`} />
                    <span className="text-[10px] font-black uppercase">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between relative">
          <button 
            onClick={() => setIsFooterDrawerOpen(!isFooterDrawerOpen)}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#009865] rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-gray-950 hover:scale-110 transition-transform"
          >
            {isFooterDrawerOpen ? <X className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
          </button>
          
          {footerTabs.map((tabId, idx) => {
            const tab = allTabs.find(t => t.id === tabId);
            if (!tab) return null;
            return (
              <button 
                key={tabId}
                onClick={() => {
                  if (isFooterDrawerOpen) setEditingTabIndex(idx);
                  else setActiveTab(tabId);
                }}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === tabId ? 'text-[#009865] scale-110' : 'text-gray-400'}`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
                {editingTabIndex === idx && <div className="w-1 h-1 bg-red-500 rounded-full mt-1 animate-pulse" />}
              </button>
            );
          })}
        </div>
      </footer>

      <GenerationModal isOpen={showGenModal} onClose={() => setShowGenModal(false)} />
      <ConsumptionModal isOpen={showConsModal} onClose={() => setShowConsModal(false)} />
      <PrivatePlantModal isOpen={showPrivatePlantModal} onClose={() => setShowPrivatePlantModal(false)} />
    </div>
  );
}
