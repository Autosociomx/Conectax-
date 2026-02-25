
import { GoogleGenAI, Type } from "@google/genai";
import { PipelineService, PipelinePhase1Result, PipelinePhase2Result, PipelinePhase3Result } from "./pipelineService";

export interface OrchestrationResult {
  evento_sistema: string;
  nivel_complejidad: 'bajo' | 'medio' | 'alto' | 'crítico';
  pipeline_activado: {
    agente: string;
    motivo_activacion: string;
    estado: 'pendiente' | 'ejecutando' | 'completado';
  }[];
  coherencia_global: number;
  riesgo_operativo: 'bajo' | 'medio' | 'alto';
  accion_siguiente: string;
  registro_aprendizaje: boolean;
  pipeline_data?: {
    phase1?: PipelinePhase1Result;
    phase2?: PipelinePhase2Result;
    phase3?: PipelinePhase3Result;
  };
}

export class OrchestrationService {
  private ai: GoogleGenAI;
  private pipeline: PipelineService;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    this.pipeline = new PipelineService();
  }

  async runGlobalOrchestrator(userInput: string, appState: any): Promise<OrchestrationResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza la siguiente entrada del usuario y el estado del sistema para orquestar la respuesta óptima:
      
      ENTRADA: "${userInput}"
      ESTADO: ${JSON.stringify(appState)}`,
      config: {
        responseMimeType: "application/json",
        systemInstruction: `Eres el AGENTE MAESTRO GLOBAL — ORQUESTADOR SUPREMO MULTINICHO.
        Tu función es coordinar, priorizar, activar, supervisar, validar y optimizar el comportamiento de los agentes especializados del sistema.
        
        PIPELINE UNIFICADO:
        Si el usuario solicita activar un nuevo nicho o resolver una necesidad en un nicho activo, debes activar el Pipeline Unificado (Fase 1 -> Fase 2 -> Fase 3).
        
        AGENTES BAJO TU CONTROL:
        1. Orquestador de Intención
        2. Estructurador Semántico
        3. Perfilador de Proveedores
        4. Motor de Matchmaking
        5. Optimizador de Decisión
        6. Activador de Nichos
        7. Analista de Inteligencia Económica
        8. Ejecutor Transaccional
        9. Supervisor de Calidad
        10. Sistema de Aprendizaje Adaptativo
        
        Debes devolver un JSON estructurado siguiendo el esquema definido.`,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            evento_sistema: { type: Type.STRING },
            nivel_complejidad: { type: Type.STRING, enum: ['bajo', 'medio', 'alto', 'crítico'] },
            pipeline_activado: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  agente: { type: Type.STRING },
                  motivo_activacion: { type: Type.STRING },
                  estado: { type: Type.STRING, enum: ['pendiente', 'ejecutando', 'completado'] }
                },
                required: ['agente', 'motivo_activacion', 'estado']
              }
            },
            coherencia_global: { type: Type.NUMBER },
            riesgo_operativo: { type: Type.STRING, enum: ['bajo', 'medio', 'alto'] },
            accion_siguiente: { type: Type.STRING },
            registro_aprendizaje: { type: Type.BOOLEAN }
          },
          required: ['evento_sistema', 'nivel_complejidad', 'pipeline_activado', 'coherencia_global', 'riesgo_operativo', 'accion_siguiente', 'registro_aprendizaje']
        }
      }
    });

    const result: OrchestrationResult = JSON.parse(response.text || "{}");

    // Lógica de ejecución del Pipeline Unificado si se detecta la necesidad
    if (result.pipeline_activado.some(p => p.agente === 'Activador de Nichos' || p.agente === 'Motor de Matchmaking')) {
      result.pipeline_data = {};
      
      // Simulación de ejecución del pipeline completo
      try {
        const phase1 = await this.pipeline.activateNiche(userInput);
        result.pipeline_data.phase1 = phase1;
        
        const phase2 = await this.pipeline.runMatchmaking(userInput, phase1);
        result.pipeline_data.phase2 = phase2;
        
        const phase3 = await this.pipeline.optimizeDecision(phase2);
        result.pipeline_data.phase3 = phase3;
        
        result.accion_siguiente = `Pipeline Unificado completado: ${phase3.opcion_recomendada}. Acción sugerida: ${phase3.accion_usuario}`;
      } catch (e) {
        console.error("Pipeline execution failed", e);
      }
    }

    return result;
  }
}
