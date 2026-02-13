import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, FileText, LogOut, 
  Wallet, Zap, Sun, Moon, ChevronRight, X,
  LayoutDashboard, Users, Calendar, DollarSign, BookOpen, BarChart,
  Home as HomeIcon, PieChart, Award
} from 'lucide-react';
import { DynamicAnimation } from '../animations/DynamicAnimation';
import { GenerationModal, ConsumptionModal } from '../modals/BusinessModals';

interface MainDashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenConsultant: () => void;
  isAdmin?: boolean;
}

export default function MainDashboard({ onLogout, theme, toggleTheme, onOpenConsultant, isAdmin = false }: MainDashboardProps) {
  const [showAdminModal, setShowAdminModal] = useState(isAdmin);
  const [activeTab, setActiveTab] = useState<'inicio' | 'dados' | 'seguranca' | 'perfil'>('inicio');
  const [usinaAtiva, setUsinaAtiva] = useState(false);
  const [casaAtiva, setCasaAtiva] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showConsModal, setShowConsModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const userName = "Alex Silva";

  const adminCards = [
    { id: 'textos', titulo: 'Textos', icone: FileText, cor: 'bg-blue-500' },
    { id: 'leads', titulo: 'Leads', icone: Users, cor: 'bg-green-500' },
    { id: 'agenda', titulo: 'Agenda', icone: Calendar, cor: 'bg-purple-500' },
    { id: 'orcamentos', titulo: 'Orçamentos', icone: DollarSign, cor: 'bg-yellow-500' },
    { id: 'materiais', titulo: 'Materiais', icone: BookOpen, cor: 'bg-orange-500' },
    { id: 'performance', titulo: 'Performance', icone: BarChart, cor: 'bg-pink-500' },
  ];

  return (
    <div className={`flex flex-col min-h-screen pb-24 lg:pb-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar Ajustada */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-[#009865] shrink-0">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-[#004e3a] dark:text-white truncate text-sm md:text-base">
                  {userName}
                </span>
                <Award className="w-4 h-4 text-yellow-500 shrink-0" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Saldos Empilhados */}
            <div className="flex flex-col items-end gap-1">
              <button 
                onClick={() => setShowGenModal(true)}
                className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-100 dark:border-green-800"
              >
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className={`text-[10px] font-black text-[#004e3a] dark:text-green-400 ${!usinaAtiva ? 'blur-[4px]' : ''}`}>
                  124.5 <span className="opacity-50">kWh</span>
                </span>
              </button>
              <button 
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-2 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-full border border-yellow-100 dark:border-yellow-800"
              >
                <Wallet className="w-3 h-3 text-yellow-600" />
                <span className="text-[10px] font-black text-[#004e3a] dark:text-yellow-500">
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
        {activeTab === 'inicio' && (
          <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
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
                type="consultant" 
                state="active" 
                label="Seja Consultor" 
                value="15%" unit="Comissão" 
                isAtivo={true}
                onClick={onOpenConsultant} 
              />
            </div>
          </div>
        )}

        {activeTab === 'perfil' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-[#009865]">
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">{userName}</h2>
                  <p className="text-sm font-bold text-gray-400">alex.silva@email.com</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Meus Dados', icon: User },
                  { label: 'Segurança', icon: Shield },
                  { label: 'Documentos', icon: FileText },
                  { label: 'Configurações', icon: Settings },
                ].map((item, idx) => (
                  <button key={idx} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
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
        )}
      </main>

      {/* Rodapé de Navegação */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-8 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[
            { id: 'inicio', label: 'Início', icon: HomeIcon },
            { id: 'dados', label: 'Dados', icon: PieChart },
            { id: 'seguranca', label: 'Segurança', icon: Shield },
            { id: 'perfil', label: 'Perfil', icon: User },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-[#009865] scale-110' : 'text-gray-400'}`}
            >
              <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
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
        onToggleCiclo={() => {}}
      />

      {/* Modal Admin */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 max-w-4xl w-full shadow-2xl relative">
              <button onClick={() => setShowAdminModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400 mb-8">Painel Administrativo</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {adminCards.map((card) => (
                  <button 
                    key={card.id} 
                    onClick={() => alert("Aguarde... Funcionalidade em desenvolvimento.")}
                    className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all group"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${card.cor} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                      <card.icone className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-black text-[#004e3a] dark:text-white">{card.titulo}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
