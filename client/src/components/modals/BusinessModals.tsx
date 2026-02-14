import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, ArrowRight, CheckCircle, Shield, TrendingUp, 
  DollarSign, Cpu, Wifi, MapPin, ChevronLeft, ChevronRight, Share2, Info,
  Smartphone, CreditCard, Landmark, QrCode, ShoppingCart, Truck, Factory, Activity, Wrench
} from 'lucide-react';
// @ts-ignore: No declaration file for calc3.js; provide a .d.ts if you want proper types.
import { solarCalculator } from '../../upload/calc3.js';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate?: () => void;
  isAtivo?: boolean;
}

export const GenerationModal: React.FC<ModalProps> = ({ isOpen, onClose, onActivate }) => {
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState('');
  const [calcResult, setCalcResult] = useState<any>(null);
  const [currentEquip, setCurrentEquip] = useState(0);

  const equipamentos = [
    { nome: "Painel Solar WEG 550W", desc: "Alta eficiência monocristalina com tecnologia Half-Cell.", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800" },
    { nome: "Inversor GROWATT Smart", desc: "Monitoramento em tempo real via Wi-Fi e IA integrada.", img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800" }
  ];

  const handleCalculate = () => {
    const result = solarCalculator({ monthlyBill: Number(bill) });
    setCalcResult(result);
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Geração de Energia</h2>
              <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Quanto você paga de energia hoje?</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full">
                <input 
                  type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0.00"
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
                  className="text-6xl font-black text-center w-full bg-transparent border-none outline-none text-[#009865]"
                />
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300">R$</span>
              </div>
              <button 
                onClick={handleCalculate} disabled={!bill}
                className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black shadow-xl disabled:opacity-50 active:scale-95 transition-transform"
              >
                Simular Projeto Solar
              </button>
            </div>
          </div>
        )}

        {step === 2 && calcResult && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep(1)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Seu Orçamento Inteligente</h2>
            </div>

            {/* Carrossel de Equipamentos Restaurado */}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-900/30">
                <p className="text-[10px] font-black text-gray-400 uppercase">Geração Mensal</p>
                <p className="text-xl font-black text-[#004e3a] dark:text-white">{calcResult.realGenerationKwh} kWh</p>
              </div>
              <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                <p className="text-[10px] font-black text-gray-400 uppercase">Módulos</p>
                <p className="text-xl font-black text-[#004e3a] dark:text-white">{calcResult.modules} Placas</p>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500">Investimento Total</span>
                <span className="text-2xl font-black text-[#009865]">R$ {calcResult.estimatedProjectCost.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <span className="text-xs font-bold text-[#004e3a] dark:text-green-400">Parcelas em {calcResult.installmentCount}x</span>
                <span className="text-lg font-black text-[#004e3a] dark:text-green-400">R$ {calcResult.monthlyInstallment.toLocaleString('pt-BR')}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Economia 10 Anos</p>
                  <p className="text-sm font-black text-[#009865]">R$ {calcResult.savingsIn10Years.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Payback</p>
                  <p className="text-sm font-black text-[#009865]">{calcResult.paybackTime} Anos</p>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(3)} className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl">Adquirir Agora</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Finalizar Aquisição</h2>
              <p className="text-sm font-bold text-gray-400">Escolha a melhor forma de pagamento</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'pix', label: 'Pix (Aprovação Imediata)', icon: QrCode },
                { id: 'cartao', label: 'Cartão de Crédito', icon: CreditCard },
                { id: 'financiamento', label: 'Financiamento Santander', icon: Landmark },
                { id: 'comodato', label: 'Comodato (Lista de Espera)', icon: Smartphone },
              ].map((method) => (
                <button 
                  key={method.id}
                  onClick={() => {
                    if (method.id === 'financiamento') alert("Redirecionando para o Santander...");
                    else { alert("Pedido realizado com sucesso!"); onClose(); onActivate?.(); }
                  }}
                  className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:border-[#009865] border-2 border-transparent transition-all"
                >
                  <div className="flex items-center gap-4">
                    <method.icon className="w-6 h-6 text-[#009865]" />
                    <span className="font-black text-sm text-[#004e3a] dark:text-white">{method.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const ConsumptionModal: React.FC<ModalProps> = ({ isOpen, onClose, onActivate, isAtivo }) => {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (purchaseComplete && progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 100));
      }, 300);
      return () => clearInterval(timer);
    }
  }, [purchaseComplete, progress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>

        {!isAtivo && !purchaseComplete ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Controle seu Consumo</h2>
              <p className="text-sm font-bold text-gray-400 mt-2">Saldo embaçado? Adquira seu Smart Meter.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 hover:border-[#009865] transition-all group">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4"><Cpu className="text-[#009865]" /></div>
                <h3 className="font-black text-[#004e3a] dark:text-white mb-2">Smart Meter (Compra)</h3>
                <p className="text-2xl font-black text-[#009865] mb-6">R$ 79,90</p>
                <button onClick={() => setPurchaseComplete(true)} className="w-full py-3 bg-[#009865] text-white rounded-xl font-black text-xs uppercase tracking-widest">Comprar Agora</button>
              </div>

              <div className="p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 hover:border-[#004e3a] transition-all group">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4"><Wifi className="text-[#004e3a]" /></div>
                <h3 className="font-black text-[#004e3a] dark:text-white mb-2">Comodato</h3>
                <p className="text-2xl font-black text-[#004e3a] dark:text-white mb-6">1+9x de R$ 9,99</p>
                <button onClick={() => setPurchaseComplete(true)} className="w-full py-3 bg-[#004e3a] text-white rounded-xl font-black text-xs uppercase tracking-widest">Assinar Comodato</button>
              </div>
            </div>
          </div>
        ) : purchaseComplete ? (
          <div className="text-center space-y-8 py-10">
            <Truck className="w-20 h-20 text-[#009865] mx-auto animate-bounce" />
            <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">Pedido Realizado!</h2>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${progress}%` }} className="h-full bg-[#009865]" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Instalação em progresso</p>
            <button onClick={() => { onActivate?.(); onClose(); }} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Concluir Cadastro (Segurança)</button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle className="w-20 h-20 text-[#009865] mx-auto" />
            <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Monitoramento Ativo</h2>
            <button onClick={onClose} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black">Voltar ao Dashboard</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const PrivatePlantModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ model: '', power: '', location: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        
        {step === 1 ? (
          <div className="space-y-8">
            <div className="text-center">
              <Factory className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-blue-400">Gestão de Usina Particular</h2>
              <p className="text-sm text-gray-400 font-bold mt-2">Otimizamos sua geração com IA e manutenção preventiva.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100">
                <Activity className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-xs font-black text-[#004e3a] dark:text-white uppercase">Análise de Clima</p>
                <p className="text-[10px] text-gray-500 font-bold">Cruzamos dados locais para prever sua geração.</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100">
                <Wrench className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-xs font-black text-[#004e3a] dark:text-white uppercase">Preventiva</p>
                <p className="text-[10px] text-gray-500 font-bold">Alertas automáticos para limpeza e manutenção.</p>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl">Conectar meu Equipamento</button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-[#004e3a] dark:text-white">Dados de Conexão</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Modelo do Inversor" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent focus:border-blue-600 outline-none" />
              <input type="text" placeholder="Chave de Acesso API / Serial" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent focus:border-blue-600 outline-none" />
              <button onClick={() => { alert("Solicitação de conexão enviada!"); onClose(); }} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black">Solicitar Integração</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
