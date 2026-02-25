
import React, { useState, useMemo } from 'react';
import AcademicIcon from './icons/AcademicIcon';
import StarIcon from './icons/StarIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import SearchIcon from './icons/SearchIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import SparklesIcon from './icons/SparklesIcon';
import { AUTOSOCIO_COURSES, CONNECTX_COURSES, AUTOSOCIO_AGENTS, CONNECTX_AGENTS, getLabels } from '../constants';
import type { AcademyCourse, UserProfile, Platform, Language } from '../types';

interface AcademyPortalProps {
  user: UserProfile | null;
  currentPlatform: Platform;
  onSelectAgent: (agentId: number) => void;
}

const AcademyPortal: React.FC<AcademyPortalProps> = ({ user, currentPlatform, onSelectAgent }) => {
  const isConnectX = currentPlatform === 'connectx';
  const ACADEMY_COURSES = isConnectX ? CONNECTX_COURSES : AUTOSOCIO_COURSES;
  const AGENTS = isConnectX ? CONNECTX_AGENTS : AUTOSOCIO_AGENTS;

  const [activeTab, setActiveTab] = useState<'explorar' | 'mis-cursos' | 'certificaciones'>('explorar');
  const [filterType, setFilterType] = useState<'category' | 'mentor'>('mentor');
  const [selectedMentorId, setSelectedMentorId] = useState<number | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // Agent Filtering & Sorting State
  const [agentSearch, setAgentSearch] = useState('');
  const [agentSort, setAgentSort] = useState<'rating' | 'community' | 'none'>('none');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');

  const categories = useMemo(() => ['All', ...Array.from(new Set(ACADEMY_COURSES.map(c => c.category)))], [ACADEMY_COURSES]);

  const allExpertise = useMemo(() => {
    const expertiseSet = new Set<string>();
    AGENTS.forEach(agent => agent.expertise.forEach(exp => expertiseSet.add(exp)));
    return ['All', ...Array.from(expertiseSet)];
  }, [AGENTS]);

  const filteredAgents = useMemo(() => {
    let result = [...AGENTS];

    // Search
    if (agentSearch) {
      const search = agentSearch.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(search) || 
        a.title.toLowerCase().includes(search) ||
        a.expertise.some(e => e.toLowerCase().includes(search))
      );
    }

    // Expertise Filter
    if (selectedExpertise !== 'All') {
      result = result.filter(a => a.expertise.includes(selectedExpertise));
    }

    // Sort
    if (agentSort === 'rating') {
      result.sort((a, b) => b.reputation.rating - a.reputation.rating);
    } else if (agentSort === 'community') {
      result.sort((a, b) => b.communitySize - a.communitySize);
    }

    return result;
  }, [agentSearch, agentSort, selectedExpertise, AGENTS]);

  const filteredCourses = useMemo(() => {
    let result = ACADEMY_COURSES;
    if (filterType === 'mentor' && selectedMentorId !== 'all') {
      result = result.filter(c => c.agentId === selectedMentorId);
    } else if (filterType === 'category' && filterCategory !== 'All') {
      result = result.filter(c => c.category === filterCategory);
    }
    return result;
  }, [filterType, selectedMentorId, filterCategory, ACADEMY_COURSES]);

  const labels = useMemo(() => getLabels(user?.language || 'es', currentPlatform), [user?.language, currentPlatform]);

  return (
    <div className="max-w-7xl mx-auto py-8 animate-slide-up space-y-16 pb-40">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`p-5 ${isConnectX ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20' : 'bg-cyan-600/10 text-cyan-400 border-cyan-500/20'} rounded-[2.5rem] shadow-[0_20px_40px_rgba(79,70,229,0.15)]`}>
              <AcademicIcon className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                {labels.academy.title} <span className={`${isConnectX ? 'text-indigo-500' : 'text-cyan-500'} italic`}>{labels.academy.subtitle}</span>
              </h2>
              <div className="flex items-center gap-2 mt-2">
                 <div className={`w-2.5 h-2.5 ${isConnectX ? 'bg-indigo-500' : 'bg-cyan-500'} rounded-full animate-pulse`}></div>
                 <span className={`text-[11px] ${isConnectX ? 'text-indigo-400' : 'text-cyan-400'} font-black uppercase tracking-[0.5em]`}>
                   {labels.academy.tagline}
                 </span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xl max-w-4xl font-light leading-relaxed">
            {labels.academy.description}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center bg-white/[0.03] p-1.5 rounded-[2rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                viewMode === 'grid' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'
              }`}
            >
              Vista Cuadrícula
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                viewMode === 'compare' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'
              }`}
            >
              Comparar ROI
            </button>
          </div>
          
          <div className="flex items-center bg-white/[0.03] p-1.5 rounded-[2rem] border border-white/10 self-start md:self-auto backdrop-blur-3xl shadow-2xl ring-1 ring-white/5">
            {['explorar', 'mis-cursos', 'certificaciones'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all ${
                  activeTab === tab ? 'bg-white text-black shadow-2xl' : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'explorar' && (
        <div className="space-y-16">
          <div className="space-y-12">
            <div className="flex justify-center gap-6">
                <button 
                  onClick={() => { setFilterType('mentor'); setSelectedMentorId('all'); }}
                  className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all ${filterType === 'mentor' ? (isConnectX ? 'bg-indigo-600 border-indigo-500' : 'bg-cyan-600 border-cyan-500') + ' text-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  Filtrar por {isConnectX ? 'Nodos' : 'Talleres'}
                </button>
                <button 
                  onClick={() => { setFilterType('category'); setFilterCategory('All'); }}
                  className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all ${filterType === 'category' ? (isConnectX ? 'bg-indigo-600 border-indigo-500' : 'bg-cyan-600 border-cyan-500') + ' text-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  Filtrar por Especialidad
                </button>
            </div>

            {filterType === 'mentor' ? (
               <div className="space-y-10">
                  {/* Agent Search & Sort Controls */}
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem]">
                    <div className="relative w-full md:w-96">
                      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text"
                        placeholder="Buscar mentor o especialidad..."
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs text-white placeholder:text-gray-600 focus:outline-none ${isConnectX ? 'focus:border-indigo-500/50' : 'focus:border-cyan-500/50'} transition-all`}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center bg-black/20 rounded-2xl border border-white/5 p-1">
                        <button 
                          onClick={() => setAgentSort('none')}
                          className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${agentSort === 'none' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                          Default
                        </button>
                        <button 
                          onClick={() => setAgentSort('rating')}
                          className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${agentSort === 'rating' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                          <StarIcon className="w-3 h-3" />
                          Rating
                        </button>
                        <button 
                          onClick={() => setAgentSort('community')}
                          className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${agentSort === 'community' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                          <UserGroupIcon className="w-3 h-3" />
                          Comunidad
                        </button>
                      </div>

                      <select 
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                        className={`bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-gray-400 focus:outline-none ${isConnectX ? 'focus:border-indigo-500/50' : 'focus:border-cyan-500/50'} transition-all cursor-pointer`}
                      >
                        {allExpertise.map(exp => (
                          <option key={exp} value={exp} className="bg-[#0f172a] text-white">{exp}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 pb-4">
                    <button 
                      onClick={() => setSelectedMentorId('all')}
                      className={`flex items-center gap-4 px-8 py-4 rounded-[2.5rem] border transition-all ${selectedMentorId === 'all' ? (isConnectX ? 'bg-indigo-600 border-indigo-500' : 'bg-cyan-600 border-cyan-500') + ' text-white shadow-2xl' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest">Todos los {isConnectX ? 'Nodos' : 'Talleres'}</span>
                    </button>
                    {filteredAgents.map(agent => (
                      <button 
                        key={agent.id}
                        onClick={() => setSelectedMentorId(agent.id)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-[2.5rem] border transition-all group ${selectedMentorId === agent.id ? (isConnectX ? 'bg-indigo-600 border-indigo-500' : 'bg-cyan-600 border-cyan-500') + ' text-white shadow-2xl' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/30'}`}
                      >
                        <img src={agent.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-white/40 transition-all" />
                        <div className="text-left">
                          <p className="text-[11px] font-black uppercase tracking-tighter leading-none">{agent.name}</p>
                          <p className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1.5 ${selectedMentorId === agent.id ? (isConnectX ? 'text-indigo-200' : 'text-cyan-200') : 'text-gray-600'}`}>{agent.title}</p>
                        </div>
                      </button>
                    ))}
                    {filteredAgents.length === 0 && (
                      <div className="py-10 text-center w-full">
                        <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No se encontraron mentores con esos criterios.</p>
                      </div>
                    )}
                  </div>
               </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all ${
                      filterCategory === cat ? (isConnectX ? 'bg-indigo-600 border-indigo-500' : 'bg-cyan-600 border-cyan-500') + ' text-white shadow-2xl' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Catálogo de <span className={isConnectX ? 'text-indigo-500' : 'text-cyan-500'}>Alto Valor</span></h3>
                <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em]">Seleccionados por el Consejo de Mando Único</p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-gray-600">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-white/10 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-full h-full object-cover opacity-60" />
                    </div>
                  ))}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">+2.5k Estudiantes Activos</span>
              </div>
            </div>

            <div className={`grid grid-cols-1 ${viewMode === 'compare' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-12`}>
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isConnectX={isConnectX} 
                  agents={AGENTS} 
                  onStart={() => onSelectAgent(course.agentId)} 
                  compact={viewMode === 'compare'}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'mis-cursos' || activeTab === 'certificaciones') && (
        <div className="text-center py-48 space-y-10 animate-fade-in">
          <div className={`w-32 h-32 ${isConnectX ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-cyan-500/5 border-cyan-500/10'} rounded-[3rem] flex items-center justify-center mx-auto border text-gray-700 shadow-inner`}>
            <AcademicIcon className="w-14 h-14 opacity-40" />
          </div>
          <div className="space-y-6">
            <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Mi <span className={isConnectX ? 'text-indigo-500' : 'text-cyan-500'}>{isConnectX ? 'Intelligence Hub' : 'Academia'}</span></h3>
            <p className="text-gray-500 font-light uppercase tracking-[0.4em] text-[11px] max-w-md mx-auto leading-relaxed">
              {isConnectX ? 'Accede a tus maestrías en infraestructura y protocolos de monetización.' : 'Accede a tus maestrías y certificaciones activas para dominar el ADN automotriz.'}
            </p>
          </div>
          <button onClick={() => setActiveTab('explorar')} className={`px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.3em] rounded-3xl hover:${isConnectX ? 'bg-indigo-600' : 'bg-cyan-600'} hover:text-white transition-all shadow-3xl`}>
            Ir al Catálogo
          </button>
        </div>
      )}
    </div>
  );
};

const CourseCard: React.FC<{ 
  course: AcademyCourse; 
  isConnectX: boolean; 
  agents: any[]; 
  onStart: () => void;
  compact?: boolean;
}> = ({ course, isConnectX, agents, onStart, compact }) => {
  const agent = agents.find(a => a.id === course.agentId);
  
  return (
    <div className={`group bg-[#0f172a]/40 border border-white/5 rounded-[3.5rem] overflow-hidden transition-all duration-700 hover:${isConnectX ? 'border-indigo-500/50' : 'border-cyan-500/50'} hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col h-full relative`}>
      {/* Course Image Header */}
      <div className={`relative ${compact ? 'h-48' : 'h-64'} overflow-hidden`}>
        <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
        
        <div className="absolute top-8 left-8 flex flex-col gap-2">
            <div className="px-4 py-1.5 bg-black/80 backdrop-blur-xl rounded-full text-[9px] font-black text-white border border-white/10 uppercase tracking-[0.2em]">
              {course.category}
            </div>
            {course.isHighTicket && (
              <div className={`px-4 py-1.5 ${isConnectX ? 'bg-indigo-600' : 'bg-cyan-600'} text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-lg animate-pulse`}>
                ALTO VALOR
              </div>
            )}
        </div>

        <div className="absolute bottom-6 right-8">
           <div className={`px-4 py-2 backdrop-blur-2xl rounded-xl border ${course.level.includes('Elite') ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : (isConnectX ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400' : 'bg-cyan-600/10 border-cyan-500/30 text-cyan-400')}`}>
             <span className="text-[10px] font-black uppercase tracking-widest italic">
               {course.level}
             </span>
           </div>
        </div>
      </div>

      <div className={`${compact ? 'p-8' : 'p-10'} space-y-8 flex flex-col flex-grow`}>
        {!compact && (
          <div className="flex items-center gap-4">
             <div className="relative">
                <img src={agent?.avatar} className="w-12 h-12 rounded-xl border border-white/10 object-cover" />
                <div className={`absolute -bottom-1 -right-1 ${isConnectX ? 'bg-indigo-600' : 'bg-cyan-600'} p-0.5 rounded-md border border-[#020617]`}>
                  <VerifiedIcon className="w-3 h-3 text-white" />
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-[11px] font-black text-white uppercase tracking-tighter leading-none">{agent?.name}</span>
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1.5 leading-none">{agent?.title}</span>
             </div>
          </div>
        )}

        <div className="space-y-6">
          <h3 className={`${compact ? 'text-xl' : 'text-2xl'} font-black text-white leading-tight uppercase tracking-tighter group-hover:${isConnectX ? 'text-indigo-400' : 'text-cyan-400'} transition-colors`}>{course.title}</h3>
          
          {/* PROMINENT ROI SECTION */}
          <div className={`${compact ? 'p-8' : 'p-6'} rounded-3xl border ${isConnectX ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-cyan-500/5 border-cyan-500/20'} relative overflow-hidden group/roi shadow-inner`}>
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover/roi:opacity-10 transition-opacity`}>
              <SparklesIcon className="w-12 h-12" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnectX ? 'bg-indigo-500' : 'bg-cyan-500'} animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]`}></div>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isConnectX ? 'text-indigo-400' : 'text-cyan-400'}`}>DICTAMEN DE IMPACTO ROI</span>
              </div>
              <p className={`${compact ? 'text-lg' : 'text-[13px]'} text-white font-black italic leading-relaxed tracking-tight`}>
                "{course.roiEstimate}"
              </p>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-xl font-black text-white tracking-tighter">{course.duration}</p>
                <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mt-1">Duración</p>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-xl font-black text-white tracking-tighter">{course.enrolled.toLocaleString()}</p>
                <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mt-1">Alumnos</p>
             </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
          <div className="flex flex-col">
             <div className="flex items-center gap-1.5 text-amber-500">
               <StarIcon className="w-4 h-4" />
               <span className="text-lg font-black text-white">{course.rating}</span>
             </div>
             <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest mt-1">Reputación</span>
          </div>
          <button 
            onClick={onStart}
            className={`px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:${isConnectX ? 'bg-indigo-600' : 'bg-cyan-600'} hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-3 group/btn`}
          >
            {compact ? 'Ver' : 'Iniciar'}
            <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademyPortal;
