
import { GoogleGenAI, Type } from "@google/genai";

export interface PipelinePhase1Result {
  nicho_activo: string;
  modelo_datos_operativo: any;
  reglas_compatibilidad: string[];
  variables_scoring: Record<string, number>;
}

export interface PipelinePhase2Result {
  top_matches_priorizados: {
    proveedor_id: string;
    nombre: string;
    score: number;
    probabilidad_resolucion: number;
  }[];
  justificacion_algoritmica: string;
}

export interface PipelinePhase3Result {
  opcion_recomendada: string;
  comparacion_funcional: string;
  nivel_claridad_decision: number;
  accion_usuario: string;
}

export class PipelineService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }

  /**
   * FASE 1: ACTIVACIÓN DE NICHO
   */
  async activateNiche(description: string): Promise<PipelinePhase1Result> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Activa el siguiente nicho creando su estructura de mercado: "${description}"`,
      config: {
        responseMimeType: "application/json",
        systemInstruction: `Eres el MOTOR DE ACTIVACIÓN DE NICHO. 
        Tu objetivo es crear el entorno estructural para el matching.
        Debes identificar variables críticas, construir un esquema de datos y definir pesos de scoring.`,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nicho_activo: { type: Type.STRING },
            modelo_datos_operativo: { type: Type.OBJECT },
            reglas_compatibilidad: { type: Type.ARRAY, items: { type: Type.STRING } },
            variables_scoring: { type: Type.OBJECT }
          },
          required: ['nicho_activo', 'modelo_datos_operativo', 'reglas_compatibilidad', 'variables_scoring']
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }

  /**
   * FASE 2: MATCHMAKING PROBABILÍSTICO
   */
  async runMatchmaking(need: string, nicheData: PipelinePhase1Result): Promise<PipelinePhase2Result> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Calcula las mejores coincidencias para la necesidad: "${need}" 
      usando la estructura del nicho: ${JSON.stringify(nicheData)}`,
      config: {
        responseMimeType: "application/json",
        systemInstruction: `Eres el MOTOR DE MATCHMAKING PROBABILÍSTICO.
        Tu objetivo es encontrar probabilidades de solución real.
        Aplica el score dinámico basado en especialización, reputación, logística y velocidad.`,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            top_matches_priorizados: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  proveedor_id: { type: Type.STRING },
                  nombre: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  probabilidad_resolucion: { type: Type.NUMBER }
                }
              }
            },
            justificacion_algoritmica: { type: Type.STRING }
          },
          required: ['top_matches_priorizados', 'justificacion_algoritmica']
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }

  /**
   * FASE 3: OPTIMIZACIÓN DE DECISIÓN
   */
  async optimizeDecision(matches: PipelinePhase2Result): Promise<PipelinePhase3Result> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Optimiza la decisión del usuario basándote en estos resultados: ${JSON.stringify(matches)}`,
      config: {
        responseMimeType: "application/json",
        systemInstruction: `Eres el OPTIMIZADOR DE DECISIÓN DEL USUARIO.
        Tu objetivo es reducir la sobrecarga cognitiva.
        Traduce métricas técnicas en impacto práctico y destaca la opción dominante.`,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            opcion_recomendada: { type: Type.STRING },
            comparacion_funcional: { type: Type.STRING },
            nivel_claridad_decision: { type: Type.NUMBER },
            accion_usuario: { type: Type.STRING }
          },
          required: ['opcion_recomendada', 'comparacion_funcional', 'nivel_claridad_decision', 'accion_usuario']
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
}
