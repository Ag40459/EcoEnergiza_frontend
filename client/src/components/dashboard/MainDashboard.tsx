import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Award, Zap, Coins, User, FileText, Settings, Users, Calendar, BarChart3, X, Home, PieChart, Shield, Sun, Moon } from 'lucide-react';
import { DynamicAnimation } from '../animations/DynamicAnimation';
import { BusinessModal } from '../modals/BusinessModals';

interface DashboardProps {
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function MainDashboard({ onLogout, theme, toggleTheme }: DashboardProps) {
  const [user] = useState({
    nome: "Alex Silva",
    categoria: 'ouro',
    saldoEnergia: "1.245",
    saldoMoeda: "450,00",
    isAdmin: true,
    isAtivo: false // Simula se o usuário ativou a opção para remover o blur
  });

  const [showAdminModal, setShowAdminModal] = useState(user.isAdmin);
  const [activeModal, setActiveModal] = useState<'generation' | 'consumption' | 'details' | null>(null);
  const [activeTab, setActiveTab] = useState('inicio');

  const adminOptions = [
    { titulo: "Alterar Textos", icone: FileText, cor: "#009865" },
    { titulo: "Gerenciar Leads", icone: Users, cor: "#004e3a" },
    { titulo: "Agenda", icone: Calendar, cor: "#00b876" },
    { titulo: "Relatórios", icone: BarChart3, cor: "#007a52" },
    { titulo: "Configurações", icone: Settings, cor: "#666" },
  ];

  return (
    <div className={`min-h-screen pb-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar Ajustada */}
      <nav className={`fixed top-0 left-0 right-0 h-20 px-6 z-50 border-b ${theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-100'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-[#004e3a] dark:text-green-400 whitespace-nowrap">{user.nome}</span>
                <Award className="text-yellow-500 w-4 h-4 shrink-0" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nível {user.categoria}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            <div className="flex flex-col items-end gap-1">
              <button onClick={() => setActiveModal('details')} className="flex items-center gap-2 group">
                <Zap className="text-yellow-500 w-3 h-3" />
                <span className={`text-xs font-black transition-all ${!user.isAtivo ? 'blur-[4px]' : ''} text-[#004e3a] dark:text-white`}>{user.saldoEnergia} kWh</span>
              </button>
              <button onClick={() => setActiveModal('details')} className="flex items-center gap-2 group">
                <Coins className="text-green-600 w-3 h-3" />
                <span className={`text-xs font-black transition-all ${!user.isAtivo ? 'blur-[4px]' : ''} text-[#004e3a] dark:text-white`}>R$ {user.saldoMoeda}</span>
              </button>
            </div>
            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors text-red-400" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="pt-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <DynamicAnimation type="generation" state="active" label="Geração Usina" value="4.2" unit="kWh" onClick={() => setActiveModal('generation')} isAtivo={user.isAtivo} />
          <DynamicAnimation type="consumption" state="inactive" label="Consumo Casa" value="12.5" unit="kWh" onClick={() => setActiveModal('consumption')} isAtivo={user.isAtivo} />
          <DynamicAnimation type="consultant" state="active" label="Painel Consultor" value="CRM" unit="Ativo" onClick={() => setActiveTab('consultor')} isAtivo={true} />
        </div>
      </main>

      {/* Rodapé de Navegação */}
      <footer className={`fixed bottom-0 left-0 right-0 h-20 border-t z-50 px-8 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-md mx-auto h-full flex items-center justify-between">
          {[
            { id: 'inicio', icon: Home, label: 'Início' },
            { id: 'relatorios', icon: PieChart, label: 'Dados' },
            { id: 'seguranca', icon: Shield, label: 'Segurança' },
            { id: 'perfil', icon: User, label: 'Perfil' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-[#009865] scale-110' : 'text-gray-400'}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
      </footer>

      <BusinessModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} type={activeModal === 'details' ? 'generation' : (activeModal || 'generation')} />

      {/* Modal ADM Inicial */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-[3rem] w-full max-w-xl p-10 shadow-2xl relative">
              <button onClick={() => setShowAdminModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
              <div className="text-center mb-10"><h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Painel Administrativo</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adminOptions.map((opt, idx) => (
                  <button key={idx} onClick={() => alert("Aguarde... funcionalidade em desenvolvimento.")} className="flex items-center gap-4 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 text-left hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${opt.cor}15` }}>
                      <opt.icone className="w-6 h-6" style={{ color: opt.cor }} />
                    </div>
                    <span className="font-black text-[#004e3a] dark:text-white text-sm">{opt.titulo}</span>
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
