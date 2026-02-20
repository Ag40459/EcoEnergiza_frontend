import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, ArrowRight, CheckCircle, Shield, TrendingUp, 
  DollarSign, Cpu, Wifi, MapPin, ChevronLeft, ChevronRight, Share2, Info,
  Smartphone, CreditCard, Landmark, QrCode, ShoppingCart, Truck, Factory, Activity, Wrench,
  Calculator, User, Settings, ShieldCheck, Award, Briefcase, Calendar, Star
} from 'lucide-react';
import { solarCalculator } from '@/lib/solarCalculator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate?: () => void;
  isAtivo?: boolean;
  onRedirectToTab?: (tab: any) => void;
}

// Padrão de Modal unificado baseado no commit 0c859ac
export const GenerationModal: React.FC<ModalProps> = ({ isOpen, onClose, onActivate, isAtivo }) => {
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState('');
  const [calcResult, setCalcResult] = useState<any>(null);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (purchaseComplete && progress < 100) {
      const timer = setInterval(() => setProgress(prev => Math.min(prev + 1, 100)), 50);
      return () => clearInterval(timer);
    }
  }, [purchaseComplete, progress]);

  const handleCalculate = () => {
    const result = solarCalculator({ monthlyBill: Number(bill) });
    setCalcResult(result);
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {step === 1 && !isAtivo && !purchaseComplete ? (
          <div className="text-center space-y-8">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-[#009865]" />
            </div>
            <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Simulador de Economia</h2>
            <div className="space-y-4">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Valor da Conta de Luz (R$)</label>
              <input 
                type="number" value={bill} onChange={(e) => setBill(e.target.value)}
                placeholder="Ex: 450" 
                className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-3xl font-black text-[#009865] text-center outline-none border-2 border-transparent focus:border-[#009865]"
              />
              <button onClick={handleCalculate} className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Calcular Economia</button>
            </div>
          </div>
        ) : step === 2 && !isAtivo && !purchaseComplete ? (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-black text-[#004e3a] dark:text-white">Seu Plano de Economia</h3>
              <p className="text-sm text-gray-400 font-bold">Baseado em sua conta de R$ {bill}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100">
                <p className="text-[10px] font-black text-[#009865] uppercase">Economia Mensal</p>
                <p className="text-2xl font-black text-[#004e3a] dark:text-white">R$ {(Number(bill) * 0.95).toFixed(0)}</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-600 uppercase">Geração Estimada</p>
                <p className="text-2xl font-black text-[#004e3a] dark:text-white">{calcResult?.monthlyGeneration || 450} kWh</p>
              </div>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
              <h3 className="font-black text-[#004e3a] dark:text-white mb-2">Assinatura Mensal</h3>
              <p className="text-3xl font-black text-[#009865] mb-6">R$ 9,99 <span className="text-xs text-gray-400">/mês</span></p>
              <button onClick={() => setPurchaseComplete(true)} className="w-full py-4 bg-[#004e3a] text-white rounded-xl font-black uppercase">Ativar Agora</button>
            </div>
          </div>
        ) : purchaseComplete && !isAtivo ? (
          <div className="text-center space-y-8">
            <Truck className="w-20 h-20 text-[#009865] mx-auto animate-bounce" />
            <h2 className="text-2xl font-black text-[#004e3a] dark:text-white">Processando sua Ativação</h2>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${progress}%` }} className="h-full bg-[#009865]" />
            </div>
            <button onClick={() => { onActivate?.(); onClose(); }} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Concluir e Ir para Segurança</button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle className="w-20 h-20 text-[#009865] mx-auto" />
            <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Monitoramento Ativo</h2>
            <p className="text-gray-400 font-bold">Sua geração está sendo monitorada em tempo real.</p>
            <button onClick={onClose} className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black">Voltar ao Dashboard</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Replicando para Consumo
export const ConsumptionModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-8">
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto">
            <TrendingUp className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Consumo Detalhado</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total do Mês</p>
              <p className="text-5xl font-black text-blue-600">842.1 <span className="text-xl">kWh</span></p>
            </div>
          </div>
          <button onClick={onClose} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Fechar</button>
        </div>
      </motion.div>
    </div>
  );
};

// Replicando para Usina Particular
export const PrivatePlantModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        {step === 1 ? (
          <div className="space-y-8">
            <div className="text-center">
              <Factory className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-blue-400 uppercase tracking-tighter">Gestão de Usina</h2>
              <p className="text-sm text-gray-400 font-bold mt-2">Conecte sua usina particular para monitoramento inteligente.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100">
                <Activity className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-xs font-black text-[#004e3a] dark:text-white uppercase">Análise IA</p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100">
                <Wrench className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-xs font-black text-[#004e3a] dark:text-white uppercase">Preventiva</p>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl">Conectar Equipamento</button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-[#004e3a] dark:text-white">Integração API</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Modelo do Inversor" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent focus:border-blue-600 outline-none" />
              <input type="text" placeholder="Chave de Acesso / Serial" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent focus:border-blue-600 outline-none" />
              <button onClick={() => onClose()} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black">Solicitar Conexão</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Novo Modal de Perfil/KYC no padrão 0c859ac
export const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-8">
          <div className="w-24 h-24 rounded-full border-4 border-[#009865] mx-auto overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Meu Perfil</h2>
          <div className="space-y-4 text-left">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Nome Completo</p>
              <p className="font-black text-[#004e3a] dark:text-white">Alex Silva</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Status KYC</p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-yellow-600" />
                <p className="font-black text-yellow-600 uppercase text-xs">Pendente de Documentação</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Salvar Alterações</button>
        </div>
      </motion.div>
    </div>
  );
};

// Novo Modal de Segurança no padrão 0c859ac
export const SecurityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-8">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Segurança</h2>
          <div className="space-y-4">
            <button className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Smartphone className="w-6 h-6 text-[#009865]" />
                <span className="font-black text-[#004e3a] dark:text-white text-sm">Autenticação 2FA</span>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </button>
            <button className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="w-6 h-6 text-[#009865]" />
                <span className="font-black text-[#004e3a] dark:text-white text-sm">Alterar Senha</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
          <button onClick={onClose} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Voltar</button>
        </div>
      </motion.div>
    </div>
  );
};

// Novo Modal de Consultor no padrão 0c859ac
export const ConsultantModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-2xl p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-center space-y-8">
          <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto">
            <Award className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter">Seja um Consultor</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
              <Briefcase className="w-6 h-6 text-[#009865] mx-auto mb-2" />
              <p className="text-[10px] font-black text-gray-400 uppercase">Ganhos</p>
              <p className="font-black text-[#004e3a] dark:text-white">Até 15%</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
              <Users className="w-6 h-6 text-[#009865] mx-auto mb-2" />
              <p className="text-[10px] font-black text-gray-400 uppercase">Rede</p>
              <p className="font-black text-[#004e3a] dark:text-white">Ilimitada</p>
            </div>
          </div>
          <button className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Quero ser Consultor</button>
        </div>
      </motion.div>
    </div>
  );
};

export default function BusinessModals({ isOpen, onClose }: ModalProps) {
  // Mantendo para compatibilidade se necessário, mas o ideal é usar os componentes exportados acima
  return <GenerationModal isOpen={isOpen} onClose={onClose} />;
}
