import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Search, ChevronLeft } from 'lucide-react';

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: 'user' | 'bot', content: string}>>([
    { role: 'bot', content: "Olá! Sou seu Copiloto IA. Como posso te ajudar a vender mais hoje?" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput("");

    // Simulação de IA conforme as regras
    setTimeout(() => {
      let response = "Interessante! Estou analisando os dados para te dar a melhor resposta.";
      
      if (input.toLowerCase().includes("solar") && input.toLowerCase().includes("comercial")) {
        response = "Aqui está um script para cliente comercial: 'Olá! Notei que sua empresa tem um custo fixo alto com energia. Sabia que a usina remota da Ecolote pode reduzir isso em até 30% sem investimento inicial?'";
      } else if (input.toLowerCase().includes("fulana")) {
        response = "Não encontrei 'Fulana' na sua base, mas tenho 3 clientes similares no mesmo bairro. Deseja ver os perfis deles para prospecção?";
      } else if (input.toLowerCase().includes("follow-up")) {
        response = "O João viu o orçamento há 2 dias e não respondeu. Recomendo um follow-up via WhatsApp agora com este template: 'Oi João! Teve chance de ver a proposta?'";
      }

      setMessages(prev => [...prev, { role: 'bot' as const, content: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="p-4 bg-[#004e3a] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none">Copiloto IA</h4>
                  <span className="text-[10px] opacity-60">Sempre ativo</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#009865] text-white rounded-tr-none' 
                      : 'bg-white text-[#004e3a] shadow-sm rounded-tl-none border border-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area - Expande ao digitar conforme pedido */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    rows={input.length > 30 ? 3 : 1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pergunte algo ao Copiloto..."
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#009865] text-sm resize-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  />
                  {input && (
                    <button 
                      onClick={() => setInput("")}
                      className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 bg-[#009865] text-white rounded-xl shadow-lg disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {['Script Venda', 'Buscar Lead', 'ROI Solar'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setInput(tag)}
                    className="whitespace-nowrap px-3 py-1 bg-green-50 text-[#009865] text-[10px] font-bold rounded-full border border-green-100"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Flutuante Estilo WhatsApp */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#009865] text-white rounded-full shadow-2xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 rounded-full bg-[#009865] animate-ping opacity-20 group-hover:opacity-40" />
        {isOpen ? <ChevronLeft className="w-7 h-7" /> : <Sparkles className="w-7 h-7" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[8px] font-bold">1</span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
