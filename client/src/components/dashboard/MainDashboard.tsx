import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Award, Zap, Coins, User, FileText, Settings, Users, Calendar, BarChart3, X } from 'lucide-react';
import { DynamicAnimation } from '../animations/DynamicAnimation';
import { BusinessModal } from '../modals/BusinessModals';

interface UserProfile {
  nome: string;
  categoria: 'bronze' | 'prata' | 'ouro' | 'diamante';
  saldoEnergia: string;
  saldoMoeda: string;
  isConsultor: boolean;
  isAdmin: boolean;
}

export default function MainDashboard() {
  const [user] = useState<UserProfile>({
    nome: "Alex Silva",
    categoria: 'ouro',
    saldoEnergia: "1.245",
    saldoMoeda: "450,00",
    isConsultor: true,
    isAdmin: true
  });

  const [showAdminModal, setShowAdminModal] = useState(user.isAdmin);
  const [activeModal, setActiveModal] = useState<'generation' | 'consumption' | null>(null);

  const adminOptions = [
    { titulo: "Alterar Textos", icone: FileText, cor: "#009865" },
    { titulo: "Gerenciar Leads", icone: Users, cor: "#004e3a" },
    { titulo: "Agenda", icone: Calendar, cor: "#00b876" },
    { titulo: "Relatórios", icone: BarChart3, cor: "#007a52" },
    { titulo: "Configurações", icone: Settings, cor: "#666" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-white shadow-sm">
              <User className="text-green-600 w-6 h-6" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-[#004e3a]">{user.nome}</span>
              <Award className="text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-500 w-4 h-4" />
              <span className="text-sm font-black text-[#004e3a]">{user.saldoEnergia} <span className="text-[10px] opacity-50">kWh</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="text-green-600 w-4 h-4" />
              <span className="text-sm font-black text-[#004e3a]"><span className="text-[10px] opacity-50">R$</span> {user.saldoMoeda}</span>
            </div>
            <button className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-400" onClick={() => window.location.reload()}>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <DynamicAnimation type="generation" state="active" label="Geração de Hoje" value="4.2" unit="kWh" onClick={() => setActiveModal('generation')} />
          <DynamicAnimation type="consumption" state="inactive" label="Consumo da Casa" value="--" unit="kWh" onClick={() => setActiveModal('consumption')} />
          <DynamicAnimation type="consultant" state="active" label="Painel Consultor" value="CRM" unit="Ativo" onClick={() => setShowAdminModal(true)} />
        </div>
      </main>

      <BusinessModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} type={activeModal || 'generation'} />

      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] w-full max-w-xl p-10 shadow-2xl relative">
              <button onClick={() => setShowAdminModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
              <div className="text-center mb-10"><h2 className="text-2xl font-black text-[#004e3a]">Painel Administrativo</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adminOptions.map((opt, idx) => (
                  <button key={idx} onClick={() => setShowAdminModal(false)} className="flex items-center gap-4 p-6 rounded-[2rem] border border-gray-100 text-left hover:bg-green-50 transition-all group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `${opt.cor}15` }}>
                      <opt.icone className="w-6 h-6" style={{ color: opt.cor }} />
                    </div>
                    <span className="font-black text-[#004e3a] text-sm">{opt.titulo}</span>
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
