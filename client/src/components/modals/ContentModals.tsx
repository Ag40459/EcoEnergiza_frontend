import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2, ZoomIn } from 'lucide-react';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[];
}

export function ContentModal({ isOpen, onClose, title, data }: ContentModalProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-5xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {!selectedItem ? (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400 uppercase tracking-tighter">{title}</h2>
              <p className="text-sm font-bold text-gray-400 mt-2">Explore como estamos transformando o futuro da energia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10 }}
                  onClick={() => { setSelectedItem(item); setCurrentImg(0); }}
                  className="group cursor-pointer bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 border border-transparent hover:border-[#009865]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <item.icone className="w-7 h-7 text-[#009865]" />
                  </div>
                  <h3 className="text-xl font-black text-[#004e3a] dark:text-white mb-3 uppercase tracking-tight">{item.titulo}</h3>
                  <p className="text-sm font-bold text-gray-400 line-clamp-2">{item.dor}</p>
                  <div className="mt-6 flex items-center gap-2 text-[#009865] font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver Detalhes <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => setSelectedItem(null)} className="flex items-center gap-2 text-[#009865] font-black text-xs mb-4"><ChevronLeft className="w-4 h-4" /> Voltar para {title}</button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-[3rem] overflow-hidden group shadow-lg">
                  <img 
                    src={selectedItem.imagens?.[currentImg] || "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setZoomImg(selectedItem.imagens?.[currentImg])}
                    alt={selectedItem.titulo}
                  />
                  {selectedItem.imagens?.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => (prev > 0 ? prev - 1 : selectedItem.imagens.length - 1)); }} className="p-2 bg-white/80 rounded-full shadow-lg"><ChevronLeft className="w-5 h-5" /></button>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => (prev < selectedItem.imagens.length - 1 ? prev + 1 : 0)); }} className="p-2 bg-white/80 rounded-full shadow-lg"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                  )}
                  <div className="absolute bottom-6 right-6 p-3 bg-white/90 rounded-2xl shadow-xl">
                    <ZoomIn className="w-5 h-5 text-[#009865]" />
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  {selectedItem.imagens?.map((img: string, i: number) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentImg(i)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all shrink-0 ${currentImg === i ? 'border-[#009865]' : 'border-transparent opacity-50'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`${selectedItem.titulo} ${i}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
                    <selectedItem.icone className="w-4 h-4 text-[#009865]" />
                    <span className="text-[10px] font-black text-[#009865] uppercase tracking-widest">Solução Ecolote</span>
                  </div>
                  <h2 className="text-4xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter leading-none mb-4">{selectedItem.titulo}</h2>
                  <p className="text-lg font-bold text-gray-400 leading-tight italic">"{selectedItem.dor}"</p>
                </div>

                <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedItem.descricaoLonga}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#004e3a] dark:text-white uppercase tracking-widest">Principais Benefícios</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedItem.beneficios.map((b: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#009865] shrink-0" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Solicitar Orçamento Grátis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {zoomImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-10 cursor-zoom-out"
            onClick={() => setZoomImg(null)}
          >
            <img src={zoomImg} className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" alt="Zoom" />
            <button className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400 uppercase tracking-tighter">Fale Conosco</h2>
          <p className="text-sm font-bold text-gray-400 mt-2">Estamos prontos para tirar suas dúvidas.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Nome" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none font-bold text-sm dark:text-white border border-transparent focus:border-[#009865] transition-all" />
            <input type="email" placeholder="E-mail" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none font-bold text-sm dark:text-white border border-transparent focus:border-[#009865] transition-all" />
          </div>
          <input type="text" placeholder="Assunto" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none font-bold text-sm dark:text-white border border-transparent focus:border-[#009865] transition-all" />
          <textarea placeholder="Mensagem" rows={4} className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none font-bold text-sm dark:text-white border border-transparent focus:border-[#009865] transition-all resize-none"></textarea>
          <button className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Enviar Mensagem
          </button>
        </form>
      </motion.div>
    </div>
  );
}
