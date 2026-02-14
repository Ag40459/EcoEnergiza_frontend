import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, FileText, LogOut, 
  Zap, Sun, Moon, ChevronRight, X, ChevronUp,
  LayoutDashboard, Users, Calendar, DollarSign, BookOpen, BarChart,
  Home as HomeIcon, PieChart, Award, Wallet, Search, Bell, Menu, Plus,
  Smartphone, CreditCard, Landmark, QrCode, FileCheck, Camera, CheckCircle2,
  Factory, Settings2, Edit3, Briefcase, Filter, Search as SearchIcon, Clock, TrendingUp
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

type TabId = 'inicio' | 'dados' | 'seguranca' | 'perfil' | 'indicacoes' | 'moedas' | 'consultor' | 'adm' | 'agenda' | 'crm';

export default function MainDashboard({ onLogout, theme, toggleTheme, onOpenConsultant, isAdmin = false }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [usinaAtiva, setUsinaAtiva] = useState(false);
  const [casaAtiva, setCasaAtiva] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showConsModal, setShowConsModal] = useState(false);
  const [showPrivatePlantModal, setShowPrivatePlantModal] = useState(false);
  const [footerTabs, setFooterTabs] = useState<TabId[]>(['inicio', 'indicacoes', 'seguranca', 'perfil', ...(isAdmin ? ['adm'] : [])]);
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
    ...(isAdmin ? [{ id: 'adm' as const, label: 'ADM', icon: Settings2 }] : []),
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'crm', label: 'CRM', icon: Briefcase },
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
                onClick={() => setActiveTab('consultor')} 
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
                <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">CRM - Gestão de Leads</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Buscar lead..." className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl text-xs font-bold outline-none" />
                  </div>
                  <button className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl"><Filter className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100 dark:border-gray-700">
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Nome</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Status</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Potencial</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {[
                      { nome: "João Pereira", status: "Agendado", cor: "bg-blue-100 text-blue-600", valor: "5.2 kW" },
                      { nome: "Maria Souza", status: "Em Aberto", cor: "bg-yellow-100 text-yellow-600", valor: "2.8 kW" },
                      { nome: "Condomínio Sol", status: "Finalizado", cor: "bg-green-100 text-green-600", valor: "45 kW" },
                    ].map((lead, i) => (
                      <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                        <td className="py-4 font-bold text-sm dark:text-white">{lead.nome}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${lead.cor}`}>{lead.status}</span>
                        </td>
                        <td className="py-4 font-black text-xs text-[#009865]">{lead.valor}</td>
                        <td className="py-4">
                          <button onClick={() => alert('Agendamento enviado para a Agenda!')} className="p-2 hover:bg-[#009865] hover:text-white rounded-lg transition-all text-gray-400">
                            <Calendar className="w-4 h-4" />
                          </button>
                        </td>
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">Minha Agenda</h2>
                <button className="p-4 bg-[#009865] text-white rounded-2xl shadow-lg"><Plus className="w-5 h-5" /></button>
              </div>
              
              <div className="space-y-4">
                {[
                  { hora: "09:00", tarefa: "Visita Técnica - João Pereira", tipo: "Visita" },
                  { hora: "14:30", tarefa: "Call de Fechamento - Condomínio Sol", tipo: "Call" },
                  { hora: "16:00", tarefa: "Reunião de Equipe", tipo: "Interno" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-transparent hover:border-[#009865] transition-all">
                    <div className="text-center min-w-[60px]">
                      <p className="text-lg font-black text-[#009865]">{item.hora}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-[#004e3a] dark:text-white">{item.tarefa}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{item.tipo}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'adm':
        if (!isAdmin) return <div className="text-center py-12 text-gray-400">Acesso negado</div>;
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Painel Administrativo</h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Gestão de Conteúdo e Usuários</p>
                </div>
                <Settings2 className="w-12 h-12 text-purple-600" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: 'Editar Textos', icon: Edit3, color: 'bg-blue-500' },
                  { label: 'Gestão de Leads', icon: Users, color: 'bg-green-500' },
                  { label: 'Configurações', icon: Settings, color: 'bg-orange-500' },
                  { label: 'Performance', icon: BarChart, color: 'bg-pink-500' },
                  { label: 'Agenda Geral', icon: Calendar, color: 'bg-purple-500' },
                  { label: 'Financeiro', icon: DollarSign, color: 'bg-yellow-500' },
                ].map((card, i) => (
                  <button key={i} className="flex flex-col items-center gap-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-transparent hover:border-purple-500 transition-all group">
                    <div className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-black text-xs uppercase dark:text-white">{card.label}</span>
                  </button>
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
