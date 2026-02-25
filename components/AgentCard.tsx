
import React, { useMemo } from 'react';
import type { Agent, Language } from '../types';
import StarIcon from './icons/StarIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import { getLabels } from '../constants';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  language?: Language;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, language = 'es' }) => {
  const labels = useMemo(() => getLabels(language as Language), [language]);
  
  const getStatusColor = (status: string) => {
    if (status === 'Cero Errores') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (status === 'Maestro del Mes') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
  };

  return (
    <div
      className="group glass-card rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-indigo-500/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col relative"
      onClick={() => onSelect(agent)}
    >
      <div className={`absolute top-6 right-6 z-10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(agent.reputation.status)} backdrop-blur-xl`}>
        {agent.reputation.status}
      </div>

      <div className="p-12 flex flex-col items-center text-center">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          <img 
            src={agent.avatar} 
            className="relative w-36 h-36 rounded-[2.5rem] border border-white/10 shadow-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
          />
          <div className="absolute -bottom-3 -right-3 bg-indigo-600 p-2.5 rounded-2xl border-4 border-[#020617] shadow-2xl group-hover:rotate-12 transition-transform">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <h3 className="text-3xl font-heading font-black text-white uppercase tracking-tighter group-hover:text-indigo-400 transition-colors leading-none italic">{agent.name}</h3>
          <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">{agent.title}</p>
        </div>

        <div className="flex items-center gap-5 bg-black/40 px-6 py-2.5 rounded-2xl border border-white/5 mb-10">
          <div className="flex items-center gap-2 text-indigo-400">
            <StarIcon className="w-4 h-4" />
            <span className="text-sm font-black text-white">{agent.reputation.rating}</span>
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">ROI Validado</span>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed italic opacity-70 group-hover:opacity-100 transition-opacity line-clamp-3 px-4 font-medium mb-8">
          "{agent.description}"
        </p>

        {agent.testimonial && (
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 mb-10 text-left relative overflow-hidden group-hover:border-indigo-500/20 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
            <p className="text-[11px] text-gray-300 italic leading-relaxed mb-3">
              "{agent.testimonial.text}"
            </p>
            <p className="text-[9px] text-indigo-500 font-black uppercase tracking-widest">
              — {agent.testimonial.author}
            </p>
          </div>
        )}
      </div>

      <div className="px-12 pb-12 mt-auto">
        <button className="w-full bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.4em] py-6 rounded-2xl transition-all shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 active:scale-[0.96]">
          {labels.agent_card.btn_start}
        </button>
        <p className="mt-5 text-[8px] text-gray-600 font-black uppercase tracking-[0.4em] text-center">{labels.agent_card.protocol}</p>
      </div>
    </div>
  );
};

export default AgentCard;
