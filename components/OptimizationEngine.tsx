
import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import ChartIcon from './icons/ChartIcon';
import CogIcon from './icons/CogIcon';

const OptimizationEngine: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const nextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsProcessing(false);
    }, 1500);
  };

  const STEPS = [
    { id: 1, name: 'Captura de Datos', icon: <CogIcon />, desc: 'Sincronización de VIN, kilometraje y perfiles de uso.' },
    { id: 2, name: 'Auditoría de Costos', icon: <ChartIcon />, desc: 'Análisis forense de gastos históricos y mantenimiento.' },
    { id: 3, name: 'Identificación de Ineficiencias', icon: <SparklesIcon />, desc: 'Detección de fugas económicas y sobreprecios.' },
    { id: 4, name: 'Comparación de Mercado', icon: <VerifiedIcon />, desc: 'Benchmarking contra estándares OEM y precios locales.' },
    { id: 5, name: 'Plan de Optimización', icon: <ChartIcon />, desc: 'Generación de protocolo de reducción de gasto.' },
    { id: 6, name: 'Ejecución del Cambio', icon: <CogIcon />, desc: 'Sincronización con nodos de sourcing y talleres.' },
    { id: 7, name: 'Medición del Ahorro', icon: <VerifiedIcon />, desc: 'Validación final del impacto económico generado.' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-16 animate-slide-up">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">
          Línea de <span className="text-cyan-500">Producción Económica</span>
        </h2>
        <p className="text-gray-500 text-lg font-light italic">"Protocolo de optimización replicable para cualquier activo móvil."</p>
      </header>

      {/* Progress Bar */}
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-cyan-600 transition-all duration-1000 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          style={{ width: `${(step / STEPS.length) * 100}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Steps Sidebar */}
        <div className="md:col-span-4 space-y-4">
          {STEPS.map((s) => (
            <div 
              key={s.id}
              className={`p-6 rounded-2xl border transition-all duration-500 flex items-center gap-4 ${
                step === s.id 
                  ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg' 
                  : step > s.id 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 opacity-60'
                    : 'bg-white/5 border-white/10 text-gray-600 opacity-40'
              }`}
            >
              <div className="text-xs font-black font-mono">0{s.id}</div>
              <div className="text-[10px] font-black uppercase tracking-widest">{s.name}</div>
              {step > s.id && <VerifiedIcon className="w-4 h-4 ml-auto" />}
            </div>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="md:col-span-8">
          <div className="glass-card border border-white/10 rounded-[3rem] p-12 h-full flex flex-col justify-between space-y-12 relative overflow-hidden">
             {isProcessing && (
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-6">
                  <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                  <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.4em] animate-pulse">Procesando Nivel Operativo...</p>
               </div>
             )}

             <div className="space-y-8">
                <div className="w-20 h-20 bg-cyan-600/20 rounded-3xl flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                  {STEPS[step-1].icon}
                </div>
                <div className="space-y-4">
                   <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                     {STEPS[step-1].name}
                   </h3>
                   <p className="text-gray-400 text-xl font-light italic leading-relaxed">
                     "{STEPS[step-1].desc}"
                   </p>
                </div>
             </div>

             <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Estado del Protocolo</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-white uppercase tracking-tight">Validando ADN Económico</span>
                  </div>
                </div>

                {step < STEPS.length ? (
                  <button 
                    onClick={nextStep}
                    className="px-12 py-5 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-cyan-500 transition-all active:scale-95"
                  >
                    Siguiente Fase
                  </button>
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Optimización Completada</span>
                    <div className="text-3xl font-black text-white">$540.00 Ahorrados</div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationEngine;
