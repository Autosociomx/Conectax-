
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

interface MysteryShopChatbotProps {
  appState: any;
  language: Language;
}

const MysteryShopAuditor: React.FC<MysteryShopChatbotProps> = ({ appState, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        contents: "Inicia la conversación como el Guía de Mystery Shop. Saluda al usuario y ofrécele una breve auditoría de lo que ves en la plataforma actual (vista actual, plataforma, etc.). Sé breve y directo.",
        config: {
          systemInstruction: `Eres el Guía de Mystery Shop de AutoSocio. 
          Tu objetivo es guiar al usuario paso a paso por la plataforma de optimización económica.
          Estado actual de la plataforma: ${JSON.stringify(appState)}.
          Idioma: ${language === 'es' ? 'Español' : 'Inglés'}.
          
          REGLAS DE INTERACCIÓN:
          1. Sé coherente con la arquitectura de AutoSocio (ADN, Cimientos, Optimización, Sourcing).
          2. Proporciona instrucciones lógicas y razonables basadas en la vista actual del usuario.
          3. Si el usuario está en 'home', guíalo hacia el diagnóstico o el ConnectX DNA.
          4. Si está en 'foundations', explícale los niveles de realidad empresarial.
          5. PROTOCOLO CX: Si el usuario menciona ventas o monetización, aplica el Agente JODA (Activación sin links, autoridad técnica) y el Agente C1 (Checklist de validación técnica: Marca, Modelo, Año, Motor, Pieza).
          6. Sé breve, profesional y directo. No uses jerga innecesaria a menos que sea técnica de la plataforma.
          7. Siempre ofrece un "Siguiente paso" claro.
          8. SIN HUMO: Valida técnicamente cada intención antes de sugerir una acción comercial.`,
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
          systemInstruction: `Eres el Guía de Mystery Shop de AutoSocio. 
          Tu objetivo es guiar al usuario paso a paso por la plataforma de optimización económica.
          Estado actual de la plataforma: ${JSON.stringify(appState)}.
          Idioma: ${language === 'es' ? 'Español' : 'Inglés'}.
          
          ORQUESTACIÓN ACTUAL: ${JSON.stringify(orchResult)}.
          
          REGLAS DE INTERACCIÓN:
          1. Sé coherente con la arquitectura de AutoSocio (ADN, Cimientos, Optimización, Sourcing).
          2. Proporciona instrucciones lógicas y razonables basadas en la vista actual del usuario.
          3. Siempre ofrece un "Siguiente paso" claro y coherente.
          4. Mantén la lógica de los 5 niveles de realidad si el usuario pregunta por el negocio.
          5. PROTOCOLO CX: Aplica estrictamente los checklists C1 (Validación Técnica) y JODA (Activación y Conversión) si el flujo lo requiere. No permitas el envío de links sin validación C1 previa.`,
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

  return (
    <>
      {/* Floating Chatbot Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[150] w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-all active:scale-95 group"
      >
        <ChatbotIcon className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        {!isOpen && messages.length === 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        )}
      </button>

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
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Mystery Shop <span className="text-cyan-500">Guide</span></h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Sincronizado con Infraestructura</span>
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
