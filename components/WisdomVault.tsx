
import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';
import TrophyIcon from './icons/TrophyIcon';
import CogIcon from './icons/CogIcon';
import VerifiedIcon from './icons/VerifiedIcon';

const WisdomVault: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<number>(1);

  const blocks = [
    {
      id: 1,
      title: "Filosofía Estratégica",
      subtitle: "20 Moralejas Profundas",
      icon: <SparklesIcon className="w-6 h-6" />,
      content: [
        "La mente que busca certeza pierde oportunidades; la que tolera incertidumbre crea futuros.",
        "No es más inteligente quien sabe más, sino quien actualiza sus creencias más rápido.",
        "Toda decisión es una apuesta contra el desconocimiento; aprende a apostar con datos y humildad.",
        "El cerebro protege el pasado; la estrategia protege el futuro.",
        "Lo que no cuestionas se convierte en límite invisible.",
        "La percepción no describe la realidad… la construye. Cuida lo que interpretas.",
        "El pensamiento lento construye imperios; el pensamiento impulsivo construye excusas.",
        "La mente reacciona al presente, pero el liderazgo vive en el horizonte.",
        "La ventaja estratégica no es saber más… es ver antes.",
        "La emoción mal dirigida distorsiona la realidad; la emoción enfocada la potencia.",
        "El cerebro aprende más del error explicado que del éxito celebrado.",
        "Lo que temes evitar define el tamaño de tu crecimiento.",
        "La atención es selección de realidad; decide dónde vivir mentalmente.",
        "Pensar sin actuar crea ansiedad; actuar sin pensar crea caos.",
        "La mente ama patrones, incluso falsos; verifica antes de creer.",
        "La complejidad impresiona, la simplicidad domina.",
        "La velocidad mental sin dirección es desgaste cognitivo.",
        "El aprendizaje verdadero modifica conducta, no solo conocimiento.",
        "Toda estrategia nace primero como percepción diferente.",
        "La mente disciplinada convierte el tiempo en ventaja acumulativa."
      ]
    },
    {
      id: 2,
      title: "Entrenamiento Mental",
      subtitle: "Prácticas Neuronales Repetibles",
      icon: <CogIcon className="w-6 h-6" />,
      sections: [
        {
          name: "Enfoque y Atención",
          items: [
            "Entrena tu atención como músculo: lo que atiendes se fortalece.",
            "El cerebro mejora lo que mide diariamente.",
            "La distracción crónica es entrenamiento involuntario de debilidad mental.",
            "La concentración profunda es ventaja competitiva moderna."
          ]
        },
        {
          name: "Regulación Emocional",
          items: [
            "Nombrar una emoción reduce su intensidad neuronal.",
            "Respirar lento enseña al cerebro que hay control.",
            "La reacción automática es programación antigua; la pausa es inteligencia entrenada.",
            "La estabilidad emocional es habilidad, no rasgo."
          ]
        },
        {
          name: "Aprendizaje y Memoria",
          items: [
            "Recordar sin aplicar es acumulación inútil.",
            "El cerebro consolida aprendizaje durante el descanso.",
            "La dificultad moderada fortalece la memoria.",
            "Explicar en voz alta reorganiza el pensamiento."
          ]
        },
        {
          name: "Toma de Decisiones",
          items: [
            "Decide con información suficiente, no perfecta.",
            "La indecisión prolongada es desgaste cognitivo oculto.",
            "Simular escenarios entrena al cerebro para el futuro.",
            "Elegir conscientemente fortalece identidad mental."
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Liderazgo y Ventas",
      subtitle: "Estrategia para Emprendedores",
      icon: <TrophyIcon className="w-6 h-6" />,
      sections: [
        {
          name: "Liderazgo",
          items: [
            "Las personas siguen estados emocionales, no instrucciones.",
            "El cerebro confía en coherencia más que en autoridad.",
            "Liderar es regular emociones colectivas.",
            "La claridad reduce resistencia mental del equipo.",
            "La seguridad psicológica libera inteligencia grupal.",
            "La incertidumbre del líder se contagia más rápido que sus palabras."
          ]
        },
        {
          name: "Ventas",
          items: [
            "El cliente compra alivio emocional, no características técnicas.",
            "La decisión ocurre antes de la justificación racional.",
            "Reducir fricción mental aumenta conversión.",
            "La confianza repetida crea preferencia automática.",
            "Las historias activan memoria emocional de largo plazo.",
            "La urgencia percibida acelera procesamiento decisional."
          ]
        },
        {
          name: "Emprendimiento",
          items: [
            "Emprender es gestionar estrés cognitivo prolongado.",
            "La visión sostenida reorganiza prioridades neuronales.",
            "El cerebro teme perder más de lo que desea ganar.",
            "La adaptación rápida es inteligencia aplicada al entorno.",
            "El progreso visible libera dopamina motivacional.",
            "La resiliencia es tolerancia entrenada a la incertidumbre."
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Manifiesto Neurocientífico",
      subtitle: "Principios de Mentalidad Empresarial",
      icon: <VerifiedIcon className="w-6 h-6" />,
      principles: [
        { id: 1, name: "Realidad Cognitiva", desc: "No reaccionamos a hechos… reaccionamos a interpretaciones." },
        { id: 2, name: "Energía Mental", desc: "La atención es recurso finito. Quien gestiona su enfoque gestiona su destino." },
        { id: 3, name: "Adaptación Neuronal", desc: "Todo lo repetido se automatiza. Diseña hábitos antes de resultados." },
        { id: 4, name: "Emoción Funcional", desc: "La emoción dirige conducta más rápido que la lógica." },
        { id: 5, name: "Simplicidad Cognitiva", desc: "El cerebro favorece lo comprensible. La complejidad reduce ejecución." },
        { id: 6, name: "Anticipación", desc: "El cerebro es predictivo. El negocio que predice lidera." },
        { id: 7, name: "Progreso Neuroquímico", desc: "El avance visible genera motivación biológica." },
        { id: 8, name: "Identidad Operativa", desc: "La conducta sigue la identidad. Construye mentalidad antes que resultados." },
        { id: 9, name: "Aprendizaje Continuo", desc: "La neuroplasticidad es ventaja competitiva humana." },
        { id: 10, name: "Autorregulación", desc: "El control emocional es control estratégico." }
      ]
    },
    {
      id: 5,
      title: "Prompts Maestros Canva",
      subtitle: "Activos Visuales Alfa (C1)",
      icon: <SparklesIcon className="w-6 h-6" />,
      prompts: [
        { name: "El Orquestador", text: "High-tech futuristic search interface, 'ConnectX DNA' glowing text, neural network lines connecting car parts and global maps, dark blue and emerald green color palette, cinematic lighting." },
        { name: "Maestría Neurocognitiva", text: "Human brain glowing with digital circuitry, integrated with automotive engine blueprints, 'Neuro-Strategy' concept, warm amber and deep indigo tones, editorial photography style." },
        { name: "El Mentor Alfa", text: "Professional automotive engineer portrait, wearing high-tech glasses reflecting data, background of a futuristic laboratory with holographic car engines, shallow depth of field." },
        { name: "Sourcing Global", text: "Global shipping ports and cargo planes connected by glowing fiber optic lines, digital globe in the center, 'Global Arbitrage' theme, dark aesthetics with neon indigo accents." },
        { name: "Auditoría Mystery Shop", text: "A magnifying glass inspecting a digital car engine, revealing hidden green code and 'C1 Quality' labels, clean white and slate gray background, minimalist technical style." },
        { name: "Visión Artificial", text: "First-person view of a smartphone scanning a complex mechanical part, augmented reality overlays showing technical data, emerald green scanning lines, realistic hands." },
        { name: "Cimientos Empresariales", text: "Abstract architectural foundation made of glowing digital blocks, a path leading to a bright horizon, 'Foundational Roadmap' concept, solid and trustworthy feel." },
        { name: "Flota Inteligente", text: "A fleet of futuristic trucks and vans driving on a digital highway, real-time data bubbles floating above each vehicle, sunset lighting, dynamic motion blur." },
        { name: "El Manifiesto", text: "Elegant minimalist typography on a dark textured stone background, 'Strategic Wisdom' concept, a single beam of light hitting a golden car piston, zen-like professional atmosphere." },
        { name: "Certificación Alfa", text: "3D metallic badge, 'ALFA CERTIFIED' embossed text, silver and indigo chrome finish, glowing core, floating in a dark void with subtle particles." }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-16 animate-slide-up pb-40">
      <header className="space-y-6 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Bóveda de Sabiduría Estratégica</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
          Neuro<span className="text-indigo-500">Cognitive</span> Vault
        </h2>
        <p className="text-gray-400 font-light max-w-3xl mx-auto text-xl leading-relaxed">
          "La empresa es una extensión del cerebro humano organizado. Optimizamos la raíz mental para dominar la ejecución económica."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-4 space-y-4">
          {blocks.map((block) => (
            <button
              key={block.id}
              onClick={() => setActiveBlock(block.id)}
              className={`w-full text-left p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${
                activeBlock === block.id 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl scale-105 z-10' 
                  : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={`p-4 rounded-2xl ${activeBlock === block.id ? 'bg-white/20' : 'bg-white/5'} transition-colors`}>
                  {block.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter leading-none">{block.title}</h4>
                  <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${activeBlock === block.id ? 'text-indigo-200' : 'text-gray-600'}`}>
                    {block.subtitle}
                  </p>
                </div>
              </div>
              {activeBlock === block.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-50"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <div className="glass-card border border-white/10 rounded-[4rem] p-10 md:p-16 h-full relative overflow-hidden bg-black/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[130px] -z-10"></div>
            
            <div className="space-y-12 relative z-10">
              {activeBlock === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blocks[0].content?.map((item, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all group">
                      <div className="flex gap-4">
                        <span className="text-indigo-500 font-black text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                        <p className="text-gray-300 text-sm font-light leading-relaxed italic group-hover:text-white transition-colors">
                          "{item}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(activeBlock === 2 || activeBlock === 3) && (
                <div className="space-y-12">
                  {blocks[activeBlock - 1].sections?.map((section, i) => (
                    <div key={i} className="space-y-6">
                      <h5 className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs border-l-2 border-indigo-500 pl-4">
                        {section.name}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item, j) => (
                          <div key={j} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-4">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-gray-400 text-xs font-light leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeBlock === 4 && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blocks[3].principles?.map((p) => (
                      <div key={p.id} className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-[2.5rem] space-y-4 hover:bg-indigo-500/10 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Principio {p.id}</span>
                          <VerifiedIcon className="w-4 h-4 text-emerald-500" />
                        </div>
                        <h6 className="text-xl font-black text-white uppercase tracking-tighter">{p.name}</h6>
                        <p className="text-gray-400 text-xs font-light leading-relaxed italic">"{p.desc}"</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-10 border-t border-white/10 text-center">
                    <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-[10px]">Declaración Final</p>
                    <p className="text-white text-2xl font-black tracking-tighter mt-4 italic">
                      "Pensamos para percibir mejor. Percibimos para decidir mejor. Decidimos para actuar mejor. Actuamos para adaptarnos mejor."
                    </p>
                  </div>
                </div>
              )}

              {activeBlock === 5 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    {blocks[4].prompts?.map((prompt, i) => (
                      <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4 group hover:border-indigo-500/50 transition-all">
                        <div className="flex items-center justify-between">
                          <h6 className="text-lg font-black text-white uppercase tracking-tighter">{prompt.name}</h6>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(prompt.text);
                              alert("Prompt copiado al portapapeles");
                            }}
                            className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-[8px] text-indigo-400 font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                          >
                            Copiar Prompt
                          </button>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                          <p className="text-gray-400 text-xs font-mono leading-relaxed select-all">
                            {prompt.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WisdomVault;
