
import React, { useState, useMemo, useEffect } from 'react';
import type { FunnelPhase, PsychMetrics, Language, IntentObject, EconomicLayer } from '../types';
import { CONNECTX_AGENTS, getLabels, ECONOMIC_LAYERS, NICHES } from '../constants';
import { interpretUserIntent } from '../services/intentEngine';
import ChartIcon from './icons/ChartIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import SearchIcon from './icons/SearchIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import CameraIcon from './icons/CameraIcon';
import CogIcon from './icons/CogIcon';
import TrophyIcon from './icons/TrophyIcon';

interface ConnectXControlProps {
  currentPhase: FunnelPhase;
  metrics: PsychMetrics;
  onSelectNode: (nodeId: number) => void;
  userLanguage?: Language;
}

const ConnectXControl: React.FC<ConnectXControlProps> = ({ currentPhase, metrics, onSelectNode, userLanguage = 'es' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchLog, setSearchLog] = useState('');
  const [intentResult, setIntentResult] = useState<IntentObject | null>(null);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [neuralPulse, setNeuralPulse] = useState(0);
  const [captureMode, setCaptureMode] = useState<'audit' | 'sourcing' | 'strategy'>('audit');
  const [liveSignals, setLiveSignals] = useState<{ id: number, text: string }[]>([]);
  
  const labels = useMemo(() => getLabels(userLanguage as Language, 'connectx'), [userLanguage]);

  useEffect(() => {
    const signals = labels.signals || [];
    const interval = setInterval(() => {
      setLiveSignals(prev => {
        const newSignal = { id: Date.now(), text: signals[Math.floor(Math.random() * signals.length)] || "Sincronizando..." };
        return [newSignal, ...prev].slice(0, 3);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [labels.signals]);

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setNeuralPulse(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setIntentResult(null);
    
    const layerSteps = [
      { layer: 0, log: "Sincronizando Infraestructura Global..." },
      { layer: 1, log: "Validando Kernel Económico..." },
      { layer: 2, log: "Activando Motor de Orquestación..." },
      { layer: 3, log: "Consultando Módulos Productivos..." },
      { layer: 4, log: "Sintetizando Interfaz de Decisión..." }
    ];
    
    for (const step of layerSteps) {
      setActiveLayer(step.layer);
      setSearchLog(step.log);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    try {
      const result = await interpretUserIntent(searchQuery, userLanguage as Language);
      setIntentResult(result);
    } catch (error) {
      console.error("Error in orchestration:", error);
    } finally {
      setIsSearching(false);
      setActiveLayer(5);
    }
  };

  const selectedNiche = useMemo(() => 
    NICHES.find(n => n.id === intentResult?.niche_id)
  , [intentResult]);

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-20 animate-slide-up pb-40">
      {/* CAPAS DEL SISTEMA OPERATIVO ECONÓMICO */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {ECONOMIC_LAYERS.map((layer) => (
          <div 
            key={layer.level}
            className={`p-4 rounded-2xl border transition-all duration-500 ${
              activeLayer === layer.level 
                ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                : 'bg-white/5 border-white/10 opacity-40'
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Capa {layer.level}</span>
              <span className="text-[10px] font-black text-white uppercase tracking-tight leading-none">{layer.name}</span>
            </div>
          </div>
        ))}
      </section>

      {/* SECCIÓN ADN BÚSQUEDA CONNECTX */}
      <section className="glass-card border border-white/10 rounded-[4rem] p-10 md:p-16 shadow-[0_0_120px_rgba(79,70,229,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[130px] -z-10"></div>
        
        {/* Neural Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none transition-opacity duration-1000" style={{ opacity: isSearching ? 0.15 : 0.05 }}>
          <div className="grid grid-cols-10 md:grid-cols-20 h-full w-full">
            {Array.from({ length: 200 }).map((_, i) => (
              <div 
                key={i} 
                className="border-[0.5px] border-indigo-500/30 transition-colors duration-500"
                style={{ 
                  backgroundColor: isSearching && Math.random() > 0.95 ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-12 relative z-10">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Orquestador Económico Universal</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
                  Connect<span className="text-indigo-500">X</span> Infrastructure
                </h2>
                <p className="text-gray-400 font-light max-w-3xl mx-auto text-lg md:text-xl leading-relaxed px-4">
                  "Infraestructura de Activación Cognitiva para la monetización de intención y optimización de activos globales mediante validación técnica rigurosa."
                </p>
            </div>

            <div className="w-full max-w-4xl relative group px-4 space-y-6">
                {/* Live Signals */}
                <div className="flex justify-center gap-4 h-4 overflow-hidden">
                  {liveSignals.map(signal => (
                    <div key={signal.id} className="flex items-center gap-2 animate-slide-up">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                      <span className="text-[8px] text-indigo-400 font-black uppercase tracking-widest">{signal.text}</span>
                    </div>
                  ))}
                </div>

                {/* Smart Capture Modes */}
                <div className="flex justify-center gap-2 md:gap-4">
                  {[
                    { id: 'audit', label: 'Auditoría', icon: VerifiedIcon },
                    { id: 'sourcing', label: 'Sourcing', icon: SparklesIcon },
                    { id: 'strategy', label: 'Estrategia', icon: TrophyIcon }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setCaptureMode(mode.id as any)}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all ${
                        captureMode === mode.id 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <mode.icon className="w-3 h-3" />
                      {mode.label}
                    </button>
                  ))}
                </div>

                <div className="relative flex flex-col md:flex-row items-center bg-[#010208] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-2 md:p-4 focus-within:border-indigo-500 transition-all shadow-2xl ring-1 ring-white/5">
                    <div className="hidden md:flex pl-6 pr-4 text-gray-500"><SearchIcon className="w-7 h-7" /></div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder={labels.connectx.search_placeholder}
                      className="flex-grow bg-transparent border-none outline-none text-white text-base md:text-lg py-4 md:py-6 px-6 md:px-0 font-light placeholder-gray-800 w-full"
                    />
                    <div className="flex items-center gap-2 md:gap-3 px-4 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-none pt-2 md:pt-0">
                        <div className="flex gap-2">
                          <button className="p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl text-gray-500 hover:text-indigo-400 transition-all">
                              <MicrophoneIcon className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                          <button className="p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl text-gray-500 hover:text-indigo-400 transition-all">
                              <CameraIcon className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                        </div>
                        <button 
                          onClick={handleSearch}
                          disabled={isSearching}
                          className="px-6 md:px-10 py-3 md:py-5 bg-indigo-600 text-white rounded-xl md:rounded-[2rem] text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isSearching ? '...' : 'OPTIMIZAR'}
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex gap-4 justify-center">
                   <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Prueba: "Busco una casa en Zapopan con 3 recámaras" o "Frenos para Jetta 2013"</p>
                </div>
            </div>
        </div>

        {isSearching && (
           <div className="mt-20 animate-fade-in flex flex-col items-center space-y-10">
              <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[40px] rounded-full animate-pulse"></div>
                  <div className="relative z-10 w-full h-full border-2 border-indigo-500/40 rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent" style={{ transform: `translateY(${100 - neuralPulse}%)` }}></div>
                      <CogIcon className="w-14 h-14 text-indigo-400 animate-spin-slow" />
                  </div>
              </div>
              <div className="text-center space-y-4">
                <p className="text-indigo-400 font-mono text-sm uppercase tracking-[0.3em] h-6 italic">{searchLog}</p>
                <div className="w-80 h-1.5 bg-white/5 rounded-full overflow-hidden relative mx-auto">
                    <div className="absolute top-0 left-0 h-full bg-indigo-500 connectx-bar cognitive-bar shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                </div>
              </div>
           </div>
        )}

        {intentResult && !isSearching && (
            <div className="mt-20 space-y-16 animate-slide-up">
                <div className="flex items-center gap-4">
                    <div className="h-px bg-indigo-500/20 flex-grow"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="px-6 py-2 bg-indigo-600 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.6em]">DICTAMEN DE INTELIGENCIA ESTRATÉGICA</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Confianza del Sistema:</span>
                            <span className="text-[10px] text-indigo-400 font-black">{(intentResult.confidence_score * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                    <div className="h-px bg-indigo-500/20 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* TARJETA DE NICHO IDENTIFICADO */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-bezel border border-indigo-500/30 bg-indigo-500/5 rounded-[3.5rem] p-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-${selectedNiche?.color || 'indigo'}-600`}>
                                    <SparklesIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black uppercase text-2xl tracking-tighter">{selectedNiche?.name || 'Nicho Desconocido'}</h4>
                                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Módulo Productivo Activo</p>
                                </div>
                            </div>
                            <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
                              <p className="text-gray-400 text-sm italic font-light leading-relaxed">
                                "{intentResult.technical_need}"
                              </p>
                            </div>
                            <div className="space-y-4 pt-4">
                                {intentResult.extracted_data && Object.entries(intentResult.extracted_data).map(([key, value]) => value && (
                                    <div key={key} className="flex justify-between items-center py-3 border-b border-white/5">
                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{key}</span>
                                        <span className="text-white font-bold text-xs uppercase">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Audit Card */}
                        <div className="glass-bezel border border-white/10 bg-white/5 rounded-[3rem] p-8 space-y-6">
                            <div className="flex items-center gap-3">
                                <VerifiedIcon className="w-5 h-5 text-emerald-500" />
                                <h5 className="text-xs font-black text-white uppercase tracking-widest">Auditoría de Captura</h5>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] text-gray-500 font-black uppercase">Densidad de Datos</span>
                                    <span className="text-white font-mono text-[10px]">{(intentResult.technical_audit?.data_density || 0) * 100}%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${(intentResult.technical_audit?.data_density || 0) * 100}%` }}></div>
                                </div>
                                <p className="text-[10px] text-gray-400 italic leading-relaxed">
                                    "{intentResult.technical_audit?.integrity_check}"
                                </p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{intentResult.technical_audit?.validation_status}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ESTRATEGIA GENERADA POR IA */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="glass-bezel border border-indigo-500/20 rounded-[3.5rem] p-10 bg-indigo-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <TrophyIcon className="w-24 h-24 text-indigo-500" />
                            </div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-600 rounded-lg">
                                        <SparklesIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <h5 className="text-xl font-black text-white uppercase tracking-tighter">Estrategia de Resolución: {intentResult.strategy?.title}</h5>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Pasos Críticos de Ejecución</p>
                                        <ul className="space-y-3">
                                            {intentResult.strategy?.steps.map((step, i) => (
                                                <li key={i} className="flex items-start gap-3 text-xs text-gray-300 font-light">
                                                    <span className="text-indigo-500 font-black">0{i+1}</span>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex flex-col justify-center">
                                        <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-2">Impacto ROI Estimado</p>
                                        <p className="text-lg text-white font-black leading-tight">{intentResult.strategy?.roi_impact}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-bezel border border-white/5 rounded-[3.5rem] p-10 space-y-6 bg-black/40">
                                <div className="flex items-center gap-3">
                                    <ChartIcon className="text-indigo-400 w-6 h-6" />
                                    <h5 className="text-white font-black uppercase tracking-tighter">Valor Económico</h5>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-5xl font-black text-white tracking-tighter">${intentResult.economic_value.toLocaleString()}</span>
                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Oportunidad Estimada (USD)</span>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-gray-500">Probabilidad de Decisión</span>
                                        <span className="text-indigo-400">{(intentResult.decision_probability * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${intentResult.decision_probability * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-bezel border border-white/5 rounded-[3.5rem] p-10 space-y-6 bg-black/40">
                                <div className="flex items-center gap-3">
                                    <VerifiedIcon className="text-emerald-500 w-6 h-6" />
                                    <h5 className="text-white font-black uppercase tracking-tighter">Estado del Kernel</h5>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Reglas de Negocio Validadas</span>
                                    </div>
                                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-4">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Enrutamiento: {intentResult.recommended_vertical.toUpperCase()}</span>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Confianza: {(intentResult.confidence_score * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-8">
                    <button 
                      onClick={() => {
                        // In a real app, this would trigger a transaction or a deeper funnel phase
                        alert("PROTOCOL JODA ACTIVATED: Intent validated by C1. Redirecting to execution node...");
                        window.location.href = "#marketplace"; // Simple way to signal action
                      }}
                      className="px-16 py-6 bg-indigo-600 text-white rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-500 transition-all active:scale-95 group"
                    >
                        EJECUTAR ACCIÓN ECONÓMICA
                        <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                </div>
            </div>
        )}
      </section>

      {/* NODOS ESTRATÉGICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="flex flex-col space-y-4">
             <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Mando de <span className="text-indigo-500 italic">Nodos Alfa</span></h2>
             <p className="text-gray-500 text-lg font-light leading-relaxed italic">"Para importaciones de volumen o componentes críticos, sincronice con un Nodo de Sourcing para monetización técnica."</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {CONNECTX_AGENTS.map((node) => (
               <div 
                key={node.id} 
                onClick={() => onSelectNode(node.id)}
                className="group glass-bezel border border-white/5 rounded-[3.5rem] p-10 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col items-center text-center space-y-6 bg-black/40"
               >
                  <div className="relative">
                    <img src={node.avatar} className="w-24 h-24 rounded-3xl border-2 border-white/5 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl border-2 border-[#020617] shadow-xl">
                      <SparklesIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{node.name}</h5>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em]">{node.title}</p>
                  </div>
                  <p className="text-xs text-gray-500 font-light italic leading-relaxed">"{node.description}"</p>
                  <div className="pt-4 w-full">
                     <button className="w-full py-4 bg-white/5 text-gray-500 hover:text-white border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all">Iniciar Consulta Senior</button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
           <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 space-y-8 shadow-3xl flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                  <ChartIcon />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Arbitraje Global</h4>
                <p className="text-gray-400 text-sm leading-relaxed italic font-light">
                  "Utilice la infraestructura de ConnectX para importar componentes de alto margen directamente de fábricas auditadas."
                </p>
              </div>
              <div className="space-y-4 pt-10 relative z-10">
                 <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                    <VerifiedIcon className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Sourcing Protegido</span>
                 </div>
                 <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-4">
                    <SparklesIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Logística JDM/Global</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectXControl;
