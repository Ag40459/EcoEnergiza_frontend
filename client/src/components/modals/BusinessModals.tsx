import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, ArrowRight, CheckCircle, Shield, TrendingUp, 
  DollarSign, Cpu, Wifi, MapPin, ChevronLeft, ChevronRight, Share2, Info,
  Smartphone, CreditCard, Landmark, QrCode, ShoppingCart, Truck
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
  const [checkoutStep, setCheckoutStep] = useState<'budget' | 'payment' | 'success'>('budget');
  const [paymentMethod, setPaymentMethod] = useState('');

  if (!isOpen) return null;

  const handleConfirmBudget = () => {
    setStep(3); // Vai para o checkout
  };

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    if (method === 'financiamento') {
      alert("Redirecionando para o Santander para análise de crédito e KYC...");
    } else {
      setCheckoutStep('success');
      setTimeout(() => {
        onActivate?.();
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Geração de Energia</h2>
              <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Quanto você deseja contratar?</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full">
                <input 
                  type="number" value={kw} onChange={(e) => setKw(e.target.value)} placeholder="0.00"
                  className="text-6xl font-black text-center w-full bg-transparent border-none outline-none text-[#009865]"
                />
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300">kW</span>
              </div>
              <button 
                onClick={() => setStep(2)} disabled={!kw}
                className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black shadow-xl disabled:opacity-50 active:scale-95 transition-transform"
              >
                Gerar Orçamento Agora
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep(1)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Seu Orçamento</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-[2rem] border border-green-100 dark:border-green-900/30 space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase">Geração Mensal Média</p>
                <p className="text-2xl font-black text-[#004e3a] dark:text-white">{Number(kw) * 125} kWh</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase">Equipamentos</p>
                <p className="text-sm font-bold text-[#004e3a] dark:text-white">{Math.ceil(Number(kw)/0.5)} Placas + Inversores</p>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500">Valor Total</span>
                <span className="text-2xl font-black text-[#009865]">R$ {(Number(kw) * 4500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <span className="text-xs font-bold text-[#004e3a] dark:text-green-400">Ou em 84x de</span>
                <span className="text-lg font-black text-[#004e3a] dark:text-green-400">R$ {((Number(kw) * 4500 * 1.8) / 84).toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold text-center italic">Parcelas menores que sua conta de luz atual!</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
                <Landmark className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-[10px] font-bold text-blue-600 leading-relaxed">Pode ser financiado pelos bancos tradicionais ou direto pelo app via Santander.</p>
              </div>
              <button onClick={handleConfirmBudget} className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform">Adquirir Agora</button>
            </div>
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
                  onClick={() => handlePayment(method.id)}
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
        setProgress(prev => Math.min(prev + 10, 100));
      }, 500);
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
              <p className="text-sm font-bold text-gray-400 mt-2">Saldo embaçado? Conecte seu medidor inteligente.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 hover:border-[#009865] transition-all group">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4"><Cpu className="text-[#009865]" /></div>
                <h3 className="font-black text-[#004e3a] dark:text-white mb-2">Smart Meter</h3>
                <p className="text-xs text-gray-500 font-bold mb-4">Conectividade direta com nosso App.</p>
                <div className="space-y-1 mb-6">
                  <p className="text-2xl font-black text-[#009865]">$79,90 <span className="text-xs opacity-50">à vista</span></p>
                  <p className="text-[10px] font-bold text-gray-400">ou 1+9 de $9,90 no comodato</p>
                </div>
                <button onClick={() => setPurchaseComplete(true)} className="w-full py-3 bg-[#009865] text-white rounded-xl font-black text-xs uppercase tracking-widest">Adquirir Agora</button>
              </div>

              <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] flex flex-col justify-center items-center text-center gap-4">
                <Wifi className="w-10 h-10 text-gray-300" />
                <p className="text-xs font-bold text-gray-400">Já possui acesso remoto ao seu contador?</p>
                <button className="text-xs font-black text-[#009865] underline uppercase tracking-tighter">Conectar Agora</button>
              </div>
            </div>
          </div>
        ) : purchaseComplete ? (
          <div className="text-center space-y-8 py-10">
            <div className="relative w-32 h-32 mx-auto">
              <Truck className="w-full h-full text-[#009865] animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">Pedido em Caminho!</h2>
              <p className="text-xs font-bold text-gray-400">Acompanhe a entrega e instalação do seu Smart Meter</p>
            </div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                className="h-full bg-[#009865] shadow-[0_0_20px_rgba(0,152,101,0.5)]"
              />
            </div>
            
            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase">
              <span>Pedido</span>
              <span>Envio</span>
              <span>Instalação</span>
            </div>

            <button 
              onClick={() => { onActivate?.(); onClose(); }}
              className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black mt-8"
            >
              Ir para Cadastro Completo (Segurança)
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle className="w-20 h-20 text-[#009865] mx-auto" />
            <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Monitoramento Ativo</h2>
            <p className="text-sm font-bold text-gray-400">Clique para alternar entre saldo atual e ciclo total.</p>
            <button onClick={onClose} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black">Voltar ao Dashboard</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
