import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock, CheckCircle2, Play, WifiOff, ArrowRight, User, Mail, Phone, MapPin, Sparkles, LogIn, Award, BarChart, Users, DollarSign } from 'lucide-react';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultantModal({ isOpen, onClose }: ConsultantModalProps) {
  const [step, setStep] = useState<'login' | 'explaining' | 'dashboard'>('login');
  const [email, setEmail] = useState('');
  const [activeExplainStep, setActiveExplainStep] = useState(1);

  if (!isOpen) return null;

  const handleLogin = () => {
    // Simulação: se o e-mail for consultor@teste.com, abre o dashboard. Caso contrário, explica o programa.
    if (email.toLowerCase() === 'consultor@teste.com') {
      setStep('dashboard');
    } else {
      setStep('explaining');
    }
  };

  const renderLogin = () => (
    <div className="space-y-8 py-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-10 h-10 text-[#009865]" />
        </div>
        <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Portal do Consultor</h2>
        <p className="text-sm font-bold text-gray-400 mt-2">Acesse sua conta ou conheça o programa</p>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#009865] transition-colors" />
          <input 
            type="email" 
            placeholder="Seu e-mail de consultor" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#009865] outline-none font-bold dark:text-white transition-all"
          />
        </div>
        <button 
          onClick={handleLogin}
          disabled={!email.trim()}
          className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black shadow-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          Acessar Dashboard
        </button>
      </div>
    </div>
  );

  const renderExplaining = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('login')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Como Funciona?</h2>
      </div>

      <div className="space-y-6">
        {[
          { id: 1, title: "Indique Clientes", desc: "Compartilhe seu link exclusivo com pessoas e empresas que querem economizar energia." },
          { id: 2, title: "Acompanhe Vendas", desc: "Use nosso CRM integrado para ver o progresso de cada indicação em tempo real." },
          { id: 3, title: "Ganhe Comissões", desc: "Receba comissões recorrentes sobre cada kW contratado pelos seus indicados." }
        ].map((item) => (
          <div key={item.id} className={`p-6 rounded-3xl border-2 transition-all ${activeExplainStep === item.id ? 'border-[#009865] bg-green-50/50 dark:bg-green-900/10' : 'border-gray-100 dark:border-gray-800'}`} onClick={() => setActiveExplainStep(item.id)}>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${activeExplainStep === item.id ? 'bg-[#009865] text-white' : 'bg-gray-200 text-gray-500'}`}>{item.id}</div>
              <div>
                <h4 className="font-black text-[#004e3a] dark:text-white text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => alert("Cadastro enviado para análise!")}
        className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl"
      >
        Quero ser um Consultor
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
            <BarChart className="w-6 h-6 text-[#009865]" />
          </div>
          <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Minha Performance</h2>
        </div>
        <button onClick={() => setStep('login')} className="text-[10px] font-black text-gray-400 uppercase underline">Sair</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl space-y-2">
          <Users className="w-5 h-5 text-blue-500" />
          <p className="text-2xl font-black text-[#004e3a] dark:text-white">12</p>
          <p className="text-[10px] font-black text-gray-400 uppercase">Leads Ativos</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl space-y-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          <p className="text-2xl font-black text-[#004e3a] dark:text-white">R$ 1.250</p>
          <p className="text-[10px] font-black text-gray-400 uppercase">Comissões</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-black text-[#004e3a] dark:text-white text-sm uppercase tracking-widest ml-2">Ações Rápidas</h4>
        <div className="grid grid-cols-1 gap-2">
          <button className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-[#009865] transition-all">
            <span className="text-xs font-black text-[#004e3a] dark:text-white">Novo Orçamento</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
          <button className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-[#009865] transition-all">
            <span className="text-xs font-black text-[#004e3a] dark:text-white">Materiais de Marketing</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 max-w-lg w-full relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {step === 'login' && renderLogin()}
        {step === 'explaining' && renderExplaining()}
        {step === 'dashboard' && renderDashboard()}
      </motion.div>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
}
