import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, ArrowRight, CheckCircle, Shield, TrendingUp, 
  DollarSign, Cpu, Wifi, MapPin, ChevronLeft, ChevronRight, Share2, Info
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate?: () => void;
  isAtivo?: boolean;
  onToggleCiclo?: () => void;
}

export const GenerationModal: React.FC<ModalProps> = ({ isOpen, onClose, onActivate }) => {
  const [step, setStep] = useState(1);
  const [kw, setKw] = useState('');
  const [currentEquip, setCurrentEquip] = useState(0);

  const equipamentos = [
    { nome: "Painel Solar Premium 550W", desc: "Alta eficiência monocristalina com tecnologia Half-Cell.", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800" },
    { nome: "Inversor Inteligente 5kW", desc: "Monitoramento em tempo real via Wi-Fi e IA integrada.", img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        
        {step === 1 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Geração de Energia</h2>
              <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Configure sua usina remota</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full">
                <input 
                  type="number" value={kw} onChange={(e) => setKw(e.target.value)} placeholder="0.00"
                  className="text-6xl font-black text-center w-full bg-transparent border-none outline-none text-[#009865]"
                />
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300">kW</span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-[10px] font-black uppercase text-gray-400">Segurança Total</span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-[10px] font-black uppercase text-gray-400">ROI Garantido</span>
                </div>
              </div>
              <button 
                onClick={() => setStep(2)} disabled={!kw}
                className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black shadow-xl disabled:opacity-50 active:scale-95 transition-transform"
              >
                Ver Proposta Detalhada
              </button>
            </div>
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
                <button onClick={() => setCurrentEquip(prev => (prev > 0 ? prev - 1 : equipamentos.length - 1))} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"><ChevronLeft /></button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <button onClick={() => setCurrentEquip(prev => (prev < equipamentos.length - 1 ? prev + 1 : 0))} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"><ChevronRight /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-[2rem] border border-green-100 dark:border-green-900/30 space-y-4">
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-500">Investimento Estimado</span><span className="text-xl font-black text-[#004e3a] dark:text-green-400">R$ {(Number(kw) * 4500).toLocaleString()}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-500">Economia em 10 anos</span><span className="text-xl font-black text-[#009865]">R$ {(Number(kw) * 5400).toLocaleString()}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-500">Payback (Retorno)</span><span className="text-xl font-black text-[#009865]">2.1 Anos</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <Info className="w-5 h-5 text-[#009865] shrink-0" />
                <p className="text-[10px] font-bold text-gray-500 leading-relaxed">Esta proposta é uma estimativa baseada no seu consumo. O valor final pode variar após análise técnica da área de instalação remota.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { onActivate?.(); onClose(); }} className="flex-1 py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform">Confirmar e Ativar</button>
                <button onClick={() => alert("Link da proposta copiado!")} className="p-5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-[2rem] hover:bg-gray-200 transition-colors"><Share2 className="w-6 h-6" /></button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const ConsumptionModal: React.FC<ModalProps> = ({ isOpen, onClose, onActivate, isAtivo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>

        {!isAtivo ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Controle seu Consumo</h2>
              <p className="text-sm font-bold text-gray-400 mt-2">Conecte sua casa ao nosso ecossistema inteligente</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 hover:border-[#009865] transition-all group">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4"><Cpu className="text-[#009865]" /></div>
                <h3 className="font-black text-[#004e3a] dark:text-white mb-2">Smart Meter (Compra)</h3>
                <p className="text-xs text-gray-500 font-bold mb-4">Equipamento próprio com gestão completa.</p>
                <p className="text-2xl font-black text-[#009865] mb-6">$79,90</p>
                <button onClick={() => { onActivate?.(); onClose(); }} className="w-full py-3 bg-[#009865] text-white rounded-xl font-black text-xs uppercase tracking-widest">Comprar Agora</button>
              </div>

              <div className="p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 hover:border-[#004e3a] transition-all group">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4"><Wifi className="text-[#004e3a]" /></div>
                <h3 className="font-black text-[#004e3a] dark:text-white mb-2">Comodato</h3>
                <p className="text-xs text-gray-500 font-bold mb-4">Assinatura mensal sem custo de adesão.</p>
                <p className="text-2xl font-black text-[#004e3a] dark:text-white mb-6">$9,90 <span className="text-[10px] opacity-50">/mês</span></p>
                <button onClick={() => { onActivate?.(); onClose(); }} className="w-full py-3 bg-[#004e3a] text-white rounded-xl font-black text-xs uppercase tracking-widest">Assinar Comodato</button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center gap-4">
              <MapPin className="text-[#009865] w-6 h-6" />
              <div>
                <p className="text-xs font-black text-[#004e3a] dark:text-white">Já tem acesso remoto?</p>
                <p className="text-[10px] font-bold text-gray-400">Conecte seu medidor digital compatível</p>
              </div>
              <button className="ml-auto text-xs font-black text-[#009865] underline">Conectar</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle className="w-20 h-20 text-[#009865] mx-auto" />
            <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Acesso Ativo!</h2>
            <p className="text-sm font-bold text-gray-400">Você já está monitorando sua residência em tempo real.</p>
            <button onClick={onClose} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black">Voltar ao Dashboard</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
