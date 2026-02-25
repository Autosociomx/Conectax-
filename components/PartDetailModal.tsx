
import React from 'react';
import type { EnrichedPartRecommendation, DiagnosticGuide, Language, Agent } from '../types';
import CloseIcon from './icons/CloseIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import WrenchIcon from './icons/WrenchIcon';
import LocationIcon from './icons/LocationIcon';
import { AUTOSOCIO_AGENTS } from '../constants';

interface PartDetailModalProps {
  result: EnrichedPartRecommendation;
  guide: DiagnosticGuide | null;
  userLanguage: Language;
  onClose: () => void;
  onContactSpecialist: (agent: Agent) => void;
}

const PartDetailModal: React.FC<PartDetailModalProps> = ({ result, guide, onClose, onContactSpecialist }) => {
  const { part, recommendation, viabilityScore } = result;

  // Find a suitable specialist based on part keywords or generic mechanical if not found
  const getSpecialist = () => {
    const lowerName = part.name.toLowerCase();
    if (lowerName.includes('electrónic') || lowerName.includes('ecu') || lowerName.includes('módulo')) return AUTOSOCIO_AGENTS.find(a => a.id === 103);
    if (lowerName.includes('sensor')) return AUTOSOCIO_AGENTS.find(a => a.id === 107);
    if (lowerName.includes('pintura') || lowerName.includes('hojalat')) return AUTOSOCIO_AGENTS.find(a => a.id === 102);
    if (lowerName.includes('híbrid') || lowerName.includes('eléctric')) return AUTOSOCIO_AGENTS.find(a => a.id === 104);
    if (lowerName.includes('performance') || lowerName.includes('turbo')) return AUTOSOCIO_AGENTS.find(a => a.id === 105);
    return AUTOSOCIO_AGENTS.find(a => a.id === 101); // Default to Mechanics
  };

  const specialist = getSpecialist() || AUTOSOCIO_AGENTS[0];

  return (
    <div className="fixed inset-0 z-[250] bg-gray-950/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in" onClick={onClose}>
      <div 
        className="max-w-4xl w-full bg-[#020617] border border-white/10 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="md:w-1/2 relative bg-black/40">
           <img 
            src={part.imageUrl || `https://placehold.co/800x1200/020617/0f172a?text=${encodeURIComponent(part.name)}`} 
            className="w-full h-full object-cover opacity-80"
            alt={part.name}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
           <button 
             onClick={onClose}
             className="absolute top-8 left-8 p-4 bg-black/40 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all backdrop-blur-md"
           >
             <CloseIcon />
           </button>
        </div>

        <div className="md:w-1/2 p-12 overflow-y-auto space-y-10 custom-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 rounded-full text-[8px] font-black uppercase tracking-widest">
                Expediente C1
              </span>
              <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full text-[8px] font-black uppercase tracking-widest">
                ID: {part.id.slice(-6)}
              </span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{part.name}</h2>
            <p className="text-2xl font-black text-cyan-500">${part.price.toLocaleString()} <span className="text-[10px] text-gray-600">MXN</span></p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                <SparklesIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Recomendación Técnica</h4>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed italic">"{recommendation}"</p>
          </div>

          {guide && (
            <div className="space-y-8 pt-8 border-t border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <LocationIcon className="w-5 h-5 text-gray-500" />
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Ubicación ADN</h4>
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed italic border-l border-cyan-500/30 pl-6">
                  {guide.locationDescription}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <WrenchIcon className="w-5 h-5 text-gray-500" />
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocolo Sugerido</h4>
                </div>
                <div className="space-y-3 pl-6">
                  {guide.diagnosticSteps.slice(0, 3).map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-cyan-500 font-black text-[10px]">{i+1}.</span>
                      <p className="text-xs text-gray-400 font-light italic leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-12 space-y-6">
            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-6">
              <img src={specialist.avatar} className="w-14 h-14 rounded-2xl border border-white/10 object-cover" alt={specialist.name} />
              <div>
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Mentor Asignado</p>
                <p className="text-[14px] font-black text-white uppercase tracking-tighter">{specialist.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                onClick={() => onContactSpecialist(specialist)}
                className="py-5 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
               >
                 Consultar Duda
               </button>
               <a 
                href={part.affiliateUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all active:scale-95 text-center"
               >
                 Adquirir
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartDetailModal;
