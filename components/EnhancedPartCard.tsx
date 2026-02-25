
import React from 'react';
import { REGIONAL_PLATFORMS } from '../constants';
import type { EnrichedPartRecommendation, Language } from '../types';
import VerifiedIcon from './icons/VerifiedIcon';
import StarIcon from './icons/StarIcon';
import SparklesIcon from './icons/SparklesIcon';

interface EnhancedPartCardProps {
  result: EnrichedPartRecommendation;
  vehicleContext: {
    make: string;
    model: string;
    year: string;
    engine: string;
    transmission: string;
    part: string;
  };
  userLanguage?: Language;
  onViewDetails: (result: EnrichedPartRecommendation) => void;
}

const ViabilityScoreBar: React.FC<{ score: number }> = ({ score }) => {
    const percentage = score * 10;
    const color = score >= 9 ? 'bg-cyan-500' : score >= 7 ? 'bg-emerald-500' : score >= 5 ? 'bg-amber-500' : 'bg-rose-500';
    return (
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className={`${color} h-full transition-all duration-1000 ease-out shadow-[0_0_15px_currentColor]`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const EnhancedPartCard: React.FC<EnhancedPartCardProps> = ({ result, vehicleContext, userLanguage = 'es', onViewDetails }) => {
  const { part, recommendation, viabilityScore, isMostRecommended } = result;
  
  const queryADN = `${vehicleContext.make} ${vehicleContext.model} ${vehicleContext.year} ${vehicleContext.engine} ${part.name}`;
  const encodedQuery = encodeURIComponent(queryADN);

  const displayImage = part.imageUrl || `https://placehold.co/600x400/020617/0f172a?text=${encodeURIComponent(part.name)}`;

  const platforms = REGIONAL_PLATFORMS[userLanguage] || REGIONAL_PLATFORMS['es'];
  const sourcePlatform = platforms.find(p => p.name === part.platform) || platforms[0];

  return (
    <div className={`glass-card border rounded-[3.5rem] flex flex-col h-full transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_50px_100px_rgba(0,0,0,0.8)] ${isMostRecommended ? 'border-cyan-500/50 ring-1 ring-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.2)]' : 'border-white/5'}`}>
        <div className="relative overflow-hidden rounded-t-[3.5rem] aspect-[16/10]">
             <img className="h-full w-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" src={displayImage} alt={part.name} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
             
             <div className="absolute top-8 left-8 flex flex-col gap-3">
                <div className="bg-indigo-600 text-white text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] shadow-2xl flex items-center gap-2">
                  <StarIcon className="w-3 h-3 text-amber-400" /> VALIDADO ACADEMIA C1
                </div>
                {isMostRecommended && (
                    <div className="bg-cyan-600 text-white text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] shadow-2xl animate-pulse flex items-center gap-2">
                      <SparklesIcon className="w-3 h-3" /> AUDITORÍA ÉLITE
                    </div>
                )}
             </div>

            <div className="absolute bottom-8 left-10">
                <p className="text-white font-black text-3xl tracking-tighter">
                  ${part.price.toLocaleString()} <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest ml-1">MXN</span>
                </p>
            </div>
        </div>
     
      <div className="p-12 flex flex-col flex-grow space-y-10">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-2">{part.name}</h3>
          <div className="flex flex-wrap gap-2 opacity-60">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{vehicleContext.make} {vehicleContext.model} &bull; {sourcePlatform.name}</span>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 relative group min-h-[110px]">
             <div className="flex items-center gap-3 mb-4">
                <VerifiedIcon className="w-4 h-4 text-cyan-400" />
                <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-black italic">Dictamen Forense</p>
             </div>
             <p className="text-[13px] text-gray-300 leading-relaxed font-light italic">"{recommendation}"</p>
        </div>

        <div className="mt-auto space-y-10">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Viabilidad del Activo</p>
                    <p className="text-lg font-black text-white">{viabilityScore}/10</p>
                </div>
                <ViabilityScoreBar score={viabilityScore} />
            </div>

            <div className="grid grid-cols-1 gap-4 pt-8 border-t border-white/5">
                <button 
                  onClick={() => onViewDetails(result)}
                  className="w-full flex justify-center items-center py-4 bg-white/5 border border-white/10 text-[10px] font-black rounded-2xl hover:bg-white/10 text-white transition-all uppercase tracking-[0.3em] active:scale-95"
                >
                  Detalles Técnicos
                </button>
                <a 
                  href={`${sourcePlatform.baseUrl}${encodedQuery}${sourcePlatform.searchParam}`} 
                  target="_blank" rel="noopener noreferrer" 
                  className={`w-full flex justify-between items-center px-8 py-5 ${sourcePlatform.color} text-[11px] font-black rounded-2xl hover:opacity-95 transition-all uppercase tracking-[0.3em] shadow-2xl active:scale-95`}
                >
                  <span>ADQUIRIR PIEZA</span>
                  <span className="text-2xl">→</span>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPartCard;
