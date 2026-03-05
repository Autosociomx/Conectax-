
import React from 'react';
import type { MysteryShopReport, Language } from '../types';
import { motion } from 'motion/react';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import ChartIcon from './icons/ChartIcon';
import CloseIcon from './icons/CloseIcon';

interface MysteryShopReportViewProps {
  report: MysteryShopReport;
  language: Language;
  onClose: () => void;
}

const MysteryShopReportView: React.FC<MysteryShopReportViewProps> = ({ report, language, onClose }) => {
  return (
    <div className="space-y-12 animate-slide-up pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <VerifiedIcon className="w-4 h-4 text-indigo-500" />
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Auditoría Forense de Navegación</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
            Mystery <span className="text-indigo-500">Shop</span> Report
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl">
            Análisis profundo de la infraestructura de navegación y experiencia de usuario en AutoSocio.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <div className="p-8 bg-indigo-600/20 border border-indigo-500/30 rounded-[3rem] flex flex-col items-center justify-center min-w-[200px]">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Score de Salud</span>
            <span className="text-6xl font-black text-white">{report.overallScore}%</span>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
              <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${report.overallScore}%` }}></div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
          >
            Regresar al Dashboard
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Hallazgos Críticos</h2>
            <div className="h-px bg-white/5 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {report.findings.map((finding) => (
              <motion.div 
                key={finding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        finding.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                        finding.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                        'bg-cyan-500/20 text-cyan-500'
                      }`}>
                        {finding.severity}
                      </span>
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{finding.category}</span>
                      <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Localización: {finding.location}</span>
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight">{finding.description}</h3>
                    <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2 italic">Optimización Sugerida:</p>
                      <p className="text-sm text-gray-400 leading-relaxed italic">"{finding.suggestedFix}"</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-500 transition-all active:scale-95">
                      Aplicar Fix
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-10 rounded-[3.5rem] border border-white/5 bg-indigo-500/5 space-y-8">
            <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <ChartIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Resumen Ejecutivo</h3>
            <p className="text-gray-400 text-sm leading-relaxed italic font-light">
              "{report.summary}"
            </p>
            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Última Auditoría</span>
                <span className="text-[10px] text-white font-black">{new Date(report.lastAudit).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Hallazgos Totales</span>
                <span className="text-[10px] text-white font-black">{report.findings.length}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3.5rem] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-indigo-400" />
              <h4 className="text-lg font-black text-white uppercase tracking-tighter">Siguiente Paso</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              La infraestructura de AutoSocio requiere una sincronización de nodos para aplicar las optimizaciones de navegación detectadas.
            </p>
            <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
              Sincronizar Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MysteryShopReportView;
