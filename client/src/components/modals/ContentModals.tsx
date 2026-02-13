import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Mail, Phone, MessageSquare, Send, Zap, Shield, TrendingUp, Cpu, Globe, Users } from 'lucide-react';
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-4xl h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        <div className="p-8 flex items-center justify-between border-b border-gray-50 dark:border-gray-800">
          <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {!selectedItem ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <button key={idx} onClick={() => setSelectedItem(item)} className="flex flex-col gap-4 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-left hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all group relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icone className="w-7 h-7 text-[#009865]" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#004e3a] dark:text-white text-lg leading-tight mb-2">{item.titulo}</h3>
                    <p className="text-xs text-gray-500 font-bold line-clamp-2">{item.dor}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-[#009865] font-black text-[10px] uppercase tracking-widest">
                    Ver Solução <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <button onClick={() => setSelectedItem(null)} className="flex items-center gap-2 text-[#009865] font-black text-xs mb-4"><ChevronLeft className="w-4 h-4" /> Voltar para {title}</button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-[3rem] overflow-hidden group shadow-lg">
                    <img 
                      src={selectedItem.imagens?.[currentImg] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"} 
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setZoomImg(selectedItem.imagens?.[currentImg])}
                    />
                    {selectedItem.imagens?.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => (prev > 0 ? prev - 1 : selectedItem.imagens.length - 1)); }} className="p-2 bg-white/80 rounded-full shadow-lg"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => (prev < selectedItem.imagens.length - 1 ? prev + 1 : 0)); }} className="p-2 bg-white/80 rounded-full shadow-lg"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#009865] uppercase tracking-[0.2em]">Nossa Solução</span>
                    <h3 className="text-3xl font-black text-[#004e3a] dark:text-green-400 leading-tight">{selectedItem.titulo}</h3>
                  </div>
                  
                  <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-3xl border-l-4 border-red-400">
                    <p className="text-sm font-bold text-red-800 dark:text-red-300 italic">"{selectedItem.dor}"</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{selectedItem.descricaoLonga}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {selectedItem.beneficios?.map((b: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#009865]" />
                          <span className="text-xs font-black text-[#004e3a] dark:text-white">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedItem.link && (
                    <a href={selectedItem.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#009865] font-black text-xs underline mt-6">
                      Saber mais sobre esta tecnologia <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Zoom Image Overlay */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomImg(null)} className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-8 cursor-zoom-out">
            <img src={zoomImg} className="max-w-full max-h-full object-contain shadow-2xl" alt="Zoom" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nome: '', zap: '', msg: '' });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const zapLink = "https://wa.me/5581985967343?text=" + encodeURIComponent("Olá, eu vim do site EcoEnergiza, quero mais informações.");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-md p-10 relative shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>

        {step === 1 ? (
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center"><MessageSquare className="w-10 h-10 text-[#009865]" /></div>
            <div>
              <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Fale Conosco</h2>
              <p className="text-sm font-bold text-gray-400 mt-2">Estamos prontos para te ajudar</p>
            </div>
            
            <div className="w-full space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Mail className="w-5 h-5 text-[#009865]" />
                <span className="text-sm font-black text-[#004e3a] dark:text-white">dev@ecolote.com.br</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Phone className="w-5 h-5 text-[#009865]" />
                <span className="text-sm font-black text-[#004e3a] dark:text-white">+55 81 98596-7343</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-[2rem] shadow-sm border border-gray-100">
              <QRCodeSVG value={zapLink} size={120} />
              <p className="text-[10px] font-black text-[#009865] mt-3 uppercase tracking-widest">Aponte para o Zap</p>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-4 bg-[#004e3a] text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform">
              Enviar Mensagem <Send className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[#009865] font-black text-xs"><ChevronLeft className="w-4 h-4" /> Voltar</button>
            <h2 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Sua Mensagem</h2>
            <div className="space-y-4">
              <input value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Seu Nome" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold text-sm dark:text-white outline-none focus:ring-2 focus:ring-green-100" />
              <input value={formData.zap} onChange={e => setFormData({...formData, zap: e.target.value})} placeholder="Seu Zap" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold text-sm dark:text-white outline-none focus:ring-2 focus:ring-green-100" />
              <textarea value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})} rows={4} placeholder="Como podemos ajudar?" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold text-sm resize-none dark:text-white outline-none focus:ring-2 focus:ring-green-100" />
            </div>
            <button 
              onClick={() => {
                if(!formData.nome || !formData.zap || !formData.msg) alert("Preencha todos os campos!");
                else { alert("Mensagem enviada para o time de suporte!"); onClose(); }
              }}
              className="w-full py-4 bg-[#009865] text-white rounded-2xl font-black shadow-xl active:scale-95 transition-transform"
            >
              Confirmar Envio
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
