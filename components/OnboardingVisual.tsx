
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CogIcon from './icons/CogIcon';
import SparklesIcon from './icons/SparklesIcon';
import VerifiedIcon from './icons/VerifiedIcon';

interface OnboardingVisualProps {
  onComplete: () => void;
  labels: any;
  platform: string;
}

const OnboardingVisual: React.FC<OnboardingVisualProps> = ({ onComplete, labels, platform }) => {
  const [step, setStep] = useState(0);
  const onboarding = labels.onboarding;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 2) {
        setStep(step + 1);
      } else {
        // Wait a bit on the last step before completing
        setTimeout(onComplete, 4000);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 z-[300] bg-[#020617] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)] animate-pulse" />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            className="max-w-2xl text-center space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <SparklesIcon className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">{onboarding.subtitle}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
              {onboarding.title.split(' ')[0]} <span className="text-indigo-500">{onboarding.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed italic">
              "{onboarding.description}"
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl text-center space-y-12"
          >
            <div className="relative inline-block">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 bg-indigo-600/20 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
              >
                <CogIcon className="w-16 h-16 text-indigo-400" />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <VerifiedIcon className="w-6 h-6 text-indigo-600" />
              </motion.div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">El Engranaje de <span className="text-indigo-500">Transmutación</span></h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed italic">
                {onboarding.gear_desc}
              </p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl text-center space-y-10"
          >
            <div className="w-24 h-24 bg-indigo-500 rounded-full mx-auto animate-ping opacity-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Atracción <span className="text-indigo-500">Psicológica</span></h2>
              <p className="text-2xl text-indigo-400 font-black uppercase tracking-widest leading-tight">
                {onboarding.attraction}
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-indigo-500 rounded-full"
                  />
                ))}
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] pt-10">Iniciando Protocolo de Mando Único...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onComplete}
        className="absolute bottom-12 right-12 text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
      >
        Omitir Introducción →
      </button>
    </div>
  );
};

export default OnboardingVisual;
