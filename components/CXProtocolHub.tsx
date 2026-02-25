
import React, { useState } from 'react';
import VerifiedIcon from './icons/VerifiedIcon';
import SparklesIcon from './icons/SparklesIcon';
import CogIcon from './icons/CogIcon';
import SearchIcon from './icons/SearchIcon';

const CXProtocolHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'C1' | 'JODA' | 'TOOLS' | 'CASE_STUDY'>('C1');

  const caseStudy = {
    post: "Necesito bomba de gasolina para Nissan Versa 2014, ¿alguien vende?",
    c1_analysis: {
      intent_detected: true,
      intent_type: "Compra urgente",
      vehicle_detected: "Nissan Versa 2014",
      technical_risks: [
        "Variación entre módulo completo y solo bomba",
        "Posible diferencia en conector eléctrico",
        "Diferencia en presión según versión"
      ],
      required_validation: [
        "Confirmar motor exacto (1.6L u otro)",
        "Confirmar transmisión",
        "Confirmar si requiere módulo completo o solo bomba",
        "Validar número de parte si está disponible"
      ]
    },
    risk_level: {
      level: "Medio",
      reason: "Riesgo de devolución si no se valida tipo de módulo y conector eléctrico."
    },
    public_reply_joda: "Te puedo ayudar a validar la compatibilidad exacta para tu Versa 2014 y evitar que compres una que no le quede. Escríbeme por privado y revisamos los detalles técnicos.",
    private_flow: {
      step_1_authority: "Perfecto, confirmo que es Nissan Versa 2014. Para asegurar compatibilidad exacta necesito confirmar algunos detalles.",
      validation_questions: [
        "¿Es motor 1.6L?",
        "¿Es transmisión manual o automática?",
        "¿Buscas módulo completo con flotador o solo la bomba?",
        "¿Tienes el número de parte anterior?"
      ],
      explanation: "Estoy validando presión y tipo de conector para evitar devoluciones.",
      offer_structure: [
        "Opción económica",
        "Opción equilibrada",
        "Opción premium"
      ]
    },
    legal_notice: "Este enlace puede generar comisión para nosotros sin costo adicional para ti. La disponibilidad y precio pueden cambiar según el vendedor."
  };

  const c1Checklist = [
    { category: "Intención", items: ["Necesidad real expresada", "Intención de compra vs consulta", "Urgencia implícita"] },
    { category: "Vehículo", items: ["Marca/Modelo/Año", "Motor/Versión", "Transmisión/VIN"] },
    { category: "Pieza", items: ["Nombre exacto", "Lado (L/R)", "Sensor/Manual/Auto", "Síntoma de fallo"] },
    { category: "Mercado Libre", items: ["Reputación Verde", "Fotos reales", "Garantía mencionada", "Tiempo de envío"] }
  ];

  const jodaSteps = [
    { step: 1, title: "Activación Pública", desc: "Autoridad sin links. 'Te ayudo a validar por privado'." },
    { step: 2, title: "Confirmación", desc: "Validar datos técnicos del vehículo y pieza." },
    { step: 3, title: "Validación", desc: "Mostrar el proceso de búsqueda profesional." },
    { step: 4, title: "Opciones", desc: "Presentar máximo 3 opciones (Económica, Equilibrada, Premium)." },
    { step: 5, title: "Cierre", desc: "Aviso legal + Enlace de afiliado + Seguimiento." }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-12 animate-slide-up pb-40 px-4">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Protocolo Operativo Partner CX</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
          ConnectX<span className="text-indigo-500"> Protocol Hub</span>
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto text-lg leading-relaxed">
          Estructura lógica para la validación técnica (C1) y activación de ventas (JODA).
        </p>
      </header>

      <div className="flex justify-center gap-4 flex-wrap">
        {['C1', 'JODA', 'TOOLS', 'CASE_STUDY'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105' 
                : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'
            }`}
          >
            {tab === 'CASE_STUDY' ? 'Ejemplo Real' : `Agente ${tab}`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'C1' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c1Checklist.map((group, i) => (
              <div key={i} className="glass-card p-8 border border-white/10 rounded-[2.5rem] space-y-6 bg-black/40">
                <h4 className="text-indigo-400 font-black uppercase tracking-widest text-[10px] border-b border-white/5 pb-4">
                  {group.category}
                </h4>
                <ul className="space-y-4">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 group">
                      <div className="w-5 h-5 border border-white/20 rounded-lg flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                        <VerifiedIcon className="w-3 h-3 text-indigo-500 opacity-0 group-hover:opacity-100" />
                      </div>
                      <span className="text-gray-400 text-xs font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'JODA' && (
          <div className="space-y-6">
            {jodaSteps.map((s) => (
              <div key={s.step} className="flex items-center gap-8 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-indigo-500/5 transition-all group">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter">{s.title}</h4>
                  <p className="text-gray-400 text-sm font-light italic">"{s.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'TOOLS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-indigo-500/10 border border-indigo-500/20 rounded-[3rem] space-y-6">
              <h5 className="text-white font-black uppercase tracking-widest text-xs">Nivel 1: Manual</h5>
              <ul className="space-y-3 text-gray-400 text-xs italic">
                <li>• Facebook (Perfil Pro)</li>
                <li>• Mercado Libre Afiliados</li>
                <li>• Google Sheets (CRM)</li>
                <li>• ChatGPT (Validación)</li>
              </ul>
            </div>
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6">
              <h5 className="text-white font-black uppercase tracking-widest text-xs">Nivel 2: Optimización</h5>
              <ul className="space-y-3 text-gray-400 text-xs italic">
                <li>• Text Blaze (Plantillas)</li>
                <li>• Notion CRM</li>
                <li>• Bitly Personalizado</li>
              </ul>
            </div>
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6 opacity-50">
              <h5 className="text-white font-black uppercase tracking-widest text-xs">Nivel 3: Escala</h5>
              <ul className="space-y-3 text-gray-400 text-xs italic">
                <li>• ManyChat (Asistente)</li>
                <li>• Airtable (Base de Datos)</li>
                <li>• Zapier (Automatización)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'CASE_STUDY' && (
          <div className="space-y-10 animate-slide-up">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <SearchIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Publicación en Facebook</h4>
                  <p className="text-white text-lg font-bold italic">"{caseStudy.post}"</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] space-y-4">
                  <h5 className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">Análisis C1 (Técnico)</h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-white text-xs font-bold">{caseStudy.c1_analysis.intent_type} detectada</span>
                    </div>
                    <ul className="space-y-2">
                      {caseStudy.c1_analysis.technical_risks.map((risk, i) => (
                        <li key={i} className="text-gray-400 text-[10px] italic flex items-start gap-2">
                          <span className="text-red-500">•</span> {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                  <h5 className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Validación Requerida</h5>
                  <ul className="grid grid-cols-1 gap-2">
                    {caseStudy.c1_analysis.required_validation.map((v, i) => (
                      <li key={i} className="text-gray-300 text-[10px] flex items-center gap-2">
                        <VerifiedIcon className="w-3 h-3 text-indigo-500" /> {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] space-y-4">
                  <h5 className="text-emerald-500 font-black uppercase tracking-widest text-[10px]">Respuesta JODA (Pública)</h5>
                  <p className="text-white text-sm italic leading-relaxed">"{caseStudy.public_reply_joda}"</p>
                </div>

                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6">
                  <h5 className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Flujo Privado Estructurado</h5>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">Paso 1: Autoridad</p>
                      <p className="text-gray-300 text-xs italic">"{caseStudy.private_flow.step_1_authority}"</p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">Preguntas Críticas</p>
                      <ul className="space-y-2">
                        {caseStudy.private_flow.validation_questions.map((q, i) => (
                          <li key={i} className="text-white text-xs font-bold">• {q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-10 bg-indigo-600 rounded-[3rem] shadow-2xl text-center space-y-6">
        <h3 className="text-white text-3xl font-black uppercase tracking-tighter">Aviso Legal Obligatorio</h3>
        <p className="text-indigo-100 text-lg font-light italic max-w-3xl mx-auto">
          "Este enlace puede generar comisión para nosotros sin costo adicional para ti. La disponibilidad y precio pueden cambiar según el vendedor."
        </p>
        <button 
          onClick={() => {
            navigator.clipboard.writeText("Este enlace puede generar comisión para nosotros sin costo adicional para ti. La disponibilidad y precio pueden cambiar según el vendedor.");
            alert("Aviso legal copiado");
          }}
          className="px-8 py-3 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all"
        >
          Copiar Aviso Legal
        </button>
      </div>
    </div>
  );
};

export default CXProtocolHub;
