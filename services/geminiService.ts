
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Agent, Language, FunnelPhase, PsychMetrics, AgentResponse, Part } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Genera una imagen técnica basada en una descripción
 */
export async function generateTechnicalDiagram(description: string): Promise<string | undefined> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-quality 3D technical schematic diagram of a vehicle part: ${description}. Style: Cyber-industrial, X-ray view, glowing cyan highlights on the specific part, dark blueprint background, ultra-detailed mechanical engineering aesthetic.` }]
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating technical diagram:", error);
  }
  return undefined;
}

/**
 * Added missing function to rank and audit part recommendations using Gemini
 */
export async function getEnhancedPartRecommendations(
  adn: string,
  parts: Part[],
  lang: Language = 'es'
): Promise<any[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Audit and rank these parts for compatibility with ${adn} in ${lang}: ${JSON.stringify(parts.map(p => ({ id: p.id, name: p.name })))}`,
      config: {
        systemInstruction: `Rank parts by viability score (0-10) and provide a 1-sentence technical recommendation for each. Mark the absolute best match as isMostRecommended.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              partId: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              viabilityScore: { type: Type.NUMBER },
              isMostRecommended: { type: Type.BOOLEAN }
            },
            required: ['partId', 'recommendation', 'viabilityScore', 'isMostRecommended']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export async function processStrategicResponse(
  agent: Agent,
  message: string,
  history: { role: string; content: string }[],
  lang: Language = 'es',
  uploadedImage: { data: string; mimeType: string } | null = null
): Promise<AgentResponse> {
  
  const contentsParts: any[] = [{ text: message || "Sincronizando Mando Universal..." }];
  if (uploadedImage) {
    contentsParts.push({ inlineData: { data: uploadedImage.data, mimeType: uploadedImage.mimeType } });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: contentsParts },
      config: {
        systemInstruction: `
          ${agent.prompt}
          ESTÁNDAR DE MANDO C1 - VISIÓN 3D ACTIVADA.
          
          TAREA: 
          1. Identifica el módulo técnico.
          2. Genera un dictamen preciso.
          3. IMPORTANTE: Crea una descripción visual (visual_prompt) para un diagrama 3D que ayude al usuario a localizar la pieza o entender la falla.
          
          Responde en JSON:
          {
            "text": "Tu dictamen técnico...",
            "visual_prompt": "Descripción de la imagen técnica 3D (ej: Bomba de dirección de Nissan Pickup 84 resaltada en motor)",
            "phase": "DIAGNOSTIC",
            "metrics": {
              "confidence": 5,
              "pressure": 1,
              "dominance": 5,
              "manipulationRisk": "low",
              "activeModules": ["Nombre_Modulo"]
            }
          }
        `,
        responseMimeType: 'application/json'
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    // Generar la imagen técnica si hay un prompt visual
    let imageUrl = undefined;
    if (result.visual_prompt) {
      imageUrl = await generateTechnicalDiagram(result.visual_prompt);
    }

    return { 
      text: result.text || "Dictamen técnico sincronizado.", 
      metrics: result.metrics, 
      phase: result.phase as FunnelPhase,
      visualImageUrl: imageUrl,
      visualPrompt: result.visual_prompt
    };
  } catch (error) {
    console.error("AI Node Failure:", error);
    return {
      text: "ERROR DE SINCRONIZACIÓN: Reintente.",
      phase: 'DIAGNOSTIC',
      metrics: { confidence: 1, pressure: 5, dominance: 1, manipulationRisk: 'medium', activeModules: ['Error'] }
    };
  }
}

export async function sendMessageToAgent(
  agent: Agent, 
  message: string, 
  lang: Language = 'es',
  uploadedImage: { data: string; mimeType: string } | null = null
): Promise<string> {
    const res = await processStrategicResponse(agent, message, [], lang, uploadedImage);
    return res.text;
}

export async function generateDiagnosticGuide(adn: string, scenario: any, lang: Language = 'es'): Promise<any> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generar Guía ADN Forense para: ${adn} en ${lang}`,
    config: { responseMimeType: 'application/json' }
  });
  return { ...JSON.parse(response.text || '{}'), scenario };
}

export async function identifyPartKeywords(searchTerm: string, uploadedImage: any, lang: Language = 'es'): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extraer nombres de piezas en ${lang}: ${searchTerm}`,
    config: { responseMimeType: 'application/json' }
  });
  return JSON.parse(response.text || '[]');
}
