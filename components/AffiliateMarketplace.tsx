
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { REGIONAL_PLATFORMS, getLabels, AUTOSOCIO_AGENTS } from '../constants';
import type { EnrichedPartRecommendation, Language, DiagnosticGuide, AuditScenario, Part, Agent, IntentObject, Platform } from '../types';
import { identifyPartKeywords, getEnhancedPartRecommendations, generateDiagnosticGuide } from '../services/geminiService';
import { interpretUserIntent } from '../services/intentEngine';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import MicrophoneIcon from './icons/MicrophoneIcon';
import CameraIcon from './icons/CameraIcon';
import EnhancedPartCard from './EnhancedPartCard';
import DiagnosticResultCard from './DiagnosticResultCard';
import SparklesIcon from './icons/SparklesIcon';
import PartDetailModal from './PartDetailModal';
import AgentDetailModal from './AgentDetailModal';
import NeuralIntentVisualizer from './NeuralIntentVisualizer';

interface AffiliateMarketplaceProps {
  initialSearch?: string;
  userLanguage?: Language;
  currentPlatform?: Platform;
}

const COMMON_MAKES = ['Volkswagen', 'Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi'];
const COMMON_PARTS = ['Sensores de Transmisión', 'Solenoide de Presión', 'Bomba de Gasolina', 'Kit de Embrague', 'Radiador de Enfriamiento'];

const AffiliateMarketplace: React.FC<AffiliateMarketplaceProps> = ({ initialSearch, userLanguage = 'es', currentPlatform = 'autosocio' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isIntentProcessing, setIsIntentProcessing] = useState(false);
  const [intentObject, setIntentObject] = useState<IntentObject | undefined>();
  const [loadingLog, setLoadingLog] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [enrichedResults, setEnrichedResults] = useState<EnrichedPartRecommendation[]>([]);
  const [diagnosticGuide, setDiagnosticGuide] = useState<DiagnosticGuide | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [selectedPartResult, setSelectedPartResult] = useState<EnrichedPartRecommendation | null>(null);
  const [activeMentor, setActiveMentor] = useState<Agent | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    engine: '',
    transmission: '',
    part: initialSearch || ''
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const labels = useMemo(() => getLabels(userLanguage as Language, currentPlatform as Platform), [userLanguage, currentPlatform]);

  const handleVoiceInput = useCallback((transcript: string) => {
    if (activeField) {
      setVehicleData(prev => ({ ...prev, [activeField]: transcript }));
      setActiveField(null);
    }
  }, [activeField]);

  const { isListening, toggleListening } = useSpeechRecognition(handleVoiceInput);

  const handlePublicSearch = async () => {
    if (!vehicleData.make || !vehicleData.model || !vehicleData.part) {
      setError('Faltan datos de ADN (Marca/Modelo/Pieza) para garantizar compatibilidad.');
      return;
    }

    setIsIntentProcessing(true);
    setSearchPerformed(true);
    setError(null);
    setDiagnosticGuide(null);
    setIntentObject(undefined);

    try {
      const fullADN = `${vehicleData.make} ${vehicleData.model} ${vehicleData.year} ${vehicleData.engine} ${vehicleData.part}`;
      const intent = await interpretUserIntent(fullADN, userLanguage as Language);
      setIntentObject(intent);
      setIsIntentProcessing(false);
      
      setIsLoading(true);
      const logs = [
        "Interpretación de Sector: " + intent.sector,
        "Prioridad de Urgencia: " + (intent.urgency_level * 100) + "%",
        "Mapeando ADN de Componentes...",
        "Auditando Reputación del Fabricante...",
        "Generando Dictamen de Autoridad..."
      ];
      let logIdx = 0;
      setLoadingLog(logs[0]);
      const logInterval = setInterval(() => {
        setLoadingLog(logs[logIdx % logs.length]);
        logIdx++;
      }, 1200);

      const scenario: AuditScenario = intent.sector === 'AUTOMOTIVE' ? 'MONETIZATION' : 'EDUCATION';

      const [keywords, guide] = await Promise.all([
        identifyPartKeywords(fullADN, uploadedImage, userLanguage as Language),
        generateDiagnosticGuide(fullADN, scenario, userLanguage as Language)
      ]);

      setDiagnosticGuide(guide);
      
      const platforms = REGIONAL_PLATFORMS[userLanguage as Language] || REGIONAL_PLATFORMS['es'];
      
      let candidates: Part[] = [];
      const generateMockParts = (platformIndex: number, count: number) => {
        const plat = platforms[platformIndex];
        if (!plat) return [];
        const results: Part[] = [];
        for (let i = 0; i < count; i++) {
          results.push({
            id: `v-match-${plat.name}-${i}-${Date.now()}`,
            name: `${vehicleData.part} ${['Elite Pro', 'OEM Master', 'Heavy Duty', 'Standard Gold', 'Performance', 'Eco-Tech'][i] || 'Genérica'}`,
            description: `Opción validada para ${vehicleData.make}. Origen: ${plat.name}.`,
            imageUrl: '',
            affiliateUrl: '#',
            loyaltyCommissionRate: 2,
            salesCommissionRate: 5,
            keywords: keywords,
            compatibility: [fullADN],
            price: 1500 + (Math.random() * 4500),
            stock: 2 + i,
            platform: plat.name
          });
        }
        return results;
      };

      candidates = platforms.flatMap((_, idx) => generateMockParts(idx, 2));

      const recommendations = await getEnhancedPartRecommendations(fullADN, candidates, userLanguage as Language);
      const results = recommendations.map(r => {
        const targetPart = candidates.find(p => p.id === r.partId) || candidates[0];
        return { part: targetPart, ...r };
      });

      setEnrichedResults(results);
      clearInterval(logInterval);
      setIsLoading(false);
      
    } catch (err) {
      console.error(err);
      setError('Interrupción en la Sincronización Global. Reintente.');
      setIsIntentProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 animate-slide-up space-y-20 pb-40 px-6">
      <div className="glass-card rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PredictiveField name="make" label={labels.marketplace.fields.make} value={vehicleData.make} suggestions={COMMON_MAKES} onChange={v => setVehicleData(p => ({...p, make: v}))} isListening={isListening && activeField === 'make'} onVoice={() => { setActiveField('make'); toggleListening(); }} />
              <PredictiveField name="model" label={labels.marketplace.fields.model} value={vehicleData.model} onChange={v => setVehicleData(p => ({...p, model: v}))} isListening={isListening && activeField === 'model'} onVoice={() => { setActiveField('model'); toggleListening(); }} />
              <PredictiveField name="year" label={labels.marketplace.fields.year} value={vehicleData.year} onChange={v => setVehicleData(p => ({...p, year: v}))} isListening={isListening && activeField === 'year'} onVoice={() => { setActiveField('year'); toggleListening(); }} />
            </div>
            
            <PredictiveField name="part" label={labels.marketplace.fields.part} value={vehicleData.part} suggestions={COMMON_PARTS} onChange={v => setVehicleData(p => ({...p, part: v}))} isListening={isListening && activeField === 'part'} onVoice={() => { setActiveField('part'); toggleListening(); }} />

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <button 
                  onClick={handlePublicSearch} 
                  disabled={isLoading || isIntentProcessing} 
                  className="flex-grow py-6 bg-indigo-600 text-white font-black text-xs rounded-3xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-500/20 uppercase tracking-[0.3em] active:scale-[0.98] disabled:opacity-50"
                >
                  {isIntentProcessing ? 'PROCESANDO INTENCIÓN...' : labels.marketplace.btn_search}
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-10 py-6 glass-card text-white text-[10px] font-black uppercase tracking-widest rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-4"
                >
                  <CameraIcon className="w-6 h-6" /> {labels.marketplace.btn_scan}
                </button>
                <input type="file" ref={fileInputRef} hidden accept="image/*" />
            </div>
          </div>

          <div className="lg:col-span-4 glass-card rounded-[3rem] p-12 border border-white/5 flex flex-col justify-center space-y-8">
            <h4 className="text-white font-black uppercase text-2xl tracking-tighter italic leading-none">
              {labels.marketplace.filter_title}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed font-medium italic">
              "{labels.marketplace.filter_desc}"
            </p>
            <div className="p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 shadow-inner">
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
                  {currentPlatform === 'connectx' ? 'Infraestructura Alpha ConnectX' : 'Nicho Especializado AutoSocio'}
                </p>
                <p className="text-white text-xs font-bold uppercase tracking-tight italic">
                  {currentPlatform === 'connectx' ? 'Protocolo de Validación Forense Activo' : 'Validación de Compatibilidad ADN'}
                </p>
            </div>
          </div>
        </div>
      </div>

      <NeuralIntentVisualizer intent={intentObject} isProcessing={isIntentProcessing} />

      {isLoading && (
        <div className="fixed inset-0 z-[250] bg-gray-950/95 backdrop-blur-3xl flex items-center justify-center animate-fade-in">
          <div className="max-w-md w-[85%] p-16 bg-[#020617] border border-white/10 rounded-[4rem] text-center space-y-12 shadow-[0_0_150px_rgba(79,70,229,0.25)] relative overflow-hidden">
            <div className="scanner-beam"></div>
            <div className="relative w-28 h-28 mx-auto">
               <div className="absolute inset-0 bg-indigo-500/20 blur-[30px] rounded-full neural-core"></div>
               <div className="relative z-10 w-full h-full border-2 border-indigo-500/30 rounded-[2.5rem] flex items-center justify-center">
                  <SparklesIcon className="w-12 h-12 text-indigo-400" />
               </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-white font-black uppercase tracking-[0.6em] text-[10px]">Análisis Cognitivo en Proceso</h3>
              <p className="text-indigo-400 font-mono text-[11px] uppercase tracking-[0.2em] h-6 flex items-center justify-center italic">
                {loadingLog}
              </p>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
               <div className="cognitive-bar connectx-bar"></div>
            </div>
            <p className="text-[8px] text-gray-700 font-black uppercase tracking-[0.5em]">ConnectX Intelligence Grid</p>
          </div>
        </div>
      )}

      {searchPerformed && !isLoading && !isIntentProcessing && (
        <div className="space-y-20 animate-slide-up">
          {diagnosticGuide && (
            <div className="animate-slide-up">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-grow"></div>
                <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">{labels.marketplace.audit_verdict}</h3>
                <div className="h-px bg-white/10 flex-grow"></div>
              </div>
              <DiagnosticResultCard guide={diagnosticGuide} />
            </div>
          )}

          {enrichedResults.length > 0 && (
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-px bg-white/10 flex-grow"></div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Catálogo de Sourcing Élite</h3>
                <div className="h-px bg-white/10 flex-grow"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {enrichedResults.map((res, i) => (
                  <EnhancedPartCard 
                    key={res.part.id || i} 
                    result={res} 
                    vehicleContext={vehicleData}
                    userLanguage={userLanguage}
                    onViewDetails={setSelectedPartResult}
                  />
                ))}
              </div>
            </div>
          )}
          {error && <p className="text-rose-500 text-center font-black uppercase text-[10px] tracking-widest">{error}</p>}
        </div>
      )}

      {selectedPartResult && (
        <PartDetailModal 
          result={selectedPartResult} 
          guide={diagnosticGuide} 
          userLanguage={userLanguage}
          onClose={() => setSelectedPartResult(null)}
          onContactSpecialist={(agent) => {
            setSelectedPartResult(null);
            setActiveMentor(agent);
          }}
        />
      )}

      {activeMentor && (
        <AgentDetailModal 
          agent={activeMentor} 
          isOpen={!!activeMentor} 
          onClose={() => setActiveMentor(null)} 
          uploadedImage={null} 
          initialScenario={`Hola ${activeMentor.name}, necesito una validación técnica para ${selectedPartResult?.part.name} de mi ${vehicleData.make} ${vehicleData.model}.`}
          onSearchInMarketplace={(query) => {
            setActiveMentor(null);
            // Already in marketplace, maybe we could trigger a new search
            setVehicleData(prev => ({ ...prev, part: query }));
          }}
          userLanguage={userLanguage}
          currentPlatform={currentPlatform}
        />
      )}
    </div>
  );
};

const PredictiveField: React.FC<{ 
  name: string, 
  label: string, 
  value: string, 
  suggestions?: string[], 
  onChange: (v: string) => void, 
  onVoice: () => void,
  isListening: boolean 
}> = ({ label, value, suggestions = [], onChange, onVoice, isListening }) => (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">{label}</label>
      <div className="relative group">
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-2 focus:ring-cyan-500/40 outline-none transition-all font-bold text-sm placeholder-gray-800"
          placeholder={`${label}...`}
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            onVoice();
          }} 
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white shadow-lg shadow-red-900/40' : 'text-gray-600 hover:text-white bg-white/5'}`}
        >
          <MicrophoneIcon className="w-4 h-4" isListening={isListening} />
        </button>
      </div>
      {suggestions.length > 0 && !value && (
        <div className="flex flex-wrap gap-1.5 mt-1.5 ml-2">
           {suggestions.slice(0, 3).map(s => (
             <button key={s} onClick={() => onChange(s)} className="text-[7px] font-black text-cyan-500/50 hover:text-cyan-400 uppercase tracking-widest bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5 transition-all">
               + {s}
             </button>
           ))}
        </div>
      )}
    </div>
);

export default AffiliateMarketplace;
