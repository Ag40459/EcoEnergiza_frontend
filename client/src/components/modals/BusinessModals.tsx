import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Zap, ShoppingCart, Share2, CheckCircle2, Package, Truck, Construction, Info, ShieldCheck, TrendingUp } from 'lucide-react';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'generation' | 'consumption';
}

export const BusinessModal: React.FC<BusinessModalProps> = ({ isOpen, onClose, type }) => {
  const [step, setStep] = useState(1);
  const [kwValue, setKwValue] = useState('');
  const [currentEquip, setCurrentEquip] = useState(0);

  const equipamentos = [
    { nome: "Painel Solar Premium 550W", desc: "Alta eficiência monocristalina com tecnologia Half-Cell.", img: "/assets/painel1.jpg" },
    { nome: "Inversor Inteligente 5kW", desc: "Monitoramento em tempo real via Wi-Fi e IA integrada.", img: "/assets/inversor1.jpg" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-xl p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>

        {type === 'generation' ? (
          <div className="space-y-8">
            {step === 1 ? (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto"><Zap className="w-10 h-10 text-yellow-500" /></div>
                <div>
                  <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Geração de Energia</h2>
                  <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Configure sua usina remota</p>
                </div>
                <div className="relative">
                  <input type="number" value={kwValue} onChange={(e) => setKwValue(e.target.value)} placeholder="0.00" className="w-full px-6 py-8 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-none font-black text-4xl text-center text-[#009865] focus:ring-4 focus:ring-green-100 outline-none" />
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xl">kW</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-[10px] font-black uppercase text-gray-400">Segurança Total</span>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-[10px] font-black uppercase text-gray-400">ROI Garantido</span>
                  </div>
                </div>
                <button onClick={() => setStep(2)} disabled={!kwValue} className="w-full py-6 bg-[#009865] text-white rounded-[2rem] font-black text-lg shadow-xl disabled:opacity-40 hover:scale-105 transition-transform">Gerar Proposta Detalhada</button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <button onClick={() => setStep(1)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                  <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Sua Usina Ideal</h2>
                </div>
                
                {/* Carrossel de Equipamentos */}
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden group">
                  <img src={equipamentos[currentEquip].img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white text-xl font-black">{equipamentos[currentEquip].nome}</h3>
                    <p className="text-white/70 text-xs font-medium mt-2">{equipamentos[currentEquip].desc}</p>
                  </div>
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <button onClick={() => setCurrentEquip(prev => (prev > 0 ? prev - 1 : equipamentos.length - 1))} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"><ChevronLeft /></button>
                  </div>
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <button onClick={() => setCurrentEquip(prev => (prev < equipamentos.length - 1 ? prev + 1 : 0))} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"><ChevronRight /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-[2rem] border border-green-100 dark:border-green-900/30 space-y-4">
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-500">Investimento Estimado</span><span className="text-xl font-black text-[#004e3a] dark:text-green-400">R$ 12.450,00</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-500">Economia em 10 anos</span><span className="text-xl font-black text-[#009865]">R$ 54.000,00</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-500">Payback (Retorno)</span><span className="text-xl font-black text-[#009865]">2.1 Anos</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <Info className="w-5 h-5 text-[#009865] shrink-0" />
                    <p className="text-[10px] font-bold text-gray-500 leading-relaxed">Esta proposta é uma estimativa baseada no seu consumo. O valor final pode variar após análise técnica da área de instalação remota.</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl">Confirmar e Seguir</button>
                    <button onClick={() => alert("Link da proposta copiado!")} className="p-5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-[2rem] hover:bg-gray-200"><Share2 className="w-6 h-6" /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {step === 1 ? (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto"><ShoppingCart className="w-10 h-10 text-blue-500" /></div>
                <h2 className="text-2xl font-black text-[#004e3a] dark:text-blue-400">Controle seu Consumo</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setStep(2)} className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 text-left hover:scale-[1.02] transition-all">
                    <h3 className="font-black text-[#004e3a] dark:text-white">Quero Adquirir um Medidor</h3>
                    <p className="text-xs font-bold text-gray-400 mt-2">Smart Meter em comodato (até R$ 9,99/mês) ou compra tradicional.</p>
                  </button>
                  <button onClick={() => alert("Fluxo de integração...")} className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 text-left hover:scale-[1.02] transition-all">
                    <h3 className="font-black text-[#004e3a] dark:text-white">Já Tenho Acesso Remoto</h3>
                    <p className="text-xs font-bold text-gray-400 mt-2">Conectar medidor digital ou inversor já instalado.</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-[#004e3a] dark:text-blue-400">Acompanhe seu Pedido</h2>
                <div className="space-y-4">
                  {[
                    { label: "Liberação de Documentos", icon: CheckCircle2, done: true, time: "Há 2 dias" },
                    { label: "Fornecedor Postou", icon: Package, done: true, time: "Ontem" },
                    { label: "Chegou na Cidade", icon: Truck, done: false, time: "Previsão: Hoje" },
                    { label: "Aguardando Instalação", icon: Construction, done: false, time: "-" }
                  ].map((f, i) => (
                    <div key={i} className={`flex items-center gap-4 p-5 rounded-[2rem] border ${f.done ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 opacity-50'}`}>
                      <f.icon className={`w-6 h-6 ${f.done ? 'text-[#009865]' : 'text-gray-300'}`} />
                      <div className="flex-1">
                        <span className={`text-sm font-black block ${f.done ? 'text-[#004e3a] dark:text-green-400' : 'text-gray-400'}`}>{f.label}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{f.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest"><span>Progresso da Entrega</span><span>50%</span></div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="bg-[#009865] h-full shadow-[0_0_10px_rgba(0,152,101,0.5)]" />
                  </div>
                </div>
                <button onClick={onClose} className="w-full py-5 bg-[#004e3a] text-white rounded-[2rem] font-black shadow-xl">Fechar Acompanhamento</button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
