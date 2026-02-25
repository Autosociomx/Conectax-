
import React, { useState } from 'react';
import ChartIcon from './icons/ChartIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import { GoogleGenAI, Type } from "@google/genai";
import type { AuditResult } from '../types';

const AdminControlHub: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [pitchMode, setPitchMode] = useState(false);

  const runMysteryShopperAudit = async () => {
    setIsAuditing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Auditoría de plataforma AutoSocio: Fricción vs Escalabilidad.",
        config: {
          systemInstruction: "Evalúa como VC experto la viabilidad del MVP de AutoSocio.",
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              findings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    description: { type: Type.STRING },
                    fixAction: { type: Type.STRING }
                  }
                }
              },
              summary: { type: Type.STRING },
              commercialViability: { type: Type.STRING }
            }
          }
        }
      });
      setAuditResult(JSON.parse(response.text || '{}'));
    } catch (e) {} finally { setIsAuditing(false); }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-16 animate-slide-up pb-40">
      <header className="flex flex-col md:flex-row justify-between items-center gap-10 border-b border-white/5 pb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em]">Mando de Inversión Seed</span>
          </div>
          <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">Elevator <span className="text-indigo-500 italic">Pitch</span></h2>
        </div>
        <button 
          onClick={() => setPitchMode(!pitchMode)}
          className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${pitchMode ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl' : 'bg-white/5 border-white/10 text-gray-400'}`}
        >
          {pitchMode ? 'Ver Panel Control' : 'Activar Pitch Mode'}
        </button>
      </header>

      {pitchMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
           <PitchSlide title="El Problema" desc="Los talleres pierden el 30% de sus ingresos por diagnósticos fallidos y refacciones erróneas." icon="⚠️" />
           <PitchSlide title="La Solución" desc="Capa de IA Forense que valida el ADN de cada pieza antes de la compra." icon="🧬" />
           <PitchSlide title="Tracción" desc="Protocolo C1 ya validado por una red de 10 especialistas senior en tiempo real." icon="📈" />
           <PitchSlide title="Tecnología" desc="Uso nativo de Function Calling para interactuar con bases de datos OEM en vivo." icon="💻" />
           <PitchSlide title="Modelo de Negocio" desc="Comisión por arbitraje en Connecta X + SaaS para gestión de flotas." icon="💰" />
           <PitchSlide title="Scalability" desc="Expansión global automatizada mediante el motor de sourcing multi-idioma." icon="🌍" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 bg-[#020617] border border-white/10 rounded-[4rem] p-12 space-y-10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[120px] -z-10"></div>
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Auditoría UX Forense</h3>
              <button 
                onClick={runMysteryShopperAudit}
                disabled={isAuditing}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isAuditing ? 'Analizando...' : 'Mystery Shopper VC'}
              </button>
            </div>
            {auditResult && (
              <div className="space-y-8 animate-fade-in">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                  <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-4">Dictamen de Viabilidad</p>
                  <p className="text-gray-300 italic font-light">"{auditResult.summary}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {auditResult.findings?.map((f: any, i: number) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-black text-indigo-500 uppercase">{f.type}</span>
                        <span className="text-[8px] text-gray-600 uppercase">Gravedad: {f.severity}</span>
                      </div>
                      <p className="text-xs text-white font-bold">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl border border-white/10">
               <h4 className="font-black text-xs uppercase tracking-widest mb-4">Capitalización Seed</h4>
               <p className="text-4xl font-black tracking-tighter">$1.2M <span className="text-xs font-light">Target Goal</span></p>
               <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Estado: Raising Series A</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PitchSlide: React.FC<{ title: string, desc: string, icon: string }> = ({ title, desc, icon }) => (
  <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] space-y-6 hover:border-indigo-500/50 transition-all group">
    <div className="text-4xl group-hover:scale-110 transition-transform inline-block">{icon}</div>
    <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{title}</h4>
    <p className="text-gray-400 text-sm font-light leading-relaxed italic">"{desc}"</p>
  </div>
);

export default AdminControlHub;
