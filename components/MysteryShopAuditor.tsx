
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';
import ChatbotIcon from './icons/ChatbotIcon';
import CloseIcon from './icons/CloseIcon';
import SparklesIcon from './icons/SparklesIcon';
import { OrchestrationService, OrchestrationResult } from '../services/orchestrationService';

interface Message {
  role: 'user' | 'model';
  text: string;
  orchestration?: OrchestrationResult;
}

import { runMysteryShopAudit, enrichFindingsWithAI } from '../services/mysteryShopService';
import type { MysteryShopReport, MysteryShopFinding } from '../types';
import { PROMPT_MASTER_SYSTEM_PROMPT } from '../services/promptMaster';

interface MysteryShopChatbotProps {
  appState: any;
  language: Language;
  onViewReport: (report: MysteryShopReport) => void;
}

const MysteryShopAuditor: React.FC<MysteryShopChatbotProps> = ({ appState, language, onViewReport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<MysteryShopReport | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const orchestrator = useRef(new OrchestrationService());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendInitialMessage();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendInitialMessage = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Inicia la conversación como el Guía de Mystery Shop de Connect IQ. Saluda al usuario y ofrécele una breve auditoría de lo que ves en la plataforma actual. Menciona que puedes realizar una 'Auditoría Forense Profunda' para configurar lo que falta.",
        config: {
          systemInstruction: `${PROMPT_MASTER_SYSTEM_PROMPT}
          
          Estado actual de la plataforma: ${JSON.stringify(appState)}.
          Idioma: ${language === 'es' ? 'Español' : 'Inglés'}.
          
          Tu objetivo es guiar al usuario paso a paso por la plataforma de optimización económica, enfocándote en la experiencia de navegación interna de AutoSocio.`,
        },
      });

      if (response.text) {
        setMessages([{ role: 'model', text: response.text }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // 1. Correr el Orquestador Global para decidir el flujo
      const orchResult = await orchestrator.current.runGlobalOrchestrator(userMessage, appState);
      
      // 2. Generar la respuesta final basada en la orquestación
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `${PROMPT_MASTER_SYSTEM_PROMPT}
          
          Estado actual de la plataforma: ${JSON.stringify(appState)}.
          Idioma: ${language === 'es' ? 'Español' : 'Inglés'}.
          
          Tu objetivo es guiar al usuario paso a paso por la plataforma de optimización económica, optimizando la navegación interna.
          ORQUESTACIÓN ACTUAL: ${JSON.stringify(orchResult)}.`,
        },
      });

      if (response.text) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: response.text!,
          orchestration: orchResult
        }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, hubo un error en mi sistema de procesamiento. ¿Podemos intentar de nuevo?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const runDeepAudit = async () => {
    setIsAuditing(true);
    setIsOpen(true);
    try {
      const initialReport = await runMysteryShopAudit(appState, language);
      const enrichedReport = await enrichFindingsWithAI(initialReport, appState, language);
      setAuditReport(enrichedReport);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `He completado la Auditoría Forense de Connect IQ. He detectado ${enrichedReport.findings.length} puntos críticos que requieren configuración o edición inmediata para asegurar la coherencia de la infraestructura.`
      }]);
    } catch (error) {
      console.error("Audit Error:", error);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-24 right-6 z-[150] flex flex-col gap-4 items-end">
        {isOpen && (
          <button 
            onClick={runDeepAudit}
            disabled={isAuditing}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            <SparklesIcon className="w-3 h-3" />
            {isAuditing ? 'Auditoría en Curso...' : 'Activar Mystery Shop Deep Audit'}
          </button>
        )}
        <button 
          onClick={() => setIsOpen(true)}
          className="mystery-shop-trigger w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-all active:scale-95 group"
        >
          <ChatbotIcon className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
          {!isOpen && messages.length === 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          )}
        </button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-[200] w-[90vw] md:w-[450px] h-[70vh] bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-slide-up">
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-gradient-to-r from-cyan-900/20 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <ChatbotIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Connect IQ <span className="text-cyan-500">Auditor</span></h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Mystery Shop v1 Activo</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
            {auditReport && (
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Score de Infraestructura</span>
                    <span className="text-xl font-black text-white">{auditReport.overallScore}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${auditReport.overallScore}%` }}></div>
                  </div>
                  <button 
                    onClick={() => onViewReport(auditReport)}
                    className="w-full mt-4 py-2 bg-indigo-600/30 border border-indigo-500/30 rounded-xl text-[8px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600/50 transition-all"
                  >
                    Ver Reporte de Navegación Completo
                  </button>
                </div>
                
                <div className="space-y-3">
                  {auditReport.findings.map((finding) => (
                    <div key={finding.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-center">
                        <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full ${
                          finding.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                          finding.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                          'bg-cyan-500/20 text-cyan-500'
                        }`}>
                          {finding.severity}
                        </span>
                        <span className="text-[7px] text-gray-500 uppercase font-black">{finding.category}</span>
                      </div>
                      <p className="text-[10px] text-white font-bold">{finding.description}</p>
                      <div className="pt-2 border-t border-white/5">
                        <p className="text-[8px] text-emerald-400 font-black uppercase tracking-widest mb-1 italic">Acción Sugerida:</p>
                        <p className="text-[9px] text-gray-400 leading-relaxed italic">"{finding.suggestedFix}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                
                {/* Pipeline Data Visualization */}
                {msg.orchestration?.pipeline_data && (
                  <div className="mt-4 space-y-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                      <span className="text-[8px] text-cyan-500 font-black uppercase tracking-widest">Pipeline Unificado Activo</span>
                      <div className="flex gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${msg.orchestration.pipeline_data.phase1 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${msg.orchestration.pipeline_data.phase2 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${msg.orchestration.pipeline_data.phase3 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                      </div>
                    </div>
                    
                    {msg.orchestration.pipeline_data.phase1 && (
                      <div className="space-y-1">
                        <p className="text-[7px] text-gray-500 uppercase font-black">Fase 1: Estructura</p>
                        <p className="text-[9px] text-white font-bold">{msg.orchestration.pipeline_data.phase1.nicho_activo}</p>
                      </div>
                    )}
                    
                    {msg.orchestration.pipeline_data.phase2 && (
                      <div className="space-y-1">
                        <p className="text-[7px] text-gray-500 uppercase font-black">Fase 2: Matching (Top Match)</p>
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] text-cyan-400 font-bold">{msg.orchestration.pipeline_data.phase2.top_matches_priorizados[0]?.nombre}</p>
                          <span className="text-[8px] text-emerald-500 font-black">{(msg.orchestration.pipeline_data.phase2.top_matches_priorizados[0]?.probabilidad_resolucion * 100).toFixed(0)}% Res.</span>
                        </div>
                      </div>
                    )}

                    {msg.orchestration.pipeline_data.phase3 && (
                      <div className="pt-2 border-t border-white/5">
                        <p className="text-[7px] text-emerald-500 uppercase font-black mb-1">Fase 3: Decisión Optimizada</p>
                        <p className="text-[10px] text-white font-black leading-tight mb-1">{msg.orchestration.pipeline_data.phase3.opcion_recomendada}</p>
                        <p className="text-[8px] text-gray-400 italic">"{msg.orchestration.pipeline_data.phase3.accion_usuario}"</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Orchestration Debug Info (Optional/Subtle) */}
                {msg.orchestration && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {msg.orchestration.pipeline_activado.map((p, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[7px] text-cyan-400 font-black uppercase tracking-widest">
                        {p.agente}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/5 bg-black/20">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="¿Cómo puedo optimizar esta vista?"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all disabled:opacity-50"
              >
                <SparklesIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MysteryShopAuditor;
