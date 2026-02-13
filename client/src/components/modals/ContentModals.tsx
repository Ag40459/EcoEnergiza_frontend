import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Mail, Phone, MessageSquare, Send, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: any[];
}

export const ContentModal: React.FC<ModalProps> = ({ isOpen, onClose, title, items }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-2xl font-black text-[#004e3a]">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {!selectedItem ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <button key={idx} onClick={() => setSelectedItem(item)} className="flex items-center gap-4 p-6 rounded-[2rem] border border-gray-100 text-left hover:bg-green-50/50 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icone className="w-6 h-6 text-[#009865]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-[#004e3a] text-sm">{item.titulo}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Clique para ver detalhes</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <button onClick={() => setSelectedItem(null)} className="flex items-center gap-2 text-[#009865] font-black text-xs mb-4"><ChevronLeft className="w-4 h-4" /> Voltar</button>
              
              {/* Carrossel de Imagens */}
              <div className="relative aspect-video bg-gray-100 rounded-[2rem] overflow-hidden group">
                <img 
                  src={selectedItem.imagens?.[currentImg] || "/assets/placeholder.png"} 
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setZoomImg(selectedItem.imagens?.[currentImg])}
                />
                {selectedItem.imagens?.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setCurrentImg(prev => (prev > 0 ? prev - 1 : selectedItem.imagens.length - 1))} className="p-2 bg-white/80 rounded-full shadow-lg"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={() => setCurrentImg(prev => (prev < selectedItem.imagens.length - 1 ? prev + 1 : 0))} className="p-2 bg-white/80 rounded-full shadow-lg"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#004e3a]">{selectedItem.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedItem.descricaoLonga}</p>
                {selectedItem.link && (
                  <a href={selectedItem.link} target="_blank" className="inline-block text-[#009865] font-black text-xs underline">Confirmar Informação (Fonte)</a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Zoom Image Overlay */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomImg(null)} className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-8 cursor-zoom-out">
            <img src={zoomImg} className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nome: '', zap: '', msg: '' });

  const zapLink = "https://wa.me/5581985967343?text=" + encodeURIComponent("Olá, eu vim do site EcoEnergiza, quero mais informações.");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3.5rem] w-full max-w-md p-10 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>

        {step === 1 ? (
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center"><MessageSquare className="w-10 h-10 text-[#009865]" /></div>
            <div>
              <h2 className="text-2xl font-black text-[#004e3a]">Fale Conosco</h2>
              <p className="text-sm font-bold text-gray-400 mt-2">Estamos prontos para te ajudar</p>
            </div>
            
            <div className="w-full space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Mail className="w-5 h-5 text-[#009865]" />
                <span className="text-sm font-black text-[#004e3a]">dev@ecolote.com.br</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Phone className="w-5 h-5 text-[#009865]" />
                <span className="text-sm font-black text-[#004e3a]">+55 81 98596-7343</span>
              </div>
            </div>

            <div className="p-4 bg-white border-2 border-green-100 rounded-[2rem] shadow-sm">
              <QRCodeSVG value={zapLink} size={120} />
              <p className="text-[10px] font-black text-[#009865] mt-3 uppercase tracking-widest">Aponte para o Zap</p>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-2">
              Enviar Mensagem <Send className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[#009865] font-black text-xs"><ChevronLeft className="w-4 h-4" /> Voltar</button>
            <h2 className="text-2xl font-black text-[#004e3a]">Sua Mensagem</h2>
            <div className="space-y-4">
              <input value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Seu Nome" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" />
              <input value={formData.zap} onChange={e => setFormData({...formData, zap: e.target.value})} placeholder="Seu Zap" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" />
              <textarea value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})} rows={4} placeholder="Como podemos ajudar?" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm resize-none" />
            </div>
            <button 
              onClick={() => {
                if(!formData.nome || !formData.zap || !formData.msg) alert("Preencha todos os campos!");
                else { alert("Mensagem enviada para o time de suporte!"); onClose(); }
              }}
              className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-xl"
            >
              Confirmar Envio
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
