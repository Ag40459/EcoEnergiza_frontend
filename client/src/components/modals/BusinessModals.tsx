import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Calculator, Zap, TrendingUp, Shield, Award, Sparkles, ArrowRight } from 'lucide-react';
import { solarCalculator } from '@/lib/solarCalculator';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GenerationModal({ isOpen, onClose }: BusinessModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
            <Zap className="w-10 h-10 text-[#009865]" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Geração de Energia</h2>
          <p className="text-sm font-bold text-gray-400">Acompanhe em tempo real a produção das suas usinas remotas.</p>
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Produção Atual</p>
            <p className="text-5xl font-black text-[#009865]">124.5 <span className="text-xl">kWh</span></p>
          </div>
          <button onClick={onClose} className="w-full py-5 bg-[#004e3a] text-white rounded-[2rem] font-black uppercase tracking-widest">Fechar</button>
        </div>
      </motion.div>
    </div>
  );
}

export function ConsumptionModal({ isOpen, onClose }: BusinessModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto">
            <TrendingUp className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Consumo da Casa</h2>
          <p className="text-sm font-bold text-gray-400">Monitore o gasto energético da sua residência em tempo real.</p>
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Consumo Acumulado</p>
            <p className="text-5xl font-black text-blue-600">842.1 <span className="text-xl">kWh</span></p>
          </div>
          <button onClick={onClose} className="w-full py-5 bg-[#004e3a] text-white rounded-[2rem] font-black uppercase tracking-widest">Fechar</button>
        </div>
      </motion.div>
    </div>
  );
}

export function PrivatePlantModal({ isOpen, onClose }: BusinessModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Usina Particular</h2>
          <p className="text-sm font-bold text-gray-400">Gestão completa dos seus ativos de geração própria.</p>
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status do Sistema</p>
            <p className="text-3xl font-black text-yellow-600 uppercase">Operação Normal</p>
          </div>
          <button onClick={onClose} className="w-full py-5 bg-[#004e3a] text-white rounded-[2rem] font-black uppercase tracking-widest">Fechar</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function BusinessModals({ isOpen, onClose }: BusinessModalProps) {
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState('');
  const [calcResult, setCalcResult] = useState<any>(null);
  const [currentEquip, setCurrentEquip] = useState(0);

  const handleClose = () => {
    setStep(1);
    setBill('');
    setCalcResult(null);
    setCurrentEquip(0);
    onClose();
  };

  const equipamentos = [
    { 
      nome: "Painel Solar WEG 550W", 
      desc: "Alta eficiência monocristalina com tecnologia Half-Cell.", 
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      nome: "Inversor GROWATT Smart", 
      desc: "Monitoramento em tempo real via Wi-Fi e IA integrada.", 
      img: "https://images.unsplash.com/photo-1558441719-ffb4d4500a67?auto=format&fit=crop&q=80&w=800" 
    }
  ];

  const handleCalculate = () => {
    const result = solarCalculator({ monthlyBill: Number(bill) });
    setCalcResult(result);
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={handleClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-4xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
                <Calculator className="w-4 h-4 text-[#009865]" />
                <span className="text-[10px] font-black text-[#009865] uppercase tracking-widest">Simulador Solar</span>
              </div>
              <h2 className="text-4xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter leading-none mb-4">Economia Inteligente</h2>
              <p className="text-sm font-bold text-gray-400">Descubra quanto você pode economizar e quais equipamentos são ideais para sua necessidade.</p>
            </div>

            <div className="space-y-4">
              {step === 1 ? (
                <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
                  <label className="block text-xs font-black text-[#004e3a] dark:text-white uppercase tracking-widest mb-4">Valor Médio da Conta de Luz (R$)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">R$</span>
                    <input 
                      type="number" 
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                      placeholder="0,00" 
                      className="w-full p-6 pl-16 bg-white dark:bg-gray-900 rounded-2xl outline-none font-black text-3xl text-[#009865] border-2 border-transparent focus:border-[#009865] transition-all" 
                    />
                  </div>
                  <button 
                    onClick={handleCalculate}
                    disabled={!bill || Number(bill) <= 0}
                    className="w-full mt-6 py-5 bg-[#009865] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Calcular Economia
                  </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-[2rem] border border-green-100 dark:border-green-800/30">
                      <p className="text-[10px] font-black text-[#009865] uppercase mb-1">Economia Anual</p>
                      <p className="text-2xl font-black text-[#004e3a] dark:text-white">R$ {calcResult?.annualSavings.toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800/30">
                      <p className="text-[10px] font-black text-blue-500 uppercase mb-1">Payback Estimado</p>
                      <p className="text-2xl font-black text-[#004e3a] dark:text-white">{calcResult?.paybackYears} Anos</p>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Sistema Recomendado</p>
                      <span className="px-3 py-1 bg-white dark:bg-gray-900 rounded-full text-[10px] font-black text-[#009865] border border-gray-100 dark:border-gray-700">{calcResult?.systemSize} kWp</span>
                    </div>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Este sistema irá gerar aproximadamente <span className="text-[#009865]">{calcResult?.monthlyGeneration} kWh/mês</span>, cobrindo 95% do seu consumo atual.</p>
                  </div>
                  <button onClick={() => setStep(1)} className="w-full py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:underline">Refazer Simulação</button>
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">+1.200 Clientes Satisfeitos</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-[3.5rem] overflow-hidden group shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentEquip}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={equipamentos[currentEquip].img} 
                  className="w-full h-full object-cover"
                  alt={equipamentos[currentEquip].nome}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{equipamentos[currentEquip].nome}</h4>
                <p className="text-xs font-bold text-gray-300 leading-relaxed">{equipamentos[currentEquip].desc}</p>
              </div>
              <div className="absolute top-10 right-10 flex gap-2">
                <button onClick={() => setCurrentEquip(prev => (prev === 0 ? equipamentos.length - 1 : prev - 1))} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={() => setCurrentEquip(prev => (prev === equipamentos.length - 1 ? 0 : prev + 1))} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#009865]" />
                </div>
                <p className="text-[10px] font-black text-[#004e3a] dark:text-white uppercase leading-tight">Garantia de 25 Anos</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-[10px] font-black text-[#004e3a] dark:text-white uppercase leading-tight">Valorização Imobiliária</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
