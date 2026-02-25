
import React, { useEffect, useState } from 'react';
import type { IntentObject } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import VerifiedIcon from './icons/VerifiedIcon';

interface NeuralIntentVisualizerProps {
  intent?: IntentObject;
  isProcessing: boolean;
}

const NeuralIntentVisualizer: React.FC<NeuralIntentVisualizerProps> = ({ intent, isProcessing }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    { id: 1, name: 'Ingesta Multimodal', icon: '📥' },
    { id: 2, name: 'Parseo Semántico', icon: '🧬' },
    { id: 3, name: 'Inferencia Cognitiva', icon: '🧠' },
    { id: 4, name: 'Clasificador Multinicho', icon: '🏢' },
    { id: 5, name: 'Scoring de Valor', icon: '💰' },
    { id: 6, name: 'Enrutador Estratégico', icon: '⚡' }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setActiveLayer(prev => (prev + 1) % layers.length);
      }, 800);
      return () => clearInterval(interval);
    } else {
      setActiveLayer(-1);
    }
  }, [isProcessing]);

  if (!isProcessing && !intent) return null;

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up mt-8">
      <div className="bg-[#020617] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Visualización del Cerebro */}
          <div className="relative w-48 h-48 flex-shrink-0">
             <div className={`absolute inset-0 bg-cyan-500/20 blur-[40px] rounded-full ${isProcessing ? 'neural-core' : 'opacity-20'}`}></div>
             <div className={`relative z-10 w-full h-full border-2 ${isProcessing ? 'border-cyan-400' : 'border-white/10'} rounded-[3rem] flex items-center justify-center transition-colors duration-1000`}>
                {isProcessing ? (
                  <SparklesIcon className="w-16 h-16 text-cyan-400 animate-pulse" />
                ) : (
                  <VerifiedIcon className="w-16 h-16 text-emerald-500" />
                )}
             </div>
          </div>

          <div className="flex-grow space-y-8">
            <div className="flex justify-between items-end">
               <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    {isProcessing ? 'Procesamiento Neuronal MCI' : 'INTENT_OBJECT Generado'}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-2">Capas de Inteligencia AutoSocio</p>
               </div>
               {intent && !isProcessing && (
                 <div className="text-right">
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full">Score: {intent.confidence_score}</span>
                 </div>
               )}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {layers.map((layer, idx) => (
                <div key={layer.id} className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ${activeLayer === idx ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 scale-110' : (intent && !isProcessing ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-700')}`}>
                    {layer.icon}
                  </div>
                  <span className={`text-[7px] font-black uppercase tracking-widest text-center leading-tight ${activeLayer === idx ? 'text-cyan-400' : 'text-gray-600'}`}>
                    {layer.name}
                  </span>
                </div>
              ))}
            </div>

            {intent && !isProcessing && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5 animate-fade-in">
                 <MetricBox label="Urgencia" value={`${Math.round(intent.urgency_level * 100)}%`} color="text-rose-500" />
                 <MetricBox label="Valor Est." value={`$${intent.economic_value}`} color="text-emerald-400" />
                 <MetricBox label="Prob. Compra" value={`${Math.round(intent.decision_probability * 100)}%`} color="text-cyan-400" />
                 <MetricBox label="Vertical" value={intent.recommended_vertical.toUpperCase()} color="text-indigo-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-sm font-black uppercase tracking-tighter ${color}`}>{value}</p>
  </div>
);

export default NeuralIntentVisualizer;
