
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import SparklesIcon from './icons/SparklesIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import SearchIcon from './icons/SearchIcon';

const VisionAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("No se pudo acceder a la cámara. Por favor, asegúrate de dar los permisos necesarios.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const [targetPoint, setTargetPoint] = useState<{ x: number, y: number } | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = (e: React.MouseEvent) => {
    if (!videoContainerRef.current) return;
    const rect = videoContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTargetPoint({ x, y });
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    setCapturedImage(canvas.toDataURL('image/jpeg'));
    setIsAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      let prompt = "Actúa como un Ingeniero de Diagnóstico Avanzado de AutoSocio. Analiza esta imagen técnica (puede ser una pieza de motor, una herramienta, un entorno industrial o un documento técnico). Proporciona: 1. Identificación precisa del objeto. 2. Estado visual (desgaste, integridad). 3. Diagnóstico preliminar. 4. Recomendación estratégica de acción inmediata. Responde en formato JSON con los campos: 'identification', 'condition', 'diagnosis', 'recommendation', 'confidence_score' (0-1).";
      
      if (targetPoint) {
        prompt += ` IMPORTANTE: El usuario ha marcado un área específica de interés en las coordenadas relativas x:${targetPoint.x.toFixed(1)}%, y:${targetPoint.y.toFixed(1)}%. Por favor, prioriza el análisis de lo que se encuentra en esa zona específica.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      if (response.text) {
        setAnalysisResult(JSON.parse(response.text));
      }
    } catch (error) {
      console.error("Vision Analysis Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-12 animate-slide-up pb-40 px-4">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Visión Artificial Técnica C1</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
          Vision<span className="text-emerald-500">Analysis</span>
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto text-lg leading-relaxed">
          Asistencia técnica en tiempo real mediante análisis multimodal de imágenes. Identificación de fallas y optimización de activos.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Camera Viewport */}
        <div className="relative group">
          <div 
            ref={videoContainerRef}
            onClick={handleVideoClick}
            className="aspect-video bg-black rounded-[3rem] border-2 border-white/10 overflow-hidden relative shadow-2xl cursor-crosshair"
          >
            {!stream && !capturedImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                  <SearchIcon className="w-8 h-8 text-gray-600" />
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); startCamera(); }}
                  className="px-8 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95"
                >
                  Activar Sensor Óptico
                </button>
              </div>
            )}
            
            {stream && !capturedImage && (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                
                {/* Visual Target Marker */}
                {targetPoint && (
                  <div 
                    className="absolute w-12 h-12 border-2 border-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                    style={{ left: `${targetPoint.x}%`, top: `${targetPoint.y}%` }}
                  >
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                    <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-ping"></div>
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20">
                  {!targetPoint && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-emerald-500/50 rounded-3xl">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-emerald-500 animate-scan shadow-[0_0_15px_#10b981]"></div>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); captureAndAnalyze(); }}
                    disabled={isAnalyzing}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform group"
                  >
                    <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-emerald-600 rounded-full group-hover:scale-110 transition-transform"></div>
                    </div>
                  </button>
                </div>
                
                <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-[8px] text-emerald-400 font-black uppercase tracking-widest">
                    {targetPoint ? 'Objetivo Fijado' : 'Toca para fijar objetivo'}
                  </p>
                </div>
              </>
            )}

            {capturedImage && (
              <div className="relative w-full h-full">
                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                
                {targetPoint && (
                  <div 
                    className="absolute w-12 h-12 border-2 border-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                    style={{ left: `${targetPoint.x}%`, top: `${targetPoint.y}%` }}
                  >
                    <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setCapturedImage(null); setAnalysisResult(null); setTargetPoint(null); startCamera(); }}
                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                  >
                    Reiniciar Sensor
                  </button>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 z-50">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-emerald-400 font-black uppercase tracking-[0.4em] text-xs">Analizando Patrones...</p>
                  <p className="text-gray-500 text-[8px] mt-2 uppercase tracking-widest">Consultando Base de Conocimiento Global</p>
                </div>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Analysis Results */}
        <div className="space-y-8">
          {!analysisResult && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-[3rem] text-center space-y-6">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center">
                <VerifiedIcon className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm">Esperando Captura</h4>
                <p className="text-gray-500 text-xs mt-2 max-w-xs mx-auto">Apunta la cámara a una pieza técnica o entorno para recibir un diagnóstico inmediato.</p>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="glass-card bg-black/40 border border-white/10 rounded-[3rem] p-10 space-y-10 animate-slide-up relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10"></div>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Reporte de Visión</h3>
                    <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest block mb-1">Confianza</span>
                  <span className="text-lg font-black text-emerald-400">{(analysisResult.confidence_score * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Identificación</label>
                  <p className="text-white text-lg font-bold leading-tight">{analysisResult.identification}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Condición Visual</label>
                    <p className="text-gray-300 text-xs leading-relaxed">{analysisResult.condition}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Diagnóstico</label>
                    <p className="text-gray-300 text-xs leading-relaxed">{analysisResult.diagnosis}</p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl space-y-3">
                  <div className="flex items-center gap-2">
                    <VerifiedIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-[8px] text-emerald-500 font-black uppercase tracking-widest">Recomendación Estratégica</span>
                  </div>
                  <p className="text-white text-sm font-medium leading-relaxed italic">
                    "{analysisResult.recommendation}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <button className="text-[8px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition-colors">
                  Exportar a PDF
                </button>
                <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Contactar Especialista
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionAnalysis;
