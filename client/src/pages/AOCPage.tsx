import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv, Lock, Download, AlertCircle } from 'lucide-react';

export default function AOCPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const secretToken = 'aoc_wifi_control_2026';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('token') === secretToken) {
      setAuthorized(true);
      handleDownload();
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/aoc_control.apk';
    link.download = 'Controle_TV_AOC_Wifi.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '13101403') {
      setAuthorized(true);
      setError(false);
      handleDownload();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 text-center"
      >
        <div className="w-20 h-20 bg-[#009865]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Tv className="w-10 h-10 text-[#009865]" />
        </div>

        <h2 className="text-2xl font-black text-[#004e3a] dark:text-white uppercase tracking-tighter mb-2">
          Controle TV AOC
        </h2>
        <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
          Acesso Restrito
        </p>

        {!authorized ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 outline-none font-black transition-all ${error ? 'border-red-500' : 'border-transparent focus:border-[#009865]'}`}
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold justify-center">
                <AlertCircle className="w-4 h-4" />
                <span>Senha Incorreta</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-5 bg-[#004e3a] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Acessar Download
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800/30">
              <p className="text-sm font-black text-[#009865] uppercase tracking-widest">Download Iniciado</p>
              <p className="text-xs font-bold text-gray-400 mt-1">Caso não inicie, clique no botão abaixo</p>
            </div>
            
            <button 
              onClick={handleDownload}
              className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
            >
              Baixar Novamente <Download className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
