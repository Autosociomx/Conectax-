
import React, { useState, useMemo } from 'react';
import { CXEngineService, CXEngineResult } from '../services/cxEngineService';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import CogIcon from './icons/CogIcon';
import SearchIcon from './icons/SearchIcon';
import { getLabels } from '../constants';
import type { UserProfile, Platform, Language } from '../types';

interface CXDashboardProps {
  user: UserProfile | null;
  currentPlatform: Platform;
}

const CXDashboard: React.FC<CXDashboardProps> = ({ user, currentPlatform }) => {
  const labels = useMemo(() => getLabels(user?.language || 'es', currentPlatform), [user?.language, currentPlatform]);
  const [activeTab, setActiveTab] = useState<'ANALYZER' | 'LEADS' | 'DATABASE' | 'ARCHITECTURE' | 'API_SPEC'>('ANALYZER');
  const [postText, setPostText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<'IDLE' | 'C1_RUNNING' | 'JODA_RUNNING' | 'COMPLETED'>('IDLE');
  const [analysis, setAnalysis] = useState<CXEngineResult | null>(null);
  const [leads, setLeads] = useState<any[]>([]);

  const apiEndpoints = [
    { method: "POST", path: "/v1/auth/login", service: "Auth", desc: "Autenticación de Partner" },
    { method: "POST", path: "/v1/leads/analyze", service: "Lead", desc: "Orquestación C1 + JODA" },
    { method: "GET", path: "/v1/leads", service: "Lead", desc: "Listado de oportunidades" },
    { method: "POST", path: "/v1/commissions/register", service: "Commission", desc: "Registro de venta" }
  ];

  const microservices = [
    { name: "Auth Service", desc: "Gestión de Partners y Planes", icon: <VerifiedIcon className="w-4 h-4" /> },
    { name: "Lead Service", desc: "Ciclo de vida de la oportunidad", icon: <SearchIcon className="w-4 h-4" /> },
    { name: "C1 Engine", desc: "IA: Extracción técnica y entidades", icon: <CogIcon className="w-4 h-4" />, highlight: true },
    { name: "JODA Engine", desc: "IA: Guiones y persuasión", icon: <SparklesIcon className="w-4 h-4" />, highlight: true },
    { name: "Risk Engine", desc: "Cálculo de probabilidad de devolución", icon: <VerifiedIcon className="w-4 h-4" /> },
    { name: "Commission", desc: "Tracking de ingresos y afiliados", icon: <SparklesIcon className="w-4 h-4" /> }
  ];

  const schemaTables = [
    { 
      name: "Partners", 
      fields: ["id (PK)", "email", "name", "niche_id (FK)", "plan", "affiliate_id_ml"],
      color: "bg-blue-500/20 border-blue-500/30"
    },
    { 
      name: "Leads", 
      fields: ["id (PK)", "partner_id (FK)", "original_text", "intent_score", "status", "c1_data (JSON)", "joda_data (JSON)"],
      color: "bg-indigo-500/20 border-indigo-500/30"
    },
    { 
      name: "Conversions", 
      fields: ["id (PK)", "lead_id (FK)", "partner_id (FK)", "amount", "commission", "status"],
      color: "bg-emerald-500/20 border-emerald-500/30"
    },
    { 
      name: "Niches", 
      fields: ["id (PK)", "name", "description", "is_active"],
      color: "bg-purple-500/20 border-purple-500/30"
    }
  ];

  const runCXEngine = async () => {
    if (!postText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep('C1_RUNNING');

    try {
      const cxService = new CXEngineService();
      
      // Step 1: Run C1
      const c1Result = await cxService.runC1Engine(postText);
      
      // Step 2: Transition to JODA
      setAnalysisStep('JODA_RUNNING');
      const jodaResult = await cxService.runJodaEngine(c1Result);
      
      const result = { c1: c1Result, joda: jodaResult };
      setAnalysis(result);
      setAnalysisStep('COMPLETED');
      
      // Lead Registration
      const newLead = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString(),
        vehicle: result.c1.vehicle_detected,
        piece: result.c1.piece_detected,
        risk: result.c1.risk_score,
        status: 'Validado'
      };
      setLeads(prev => [newLead, ...prev]);
    } catch (error) {
      console.error("CX Engine Error:", error);
      setAnalysisStep('IDLE');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 space-y-16 animate-slide-up pb-40 px-6">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">{labels.dashboard.tag}</span>
          </div>
          <h2 className="text-7xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
            {labels.dashboard.title}<span className="text-indigo-500">{labels.dashboard.subtitle}</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl font-medium leading-relaxed">
            {labels.dashboard.description}
          </p>
        </div>
        <div className="flex gap-6">
          <div className="px-10 py-6 glass-card rounded-[2.5rem] text-center min-w-[160px]">
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Leads Activos</p>
            <p className="text-4xl font-black text-white italic">{leads.length}</p>
          </div>
          <div className="px-10 py-6 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] text-center min-w-[160px] shadow-2xl shadow-indigo-500/10">
            <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest mb-2">Comisión Est.</p>
            <p className="text-4xl font-black text-indigo-400 italic">$0.00</p>
          </div>
        </div>
      </header>

      <div className="flex justify-start lg:justify-center gap-4 mb-12 overflow-x-auto no-scrollbar pb-4">
        {[
          { id: 'ANALYZER', label: 'Analizador CX', icon: <SearchIcon className="w-4 h-4" /> },
          { id: 'LEADS', label: 'Gestión de Leads', icon: <VerifiedIcon className="w-4 h-4" /> },
          { id: 'DATABASE', label: 'Estructura DB', icon: <CogIcon className="w-4 h-4" /> },
          { id: 'ARCHITECTURE', label: 'Arquitectura', icon: <SparklesIcon className="w-4 h-4" /> },
          { id: 'API_SPEC', label: 'API Spec', icon: <VerifiedIcon className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 scale-105' 
                : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'ANALYZER' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-10">
            <div className="glass-card p-12 rounded-[3.5rem] space-y-10 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-500">
                    <SearchIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-widest text-xs">
                    Analizador de Intención
                  </h3>
                </div>
                <textarea 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Pega aquí el texto de la publicación (ej: 'Busco bomba de gasolina para Versa 2014...')"
                  className="w-full h-64 bg-black/40 border border-white/10 rounded-[2.5rem] p-8 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                />
              </div>
              <button 
                onClick={runCXEngine}
                disabled={isAnalyzing || !postText.trim()}
                className="w-full py-6 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-[2.5rem] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-500/30 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    Ejecutar Motor CX
                    <CogIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Leads Table (Mini) */}
            <div className="glass-card p-10 rounded-[3.5rem] space-y-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Leads Recientes</h4>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {leads.length === 0 && (
                  <div className="py-10 text-center border border-dashed border-white/10 rounded-3xl">
                    <p className="text-gray-600 text-[10px] italic uppercase tracking-widest">Esperando Datos...</p>
                  </div>
                )}
                {leads.slice(0, 4).map(lead => (
                  <div key={lead.id} className="flex items-center justify-between p-5 bg-black/40 rounded-3xl border border-white/5 hover:border-white/20 transition-all group">
                    <div className="space-y-1">
                      <p className="text-white text-[11px] font-black uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{lead.vehicle}</p>
                      <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">{lead.piece}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${
                        lead.risk === 'Alto' ? 'bg-red-500/20 text-red-400' : 
                        lead.risk === 'Medio' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {lead.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2 space-y-10">
            {!analysis && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/5 rounded-[4rem] text-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                  <CogIcon className="w-10 h-10 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm">Motor CX en Standby</h4>
                  <p className="text-gray-500 text-xs mt-2 max-w-xs mx-auto">Ingresa una publicación para activar los motores de validación técnica y conversión estratégica.</p>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center p-20 space-y-10">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full transition-all duration-500 ${analysisStep === 'C1_RUNNING' ? 'bg-indigo-500 scale-100' : 'bg-emerald-500 scale-110'}`}>
                      {analysisStep === 'C1_RUNNING' ? (
                        <CogIcon className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
                      ) : (
                        <SparklesIcon className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-8">
                    <div className={`flex flex-col items-center gap-2 transition-opacity ${analysisStep === 'C1_RUNNING' ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${analysisStep === 'C1_RUNNING' ? 'bg-indigo-600' : 'bg-white/10'}`}>
                        <CogIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-white">Motor C1</span>
                    </div>
                    
                    <div className="w-12 h-px bg-white/10 relative">
                      {analysisStep === 'JODA_RUNNING' && <div className="absolute inset-0 bg-indigo-500 animate-pulse"></div>}
                    </div>

                    <div className={`flex flex-col items-center gap-2 transition-opacity ${analysisStep === 'JODA_RUNNING' ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${analysisStep === 'JODA_RUNNING' ? 'bg-emerald-600' : 'bg-white/10'}`}>
                        <SparklesIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-white">Motor JODA</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-xs">
                      {analysisStep === 'C1_RUNNING' ? 'Validación Técnica en Curso' : 'Generando Conversión Estratégica'}
                    </p>
                    <p className="text-gray-600 text-[8px] uppercase tracking-widest">
                      {analysisStep === 'C1_RUNNING' 
                        ? 'Extrayendo entidades y evaluando riesgo de devolución...' 
                        : 'Construyendo guiones basados en el análisis técnico de C1...'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {analysis && (
              <div className="space-y-10 animate-slide-up">
                {/* C1 Technical Output */}
                <div className="glass-card p-10 bg-indigo-500/5 border border-indigo-500/20 rounded-[3.5rem] space-y-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <VerifiedIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Motor C1 <span className="text-indigo-400">Technical</span></h3>
                        <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Validación de Entidades y Riesgo</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest block mb-1">Score de Riesgo</span>
                      <span className={`text-xl font-black ${
                        analysis.c1.risk_score === 'Alto' ? 'text-red-500' : 
                        analysis.c1.risk_score === 'Medio' ? 'text-amber-500' : 
                        'text-emerald-500'
                      }`}>
                        {analysis.c1.risk_score.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Vehículo Detectado</label>
                      <p className="text-white text-lg font-bold">{analysis.c1.vehicle_detected}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Pieza / Nicho</label>
                      <p className="text-white text-lg font-bold">{analysis.c1.piece_detected}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Nivel Intención</label>
                      <p className="text-white text-lg font-bold">{analysis.c1.intent_level}</p>
                    </div>
                  </div>

                  <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                    <h5 className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Checklist de Validación Obligatoria</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.c1.required_validation_fields.map((field, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-4 h-4 border border-white/20 rounded-md flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-300 text-xs">{field}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* JODA Conversational Output */}
                <div className="glass-card p-10 bg-white/5 border border-white/10 rounded-[3.5rem] space-y-10">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Motor JODA <span className="text-emerald-500">Activation</span></h3>
                      <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Estrategia de Conversión y Cierre</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[8px] text-emerald-500 font-black uppercase tracking-widest">Respuesta Pública (Facebook)</label>
                        <button 
                          onClick={() => navigator.clipboard.writeText(analysis.joda.public_reply)}
                          className="text-[8px] text-gray-500 hover:text-white uppercase font-black"
                        >
                          Copiar
                        </button>
                      </div>
                      <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl italic text-white text-sm">
                        "{analysis.joda.public_reply}"
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Flujo Privado Estructurado</label>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                          <span className="text-[8px] text-indigo-400 font-black uppercase">Paso 1: Autoridad</span>
                          <p className="text-gray-300 text-xs italic">"{analysis.joda.private_flow.step_1}"</p>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                          <span className="text-[8px] text-indigo-400 font-black uppercase">Paso 2: Diagnóstico</span>
                          <p className="text-gray-300 text-xs italic">"{analysis.joda.private_flow.step_2}"</p>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                          <span className="text-[8px] text-indigo-400 font-black uppercase">Paso 3: Oferta</span>
                          <p className="text-gray-300 text-xs italic">"{analysis.joda.private_flow.step_3}"</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                      <div className="space-y-2">
                        <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Estrategia Psicológica</label>
                        <p className="text-gray-400 text-[10px] leading-relaxed">{analysis.joda.psychological_strategy}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Secuencia de Seguimiento</label>
                        <p className="text-gray-400 text-[10px] leading-relaxed">{analysis.joda.follow_up_sequence}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'LEADS' && (
        <div className="glass-card p-10 bg-black/40 border border-white/10 rounded-[3rem] animate-slide-up">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Gestión de <span className="text-indigo-500">Leads</span></h3>
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{leads.length} Registros</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                  <th className="pb-4 px-4">ID Lead</th>
                  <th className="pb-4 px-4">Fecha</th>
                  <th className="pb-4 px-4">Vehículo</th>
                  <th className="pb-4 px-4">Pieza</th>
                  <th className="pb-4 px-4">Riesgo</th>
                  <th className="pb-4 px-4">Estado</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {leads.map(lead => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4 font-mono text-indigo-400">{lead.id}</td>
                    <td className="py-6 px-4 text-gray-400">{lead.date}</td>
                    <td className="py-6 px-4 text-white font-bold">{lead.vehicle}</td>
                    <td className="py-6 px-4 text-gray-300">{lead.piece}</td>
                    <td className="py-6 px-4">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                        lead.risk === 'Alto' ? 'bg-red-500/20 text-red-400' : 
                        lead.risk === 'Medio' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {lead.risk}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{lead.status}</span>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-20 text-center text-gray-600 italic">No hay leads procesados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'DATABASE' && (
        <div className="space-y-12 animate-slide-up">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Esquema Relacional <span className="text-indigo-500">CX</span></h3>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">Arquitectura de datos diseñada para escalabilidad multinicho y tracking de comisiones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schemaTables.map((table, i) => (
              <div key={i} className={`p-8 rounded-[2.5rem] border ${table.color} space-y-6 shadow-xl`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h4 className="text-white font-black uppercase tracking-widest text-xs">{table.name}</h4>
                  <CogIcon className="w-4 h-4 text-white/20" />
                </div>
                <ul className="space-y-3">
                  {table.fields.map((field, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                      <span className="text-gray-300 text-[10px] font-mono">{field}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Lógica de Relaciones Estratégicas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Partner → Leads (1:N)</p>
                <p className="text-gray-400 text-xs italic">Un partner gestiona múltiples oportunidades de venta.</p>
              </div>
              <div className="space-y-2">
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Lead → Conversion (1:1)</p>
                <p className="text-gray-400 text-xs italic">Cada oportunidad exitosa genera una transacción única de comisión.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ARCHITECTURE' && (
        <div className="space-y-12 animate-slide-up">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Topología de <span className="text-indigo-500">Microservicios</span></h3>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">Arquitectura desacoplada diseñada para alta disponibilidad y escalabilidad independiente de motores de IA.</p>
          </div>

          <div className="relative p-12 bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-indigo-500/50 via-white/5 to-transparent hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-8">
                <div className="p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-500/20 text-center">
                  <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-1">Entry Point</p>
                  <h4 className="text-white font-black uppercase tracking-tighter text-xl italic">API Gateway</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {microservices.slice(0, 3).map((svc, i) => (
                    <div key={i} className={`p-6 rounded-2xl border ${svc.highlight ? 'bg-indigo-500/20 border-indigo-500/40' : 'bg-black/40 border-white/10'} flex items-center gap-4 transition-all hover:scale-[1.02]`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${svc.highlight ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                        {svc.icon}
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm">{svc.name}</h5>
                        <p className="text-gray-500 text-[10px]">{svc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Data Persistence</p>
                  <h4 className="text-white font-black uppercase tracking-tighter text-xl italic">Database Cluster</h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {microservices.slice(3).map((svc, i) => (
                    <div key={i} className={`p-6 rounded-2xl border ${svc.highlight ? 'bg-indigo-500/20 border-indigo-500/40' : 'bg-black/40 border-white/10'} flex items-center gap-4 transition-all hover:scale-[1.02]`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${svc.highlight ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                        {svc.icon}
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm">{svc.name}</h5>
                        <p className="text-gray-500 text-[10px]">{svc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
              <h5 className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">Stack Backend</h5>
              <p className="text-gray-400 text-xs italic leading-relaxed">NestJS para microservicios estructurados, Docker para contenedores y Kubernetes para orquestación en producción.</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
              <h5 className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">IA Orchestration</h5>
              <p className="text-gray-400 text-xs italic leading-relaxed">Uso de Gemini 1.5 Flash para análisis rápido (C1) y Gemini 1.5 Pro para generación creativa de guiones (JODA).</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
              <h5 className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">Escalabilidad</h5>
              <p className="text-gray-400 text-xs italic leading-relaxed">Capacidad de añadir nuevos nichos simplemente desplegando nuevas instancias del Compatibility Service.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'API_SPEC' && (
        <div className="space-y-12 animate-slide-up">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Especificación de <span className="text-indigo-500">API v1.0</span></h3>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">Contratos de comunicación REST para la integración de servicios y aplicaciones de terceros.</p>
          </div>

          <div className="glass-card p-10 bg-black/40 border border-white/10 rounded-[3rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    <th className="pb-6 px-4">Método</th>
                    <th className="pb-6 px-4">Endpoint</th>
                    <th className="pb-6 px-4">Servicio</th>
                    <th className="pb-6 px-4">Descripción</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {apiEndpoints.map((api, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-6 px-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${
                          api.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {api.method}
                        </span>
                      </td>
                      <td className="py-6 px-4 font-mono text-indigo-400 group-hover:text-white transition-colors">{api.path}</td>
                      <td className="py-6 px-4 text-gray-400 font-bold">{api.service}</td>
                      <td className="py-6 px-4 text-gray-500 italic">{api.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Headers Globales</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-indigo-400 font-mono text-[10px]">Content-Type</span>
                  <span className="text-gray-500 text-[10px]">application/json</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-indigo-400 font-mono text-[10px]">Authorization</span>
                  <span className="text-gray-500 text-[10px]">Bearer &lt;JWT_TOKEN&gt;</span>
                </div>
              </div>
            </div>
            <div className="p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Manejo de Errores</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-[10px]">401</span>
                  <span className="text-gray-400 text-[10px]">Unauthorized - Token inválido</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-[10px]">403</span>
                  <span className="text-gray-400 text-[10px]">Forbidden - Plan insuficiente</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-[10px]">422</span>
                  <span className="text-gray-400 text-[10px]">Unprocessable - Error de IA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CXDashboard;
