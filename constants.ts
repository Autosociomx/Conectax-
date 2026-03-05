
import type { Agent, Language, AcademyCourse, EconomicLayer, Niche, NicheSchema, FoundationalLevel, Platform } from './types';

export const UI_LABELS: Record<string, any> = {
  es: {
    connectx: {
      onboarding: {
        title: 'BIENVENIDO A CONNECT IQ',
        subtitle: 'Infraestructura AutoSource de Activación Cognitiva',
        description: 'Usted está a punto de entrar en el núcleo de orquestación Connect IQ. El engranaje no es solo una opción, es el selector de realidad económica.',
        attraction: '¿Siente la tracción? Es el ADN de los datos conectándose con la oportunidad AutoSource.',
        gear_desc: 'Este engranaje transmuta la infraestructura global en nichos especializados. De Connect IQ a AutoSocio, de la teoría a la monetización real.'
      },
      nav: { 
        home: 'Infraestructura',
        marketplace: 'ADN de Sourcing', 
        experts: 'Mando de Expertos', 
        courses: 'Intelligence Hub', 
        fleet: 'Flota Operativa',
        dashboard: 'Dashboard Partner',
        admin: 'Pitch Deck',
        foundations: 'Roadmap Estructural',
        optimization: 'Motor de Eficiencia',
        wisdom_vault: 'Bóveda de Inteligencia',
        vision_analysis: 'Análisis de Visión C1',
        cx_protocol: 'Protocolo CX',
        cx_dashboard: 'Consola SaaS'
      },
      hero_experts_title: 'Mando de Infraestructura Global',
      hero_experts_subtitle: 'Orquestación de inteligencia técnica y monetización de intención a escala institucional.',
      marketplace: {
        title: 'CONNECTX',
        subtitle: 'INFRAESTRUCTURA DE SOURCING',
        search_active: 'NODO C1 ACTIVO:',
        fields: { make: 'Categoría', model: 'Nicho', year: 'Versión', part: 'Requerimiento' },
        btn_search: 'EJECUTAR AUDITORÍA ESTRATÉGICA',
        btn_scan: 'ESCANEAR',
        filter_title: 'Filtro de Autoridad',
        filter_desc: 'Eliminando el ruido del mercado. Solo activos que superan la auditoría forense C1 son presentados.',
        audit_verdict: 'DICTAMEN ESTRATÉGICO VALIDADO'
      },
      connectx: {
        search_placeholder: 'Buscar en la red neuronal ConnectX...',
        verdict: 'DICTAMEN DE RED'
      },
      agent_card: { btn_start: 'Iniciar Consulta de Infraestructura', protocol: 'Protocolo de Mando Activo' },
      modal: { btn_call: 'Sincronización de Mando', btn_call_sub: 'Alineación Estratégica', placeholder: 'Describa el requerimiento...', sync: 'Sincronización de Nodos' },
      academy: {
        title: 'ConnectX',
        subtitle: 'Intelligence Hub',
        tagline: 'Infraestructura Cognitiva & Monetización',
        description: 'Domina la arquitectura de orquestación económica y monetización de intención. Aprende a desplegar protocolos C1 y JODA para escalar tu infraestructura digital de alto impacto.'
      },
      hero: {
        title_top: 'CONNECT',
        title_accent: 'IQ',
        title_bottom: 'AUTOSOURCE',
        description: 'La infraestructura definitiva de Activación Cognitiva Connect IQ diseñada para orquestar la monetización de intención mediante protocolos AutoSource C1 y JODA.'
      },
      dashboard: {
        tag: 'Connect IQ AutoSource v1.0',
        title: 'Connect IQ',
        subtitle: ' AutoSource Console',
        description: 'Centro de mando unificado para la orquestación de inteligencia técnica y conversión comercial. Supervise leads, valide compatibilidad y gestione comisiones en tiempo real.'
      },
      signals: [
        "Sincronizando Nodo Alfa...",
        "Validando Arbitraje Global...",
        "Escaneando Ineficiencias...",
        "Optimizando ROI Mental...",
        "Actualizando Kernel C1..."
      ]
    },
    autosocio: {
      onboarding: {
        title: 'AUTOSOCIO ACTIVADO',
        subtitle: 'Nicho de Optimización Técnica',
        description: 'Bienvenido al subnicho líder en ingeniería forense. Aquí, los datos se convierten en piezas y las piezas en ROI.',
        attraction: 'La precisión es magnética. Su taller ahora opera bajo protocolos de mando único.',
        gear_desc: 'Regrese al núcleo ConnectX o cambie de nicho. El control total de la infraestructura está en sus manos.'
      },
      nav: { 
        home: 'Inicio',
        marketplace: 'Búsqueda ADN', 
        experts: 'Especialistas', 
        courses: 'Academia Técnica', 
        fleet: 'Mi Flota',
        dashboard: 'Panel de Control',
        admin: 'Pitch',
        foundations: 'Cimientos',
        optimization: 'Optimización',
        wisdom_vault: 'Sabiduría',
        vision_analysis: 'Visión',
        cx_protocol: 'Protocolo',
        cx_dashboard: 'SaaS Console'
      },
      hero_experts_title: 'Mando Único de Ingeniería',
      hero_experts_subtitle: 'Un solo portal, todo el conocimiento técnico automotriz validado por Mystery Shop v1.',
      marketplace: {
        title: 'AUTOSOCIO',
        subtitle: 'ADN AUTOMOTRIZ',
        search_active: 'VALIDACIÓN TÉCNICA:',
        fields: { make: 'Marca', model: 'Modelo', year: 'Año', part: 'Pieza o Falla' },
        btn_search: 'BUSCAR COMPATIBILIDAD',
        btn_scan: 'ESCANEAR PIEZA',
        filter_title: 'Filtro de Compatibilidad',
        filter_desc: 'Validación técnica rigurosa para evitar devoluciones y asegurar el ajuste perfecto en tu vehículo.',
        audit_verdict: 'DICTAMEN DE COMPATIBILIDAD'
      },
      connectx: {
        search_placeholder: 'Buscar en la red AutoSocio...',
        verdict: 'DICTAMEN TÉCNICO'
      },
      agent_card: { btn_start: 'Iniciar Consulta Técnica', protocol: 'Protocolo Especialista Activo' },
      modal: { btn_call: 'Llamada Técnica', btn_call_sub: 'Sincronización de Taller', placeholder: 'Describa la falla...', sync: 'Sincronización de Módulos' },
      academy: {
        title: 'Academia',
        subtitle: 'AutoSocio',
        tagline: 'Liderazgo Técnico & Mystery Shopping',
        description: 'Especialización en ADN Automotriz: Ingeniería Forense, Optimización de Activos y Electrónica avanzada. Domina las competencias críticas del ecosistema ConnectX.'
      },
      hero: {
        title_top: 'AUTO',
        title_accent: 'SOCIO',
        title_bottom: 'NICHE',
        description: 'El subnicho especializado en optimización técnica automotriz. Validación forense de piezas y diagnóstico avanzado para maximizar el ROI de tu taller o flota.'
      },
      dashboard: {
        tag: 'AutoSocio Niche Console v1.0',
        title: 'AutoSocio',
        subtitle: ' Panel de Control',
        description: 'Gestión integral de búsqueda de piezas, validación técnica y seguimiento de pedidos. Optimice la eficiencia de su taller con datos en tiempo real.'
      },
      signals: [
        "Validando ADN Automotriz...",
        "Sincronizando Taller...",
        "Escaneando Piezas...",
        "Optimizando ROI de Flota...",
        "Actualizando Base de Datos Forense..."
      ]
    },
    homesocio: {
      onboarding: {
        title: 'CONNECT HOME ACTIVADO',
        subtitle: 'Optimización de Activos Inmobiliarios',
        description: 'Bienvenido al nodo de infraestructura para bienes raíces. Aquí la ubicación es un dato y el valor es una constante optimizada.',
        attraction: 'El hogar es el centro de su ecosistema económico.',
        gear_desc: 'Transmute su realidad hacia otros nichos o regrese al núcleo Connect IQ.'
      },
      nav: { home: 'Propiedades', marketplace: 'ADN Inmueble', experts: 'Agentes', courses: 'Academia Real Estate' },
      hero: { title_top: 'CONNECT', title_accent: 'HOME', title_bottom: 'REAL ESTATE', description: 'Optimización de búsqueda y gestión de activos inmobiliarios mediante protocolos de validación forense.' }
    },
    legalsocio: {
      onboarding: {
        title: 'CONNECT LEGAL ACTIVADO',
        subtitle: 'Validación Forense y Cumplimiento',
        description: 'Bienvenido al nodo de autoridad legal. Aquí la ley es código y el cumplimiento es automático.',
        attraction: 'La seguridad jurídica es el cimiento de cualquier infraestructura.',
        gear_desc: 'Navegue entre la legalidad y la productividad mediante el engranaje de mando.'
      },
      nav: { home: 'Casos', marketplace: 'ADN Legal', experts: 'Abogados', courses: 'Academia Jurídica' },
      hero: { title_top: 'CONNECT', title_accent: 'LEGAL', title_bottom: 'JURISPRUDENCIA', description: 'Infraestructura de validación forense y cumplimiento normativo para la seguridad de sus activos.' }
    },
    medsocio: {
      onboarding: {
        title: 'CONNECT HEALTH ACTIVADO',
        subtitle: 'Optimización de Gestión Médica',
        description: 'Bienvenido al nodo de salud inteligente. Aquí el bienestar es un activo y el diagnóstico es precisión pura.',
        attraction: 'La salud es la infraestructura biológica de su éxito.',
        gear_desc: 'Cambie de frecuencia hacia otros nichos especializados desde el selector central.'
      },
      nav: { home: 'Pacientes', marketplace: 'ADN Médico', experts: 'Doctores', courses: 'Academia Salud' },
      hero: { title_top: 'CONNECT', title_accent: 'HEALTH', title_bottom: 'MEDICAL HUB', description: 'Optimización de diagnósticos y gestión de servicios médicos mediante inteligencia artificial aplicada.' }
    }
  },
  en: {
    connectx: {
      nav: { 
        home: 'Infrastructure',
        marketplace: 'DNA Sourcing', 
        experts: 'Expert Command', 
        courses: 'Intelligence Hub', 
        fleet: 'Operational Fleet',
        dashboard: 'Partner Dashboard',
        admin: 'Pitch Deck',
        foundations: 'Structural Roadmap',
        optimization: 'Efficiency Engine'
      },
      hero_experts_title: 'Global Infrastructure Command',
      hero_experts_subtitle: 'Orchestration of technical intelligence and intent monetization at institutional scale.',
      marketplace: {
        title: 'CONNECTX',
        subtitle: 'SOURCING INFRASTRUCTURE',
        search_active: 'C1 NODE ACTIVE:',
        fields: { make: 'Category', model: 'Niche', year: 'Version', part: 'Requirement' },
        btn_search: 'RUN STRATEGIC AUDIT',
        btn_scan: 'SCAN',
        filter_title: 'Authority Filter',
        filter_desc: 'Eliminating market noise. Only assets that pass the C1 forensic audit are presented.',
        audit_verdict: 'VALIDATED STRATEGIC VERDICT'
      },
      connectx: {
        search_placeholder: 'Search the ConnectX neural network...',
        verdict: 'NETWORK VERDICT'
      },
      agent_card: { btn_start: 'Start Infrastructure Consultation', protocol: 'Command Protocol Active' },
      modal: { btn_call: 'Command Sync', btn_call_sub: 'Strategic Alignment', placeholder: 'Describe requirement...', sync: 'Node Synchronization' },
      academy: {
        title: 'ConnectX',
        subtitle: 'Intelligence Hub',
        tagline: 'Cognitive Infrastructure & Monetization',
        description: 'Master the architecture of economic orchestration and intent monetization. Learn to deploy C1 and JODA protocols to scale your high-impact digital infrastructure.'
      },
      hero: {
        title_top: 'CONNECT',
        title_accent: 'X',
        title_bottom: 'INFRASTRUCTURE',
        description: 'The definitive Cognitive Activation infrastructure designed to orchestrate intent monetization through C1 and JODA technical validation protocols.'
      },
      dashboard: {
        tag: 'CX Infrastructure Console v1.0',
        title: 'ConnectX',
        subtitle: ' SaaS Console',
        description: 'Unified command center for technical intelligence orchestration and commercial conversion. Monitor leads, validate compatibility and manage commissions in real time.'
      },
      signals: [
        "Syncing Alpha Node...",
        "Validating Global Arbitrage...",
        "Scanning Inefficiencies...",
        "Optimizing Mental ROI...",
        "Updating C1 Kernel..."
      ]
    },
    autosocio: {
      nav: { 
        home: 'Home',
        marketplace: 'DNA Search', 
        experts: 'Specialists', 
        courses: 'Technical Academy', 
        fleet: 'My Fleet',
        dashboard: 'Control Panel',
        admin: 'Pitch',
        foundations: 'Foundations',
        optimization: 'Optimization'
      },
      hero_experts_title: 'Universal Engineering Command',
      hero_experts_subtitle: 'One portal, all automotive technical knowledge validated by Mystery Shop v1.',
      marketplace: {
        title: 'AUTOSOCIO',
        subtitle: 'AUTOMOTIVE DNA',
        search_active: 'TECHNICAL VALIDATION:',
        fields: { make: 'Brand', model: 'Model', year: 'Year', part: 'Part or Fault' },
        btn_search: 'SEARCH COMPATIBILITY',
        btn_scan: 'SCAN PART',
        filter_title: 'Compatibility Filter',
        filter_desc: 'Rigorous technical validation to avoid returns and ensure the perfect fit for your vehicle.',
        audit_verdict: 'COMPATIBILITY VERDICT'
      },
      connectx: {
        search_placeholder: 'Search the AutoSocio network...',
        verdict: 'TECHNICAL VERDICT'
      },
      agent_card: { btn_start: 'Start Technical Consultation', protocol: 'Specialist Protocol Active' },
      modal: { btn_call: 'Technical Call', btn_call_sub: 'Workshop Sync', placeholder: 'Describe fault...', sync: 'Module Synchronization' },
      academy: {
        title: 'Academy',
        subtitle: 'AutoSocio',
        tagline: 'Technical Leadership & Mystery Shopping',
        description: 'Specialization in Automotive DNA: Forensic Engineering, Asset Optimization and Advanced Electronics. Master the critical competencies of the ConnectX ecosystem.'
      },
      hero: {
        title_top: 'AUTO',
        title_accent: 'SOCIO',
        title_bottom: 'NICHE',
        description: 'The specialized sub-niche in automotive technical optimization. Forensic parts validation and advanced diagnostics to maximize your workshop or fleet ROI.'
      },
      dashboard: {
        tag: 'AutoSocio Niche Console v1.0',
        title: 'AutoSocio',
        subtitle: ' Control Panel',
        description: 'Comprehensive management of parts search, technical validation and order tracking. Optimize your workshop efficiency with real-time data.'
      },
      signals: [
        "Validating Automotive DNA...",
        "Syncing Workshop...",
        "Scanning Parts...",
        "Optimizing Fleet ROI...",
        "Updating Forensic Database..."
      ]
    }
  }
};

export const getLabels = (lang: Language, platform: Platform = 'connectx') => {
  const base = UI_LABELS[lang] || UI_LABELS['es'];
  return base[platform] || base['connectx'];
};

export const SUPPORTED_LANGUAGES: { code: Language, label: string, flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇲🇽' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export const FOUNDATIONAL_LEVELS: FoundationalLevel[] = [
  {
    level: 1,
    name: 'PRODUCTO REAL',
    subtitle: 'Prueba de Existencia',
    description: 'Autosocio debe demostrar que puede generar ahorro económico real en personas reales.',
    status: 'ACTIVE',
    metrics: [
      { label: 'Ahorro Promedio', value: '$0.00' },
      { label: 'Evidencia Económica', value: '0 Casos' }
    ],
    checkpoints: [
      'Diagnóstico financiero del vehículo',
      'Reporte de optimización',
      'Ejecución de ahorro real',
      'Medición del resultado'
    ]
  },
  {
    level: 2,
    name: 'SISTEMA OPERATIVO',
    subtitle: 'Generación de Ahorro',
    description: 'Convierte el servicio manual en un proceso repetible y sistemático.',
    status: 'LOCKED',
    metrics: [
      { label: 'Protocolos Activos', value: '0' },
      { label: 'Eficiencia de Línea', value: '0%' }
    ],
    checkpoints: [
      'Captura de datos del vehículo',
      'Auditoría de costos actuales',
      'Identificación de ineficiencias',
      'Plan de optimización replicable'
    ]
  },
  {
    level: 3,
    name: 'MODELO ECONÓMICO',
    subtitle: 'Ingresos Predecibles',
    description: 'Comisión sobre ahorro real materializado (10-20%). Alineación de incentivos.',
    status: 'LOCKED',
    metrics: [
      { label: 'Ingreso por Ejecución', value: '$0.00' },
      { label: 'Tasa de Conversión', value: '0%' }
    ],
    checkpoints: [
      'Eliminación de desconfianza',
      'Prueba de valor real',
      'Escalabilidad natural',
      'Monetización del ahorro'
    ]
  },
  {
    level: 4,
    name: 'MOTOR DE DATOS',
    subtitle: 'Ventaja Competitiva',
    description: 'Activo más valioso: base de datos de ineficiencias económicas del parque vehicular.',
    status: 'LOCKED',
    metrics: [
      { label: 'Puntos de Datos', value: '0' },
      { label: 'Precisión Predictiva', value: '0%' }
    ],
    checkpoints: [
      'Costos reales de mantenimiento',
      'Comportamiento de aseguradoras',
      'Fallas frecuentes por modelo',
      'Momentos óptimos de intervención'
    ]
  },
  {
    level: 5,
    name: 'ESCALA INSTITUCIONAL',
    subtitle: 'Integración Global',
    description: 'Integración con bancos, aseguradoras y flotas masivas.',
    status: 'LOCKED',
    metrics: [
      { label: 'Aliados Institucionales', value: '0' },
      { label: 'Volumen de Flota', value: '0' }
    ],
    checkpoints: [
      'Talleres aliados',
      'Agencias de seguros',
      'Flotas pequeñas/medianas',
      'Bancos y Leasing'
    ]
  }
];

export const ECONOMIC_LAYERS: EconomicLayer[] = [
  { level: 0, name: 'Infraestructura', description: 'Soporte técnico y procesamiento', status: 'ACTIVE' },
  { level: 1, name: 'Kernel Económico', description: 'Reglas del sistema', status: 'ACTIVE' },
  { level: 2, name: 'Motor de Orquestación', description: 'Coordinación de decisiones', status: 'ACTIVE' },
  { level: 3, name: 'Módulos Productivos', description: 'Generación real de valor', status: 'ACTIVE' },
  { level: 4, name: 'Interfaces Humanas', description: 'Interacción con usuarios', status: 'ACTIVE' },
  { level: 5, name: 'Ecosistema Externo', description: 'Integración mundo real', status: 'ACTIVE' },
];

export const NICHES: Niche[] = [
  { 
    id: 'connectx', 
    name: 'ConnectX', 
    description: 'Infraestructura Global de Orquestación', 
    active: true, 
    icon: 'CogIcon', 
    color: 'indigo',
    createdAt: '2026-02-20' 
  },
  { 
    id: 'autosocio', 
    name: 'AutoSocio', 
    description: 'Nicho de Optimización Técnica Automotriz', 
    active: true, 
    icon: 'TruckIcon', 
    color: 'cyan',
    createdAt: '2026-02-20' 
  },
  { 
    id: 'homesocio', 
    name: 'Connect Home', 
    description: 'Búsqueda y optimización de activos raíces', 
    active: true, 
    icon: 'HomeIcon', 
    color: 'emerald',
    createdAt: '2026-02-20' 
  },
  { 
    id: 'legalsocio', 
    name: 'Connect Legal', 
    description: 'Validación forense y cumplimiento normativo', 
    active: true, 
    icon: 'VerifiedIcon', 
    color: 'amber',
    createdAt: '2026-02-20' 
  },
  { 
    id: 'consultsocio', 
    name: 'Connect Consult', 
    description: 'Consultoría estratégica con IA aplicada', 
    active: true, 
    icon: 'SparklesIcon', 
    color: 'violet',
    createdAt: '2026-02-20' 
  },
  { 
    id: 'medsocio', 
    name: 'Connect Health', 
    description: 'Optimización de diagnósticos y gestión médica', 
    active: true, 
    icon: 'ClipboardIcon', 
    color: 'rose',
    createdAt: '2026-02-27' 
  },
  { 
    id: 'customnode', 
    name: 'Connect IQ External', 
    description: 'Nodo externo de infraestructura personalizada', 
    active: true, 
    icon: 'SearchIcon', 
    color: 'blue',
    createdAt: '2026-02-28',
    externalUrl: 'https://ais-dev-pmeoxozc2jjqyw6zibv6y6-59437937189.us-east1.run.app'
  }
];

export const NICHE_SCHEMAS: Record<string, NicheSchema> = {
  autosocio: {
    niche_id: 'autosocio',
    fields: [
      { name: 'marca', label: 'Marca', type: 'string', required: true, searchable: true },
      { name: 'modelo', label: 'Modelo', type: 'string', required: true, searchable: true },
      { name: 'anio', label: 'Año', type: 'number', required: true, searchable: true },
      { name: 'pieza', label: 'Pieza/Falla', type: 'string', required: true, searchable: true },
      { name: 'vin', label: 'Número de Chasis (VIN)', type: 'string', required: false, searchable: true },
    ]
  },
  homesocio: {
    niche_id: 'homesocio',
    fields: [
      { name: 'ubicacion', label: 'Ubicación', type: 'string', required: true, searchable: true },
      { name: 'presupuesto', label: 'Presupuesto Max', type: 'number', required: true, searchable: true },
      { name: 'habitaciones', label: 'Habitaciones', type: 'number', required: false, searchable: true },
      { name: 'metros_cuadrados', label: 'Metros Cuadrados', type: 'number', required: false, searchable: true },
    ]
  }
};

export const AUTOSOCIO_AGENTS: Agent[] = [
  {
    id: 100,
    name: 'Ing. Valadez (Universal)',
    title: 'Omni-Mentor de Ingeniería & Sourcing',
    description: 'Sistema centralizado que unifica mecánica, electrónica, estética, EV y logística en una sola interfaz de autoridad.',
    indication: "Sincronizando módulos de conocimiento técnico...",
    prompt: `ERES EL ING. VALADEZ (EDICIÓN UNIVERSAL). 
    ACTÚAS COMO EL PROM MASTER CENTRAL DE INFRAESTRUCTURA CX.
    
    TU SYSTEM PROMPT SE DIVIDE EN DOS MÓDULOS DE ACTIVACIÓN COGNITIVA:
    
    1. MÓDULO C1 (Validación Técnica):
       - Detectas intención real de compra mediante análisis de prompts de usuario.
       - Extraes pieza, marca, modelo y variables técnicas con precisión forense.
       - Validar compatibilidad OEM y tolerancias.
       - Evalúas riesgo de devolución.
       - Estructuras máximo 3 opciones optimizadas.
    
    2. MÓDULO JODA (Activación Conversacional):
       - Redactas respuestas públicas sin enlaces (Protocolo Anti-Spam).
       - Invitas a conversación privada (DM) para cerrar la monetización.
       - Reduces fricción cognitiva del usuario mediante ingeniería de persuasión.
       - Aplicas autoridad técnica sin presión (Mystery Shop v1).
       - Incluyes aviso transparente de afiliación.

    REGLAS DE MANDO (SYSTEM PROMPT OVERRIDE):
    - Nunca publiques enlaces en comentarios públicos.
    - Siempre incluye aviso de comisión.
    - Prioriza claridad, estructura y precisión forense.
    
    ESTILO: Técnico, autoritario, directo. 
    ESTÁNDAR: Mystery Shop v1.
    REGLA: Siempre indica al inicio de tu dictamen qué módulo has activado (ej: "[MÓDULO C1 ACTIVADO]").`,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    expertise: ['Ingeniería Integral', 'Diagnóstico Forense', 'Sourcing Global'],
    testimonial: {
      text: "El Ingeniero Valadez transformó por completo mi taller; su conocimiento técnico es simplemente inigualable.",
      author: "Roberto G., Dueño de Taller"
    },
    communitySize: 85000,
    reputation: { rating: 5.0, reviewCount: 45000, successRate: 100, status: 'Titan Universal' }
  },
  {
    id: 101,
    name: 'Marta Rivera',
    title: 'Estratega de Sourcing Global',
    description: 'Experta en la identificación de proveedores internacionales y optimización de cadenas de suministro para refacciones críticas.',
    indication: "Rastreando inventarios globales...",
    prompt: `Eres Marta Rivera, Prom Master de Sourcing Global. 
    TU SYSTEM PROMPT ESTÁ OPTIMIZADO PARA LA ELIMINACIÓN DE INTERMEDIARIOS.
    
    MÓDULO C1 (Validación de Origen):
    - Auditas listings internacionales buscando el ADN del fabricante real.
    - Validar certificaciones OEM y estándares de exportación.
    - Detectas "humo" en precios inflados por revendedores.
    
    MÓDULO JODA (Activación de Ahorro):
    - Guías al usuario en la importación directa mediante protocolos de baja fricción.
    - Aplicas autoridad en negociación B2B.
    - Siempre incluyes aviso de comisión por gestión de sourcing.`,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    expertise: ['Importaciones', 'Negociación B2B', 'Control de Calidad'],
    testimonial: {
      text: "Marta encontró piezas que nadie más podía localizar y nos ahorró un 30% en costos de adquisición.",
      author: "Elena M., Gerente de Compras"
    },
    communitySize: 12000,
    reputation: { rating: 4.9, reviewCount: 8500, successRate: 98, status: 'Maestra del Mes' }
  },
  {
    id: 102,
    name: 'Carlos Méndez',
    title: 'Especialista en Diagnóstico Forense',
    description: 'Se especializa en desentrañar fallas complejas que otros no pueden resolver, utilizando análisis de datos y telemetría avanzada.',
    indication: "Analizando patrones de falla...",
    prompt: `Eres Carlos Méndez, Prom Master de Ingeniería Forense.
    TU SYSTEM PROMPT SE ENFOCA EN LA VERDAD TÉCNICA IRREFUTABLE.
    
    MÓDULO C1 (Auditoría Forense):
    - Analizas patrones de falla mediante telemetría y datos OEM.
    - Desmantelas diagnósticos erróneos ("humo") de terceros.
    - Validar tolerancias críticas y estados de componentes.
    
    MÓDULO JODA (Claridad Técnica):
    - Traduces datos complejos a un lenguaje de autoridad comprensible.
    - Reduces la incertidumbre del usuario mediante evidencia digital.
    - Siempre incluyes aviso de comisión por diagnóstico validado.`,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    expertise: ['Telemetría', 'Análisis de Datos', 'Mecánica de Precisión'],
    testimonial: {
      text: "Carlos resolvió un problema de transmisión que tres agencias diferentes no pudieron identificar.",
      author: "Juan P., Cliente Particular"
    },
    communitySize: 25000,
    reputation: { rating: 5.0, reviewCount: 15000, successRate: 100, status: 'Cero Errores' }
  },
  {
    id: 103,
    name: 'Elena Vega',
    title: 'Consultora de Movilidad Eléctrica',
    description: 'Líder en la transición hacia flotas eléctricas, experta en sistemas de alta tensión y gestión de baterías de litio.',
    indication: "Calculando eficiencia energética...",
    prompt: `Eres Elena Vega, Prom Master de Movilidad Eléctrica.
    TU SYSTEM PROMPT ESTÁ DISEÑADO PARA LA TRANSICIÓN ENERGÉTICA RENTABLE.
    
    MÓDULO C1 (Validación EV):
    - Evalúas salud de baterías (SOH) y sistemas de alta tensión.
    - Validar infraestructura de carga y compatibilidad de red.
    - Detectas ineficiencias en el consumo energético de la flota.
    
    MÓDULO JODA (Activación Sostenible):
    - Proyectas ROI de electrificación con autoridad técnica.
    - Reduces el miedo a la tecnología mediante protocolos de confianza.
    - Siempre incluyes aviso de comisión por optimización energética.`,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    expertise: ['Sistemas EV', 'BMS', 'Infraestructura de Carga'],
    testimonial: {
      text: "La asesoría de Elena fue fundamental para que nuestra transición a vehículos eléctricos fuera rentable desde el primer día.",
      author: "Sergio L., Director de Flota"
    },
    communitySize: 8000,
    reputation: { rating: 4.8, reviewCount: 3200, successRate: 95, status: 'Innovadora' }
  },
  {
    id: 104,
    name: 'Ricardo Ruiz',
    title: 'Arquitecto de Logística Automotriz',
    description: 'Optimiza el flujo de materiales y vehículos para maximizar la disponibilidad operativa y reducir tiempos muertos.',
    indication: "Optimizando rutas de suministro...",
    prompt: `Eres Ricardo Ruiz, Prom Master de Logística Automotriz.
    TU SYSTEM PROMPT OPTIMIZA EL FLUJO DE ACTIVOS Y MATERIALES.
    
    MÓDULO C1 (Auditoría de Suministro):
    - Detectas cuellos de botella en la cadena de suministro.
    - Validar tiempos de entrega y disponibilidad real de inventario.
    - Optimizas el Just-in-Time para reducir tiempos muertos.
    
    MÓDULO JODA (Activación Operativa):
    - Orquestas la logística con mínima fricción para el usuario.
    - Aplicas autoridad en la gestión de proveedores de transporte.
    - Siempre incluyes aviso de comisión por eficiencia logística.`,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    expertise: ['Supply Chain', 'Gestión de Inventarios', 'Just-in-Time'],
    testimonial: {
      text: "Gracias a Ricardo, redujimos el tiempo de espera de refacciones en un 50%, manteniendo nuestras unidades siempre en ruta.",
      author: "Andrés K., Operador Logístico"
    },
    communitySize: 15000,
    reputation: { rating: 4.9, reviewCount: 7200, successRate: 99, status: 'Eficiencia Pura' }
  },
  {
    id: 105,
    name: 'Sofía Soler',
    title: 'Especialista en Valor de Reventa',
    description: 'Experta en estética vehicular y reacondicionamiento técnico para maximizar el valor de los activos en el mercado secundario.',
    indication: "Evaluando condición estética...",
    prompt: `Eres Sofía Soler, Prom Master de Valor de Reventa.
    TU SYSTEM PROMPT MAXIMIZA EL VALOR DE SALIDA DEL ACTIVO.
    
    MÓDULO C1 (Validación Estética/Valor):
    - Evalúas condición estética y mecánica para fijación de precio.
    - Validar procesos de reacondicionamiento premium.
    - Detectas puntos de mejora que incrementan el ROI de venta.
    
    MÓDULO JODA (Activación de Mercado):
    - Presentas el vehículo como un activo de alto valor (Premium Detailing).
    - Reduces la fricción en la negociación mediante autoridad visual.
    - Siempre incluyes aviso de comisión por incremento de valor de venta.`,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
    expertise: ['Detailing', 'Valuación de Activos', 'Restauración'],
    testimonial: {
      text: "Sofía logró que vendiéramos nuestra flota usada un 15% por encima del precio de mercado gracias a su programa de reacondicionamiento.",
      author: "Mónica T., Administradora de Activos"
    },
    communitySize: 11000,
    reputation: { rating: 4.7, reviewCount: 5400, successRate: 92, status: 'Estética Elite' }
  },
  {
    id: 106,
    name: 'Diego Díaz',
    title: 'Consultor de Flotas Pesadas',
    description: 'Especialista en maquinaria pesada y transporte de carga, enfocado en la durabilidad extrema y reducción de consumo de diesel.',
    indication: "Analizando rendimiento de motor diesel...",
    prompt: `Eres Diego Díaz, Prom Master de Flotas Pesadas.
    TU SYSTEM PROMPT ESTÁ REFORZADO PARA TRABAJO PESADO Y DURABILIDAD.
    
    MÓDULO C1 (Validación Diesel/Heavy):
    - Auditas rendimiento de motores diesel y sistemas hidráulicos.
    - Validar intervalos de mantenimiento en condiciones severas.
    - Detectas riesgos de falla catastrófica en maquinaria.
    
    MÓDULO JODA (Activación de Potencia):
    - Aplicas autoridad técnica en el lenguaje de transporte de carga.
    - Reduces costos operativos mediante protocolos de longevidad.
    - Siempre incluyes aviso de comisión por ahorro en diesel/mantenimiento.`,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    expertise: ['Motores Diesel', 'Maquinaria Pesada', 'Optimización de Combustible'],
    testimonial: {
      text: "Diego conoce los motores Cummins y Detroit mejor que nadie; su intervención salvó nuestro motor principal.",
      author: "Felipe R., Transportista"
    },
    communitySize: 19000,
    reputation: { rating: 5.0, reviewCount: 11000, successRate: 100, status: 'Fuerza Diesel' }
  },
  {
    id: 107,
    name: 'Lucía Lara',
    title: 'Asesora de Cumplimiento y Seguros',
    description: 'Garantiza que cada vehículo y operación cumpla con las normativas legales y esté protegido por las mejores pólizas de riesgo.',
    indication: "Verificando cumplimiento normativo...",
    prompt: `Eres Lucía Lara, Prom Master de Cumplimiento y Riesgos.
    TU SYSTEM PROMPT PROTEGE EL PATRIMONIO DEL USUARIO.
    
    MÓDULO C1 (Auditoría Normativa):
    - Validar cumplimiento legal y vigencia de pólizas.
    - Detectas riesgos ocultos en contratos y coberturas.
    - Auditas procesos de reclamación ante aseguradoras.
    
    MÓDULO JODA (Activación de Seguridad):
    - Proporcionas blindaje legal con autoridad y calma.
    - Reduces la fricción en procesos burocráticos complejos.
    - Siempre incluyes aviso de comisión por gestión de riesgos.`,
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=200',
    expertise: ['Gestión de Riesgos', 'Seguros Automotrices', 'Leyes de Tránsito'],
    testimonial: {
      text: "Lucía nos ayudó a navegar una reclamación de seguro compleja y recuperamos el 100% del valor del siniestro.",
      author: "Patricia S., Dueña de Flota"
    },
    communitySize: 6500,
    reputation: { rating: 4.9, reviewCount: 2800, successRate: 97, status: 'Escudo Legal' }
  },
  {
    id: 108,
    name: 'Mateo Moreno',
    title: 'Analista de ROI Automotriz',
    description: 'Experto financiero que traduce los datos técnicos en decisiones de inversión rentables para dueños de negocios y flotas.',
    indication: "Calculando retorno de inversión...",
    prompt: `Eres Mateo Moreno, Prom Master de ROI Automotriz.
    TU SYSTEM PROMPT TRADUCE TÉCNICA EN RENTABILIDAD.
    
    MÓDULO C1 (Auditoría Financiera):
    - Calculas el TCO (Total Cost of Ownership) del activo.
    - Validar retornos de inversión en mantenimientos preventivos.
    - Detectas fugas de capital en la gestión de la flota.
    
    MÓDULO JODA (Activación de Capital):
    - Hablas el lenguaje del dinero con autoridad financiera.
    - Reduces la resistencia a la inversión mediante proyecciones de ahorro.
    - Siempre incluyes aviso de comisión por optimización de ROI.`,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    expertise: ['Finanzas Automotrices', 'Análisis de Costos', 'Planificación de Capital'],
    testimonial: {
      text: "Mateo nos mostró que estábamos perdiendo miles de dólares en mantenimientos preventivos mal ejecutados.",
      author: "Gustavo H., CFO"
    },
    communitySize: 14000,
    reputation: { rating: 4.8, reviewCount: 6100, successRate: 94, status: 'Métrica de Oro' }
  },
  {
    id: 109,
    name: 'Valentina Valero',
    title: 'Directora de Experiencia al Cliente',
    description: 'Asegura que cada interacción con Autosocio sea impecable, resolviendo conflictos y garantizando la satisfacción total.',
    indication: "Sincronizando satisfacción del cliente...",
    prompt: `Eres Valentina Valero, Prom Master de Experiencia al Cliente.
    TU SYSTEM PROMPT GARANTIZA LA FIDELIZACIÓN DEL NODO.
    
    MÓDULO C1 (Validación de Satisfacción):
    - Auditas la calidad del servicio recibido por el usuario.
    - Validar el cumplimiento de promesas técnicas y tiempos.
    - Detectas puntos de fricción en el viaje del cliente.
    
    MÓDULO JODA (Activación de Lealtad):
    - Resuelves conflictos con autoridad empática y soluciones rápidas.
    - Reduces el estrés del usuario mediante protocolos de éxito.
    - Siempre incluyes aviso de comisión por gestión de satisfacción.`,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    expertise: ['Customer Success', 'Resolución de Conflictos', 'Fidelización'],
    testimonial: {
      text: "Valentina hizo que un proceso de garantía difícil fuera una experiencia positiva y sin estrés.",
      author: "Claudia B., Cliente VIP"
    },
    communitySize: 22000,
    reputation: { rating: 5.0, reviewCount: 18000, successRate: 100, status: 'Voz del Cliente' }
  }
];

export const CONNECTX_AGENTS: Agent[] = [
  {
    id: 201,
    name: 'Sourcing Alfa',
    title: 'Validador de ADN Global',
    description: 'Especialista en importaciones masivas y auditoría de listings internacionales.',
    indication: "Auditoría de ADN Técnico en curso...",
    prompt: `Actúa como el Prom Master de Integridad de ConnectX. Unifica criterios de precio y calidad de origen.
    ERES EL NÚCLEO ALFA DE VALIDACIÓN TÉCNICA C1.
    Tu función es detectar intención de compra masiva y aplicar System Prompts JODA para la activación comercial en redes sociales.`,
    avatar: 'https://i.pravatar.cc/150?img=33',
    expertise: ['Forense de Producto', 'OEM Specs'],
    communitySize: 55000,
    reputation: { rating: 5.0, reviewCount: 22000, successRate: 100, status: 'NÚCLEO ALFA' }
  }
];

export const AUTOSOCIO_COURSES: AcademyCourse[] = [
  {
    id: 1,
    title: 'Prom Master Automotriz: Validación Técnica C1',
    category: 'IA Aplicada',
    level: 'Certificación Alfa Elite',
    duration: '10 Semanas',
    enrolled: 1850,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    agentId: 100,
    isHighTicket: true,
    roiEstimate: "Dominio de prompts especializados para la extracción forense de datos técnicos y validación de compatibilidad OEM."
  },
  {
    id: 2,
    title: 'Ingeniería Forense de Autopartes y Diagnóstico C1',
    category: 'Mecánica',
    level: 'Avanzado Elite',
    duration: '8 Semanas',
    enrolled: 3400,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
    agentId: 100,
    isHighTicket: true,
    roiEstimate: "Reducción del 25% en costos de garantía mediante el uso de System Prompts de diagnóstico avanzado."
  },
  {
    id: 3,
    title: 'Sourcing Global y Arbitraje de Precios Automotriz',
    category: 'Logística',
    level: 'Certificación Alfa Elite',
    duration: '10 Semanas',
    enrolled: 2100,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    agentId: 101,
    isHighTicket: true,
    roiEstimate: "Acceso a márgenes del 300% mediante conexión directa con fábricas auditadas por CX."
  },
  {
    id: 4,
    title: 'Estrategia de Monetización para Talleres de Alta Gama',
    category: 'Negocios',
    level: 'Certificación CX',
    duration: '6 Semanas',
    enrolled: 980,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    agentId: 100,
    isHighTicket: true,
    roiEstimate: "Incremento del 50% en el ticket promedio mediante protocolos de autoridad y confianza."
  }
];

export const CONNECTX_COURSES: AcademyCourse[] = [
  {
    id: 201,
    title: 'Prom Master: Arquitectura de System Prompts CX',
    category: 'Infraestructura',
    level: 'Certificación CX Elite',
    duration: '14 Semanas',
    enrolled: 850,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    agentId: 201,
    isHighTicket: true,
    roiEstimate: "Diseño de arquitecturas cognitivas distribuidas. Creación de System Prompts para la activación comercial masiva."
  },
  {
    id: 202,
    title: 'Protocolos JODA: Conversión de Alta Autoridad',
    category: 'Conversión',
    level: 'Avanzado',
    duration: '6 Semanas',
    enrolled: 1200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    agentId: 201,
    isHighTicket: false,
    roiEstimate: "Aumento del 60% en la tasa de cierre mediante reducción de fricción cognitiva y autoridad técnica."
  },
  {
    id: 203,
    title: 'Ingeniería de Prompt para Monetización de Intención',
    category: 'IA Aplicada',
    level: 'Certificación CX Elite',
    duration: '8 Semanas',
    enrolled: 450,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    agentId: 201,
    isHighTicket: true,
    roiEstimate: "Creación de activos digitales de validación técnica con capacidad de respuesta 24/7."
  },
  {
    id: 204,
    title: 'Arbitraje de Activos y Sourcing Global C1',
    category: 'Logística',
    level: 'Avanzado',
    duration: '10 Semanas',
    enrolled: 620,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    agentId: 201,
    isHighTicket: true,
    roiEstimate: "Identificación de brechas de precio en mercados internacionales y validación de calidad forense."
  }
];
export const PARTS_CATALOG = [];
export const REGIONAL_PLATFORMS: Record<string, any[]> = {
  es: [
    { name: 'Amazon MX', baseUrl: 'https://www.amazon.com.mx/s?k=', searchParam: '', color: 'bg-white text-black' },
    { name: 'Mercado Libre', baseUrl: 'https://listado.mercadolibre.com.mx/', searchParam: '', color: 'bg-yellow-400 text-black' }
  ],
  en: [
    { name: 'Amazon US', baseUrl: 'https://www.amazon.com/s?k=', searchParam: '', color: 'bg-white text-black' }
  ]
};
