import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Zap, ShoppingCart, Share2, CheckCircle2, Package, Truck, Construction } from 'lucide-react';

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
    { nome: "Painel Solar Premium 550W", desc: "Alta eficiência monocristalina", img: "/assets/painel1.jpg" },
    { nome: "Inversor Inteligente 5kW", desc: "Monitoramento via Wi-Fi e IA", img: "/assets/inversor1.jpg" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>

        {type === 'generation' ? (
          <div className="space-y-6">
            {step === 1 ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto"><Zap className="w-8 h-8 text-yellow-500" /></div>
                <h2 className="text-2xl font-black text-[#004e3a]">Quanto você quer gerar?</h2>
                <div className="relative">
                  <input type="number" value={kwValue} onChange={(e) => setKwValue(e.target.value)} placeholder="Quantidade em kW" className="w-full px-6 py-5 bg-gray-50 rounded-2xl border-none font-black text-2xl text-center text-[#009865]" />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300">kW</span>
                </div>
                <button onClick={() => setStep(2)} disabled={!kwValue} className="w-full py-5 bg-[#009865] text-white rounded-2xl font-black shadow-xl disabled:opacity-40">Ver Proposta Personalizada</button>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-[#004e3a]">Sua Usina Ideal</h2>
                <div className="relative aspect-video bg-gray-100 rounded-[2rem] overflow-hidden">
                  <img src={equipamentos[currentEquip].img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-black">{equipamentos[currentEquip].nome}</h3>
                    <p className="text-white/80 text-xs">{equipamentos[currentEquip].desc}</p>
                  </div>
                  <button onClick={() => setCurrentEquip(prev => (prev > 0 ? prev - 1 : equipamentos.length - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"><ChevronLeft /></button>
                  <button onClick={() => setCurrentEquip(prev => (prev < equipamentos.length - 1 ? prev + 1 : 0))} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"><ChevronRight /></button>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl space-y-2">
                  <div className="flex justify-between text-sm font-bold"><span className="text-gray-500">Investimento Estimado</span><span className="text-[#004e3a]">R$ 12.450,00</span></div>
                  <div className="flex justify-between text-sm font-bold"><span className="text-gray-500">Economia Mensal</span><span className="text-[#009865]">R$ 450,00</span></div>
                  <div className="flex justify-between text-sm font-bold"><span className="text-gray-500">ROI (Retorno)</span><span className="text-[#009865]">24 meses</span></div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-[#009865] text-white rounded-2xl font-black shadow-lg">Contratar Agora</button>
                  <button onClick={() => alert("Link de proposta copiado!")} className="p-4 bg-gray-100 text-gray-500 rounded-2xl"><Share2 /></button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {step === 1 ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto"><ShoppingCart className="w-8 h-8 text-blue-500" /></div>
                <h2 className="text-2xl font-black text-[#004e3a]">Controle seu Consumo</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setStep(2)} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 text-left hover:bg-blue-50/50 transition-all">
                    <h3 className="font-black text-[#004e3a]">Quero Adquirir um Medidor</h3>
                    <p className="text-xs text-gray-400 mt-1">Smart Meter em comodato ou compra</p>
                  </button>
                  <button onClick={() => alert("Fluxo de integração...")} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 text-left hover:bg-green-50/50 transition-all">
                    <h3 className="font-black text-[#004e3a]">Já Tenho Acesso Remoto</h3>
                    <p className="text-xs text-gray-400 mt-1">Conectar equipamento existente</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-[#004e3a]">Acompanhe seu Pedido</h2>
                <div className="space-y-4">
                  {[
                    { label: "Pedido Confirmado", icon: CheckCircle2, done: true },
                    { label: "Fornecedor Postou", icon: Package, done: true },
                    { label: "Chegou na Cidade", icon: Truck, done: false },
                    { label: "Aguardando Instalação", icon: Construction, done: false }
                  ].map((f, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${f.done ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100 opacity-50'}`}>
                      <f.icon className={`w-5 h-5 ${f.done ? 'text-[#009865]' : 'text-gray-300'}`} />
                      <span className={`text-sm font-black ${f.done ? 'text-[#004e3a]' : 'text-gray-400'}`}>{f.label}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="bg-[#009865] h-full" />
                </div>
                <button onClick={onClose} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black">Entendido</button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
