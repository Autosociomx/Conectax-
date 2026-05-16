
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Thought {
  id: number;
  text: string;
  intensity: number;
  category: 'AUDIT' | 'ARBITRAGE' | 'PREDICTION' | 'SYNTHESIS';
}

const SyntheticKernel: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [entropy, setEntropy] = useState(42);
  const [activeCycle, setActiveCycle] = useState(0);

  const categories = {
    AUDIT: { color: 'text-indigo-400', label: 'C1 AUDIT' },
    ARBITRAGE: { color: 'text-emerald-400', label: 'ARBITRAGE' },
    PREDICTION: { color: 'text-amber-400', label: 'PREDICTION' },
    SYNTHESIS: { color: 'text-violet-400', label: 'SYNTHESIS' },
  };

  const thoughtPool = [
    { text: "Calculando delta de rentabilidad en nicho AutoSocio...", category: 'ARBITRAGE' },
    { text: "Validando integridad de protocolo C1 en Nodo Alfa...", category: 'AUDIT' },
    { text: "Sintetizando vectores de intención de compra...", category: 'SYNTHESIS' },
    { text: "Prediciendo saturación de mercado en vertical Legal...", category: 'PREDICTION' },
    { text: "Optimizando pesos de persuasión JODA...", category: 'SYNTHESIS' },
    { text: "Escaneando ineficiencias en cadena de suministro global...", category: 'ARBITRAGE' },
    { text: "Detectando anomalías en flujo de datos forenses...", category: 'AUDIT' },
    { text: "Generando gemelo digital de infraestructura CX...", category: 'SYNTHESIS' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newThought: Thought = {
        id: Date.now(),
        text: thoughtPool[Math.floor(Math.random() * thoughtPool.length)].text,
        category: thoughtPool[Math.floor(Math.random() * thoughtPool.length)].category as any,
        intensity: Math.random() * 100,
      };
      setThoughts(prev => [newThought, ...prev].slice(0, 5));
      setEntropy(e => Math.min(100, Math.max(0, e + (Math.random() - 0.5) * 10)));
      setActiveCycle(c => c + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card bg-indigo-950/20 border border-indigo-500/30 rounded-[3rem] p-8 overflow-hidden relative group">
      {/* Background Brain Pulse */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-64 h-64 bg-indigo-500 rounded-full blur-[80px]"
        />
      </div>

      <div className="relative z-10 space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-white font-black uppercase tracking-widest text-[10px]">Núcleo Sintético Alfa-1</h3>
            <p className="text-indigo-400 text-[8px] font-bold uppercase tracking-[0.3em]">Procesamiento Autónomo Nivel 5</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-gray-500 text-[7px] uppercase font-black">Ciclo</p>
                <p className="text-white font-mono text-xs">{activeCycle.toString().padStart(6, '0')}</p>
             </div>
             <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center bg-white/5">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
             </div>
          </div>
        </header>

        {/* Entropy Visualizer */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest">Entropía Cognitiva</span>
            <span className="text-white font-mono text-xs">{entropy.toFixed(2)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${entropy}%` }}
              className={`h-full bg-gradient-to-r ${entropy > 80 ? 'from-red-500 to-orange-500' : 'from-indigo-500 to-emerald-500'}`}
            />
          </div>
        </div>

        {/* Neural Thought Stream */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-3 bg-indigo-500 rounded-full"></div>
            <span className="text-white text-[9px] font-black uppercase tracking-widest">Flujo de Pensamiento</span>
          </div>
          <div className="min-h-[160px] space-y-3">
            <AnimatePresence mode="popLayout">
              {thoughts.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-2 group/thought hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[7px] font-black uppercase tracking-widest ${categories[t.category].color}`}>
                      {categories[t.category].label}
                    </span>
                    <span className="text-gray-600 text-[6px] font-mono italic">conf: {(t.intensity / 100).toFixed(4)}</span>
                  </div>
                  <p className="text-gray-300 text-[10px] font-medium leading-tight">
                    {t.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Active Sub-Processes */}
        <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
           <div className="space-y-2">
             <p className="text-gray-500 text-[7px] uppercase font-black">Nodos Activos</p>
             <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-6 h-6 rounded-lg bg-indigo-600 border-2 border-[#020617] flex items-center justify-center text-[8px] font-bold text-white">
                   {String.fromCharCode(64 + i)}
                 </div>
               ))}
               <div className="w-6 h-6 rounded-lg bg-white/5 border-2 border-[#020617] flex items-center justify-center text-[8px] font-bold text-gray-500">
                 +12
               </div>
             </div>
           </div>
           <div className="space-y-2 text-right">
             <p className="text-gray-500 text-[7px] uppercase font-black">Latencia Global</p>
             <p className="text-emerald-400 font-mono text-xs">14ms</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SyntheticKernel;
