
import { GoogleGenAI, Type } from "@google/genai";
import type { MysteryShopReport, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * MYSTERY SHOP v1 - AUDITOR FORENSE DE PLATAFORMA
 * Analiza la coherencia técnica, económica y de UX del sistema.
 */
export async function runMysteryShopAudit(
  appSnapshot: any,
  lang: Language = 'es'
): Promise<MysteryShopReport> {
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Realizar Auditoría Mystery Shop v1 sobre el siguiente estado de la aplicación: ${JSON.stringify(appSnapshot)}`,
    config: {
      systemInstruction: `
        ERES EL AUDITOR MYSTERY SHOP v1. Tu misión es encontrar incoherencias, errores de UX, fallas técnicas lógicas y oportunidades de mejora económica en la plataforma AutoSocio/ConnectX.
        
        CRITERIOS DE AUDITORÍA:
        1. Coherencia de Marca: ¿El lenguaje es autoritario y técnico (Estándar C1)?
        2. Flujo Económico: ¿Hay fricción innecesaria para que el usuario tome una decisión?
        3. Inconsistencias: ¿Hay datos que no cuadran entre módulos?
        4. UX/UI: ¿Hay elementos que confunden o que podrían ser más impactantes?

        SALIDA:
        Devuelve un JSON con un score general (0-100), un resumen ejecutivo y una lista de hallazgos (findings).
        Cada hallazgo debe tener: categoría, severidad, descripción, localización y solución sugerida.
      `,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          findings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING, enum: ['UX', 'TECHNICAL', 'ECONOMIC', 'INCONSISTENCY'] },
                severity: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
                description: { type: Type.STRING },
                location: { type: Type.STRING },
                suggestedFix: { type: Type.STRING }
              },
              required: ['category', 'severity', 'description', 'location', 'suggestedFix']
            }
          }
        },
        required: ['overallScore', 'summary', 'findings']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');

  return {
    ...parsed,
    findings: parsed.findings.map((f: any) => ({
      ...f,
      id: crypto.randomUUID(),
      status: 'OPEN',
      timestamp: new Date().toISOString()
    })),
    lastAudit: new Date().toISOString()
  };
}

/**
 * ENRIQUECEDOR DE HALLAZGOS (CAPA DE RAZONAMIENTO PROFUNDO)
 * Toma los hallazgos iniciales y genera sugerencias de alto nivel técnico y estratégico.
 */
export async function enrichFindingsWithAI(
  report: MysteryShopReport,
  appSnapshot: any,
  lang: Language = 'es'
): Promise<MysteryShopReport> {
  
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `Analizar y enriquecer los siguientes hallazgos de Mystery Shop: ${JSON.stringify(report.findings)} 
               Contexto de la App: ${JSON.stringify(appSnapshot)}`,
    config: {
      systemInstruction: `
        ERES EL CONSULTOR SENIOR DE ESTRATEGIA Y UX DE CONNECTX.
        Tu objetivo es tomar hallazgos técnicos o de UX básicos y transformarlos en sugerencias de mejora "Capa 5" (Ecosistema Externo y Valor Real).
        
        PARA CADA HALLAZGO:
        1. Analiza el impacto real en la conversión o en la autoridad de la marca.
        2. Genera una 'suggestedFix' mucho más detallada, técnica y contextualizada.
        3. Si el hallazgo es UX, sugiere patrones de diseño específicos (ej. Glassmorphism, Micro-interacciones).
        4. Si el hallazgo es Económico, sugiere modelos de monetización o arbitraje.

        SALIDA:
        Devuelve un JSON que sea un array de objetos con el 'id' del hallazgo original y la nueva 'suggestedFix' enriquecida.
      `,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            suggestedFix: { type: Type.STRING }
          },
          required: ['id', 'suggestedFix']
        }
      }
    }
  });

  const enrichments = JSON.parse(response.text || '[]');
  
  // Mapear los enriquecimientos de vuelta al reporte
  const enrichedFindings = report.findings.map(finding => {
    const enrichment = enrichments.find((e: any) => e.id === finding.id);
    return enrichment ? { ...finding, suggestedFix: enrichment.suggestedFix } : finding;
  });

  return {
    ...report,
    findings: enrichedFindings
  };
}
