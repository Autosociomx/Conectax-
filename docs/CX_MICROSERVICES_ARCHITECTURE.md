# 🏗️ ARQUITECTURA DE MICROSERVICIOS - CX INFRASTRUCTURE

Este documento define la topología técnica y la responsabilidad de cada componente en la infraestructura escalable de ConectaX.

---

## 🌐 1. VISIÓN GENERAL (TOPOLOGÍA)

CX utiliza una arquitectura de **Microservicios Desacoplados** comunicados vía REST/gRPC y orquestados por un **API Gateway**.

### Componentes Core:
1. **API Gateway (Kong/Nginx):** Punto de entrada único, manejo de rate limiting y ruteo.
2. **Auth Service:** Gestión de identidad y permisos (RBAC).
3. **Lead Service:** Gestión del ciclo de vida de la oportunidad.
4. **C1 Engine (IA):** Extracción de entidades y validación técnica.
5. **JODA Engine (IA):** Generación de guiones y estrategia conversacional.
6. **Risk Engine:** Evaluación de probabilidad de devolución.
7. **Compatibility Service:** Base de datos maestra de piezas y vehículos.
8. **Commission Service:** Cálculo y tracking de ingresos.

---

## 🧠 2. DEFINICIÓN DE SERVICIOS

### 🔐 Auth Service
- **Tech:** Node.js + NestJS + Passport.js (JWT).
- **Responsabilidad:** Autenticación de Partners, gestión de planes (SaaS tiers).

### 📥 Lead Service
- **Tech:** NestJS + PostgreSQL.
- **Responsabilidad:** CRUD de leads, historial de estados (NUEVO -> CONVERTIDO).

### 🧠 C1 Engine (IA Core)
- **Tech:** Python (FastAPI) o Node.js.
- **IA:** Google Gemini API.
- **Input:** Texto bruto del post.
- **Output:** JSON estructurado con Marca, Modelo, Año, Pieza y Riesgo.

### 🟣 JODA Engine (IA Conversacional)
- **Tech:** Node.js.
- **IA:** Google Gemini API.
- **Responsabilidad:** Transformar el output de C1 en guiones persuasivos y respuestas públicas.

### ⚠️ Risk Engine
- **Responsabilidad:** Lógica determinística para asignar score de riesgo basado en la completitud de datos y variabilidad de la pieza.

---

## ⚙️ 3. STACK TECNOLÓGICO (STARTUP READY)

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Lucide Icons |
| **Backend** | NestJS (TypeScript), Docker |
| **Base de Datos** | PostgreSQL (Supabase / AWS RDS) |
| **Cache / Mensajería** | Redis (para rate limiting y sesiones) |
| **IA** | Google Gemini (Modelos 1.5 Flash y Pro) |
| **Infraestructura** | AWS (EKS para Kubernetes), Vercel (Frontend) |

---

## 🔄 4. FLUJO DE DATOS (DATA FLOW)

1. **Ingesta:** El Partner pega el post en el Dashboard.
2. **Orquestación:** El API Gateway redirige al `Lead Service`.
3. **Análisis:** El `Lead Service` llama al `C1 Engine`.
4. **Conversión:** El `C1 Engine` devuelve datos técnicos; el `Lead Service` llama al `JODA Engine`.
5. **Persistencia:** Se guarda el Lead completo con sus guiones generados.
6. **Entrega:** El Dashboard muestra las respuestas listas para copiar.
