
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AUTOSOCIO_AGENTS, CONNECTX_AGENTS, SUPPORTED_LANGUAGES, getLabels } from './constants';
import type { Agent, UserProfile, Language, FunnelPhase, PsychMetrics, Platform, View, IntentObject } from './types';
import AgentCard from './components/AgentCard';
import AgentDetailModal from './components/AgentDetailModal';
import AffiliateMarketplace from './components/AffiliateMarketplace';
import AcademyPortal from './components/AcademyPortal';
import ConnectXControl from './components/ConnectXControl';
import FoundationalRoadmap from './components/FoundationalRoadmap';
import OptimizationEngine from './components/OptimizationEngine';
import FleetInventory from './components/FleetInventory';
import AffiliateDashboard from './components/AffiliateDashboard';
import AdminControlHub from './components/AdminControlHub';
import MarketingStudio from './components/MarketingStudio';
import MysteryShopAuditor from './components/MysteryShopAuditor';
import WisdomVault from './components/WisdomVault';
import VisionAnalysis from './components/VisionAnalysis';
import CXProtocolHub from './components/CXProtocolHub';
import CXDashboard from './components/CXDashboard';
import CogIcon from './components/icons/CogIcon';
import SearchIcon from './components/icons/SearchIcon';
import SparklesIcon from './components/icons/SparklesIcon';
import AcademicIcon from './components/icons/AcademicIcon';
import TrophyIcon from './components/icons/TrophyIcon';
import UserGroupIcon from './components/icons/UserGroupIcon';
import TruckIcon from './components/icons/TruckIcon';
import DashboardIcon from './components/icons/DashboardIcon';
import VerifiedIcon from './components/icons/VerifiedIcon';
import CartIcon from './components/icons/CartIcon';
import MegaphoneIcon from './components/icons/MegaphoneIcon';
import CameraIcon from './components/icons/CameraIcon';

// Custom Home Icon for Inicio
const HomeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const App: React.FC = () => {
  const [isSystemInitializing, setIsSystemInitializing] = useState(true);
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('connectx');
  const [activeView, setActiveView] = useState<View>('home');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [initialAgentPrompt, setInitialAgentPrompt] = useState("");
  
  const [funnelState, setFunnelState] = useState<{ phase: FunnelPhase, metrics: PsychMetrics }>({
    phase: 'ATTRACTION',
    metrics: { confidence: 5, pressure: 2, dominance: 3, manipulationRisk: 'low', activeModules: ['Autoridad', 'Silencio'] }
  });

  const getSavedLanguage = (): Language => {
    const saved = localStorage.getItem('autosocio_lang');
    return (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) ? (saved as Language) : 'es';
  };

  const [user, setUser] = useState<UserProfile>({
    id: 'GUEST-001',
    name: 'Operador ConnectX',
    email: 'ops@autosocio.com',
    phone: '',
    birthDate: '',
    residence: 'Latam',
    intent: 'Workshop_Owner',
    tier: 'TITAN_ELITE',
    avatar: 'https://i.pravatar.cc/150?u=ops',
    joinedDate: new Date().toISOString(),
    trialExpiresAt: new Date().toISOString(),
    isTrialActive: false,
    language: getSavedLanguage(),
    stats: { errorsAvoided: 0, sessionsCompleted: 0, roiGenerated: 0 }
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsSystemInitializing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const labels = useMemo(() => getLabels(user.language, currentPlatform), [user.language, currentPlatform]);

  const handleViewChange = useCallback((view: View) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const togglePlatform = () => {
    const nextPlatform = currentPlatform === 'autosocio' ? 'connectx' : 'autosocio';
    setCurrentPlatform(nextPlatform);
    setActiveView('home');
  };

  const currentLang = useMemo(() => 
    SUPPORTED_LANGUAGES.find(l => l.code === user.language) || SUPPORTED_LANGUAGES[0]
  , [user.language]);

  const handleLanguageChange = (lang: Language) => {
    localStorage.setItem('autosocio_lang', lang);
    setUser(prev => ({ ...prev, language: lang }));
    setShowLangMenu(false);
  };

  const isConnectX = currentPlatform === 'connectx';
  const displayAgents = isConnectX ? CONNECTX_AGENTS : AUTOSOCIO_AGENTS;

  if (isSystemInitializing) {
    return (
      <div className="fixed inset-0 bg-[#020617] z-[999] flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center gap-12 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_60px_rgba(79,70,229,0.4)] animate-pulse rotate-12">
              <span className="font-heading font-black text-5xl text-white italic -rotate-12">X</span>
            </div>
            <div className="absolute -inset-4 border border-indigo-500/20 rounded-[2.5rem] animate-spin-slow"></div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-white font-black uppercase tracking-[0.6em] text-[10px] leading-none opacity-80">
              {isConnectX ? 'CONNECTX INFRASTRUCTURE' : 'AUTOSOCIO ECOSYSTEM'}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-[0.4em]">Sincronizando Nodos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-40 ${isConnectX ? 'bg-[#010208]' : 'bg-[#020617]'} selection:bg-indigo-500/40 relative overflow-x-hidden transition-colors duration-1000`}>
      <div className={`fixed inset-0 pointer-events-none ${isConnectX ? 'bg-[radial-gradient(circle_at_50%_0%,#1e1b4b,transparent)]' : 'bg-[radial-gradient(circle_at_50%_0%,#0f172a,transparent)]'} opacity-40 z-0`}></div>
      
      {/* APP HEADER */}
      <header className="relative z-[110] px-6 py-8 max-w-7xl mx-auto flex items-center justify-between">
         <div className="flex items-center gap-6">
            <button onClick={() => handleViewChange('home')} className="flex items-center gap-5 transition-all hover:opacity-80 active:scale-95 group">
                <div className={`w-14 h-14 ${isConnectX ? 'bg-indigo-600' : 'bg-cyan-600'} rounded-2xl flex items-center justify-center text-white font-black italic shadow-2xl transition-all group-hover:rotate-6`}>
                  {isConnectX ? 'X' : 'A'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                    {isConnectX ? 'CONECTAX' : 'AUTOSOCIO'}
                  </span>
                  <span className={`text-[9px] ${isConnectX ? 'text-indigo-500' : 'text-cyan-500'} font-black uppercase tracking-[0.5em] mt-1`}>
                    {isConnectX ? 'INFRASTRUCTURE' : 'TECNOLOGÍA VEHICULAR'}
                  </span>
                </div>
            </button>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sistema Activo</span>
            </div>
            
            <button 
              onClick={togglePlatform}
              className={`p-3.5 bg-white/5 border border-white/10 rounded-2xl transition-all shadow-xl hover:bg-white/10 group ${isConnectX ? 'text-indigo-400 border-indigo-500/30' : 'text-cyan-400 border-cyan-500/30'}`}
            >
              <CogIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)} 
                className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-300 hover:border-white/30 transition-all active:scale-95"
              >
                <span className="text-sm">{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
              </button>
              {showLangMenu && (
                <div className="absolute top-full mt-4 right-0 w-56 bg-[#0f172a]/95 border border-white/10 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden z-[200] animate-slide-up backdrop-blur-3xl">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button 
                      key={lang.code} 
                      onClick={() => handleLanguageChange(lang.code)} 
                      className={`w-full text-left px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all border-b border-white/5 last:border-none flex items-center gap-4 ${user.language === lang.code ? 'text-indigo-400 bg-white/5' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
         </div>
      </header>

      <main className="pt-4 px-6 max-w-7xl mx-auto relative z-10">
        {activeView === 'home' && !isConnectX && (
          <div className="space-y-24 animate-fade-in">
            {/* HERO LANDING */}
            <section className="py-20 text-center space-y-12">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <SparklesIcon className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">Bienvenido al Futuro del Sourcing</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] italic">
                  {labels.hero.title_top}<span className="text-indigo-500">{labels.hero.title_accent}</span><br/>
                  <span className="text-gray-500 not-italic">{labels.hero.title_bottom}</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                  {labels.hero.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <button 
                  onClick={() => handleViewChange('cx_dashboard')}
                  className="px-10 py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/40 hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-3"
                >
                  Explorar Dashboard
                  <VerifiedIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleViewChange('consulting')}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all active:scale-95"
                >
                  Red de Expertos
                </button>
              </div>
            </section>

            {/* BENTO FEATURES */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-[3rem] space-y-6 group hover:border-indigo-500/30 transition-all">
                <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                  <CogIcon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Motor C1</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Validación técnica forense que extrae entidades y evalúa el riesgo de devolución antes de cualquier transacción.
                </p>
              </div>
              <div className="glass-card p-10 rounded-[3rem] space-y-6 group hover:border-emerald-500/30 transition-all">
                <div className="w-14 h-14 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <SparklesIcon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Motor JODA</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Activación conversacional estratégica que transforma datos técnicos en guiones de alta persuasión y cierre.
                </p>
              </div>
              <div className="glass-card p-10 rounded-[3rem] space-y-6 group hover:border-cyan-500/30 transition-all">
                <div className="w-14 h-14 bg-cyan-600/20 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                  <VerifiedIcon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">ROI Validado</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Infraestructura diseñada para maximizar la rentabilidad del Partner mediante el control total del funnel.
                </p>
              </div>
            </section>
          </div>
        )}

        {isConnectX && (activeView === 'home' || activeView === 'marketplace') ? (
          <ConnectXControl 
            userLanguage={user.language}
            currentPhase={funnelState.phase} 
            metrics={funnelState.metrics} 
            onSelectNode={(nodeId) => setSelectedAgent(CONNECTX_AGENTS.find(n => n.id === nodeId) || null)} 
          />
        ) : (
          <>
            {activeView === 'marketplace' && <AffiliateMarketplace userLanguage={user.language} currentPlatform={currentPlatform} />}
            {activeView === 'consulting' && (
              <div className="space-y-24 animate-slide-up pb-32">
                <header className="text-center space-y-10 mb-24">
                  <div className={`inline-flex items-center gap-4 px-6 py-3 border rounded-full shadow-lg ${isConnectX ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-cyan-500/10 border-cyan-500/20'}`}>
                      <div className={`w-3.5 h-3.5 rounded-full animate-pulse ${isConnectX ? 'bg-indigo-500' : 'bg-cyan-500'}`}></div>
                      <span className={`text-[12px] font-black uppercase tracking-[0.6em] ${isConnectX ? 'text-indigo-500' : 'text-cyan-500'}`}>
                        {isConnectX ? 'Mando de Sourcing Estratégico' : 'Red de Mentores Especialistas'}
                      </span>
                  </div>
                  <h2 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                    {isConnectX ? 'CENTRAL GLOBAL ALFA' : labels.hero_experts_title}
                  </h2>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {displayAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} onSelect={(a) => setSelectedAgent(a)} language={user.language} />
                  ))}
                </div>
              </div>
            )}
            {activeView === 'academy' && <AcademyPortal user={user} currentPlatform={currentPlatform} onSelectAgent={(agentId) => setSelectedAgent(displayAgents.find(a => a.id === agentId) || null)} />}
            {activeView === 'foundations' && <FoundationalRoadmap />}
            {activeView === 'optimization' && <OptimizationEngine />}
            {activeView === 'fleet' && <FleetInventory />}
            {activeView === 'dashboard' && <AffiliateDashboard />}
            {activeView === 'admin' && <AdminControlHub />}
            {activeView === 'marketing' && <MarketingStudio />}
            {activeView === 'wisdom_vault' && <WisdomVault />}
            {activeView === 'vision_analysis' && <VisionAnalysis />}
            {activeView === 'cx_protocol' && <CXProtocolHub />}
            {activeView === 'cx_dashboard' && <CXDashboard />}
          </>
        )}
      </main>

      {/* MOBILE TAB BAR NAVIGATION (8 TABS con Marketing) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-[200] md:hidden ${isConnectX ? 'bg-indigo-950/95 border-indigo-500/30' : 'bg-[#020617]/95 border-cyan-500/30'} backdrop-blur-3xl border-t px-1 py-1 pb-safe transition-all duration-500`}>
        <div className="flex items-center justify-start max-w-lg mx-auto overflow-x-auto gap-1 no-scrollbar scroll-smooth px-2">
          <NavButton icon={<HomeIcon />} label={labels.nav.home} active={activeView === 'home'} onClick={() => handleViewChange('home')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<AcademicIcon className="w-5 h-5" />} label={labels.nav.courses} active={activeView === 'academy'} onClick={() => handleViewChange('academy')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<UserGroupIcon className="w-5 h-5" />} label={labels.nav.experts} active={activeView === 'consulting'} onClick={() => handleViewChange('consulting')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<CartIcon />} label="ADN" active={activeView === 'marketplace'} onClick={() => handleViewChange('marketplace')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<TruckIcon className="w-5 h-5" />} label={labels.nav.fleet} active={activeView === 'fleet'} onClick={() => handleViewChange('fleet')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<DashboardIcon className="w-5 h-5" />} label={labels.nav.dashboard} active={activeView === 'dashboard'} onClick={() => handleViewChange('dashboard')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<MegaphoneIcon className="w-5 h-5" />} label={labels.nav.foundations} active={activeView === 'foundations'} onClick={() => handleViewChange('foundations')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<VerifiedIcon className="w-5 h-5" />} label={labels.nav.optimization} active={activeView === 'optimization'} onClick={() => handleViewChange('optimization')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<SparklesIcon className="w-5 h-5" />} label={labels.nav.wisdom_vault} active={activeView === 'wisdom_vault'} onClick={() => handleViewChange('wisdom_vault')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<CameraIcon className="w-5 h-5" />} label={labels.nav.vision_analysis} active={activeView === 'vision_analysis'} onClick={() => handleViewChange('vision_analysis')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<VerifiedIcon className="w-5 h-5" />} label={labels.nav.cx_protocol} active={activeView === 'cx_protocol'} onClick={() => handleViewChange('cx_protocol')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
          <NavButton icon={<CogIcon className="w-5 h-5" />} label={labels.nav.cx_dashboard} active={activeView === 'cx_dashboard'} onClick={() => handleViewChange('cx_dashboard')} accentColor={isConnectX ? 'indigo' : 'cyan'} />
        </div>
      </nav>

      {/* DESKTOP SIDE NAVIGATION */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-[110] hidden md:flex flex-col gap-4">
        <NavButtonDesktop icon={<HomeIcon className="w-6 h-6" />} active={activeView === 'home'} onClick={() => handleViewChange('home')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.home} />
        <NavButtonDesktop icon={<AcademicIcon className="w-6 h-6" />} active={activeView === 'academy'} onClick={() => handleViewChange('academy')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.courses} />
        <NavButtonDesktop icon={<UserGroupIcon className="w-6 h-6" />} active={activeView === 'consulting'} onClick={() => handleViewChange('consulting')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.experts} />
        <NavButtonDesktop icon={<CartIcon className="w-6 h-6" />} active={activeView === 'marketplace'} onClick={() => handleViewChange('marketplace')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.marketplace} />
        <NavButtonDesktop icon={<TruckIcon className="w-6 h-6" />} active={activeView === 'fleet'} onClick={() => handleViewChange('fleet')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.fleet} />
        <NavButtonDesktop icon={<DashboardIcon className="w-6 h-6" />} active={activeView === 'dashboard'} onClick={() => handleViewChange('dashboard')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.dashboard} />
        <NavButtonDesktop icon={<SparklesIcon className="w-6 h-6" />} active={activeView === 'foundations'} onClick={() => handleViewChange('foundations')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.foundations} />
        <NavButtonDesktop icon={<CogIcon className="w-6 h-6" />} active={activeView === 'optimization'} onClick={() => handleViewChange('optimization')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.optimization} />
        <NavButtonDesktop icon={<TrophyIcon className="w-6 h-6" />} active={activeView === 'wisdom_vault'} onClick={() => handleViewChange('wisdom_vault')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.wisdom_vault} />
        <NavButtonDesktop icon={<CameraIcon className="w-6 h-6" />} active={activeView === 'vision_analysis'} onClick={() => handleViewChange('vision_analysis')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.vision_analysis} />
        <NavButtonDesktop icon={<VerifiedIcon className="w-6 h-6" />} active={activeView === 'cx_protocol'} onClick={() => handleViewChange('cx_protocol')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.cx_protocol} />
        <NavButtonDesktop icon={<CogIcon className="w-6 h-6" />} active={activeView === 'cx_dashboard'} onClick={() => handleViewChange('cx_dashboard')} accentColor={isConnectX ? 'indigo' : 'cyan'} label={labels.nav.cx_dashboard} />
      </nav>

      {selectedAgent && (
        <AgentDetailModal 
          agent={selectedAgent} 
          isOpen={!!selectedAgent} 
          onClose={() => { setSelectedAgent(null); setInitialAgentPrompt(""); }} 
          uploadedImage={null} 
          initialScenario={initialAgentPrompt} 
          onSearchInMarketplace={(query) => {
            setActiveView('marketplace');
            setSelectedAgent(null);
            // We could pass the query to marketplace if it supported it
          }} 
          userLanguage={user.language} 
          currentPlatform={currentPlatform}
        />
      )}

      {/* MYSTERY SHOP AUDITOR - CAPA DE CALIDAD C1 */}
      <MysteryShopAuditor 
        language={user.language}
        appState={{
          activeView,
          currentPlatform,
          funnelPhase: funnelState.phase,
          userTier: user.tier,
          isConnectX,
          selectedAgent: selectedAgent?.name
        }} 
      />
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void, accentColor: 'cyan' | 'indigo' }> = ({ icon, label, active, onClick, accentColor }) => {
  const activeStyles = accentColor === 'cyan' ? 'text-cyan-400 scale-110 translate-y-[-2px]' : 'text-indigo-400 scale-110 translate-y-[-2px]';
  const inactiveStyles = 'text-gray-500 opacity-60 grayscale hover:opacity-100 transition-all';
  
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 transition-all duration-300 active:scale-90 flex-shrink-0 min-w-[50px] relative py-1.5">
      <div className={`${active ? activeStyles : inactiveStyles} relative z-10`}>
        {icon}
        {active && (
          <>
            <div className={`absolute -inset-1.5 rounded-full blur-md opacity-30 ${accentColor === 'cyan' ? 'bg-cyan-500' : 'bg-indigo-500'}`}></div>
            <div className={`absolute bottom-[-10px] left-1/2 translate-x-[-50%] w-1 h-1 rounded-full ${accentColor === 'cyan' ? 'bg-cyan-400' : 'bg-indigo-400'} shadow-[0_0_6px_currentColor]`}></div>
          </>
        )}
      </div>
      <span className={`text-[6.5px] font-black uppercase tracking-widest text-center line-clamp-1 transition-colors duration-300 pt-0.5 ${active ? (accentColor === 'cyan' ? 'text-cyan-400' : 'text-indigo-400') : 'text-gray-600'}`}>
        {label}
      </span>
    </button>
  );
};

const NavButtonDesktop: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void, accentColor: 'cyan' | 'indigo' }> = ({ icon, label, active, onClick, accentColor }) => {
  const activeStyles = accentColor === 'cyan' ? 'bg-cyan-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]';
  const inactiveStyles = 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white';

  return (
    <button onClick={onClick} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group relative ${active ? activeStyles : inactiveStyles}`}>
      {icon}
      <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
        {label}
      </div>
    </button>
  );
};

export default App;
