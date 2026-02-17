import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Lock, Unlock, CheckCircle2, Play, WifiOff, ArrowRight, User, Mail, Phone, MapPin, Sparkles, LogIn, Award, BarChart, Users, DollarSign, Target, ChevronLeft
} from 'lucide-react';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultantModal({ isOpen, onClose }: ConsultantModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [lockedSteps, setLockedSteps] = useState<number[]>([2, 3, 4, 5, 6]);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', regiao: '' });

  const steps = [
    { id: 1, title: "Bem-vindo à Oportunidade", icon: Sparkles },
    { id: 2, title: "Conheça o Programa", icon: Play },
    { id: 3, title: "Seus Benefícios", icon: Award },
    { id: 4, title: "Está Pronto?", icon: Target },
    { id: 5, title: "Informações Básicas", icon: Users },
    { id: 6, title: "Confirmação", icon: CheckCircle2 },
  ];

  const unlockNext = (current: number) => {
    setLockedSteps(prev => prev.filter(s => s !== current + 1));
    setActiveStep(current + 1);
  };

  const toggleLock = (id: number) => {
    if (lockedSteps.includes(id)) {
      setLockedSteps(prev => prev.filter(s => s !== id));
    } else {
      setLockedSteps(prev => [...prev, id]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400 uppercase tracking-tighter">Torne-se um Consultor Ecolote</h2>
          <p className="text-sm font-bold text-gray-400 mt-2">Ganhe comissões, seja nosso consultor</p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="border-b border-gray-100 dark:border-gray-800 last:border-none pb-4">
              <button 
                onClick={() => !lockedSteps.includes(step.id) && setActiveStep(step.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeStep === step.id ? 'bg-green-50 dark:bg-green-900/20' : ''
                } ${lockedSteps.includes(step.id) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeStep === step.id ? 'bg-[#009865] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`font-black text-sm uppercase tracking-widest ${activeStep === step.id ? 'text-[#004e3a] dark:text-white' : 'text-gray-400'}`}>
                    Passo {step.id}: {step.title}
                  </span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleLock(step.id); }}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {lockedSteps.includes(step.id) ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-green-400" />}
                </button>
              </button>

              <AnimatePresence>
                {activeStep === step.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-4 pt-4"
                  >
                    {step.id === 1 && (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                          Bem-vindo à maior oportunidade de empreendedorismo sustentável. Como consultor, você terá acesso a ferramentas de IA, CRM e uma carteira de clientes ilimitada.
                        </p>
                        <button onClick={() => unlockNext(1)} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Confirmar e Prosseguir</button>
                      </div>
                    )}
                    {step.id === 2 && (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gray-900 rounded-[2rem] flex items-center justify-center relative group overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Programa de Consultores" className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform cursor-pointer" />
                          <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform cursor-pointer absolute" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <p className="text-[10px] font-black text-[#009865] uppercase">Comissões</p>
                            <p className="text-xs font-bold text-gray-500">Até 15% por venda direta.</p>
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <p className="text-[10px] font-black text-[#009865] uppercase">Ferramentas</p>
                            <p className="text-xs font-bold text-gray-500">IA, CRM e Agenda integrada.</p>
                          </div>
                        </div>
                        <button onClick={() => unlockNext(2)} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Próximo Passo</button>
                      </div>
                    )}
                    {step.id === 3 && (
                      <div className="space-y-4">
                        <ul className="space-y-3">
                          {['Comissão por venda', 'Ferramentas de IA para ajudar', 'Suporte da equipe', 'Acesso a materiais de marketing', 'Agenda e CRM integrados', 'Gerador de orçamentos automático'].map((b, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#004e3a] dark:text-white">
                              <CheckCircle2 className="w-4 h-4 text-[#009865]" /> {b}
                            </li>
                          ))}
                        </ul>
                        <button onClick={() => unlockNext(3)} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Estou Interessado</button>
                      </div>
                    )}
                    {step.id === 4 && (
                      <div className="space-y-4 text-center">
                        <p className="text-xl font-black text-[#004e3a] dark:text-white">Você está pronto para transformar sua carreira?</p>
                        <button onClick={() => unlockNext(4)} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Quero Ser Consultor</button>
                        <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:underline">Saber Mais Detalhes</button>
                      </div>
                    )}
                    {step.id === 5 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Nome Completo" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none font-bold text-sm dark:text-white" />
                          <input type="email" placeholder="E-mail" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none font-bold text-sm dark:text-white" />
                          <input type="text" placeholder="Telefone" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none font-bold text-sm dark:text-white" />
                          <input type="text" placeholder="Região de Atuação" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none font-bold text-sm dark:text-white" />
                        </div>
                        <button onClick={() => unlockNext(5)} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Enviar Inscrição</button>
                      </div>
                    )}
                    {step.id === 6 && (
                      <div className="text-center space-y-6 py-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-12 h-12 text-[#009865]" />
                        </div>
                        <h3 className="text-2xl font-black text-[#004e3a] dark:text-white">Inscrição Enviada!</h3>
                        <p className="text-sm font-bold text-gray-400">Nossa equipe entrará em contato em até 24h.</p>
                        <button onClick={onClose} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Voltar para Home</button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
