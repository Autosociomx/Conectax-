
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SparklesIcon from './icons/SparklesIcon';
import CogIcon from './icons/CogIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import NexusIcon from './icons/NexusIcon';
import SyntheticKernel from './SyntheticKernel';

const NexusOrchestrator: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 1, name: "Núcleo Alfa", role: "C1 Validation", color: "from-indigo-600 to-blue-600", x: 50, y: 50 },
    { id: 2, name: "Motor JODA", role: "Cognitive Persuasion", color: "from-emerald-600 to-teal-600", x: 20, y: 30 },
    { id: 3, name: "Arbitraje Global", role: "Sourcing Logistics", color: "from-amber-600 to-orange-600", x: 80, y: 30 },
    { id: 4, name: "Forense Digital", role: "Technical Audit", color: "from-cyan-600 to-sky-600", x: 20, y: 70 },
    { id: 5, name: "ROI Engine", role: "Economic Optimization", color: "from-violet-600 to-purple-600", x: 80, y: 70 },
  ];

  const handleNodeClick = (id: number) => {
    setActiveNode(id);
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-12 animate-slide-up pb-40 px-4">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Nexus Strategic Orchestrator</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
          Nexus<span className="text-indigo-500">Node</span>
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto text-lg leading-relaxed">
          Visualización en tiempo real de la infraestructura cognitiva. Orqueste la monetización de intención mediante la interconexión de nodos especializados.
        </p>
      </header>

      <div className="relative aspect-video bg-[#010208] rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl group">
        {/* Neural Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #1e1b4b 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map(node => node.id !== 1 && (
            <motion.line
              key={`line-${node.id}`}
              x1="50%"
              y1="50%"
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke={activeNode === node.id || activeNode === 1 ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.05)"}
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </svg>

          {/* Central Synthetic Nucleus Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-[500px] h-[500px] border border-indigo-500/10 rounded-full flex items-center justify-center"
            >
              <div className="w-[400px] h-[400px] border border-indigo-500/5 rounded-full"></div>
            </motion.div>
          </div>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.button
            key={node.id}
            onClick={() => handleNodeClick(node.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-1 rounded-3xl group/node transition-all ${
              activeNode === node.id ? 'scale-110 z-20' : 'scale-100 z-10 hover:scale-105'
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ y: -5 }}
          >
            <div className={`relative px-8 py-6 bg-gradient-to-br ${node.color} rounded-[2rem] shadow-2xl border border-white/20 flex flex-col items-center text-center gap-2`}>
              {activeNode === node.id && (
                <div className="absolute -inset-4 bg-inherit blur-2xl opacity-40 rounded-full animate-pulse"></div>
              )}
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                {node.id === 1 && <NexusIcon className="w-6 h-6" />}
                {node.id === 2 && <SparklesIcon className="w-6 h-6" />}
                {node.id === 3 && <CogIcon className="w-6 h-6" />}
                {node.id === 4 && <VerifiedIcon className="w-6 h-6" />}
                {node.id === 5 && <NexusIcon className="w-6 h-6 rotate-45" />}
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tighter text-sm leading-none">{node.name}</h4>
                <p className="text-[8px] text-white/60 font-bold uppercase tracking-widest mt-1">{node.role}</p>
              </div>
            </div>
          </motion.button>
        ))}

        {/* Sync Status Overlay */}
        <AnimatePresence>
          {isSyncing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 z-50"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-indigo-400 font-black uppercase tracking-[0.5em] text-xs">Sincronizando Nodo Nexus...</p>
                <p className="text-gray-500 text-[8px] mt-2 uppercase tracking-widest">Validando Integridad de Infraestructura C1</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-6">
          <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400">
            <NexusIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Orquestación C1</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            La infraestructura Nexus permite el ruteo dinámico de solicitudes hacia el nodo con mayor probabilidad de resolución técnica y económica.
          </p>
        </div>
        <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-6">
          <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400">
            <SparklesIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Activación JODA</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Cada nodo Nexus aplica protocolos de persuasión cognitiva para transformar la validación técnica en transacciones reales de alto valor.
          </p>
        </div>
        <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-6">
          <div className="w-12 h-12 bg-cyan-600/20 rounded-2xl flex items-center justify-center text-cyan-400">
            <VerifiedIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Auditoría Forense</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Monitoreo constante de la salud del ecosistema, asegurando que cada nodo cumpla con el Estándar de Mando C1.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NexusOrchestrator;
