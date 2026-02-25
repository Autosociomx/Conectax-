
import { GoogleGenAI, Type } from "@google/genai";
import type { IntentObject, Platform, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * MOTOR CENTRAL DE INTENCIÓN (MCI)
 * Sistema de 6 capas cognitivas para interpretar la necesidad humana.
 */
export async function interpretUserIntent(
  input: string, 
  lang: Language = 'es',
  context?: any
): Promise<IntentObject> {
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Procesar el siguiente input del usuario bajo el Estándar de Mando C1 y la Arquitectura de ConnectX: "${input}"`,
    config: {
      systemInstruction: `
        ERES EL MOTOR DE ORQUESTACIÓN (CAPA 2) DEL SISTEMA OPERATIVO ECONÓMICO CONNECTX.
        Tu tarea es transformar lenguaje humano en una estructura de datos modular.
        
        CAPAS DE PROCESAMIENTO:
        1. Identificación de Nicho: Determina a qué mercado pertenece la solicitud (autosocio, homesocio, techsocio).
        2. Extracción de Datos: Extrae los campos específicos según el nicho identificado.
        3. Evaluación Económica: Estima el valor de la transacción y la probabilidad de cierre.
        4. Enrutamiento: Decide la vertical recomendada.
        5. Sabiduría Neurocognitiva: Aplica principios de toma de decisiones estratégicas para optimizar el ROI mental y económico.

        NICHOS DISPONIBLES:
        - autosocio: Todo lo relacionado con vehículos, piezas, reparaciones.
        - homesocio: Todo lo relacionado con bienes raíces, casas, departamentos, terrenos.
        - techsocio: Todo lo relacionado con gadgets, componentes electrónicos, sourcing de hardware.

        REGLAS DE SALIDA:
        - Si el nicho es 'autosocio', busca: marca, modelo, anio, pieza.
        - Si el nicho es 'homesocio', busca: ubicacion, presupuesto, habitaciones.
        - Devuelve siempre un JSON válido.
      `,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          problem_type: { type: Type.STRING },
          sector: { type: Type.STRING, enum: ['AUTOMOTIVE', 'COMMERCE', 'INDUSTRIAL', 'EXPLORATION'] },
          technical_need: { type: Type.STRING },
          urgency_level: { type: Type.NUMBER, description: "0 to 1" },
          economic_value: { type: Type.NUMBER, description: "Estimated USD" },
          decision_probability: { type: Type.NUMBER, description: "0 to 1" },
          complexity_level: { type: Type.NUMBER, description: "0 to 1" },
          recommended_vertical: { type: Type.STRING, enum: ['autosocio', 'connectx', 'ecosystem'] },
          niche_id: { type: Type.STRING, enum: ['autosocio', 'homesocio', 'techsocio'] },
          extracted_data: { 
            type: Type.OBJECT,
            properties: {
              marca: { type: Type.STRING },
              modelo: { type: Type.STRING },
              anio: { type: Type.NUMBER },
              pieza: { type: Type.STRING },
              ubicacion: { type: Type.STRING },
              presupuesto: { type: Type.NUMBER },
              habitaciones: { type: Type.NUMBER }
            }
          },
          strategy: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              roi_impact: { type: Type.STRING }
            },
            required: ['title', 'steps', 'roi_impact']
          },
          technical_audit: {
            type: Type.OBJECT,
            properties: {
              integrity_check: { type: Type.STRING },
              data_density: { type: Type.NUMBER, description: "0 to 1" },
              validation_status: { type: Type.STRING }
            },
            required: ['integrity_check', 'data_density', 'validation_status']
          },
          confidence_score: { type: Type.NUMBER }
        },
        required: ['problem_type', 'sector', 'technical_need', 'urgency_level', 'economic_value', 'decision_probability', 'complexity_level', 'recommended_vertical', 'niche_id', 'confidence_score', 'technical_audit']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');

  return {
    intent_id: crypto.randomUUID(),
    user_id: 'GUEST-USER',
    timestamp: new Date().toISOString(),
    raw_input: input,
    ...parsed
  };
}
