
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { Agent, Language, Platform } from '../types';
import { processStrategicResponse } from '../services/geminiService';
import CloseIcon from './icons/CloseIcon';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import MicrophoneIcon from './icons/MicrophoneIcon';
import CameraIcon from './icons/CameraIcon';
import LiveTacticalSession from './LiveTacticalSession';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import { getLabels } from '../constants';

interface Message {
  role: 'user' | 'agent';
  content: string;
  visualImageUrl?: string;
  visualPrompt?: string;
}

interface AgentDetailModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
  uploadedImage: { data: string; mimeType: string } | null;
  initialScenario: string;
  onSearchInMarketplace: (query: string) => void;
  userLanguage: Language;
  currentPlatform: Platform;
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, isOpen, onClose, uploadedImage, initialScenario, userLanguage, currentPlatform }) => {
  const isConnectX = currentPlatform === 'connectx';
  const accentColor = isConnectX ? 'indigo' : 'cyan';

  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiveSessionActive, setIsLiveSessionActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const labels = useMemo(() => getLabels(userLanguage, currentPlatform), [userLanguage, currentPlatform]);

  useEffect(() => {
    if (initialScenario && chatHistory.length === 0) {
      setInputValue(initialScenario);
    }
  }, [initialScenario, chatHistory.length]);

  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [chatHistory, isLoading]);

  const { isListening, toggleListening } = useSpeechRecognition((t) => setInputValue(p => `${p} ${t}`.trim()));

  const handleSendMessage = async (textOverride?: string) => {
    const userMessage = textOverride || inputValue;
    if (!userMessage.trim() && !uploadedImage) return;

    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await processStrategicResponse(agent, userMessage, [], userLanguage, uploadedImage);
      setChatHistory(prev => [...prev, { 
        role: 'agent', 
        content: response.text, 
        visualImageUrl: response.visualImageUrl,
        visualPrompt: response.visualPrompt 
      }]);
      
      if (response.metrics.activeModules.length > 0) {
        setActiveModule(response.metrics.activeModules[0].replace('_', ' '));
      }
    } catch (err) {
      setError('Error de sincronización Alfa.');
      setChatHistory(prev => [...prev, { role: 'agent', content: "⚠️ ERROR: Nodo técnico saturado. Mystery Shop v1 sugiere reintento." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  if (isLiveSessionActive) {
    return <LiveTacticalSession agent={agent} onClose={() => setIsLiveSessionActive(false)} userLanguage={userLanguage} />;
  }

  return (
    <div className="fixed inset-0 bg-gray-950/98 backdrop-blur-2xl z-[160] flex justify-center p-0 md:p-6" onClick={onClose}>
      <div className="bg-[#020617] border-x md:border border-white/5 rounded-none md:rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-7xl h-full flex flex-col lg:grid lg:grid-cols-12 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        {/* SIDEBAR TÁCTICO */}
        <div className="hidden lg:flex lg:col-span-4 bg-black/40 p-10 border-r border-white/5 flex flex-col space-y-10 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Mando Universal</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic">{agent.title}</p>
          </div>

          <div className="space-y-8">
            <button 
              onClick={() => setIsLiveSessionActive(true)}
              className={`w-full flex items-center justify-center gap-6 py-8 bg-gradient-to-tr ${isConnectX ? 'from-indigo-600 to-indigo-800' : 'from-cyan-600 to-indigo-700'} text-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(6,182,212,0.3)] hover:scale-[1.03] transition-all group border border-white/20`}
            >
              <MicrophoneIcon className="w-6 h-6 text-white" />
              <div className="text-left">
                <p className="text-[14px] font-black uppercase tracking-widest leading-none">{isConnectX ? 'Protocolo de Voz' : 'Llamada de Mando'}</p>
                <p className="text-[9px] font-bold uppercase tracking-tighter opacity-70 mt-2">{isConnectX ? 'Sincronización Alfa' : 'Maestría Automotriz'}</p>
              </div>
            </button>

            <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
              <p className={`text-[10px] font-black ${isConnectX ? 'text-indigo-400' : 'text-cyan-400'} uppercase tracking-widest`}>{isConnectX ? 'CX Intelligence' : 'Mystery Shop v1'}: Visión 3D</p>
              <p className="text-[10px] text-gray-400 font-light italic leading-relaxed">
                {isConnectX 
                  ? "Este nodo despliega diagramas de infraestructura para la validación técnica de intención."
                  : "Este nodo ahora genera diagramas técnicos automáticos para que entiendas visualmente cada diagnóstico."
                }
              </p>
            </div>
          </div>
        </div>

        {/* CHAT DE INTERVENCIÓN */}
        <div className="lg:col-span-8 flex flex-col h-full relative">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img src={agent.avatar} className="w-14 h-14 rounded-2xl border border-white/10 object-cover shadow-2xl" />
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{agent.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">EN LINEA</span>
                  {activeModule && (
                    <div className={`px-3 py-1 ${isConnectX ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' : 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30'} rounded-full text-[8px] font-black uppercase tracking-widest animate-fade-in`}>
                       {activeModule} ACTIVADO
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 hover:bg-rose-500/20 text-gray-500 hover:text-white rounded-full transition-all border border-white/5">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-10 space-y-8 no-scrollbar scroll-smooth">
            {chatHistory.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-40 px-10">
                <SparklesIcon className={`w-20 h-20 ${isConnectX ? 'text-indigo-400' : 'text-cyan-400'}`} />
                <div className="space-y-3">
                  <p className="text-[14px] font-black text-white uppercase tracking-[0.5em]">{isConnectX ? 'Protocolo Alfa Listo' : 'Visión Universal Lista'}</p>
                  <p className="text-xs text-gray-500 font-light max-w-sm mx-auto leading-relaxed italic">
                    {isConnectX 
                      ? "Inicie la validación técnica de intención. El nodo procesará la arquitectura y generará el dictamen de infraestructura."
                      : "Describa una falla. Generaremos el dictamen técnico y el diagrama visual del componente."
                    }
                  </p>
                </div>
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up space-y-4`}>
                
                {/* Visual Representation (Top of agent message) */}
                {msg.role === 'agent' && msg.visualImageUrl && (
                  <div className={`w-full max-w-[85%] md:max-w-[70%] bg-black/60 rounded-[2.5rem] p-3 border ${isConnectX ? 'border-indigo-500/20' : 'border-cyan-500/20'} shadow-2xl overflow-hidden group`}>
                     <div className="flex items-center gap-3 mb-3 ml-4 mt-2">
                        <div className={`w-2 h-2 ${isConnectX ? 'bg-indigo-500' : 'bg-cyan-500'} rounded-full animate-pulse`}></div>
                        <span className={`text-[8px] font-black ${isConnectX ? 'text-indigo-500' : 'text-cyan-500'} uppercase tracking-[0.3em]`}>{isConnectX ? 'Arquitectura CX v1' : 'Diagrama Técnico ADN v1'}</span>
                     </div>
                     <img src={msg.visualImageUrl} className="w-full h-48 md:h-64 object-cover rounded-[2rem] border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" alt={msg.visualPrompt} />
                     <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-3 text-center italic">{msg.visualPrompt}</p>
                  </div>
                )}

                <div className={`max-w-[85%] md:max-w-[75%] p-8 rounded-[3rem] text-sm leading-relaxed shadow-2xl ${
                  msg.role === 'user' 
                    ? (isConnectX ? 'bg-indigo-600' : 'bg-cyan-600') + ' text-white rounded-tr-none border border-white/10' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none font-light'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start gap-4 animate-fade-in">
                 <div className="w-full max-w-[200px] h-40 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
                    <div className="scanner-beam"></div>
                    <SparklesIcon className="w-8 h-8 text-white/5" />
                 </div>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] rounded-tl-none relative overflow-hidden group min-w-[200px]">
                     <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                        <div className={`cognitive-bar ${isConnectX ? 'bg-indigo-500' : 'bg-cyan-500'}`}></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <SparklesIcon className={`w-4 h-4 ${isConnectX ? 'text-indigo-400' : 'text-cyan-400'} animate-pulse`} />
                        <span className={`text-[10px] font-black ${isConnectX ? 'text-indigo-500' : 'text-cyan-500'} uppercase tracking-widest animate-pulse`}>
                          {isConnectX ? 'Sincronizando Protocolo Alfa...' : 'Sincronizando Visión 3D...'}
                        </span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-10 border-t border-white/5 bg-black/40">
            <div className="relative group">
              <div className={`relative flex items-end gap-6 bg-white/5 border border-white/10 rounded-[3rem] p-4 focus-within:border-${isConnectX ? 'indigo' : 'cyan'}-500/50 transition-all shadow-2xl`}>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                  placeholder={labels.modal.placeholder}
                  className="flex-grow bg-transparent border-none outline-none text-white text-sm p-6 resize-none max-h-48 min-h-[70px] font-light placeholder-gray-700"
                  rows={1}
                />
                <div className="flex items-center gap-3 mb-2 mr-3">
                  <button onClick={toggleListening} className={`p-5 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white shadow-lg shadow-red-900/40' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}>
                    <MicrophoneIcon className="w-6 h-6" isListening={isListening} />
                  </button>
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || (!inputValue.trim() && !uploadedImage)}
                    className={`p-5 ${isConnectX ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-cyan-600 hover:bg-cyan-500'} text-white rounded-2xl transition-all shadow-2xl disabled:opacity-30 active:scale-90`}
                  >
                    <VerifiedIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[8px] text-gray-700 font-black uppercase tracking-[0.4em] text-center mt-6">
              {isConnectX ? 'Infraestructura ConnectX | Protocolo Alfa Sincronizado' : 'Infraestructura AutoSocio | Mando Único Sincronizado'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailModal;
