
import React from 'react';
import { FOUNDATIONAL_LEVELS } from '../constants';
import type { FoundationalLevel } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import ChartIcon from './icons/ChartIcon';

const FoundationalRoadmap: React.FC = () => {
  return (
    <div className="space-y-20 pb-40 animate-slide-up">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
          <SparklesIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">Cimientos Empresariales Reales</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
          AUTOSOCIO <span className="text-cyan-500">DNA</span>
        </h1>
        <p className="text-gray-400 font-light max-w-3xl mx-auto text-xl leading-relaxed">
          "No es una app. Es un sistema de generación de decisiones económicas validadas."
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {FOUNDATIONAL_LEVELS.map((level: FoundationalLevel, index: number) => (
          <div 
            key={level.level}
            className={`relative group ${level.status === 'LOCKED' ? 'opacity-40 grayscale' : 'opacity-100'}`}
          >
            {/* Connection Line */}
            {index < FOUNDATIONAL_LEVELS.length - 1 && (
              <div className="absolute left-10 top-24 bottom-[-48px] w-px bg-gradient-to-b from-cyan-500/50 to-transparent z-0 hidden md:block"></div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
              {/* Level Indicator */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-black border-2 transition-all duration-500 ${
                  level.status === 'ACTIVE' 
                    ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_40px_rgba(6,182,212,0.4)]' 
                    : 'bg-white/5 border-white/10 text-gray-500'
                }`}>
                  {level.level}
                </div>
              </div>

              {/* Content Card */}
              <div className="md:col-span-11">
                <div className={`glass-card border rounded-[3rem] p-10 md:p-12 transition-all duration-500 ${
                  level.status === 'ACTIVE' 
                    ? 'border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_80px_rgba(6,182,212,0.1)]' 
                    : 'border-white/5 bg-white/2'
                }`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                          {level.name}
                        </h2>
                        <p className={`text-xs font-black uppercase tracking-[0.3em] ${level.status === 'ACTIVE' ? 'text-cyan-400' : 'text-gray-600'}`}>
                          {level.subtitle}
                        </p>
                      </div>
                      <p className="text-gray-400 text-lg font-light leading-relaxed italic">
                        "{level.description}"
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {level.checkpoints.map((cp, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <VerifiedIcon className={`w-4 h-4 ${level.status === 'ACTIVE' ? 'text-cyan-500' : 'text-gray-700'}`} />
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{cp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center gap-6">
                      {level.metrics.map((metric, i) => (
                        <div key={i} className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-2 group-hover:border-cyan-500/30 transition-all">
                          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{metric.label}</span>
                          <div className="text-4xl font-black text-white tracking-tighter">{metric.value}</div>
                        </div>
                      ))}
                      
                      {level.status === 'ACTIVE' && (
                        <button className="w-full py-6 bg-cyan-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-cyan-500 transition-all active:scale-95">
                          Ejecutar Nivel {level.level}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 24-Month Roadmap Section */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.4em]">HOJA DE RUTA REALISTA</h3>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Cronograma de <span className="text-cyan-500">24 Meses</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { period: 'Mes 0-3', desc: '20-50 optimizaciones manuales. Primeros ingresos.' },
            { period: 'Mes 3-6', desc: 'Proceso documentado. Red de talleres aliados.' },
            { period: 'Mes 6-12', desc: 'Base de datos estructurada. Panel interno.' },
            { period: 'Mes 12-18', desc: 'API de recomendación. Servicio para flotas.' },
            { period: 'Mes 18-24', desc: 'Modelo predictivo. Integración institucional.' },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 hover:border-cyan-500/30 transition-all">
              <span className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">{item.period}</span>
              <p className="text-xs text-gray-400 leading-relaxed font-light italic">"{item.desc}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Definition Section */}
      <section className="p-16 bg-white/5 border border-white/10 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-xs font-black text-cyan-500 uppercase tracking-[0.6em]">DEFINICIÓN ESTRATÉGICA</h3>
          <p className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight max-w-4xl mx-auto italic">
            "Autosocio es un sistema que detecta, ejecuta y monetiza la reducción de ineficiencias económicas en la operación de vehículos."
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Simple</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Medible</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Escalable</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoundationalRoadmap;
