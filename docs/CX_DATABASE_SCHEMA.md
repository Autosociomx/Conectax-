# 🗄️ ESQUEMA DE BASE DE DATOS DETALLADO - CX INFRASTRUCTURE

Este documento define la arquitectura de datos relacional para el SaaS CX, diseñada para soportar escalabilidad multinicho y tracking preciso de comisiones.

---

## 🏗️ Diagrama de Entidad-Relación (ERD) - Lógica

### 1. Entidad: `Partners` (Usuarios del SaaS)
Almacena la información de los operadores de la infraestructura.
- `id`: UUID (PK)
- `email`: String (Unique)
- `password_hash`: String
- `name`: String
- `niche_id`: UUID (FK -> Niches)
- `subscription_plan`: Enum (FREE, PRO, ENTERPRISE)
- `affiliate_id_ml`: String (ID de Afiliado Mercado Libre)
- `created_at`: Timestamp

### 2. Entidad: `Niches` (Segmentos de Mercado)
Permite que CX escale a otros mercados (Autos, Herramientas, Hogar).
- `id`: UUID (PK)
- `name`: String (ej: "Automotriz", "Ferretería")
- `description`: Text
- `is_active`: Boolean

### 3. Entidad: `Leads` (Oportunidades de Venta)
Registra cada publicación analizada por los motores C1 y JODA.
- `id`: UUID (PK)
- `partner_id`: UUID (FK -> Partners)
- `original_text`: Text (El post de Facebook/Redes)
- `platform`: Enum (FACEBOOK, INSTAGRAM, TIKTOK)
- `intent_score`: Float (0-1)
- `urgency_level`: Enum (LOW, MEDIUM, HIGH, CRITICAL)
- `status`: Enum (NEW, CONTACTED, VALIDATING, OFFER_SENT, CLOSED, LOST)
- `c1_output_json`: JSONB (Metadata técnica extraída)
- `joda_output_json`: JSONB (Guiones generados)
- `created_at`: Timestamp

### 4. Entidad: `Vehicles_Reference` (Base C1)
Datos maestros para validación técnica (Nicho Automotriz).
- `id`: UUID (PK)
- `brand`: String
- `model`: String
- `year_start`: Integer
- `year_end`: Integer
- `common_variants`: JSONB (Motores, Transmisiones comunes)

### 5. Entidad: `Conversions` (Ventas Efectivas)
Tracking de los enlaces que generaron dinero.
- `id`: UUID (PK)
- `lead_id`: UUID (FK -> Leads)
- `partner_id`: UUID (FK -> Partners)
- `ml_order_id`: String (Opcional, para conciliación)
- `sale_amount`: Decimal
- `estimated_commission`: Decimal
- `status`: Enum (PENDING, APPROVED, PAID, CANCELLED)
- `click_timestamp`: Timestamp
- `conversion_timestamp`: Timestamp

### 6. Entidad: `Technical_Checklists` (Configuración C1)
Reglas de validación por tipo de pieza.
- `id`: UUID (PK)
- `part_name`: String
- `niche_id`: UUID (FK -> Niches)
- `required_questions`: JSONB (Las preguntas que C1 debe exigir)
- `risk_factors`: JSONB (Qué hace que esta pieza sea de alto riesgo)

---

## 🛠️ Implementación en Supabase (PostgreSQL)

```sql
-- Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Nichos
CREATE TABLE niches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Partners
CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    niche_id UUID REFERENCES niches(id),
    plan TEXT DEFAULT 'FREE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID REFERENCES partners(id),
    original_text TEXT NOT NULL,
    intent_score FLOAT,
    status TEXT DEFAULT 'NEW',
    c1_data JSONB,
    joda_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Conversiones
CREATE TABLE conversions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id),
    partner_id UUID REFERENCES partners(id),
    amount DECIMAL(12,2),
    commission DECIMAL(12,2),
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🧠 Lógica de Relaciones Estratégicas

1. **Partner -> Leads (1:N)**: Un partner gestiona muchos leads.
2. **Niche -> Partners (1:N)**: Un nicho agrupa a muchos partners especializados.
3. **Lead -> Conversion (1:1)**: Un lead exitoso se convierte en una transacción única.
4. **Partner -> Conversions (1:N)**: Un partner acumula múltiples ingresos.
