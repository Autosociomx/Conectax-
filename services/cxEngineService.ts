import { GoogleGenAI, Type } from "@google/genai";

export interface C1Output {
  intent_level: string;
  vehicle_detected: string;
  piece_detected: string;
  risk_score: 'Bajo' | 'Medio' | 'Alto';
  required_validation_fields: string[];
  technical_notes: string;
}

export interface JodaOutput {
  public_reply: string;
  private_flow: {
    step_1: string;
    step_2: string;
    step_3: string;
  };
  psychological_strategy: string;
  follow_up_sequence: string;
}

export interface CXEngineResult {
  c1: C1Output;
  joda: JodaOutput;
}

export class CXEngineService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }

  /**
   * MOTOR C1: Análisis Técnico y Extracción de Entidades
   */
  async runC1Engine(text: string): Promise<C1Output> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza técnicamente esta publicación: "${text}"`,
      config: {
        systemInstruction: `Actúa como el Motor C1 de la infraestructura CX. 
        Tu objetivo es la VALIDACIÓN TÉCNICA RIGUROSA.
        
        TAREAS:
        1. Identificar intención de compra.
        2. Extraer Marca, Modelo y Año.
        3. Identificar la pieza exacta.
        4. Evaluar riesgo de devolución (Bajo/Medio/Alto).
        5. Listar campos técnicos obligatorios para validar compatibilidad.
        
        REGLA DE ORO: Si la pieza tiene variantes (ej: motor, lado, versión), el riesgo debe ser MEDIO o ALTO.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intent_level: { type: Type.STRING },
            vehicle_detected: { type: Type.STRING },
            piece_detected: { type: Type.STRING },
            risk_score: { type: Type.STRING, enum: ["Bajo", "Medio", "Alto"] },
            required_validation_fields: { type: Type.ARRAY, items: { type: Type.STRING } },
            technical_notes: { type: Type.STRING }
          },
          required: ["intent_level", "vehicle_detected", "piece_detected", "risk_score", "required_validation_fields", "technical_notes"]
        }
      }
    });

    if (!response.text) throw new Error("C1 Engine failure");
    return JSON.parse(response.text.trim());
  }

  /**
   * MOTOR JODA: Activación Conversacional basada en el output de C1
   */
  async runJodaEngine(c1Data: C1Output): Promise<JodaOutput> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Genera la estrategia conversacional basada en este análisis técnico: ${JSON.stringify(c1Data)}`,
      config: {
        systemInstruction: `Actúa como el Motor JODA de la infraestructura CX. 
        Tu objetivo es la CONVERSIÓN ESTRATÉGICA basada en la autoridad técnica de C1.
        
        TAREAS:
        1. Generar respuesta pública: Sin links, enfocada en la validación técnica mencionada por C1.
        2. Generar flujo privado de 3 pasos (Autoridad, Diagnóstico, Oferta).
        3. Definir estrategia psicológica y seguimiento.
        
        REGLA DE ORO: Usa los datos de C1 para demostrar que sabes exactamente qué necesita el cliente y qué riesgos evitar.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            public_reply: { type: Type.STRING },
            private_flow: {
              type: Type.OBJECT,
              properties: {
                step_1: { type: Type.STRING },
                step_2: { type: Type.STRING },
                step_3: { type: Type.STRING }
              },
              required: ["step_1", "step_2", "step_3"]
            },
            psychological_strategy: { type: Type.STRING },
            follow_up_sequence: { type: Type.STRING }
          },
          required: ["public_reply", "private_flow", "psychological_strategy", "follow_up_sequence"]
        }
      }
    });

    if (!response.text) throw new Error("JODA Engine failure");
    return JSON.parse(response.text.trim());
  }

  /**
   * Flujo Automatizado: C1 -> JODA
   */
  async analyzePost(text: string): Promise<CXEngineResult> {
    // 1. Ejecutar C1
    const c1Result = await this.runC1Engine(text);
    
    // 2. Ejecutar JODA utilizando la salida de C1 como entrada
    const jodaResult = await this.runJodaEngine(c1Result);

    return {
      c1: c1Result,
      joda: jodaResult
    };
  }
}
