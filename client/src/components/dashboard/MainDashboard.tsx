import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, FileText, LogOut, 
  Zap, Sun, Moon, ChevronRight, X, ChevronUp,
  LayoutDashboard, Users, Calendar, DollarSign, BookOpen, BarChart,
  Home as HomeIcon, PieChart, Award, Wallet, Search, Bell, Menu, Plus,
  Smartphone, CreditCard, Landmark, QrCode, FileCheck, Camera, CheckCircle2,
  Factory, Settings2, Edit3, Briefcase, Filter, Search as SearchIcon, Clock, TrendingUp, History,
  Eye, EyeOff, Camera as CameraIcon, UserCheck
} from 'lucide-react';
import { DynamicAnimation } from '../animations/DynamicAnimation';
import { 
  GenerationModal, 
  ConsumptionModal, 
  PrivatePlantModal,
  ProfileModal,
  SecurityModal,
  ConsultantModal
} from '../modals/BusinessModals';

interface MainDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenConsultant: () => void;
  isAdmin?: boolean;
}

type TabId = 'inicio' | 'dados' | 'seguranca' | 'perfil' | 'indicacoes' | 'moedas' | 'consultor' | 'adm' | 'agenda' | 'crm';

export default function MainDashboard({ onLogout, theme, toggleTheme, onOpenConsultant, isAdmin = false }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    return (localStorage.getItem("activeTab") as TabId) || 'inicio';
  });
  const [usinaAtiva, setUsinaAtiva] = useState(() => localStorage.getItem("usinaAtiva") === "true");
  const [casaAtiva, setCasaAtiva] = useState(() => localStorage.getItem("casaAtiva") === "true");
  
  // Modais
  const [showGenModal, setShowGenModal] = useState(false);
  const [showConsModal, setShowConsModal] = useState(false);
  const [showPrivatePlantModal, setShowPrivatePlantModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showConsultantModal, setShowConsultantModal] = useState(false);
  
  // Lógica de Saldos
  const [showEcoBalance, setShowEcoBalance] = useState(true);
  const [ecoBalance] = useState("1.250");
  const [kwhBalance] = useState("45.8");

  const [footerTabs, setFooterTabs] = useState<TabId[]>(() => {
    const saved = localStorage.getItem("footerTabs");
    if (saved) return JSON.parse(saved);
    return ['inicio', 'indicacoes', 'seguranca', 'perfil', ...(isAdmin ? ['adm'] : [])];
  });

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="flex flex-col items-center gap-12 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-items-center">
              <DynamicAnimation 
                type="generation" 
                state={usinaAtiva ? 'active' : 'inactive'} 
                label="Geração de Energia" 
                value={usinaAtiva ? "124.5" : "0.0"} unit="kWh" 
                isAtivo={usinaAtiva}
                onClick={() => setShowGenModal(true)} 
              />
              <DynamicAnimation 
                type="consumption" 
                state={casaAtiva ? 'active' : 'inactive'} 
                label="Consumo da Casa" 
                value={casaAtiva ? "842.1" : "0.0"} unit="kWh" 
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
                onClick={() => setShowConsultantModal(true)} 
              />
            </div>
          </div>
        );
      case 'consultor':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Dashboard do Consultor</h2>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Gestão de Performance e Ganhos</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('crm')} className="px-6 py-3 bg-[#009865] text-white rounded-2xl font-black text-xs uppercase flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> CRM de Leads
                </button>
                <button onClick={() => setActiveTab('agenda')} className="px-6 py-3 bg-[#004e3a] text-white rounded-2xl font-black text-xs uppercase flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Minha Agenda
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total de Leads</p>
                <h3 className="text-4xl font-black text-[#004e3a] dark:text-white">42</h3>
                <div className="mt-4 flex items-center gap-2 text-green-500 font-bold text-xs">
                  <TrendingUp className="w-4 h-4" /> +12% este mês
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Comissões Pendentes</p>
                <h3 className="text-4xl font-black text-[#004e3a] dark:text-white">R$ 1.240</h3>
                <div className="mt-4 flex items-center gap-2 text-yellow-500 font-bold text-xs">
                  <Clock className="w-4 h-4" /> Aguardando ciclo
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Vendas Convertidas</p>
                <h3 className="text-4xl font-black text-[#004e3a] dark:text-white">18</h3>
                <div className="mt-4 flex items-center gap-2 text-blue-500 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Taxa de 42%
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'crm':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-[#004e3a] dark:text-white">CRM de Leads</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Buscar lead..." className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl text-xs font-bold outline-none" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100 dark:border-gray-700">
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Nome</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Status</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {[{ nome: "João Pereira", status: "Agendado", cor: "bg-blue-100 text-blue-600" }].map((lead, i) => (
                      <tr key={i}>
                        <td className="py-4 font-bold text-sm dark:text-white">{lead.nome}</td>
                        <td className="py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${lead.cor}`}>{lead.status}</span></td>
                        <td className="py-4"><button className="p-2 text-gray-400"><Calendar className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'agenda':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-white mb-8">Minha Agenda</h2>
              <div className="space-y-4">
                {[{ hora: "09:00", tarefa: "Visita Técnica" }].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
                    <p className="text-lg font-black text-[#009865]">{item.hora}</p>
                    <p className="font-black text-[#004e3a] dark:text-white">{item.tarefa}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
                {[
                  { label: 'Alterar Dados / KYC', icon: UserCheck, action: () => setShowProfileModal(true) },
                  { label: 'Segurança', icon: Shield, action: () => setShowSecurityModal(true) },
                  { label: 'Sair da Conta', icon: LogOut, action: onLogout, color: 'text-red-500' },
                ].map((item, idx) => (
                  <button key={idx} onClick={item.action} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <item.icon className={`w-5 h-5 ${item.color || 'text-[#009865]'}`} />
                      <span className={`font-black text-sm ${item.color || 'text-[#004e3a] dark:text-white'}`}>{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'seguranca':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-white mb-8">Segurança</h2>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-black text-[#004e3a] dark:text-white">Autenticação de Dois Fatores</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">Ativado via SMS</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <button onClick={() => setShowSecurityModal(true)} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Configurações Avançadas</button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return <div className="text-center py-20 text-gray-400">Em desenvolvimento...</div>;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-[#f8faf9]'} transition-colors duration-500`}>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 z-[100] px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#009865] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black text-[#004e3a] dark:text-white hidden md:block">EcoEnergiza</h1>
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
          {/* Saldos */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-full border border-yellow-100 dark:border-yellow-800">
              <Wallet className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-black text-yellow-700 dark:text-yellow-400">
                {showEcoBalance ? `${ecoBalance} ECO` : '••••'}
              </span>
              <button onClick={() => setShowEcoBalance(!showEcoBalance)} className="p-1 hover:bg-yellow-100 dark:hover:bg-yellow-800 rounded-full">
                {showEcoBalance ? <EyeOff className="w-3 h-3 text-yellow-600" /> : <Eye className="w-3 h-3 text-yellow-600" />}
              </button>
            </div>

            <button 
              onClick={() => setShowGenModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-100 dark:border-green-800 hover:scale-105 transition-transform"
            >
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-black text-green-700 dark:text-green-400 blur-[3px] select-none">
                {kwhBalance} kWh
              </span>
            </button>
          </div>

          {/* Avatar */}
          <div className="relative group">
            <button className="w-12 h-12 rounded-full border-2 border-[#009865] p-0.5 overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2">
              <button onClick={() => setShowProfileModal(true)} className="w-full px-4 py-2 text-left text-xs font-black text-[#004e3a] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4" /> Perfil / KYC
              </button>
              <button onClick={onLogout} className="w-full px-4 py-2 text-left text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-32 px-6 lg:px-12">
        {renderTabContent()}
      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl px-4 py-3 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-2 z-[100]">
        {allTabs.filter(t => ['inicio', 'indicacoes', 'seguranca', 'perfil'].includes(t.id)).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              activeTab === tab.id 
                ? 'bg-[#004e3a] text-white shadow-lg shadow-green-900/20' 
                : 'text-gray-400 hover:text-[#009865]'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {activeTab === tab.id && <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Modais Unificados */}
      <GenerationModal 
        isOpen={showGenModal} 
        onClose={() => setShowGenModal(false)} 
        isAtivo={usinaAtiva}
        onActivate={() => {
          setUsinaAtiva(true);
          setActiveTab('seguranca');
          setShowSecurityModal(true);
        }}
      />
      <ConsumptionModal isOpen={showConsModal} onClose={() => setShowConsModal(false)} />
      <PrivatePlantModal isOpen={showPrivatePlantModal} onClose={() => setShowPrivatePlantModal(false)} />
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <SecurityModal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} />
      <ConsultantModal isOpen={showConsultantModal} onClose={() => setShowConsultantModal(false)} />
    </div>
  );
}
