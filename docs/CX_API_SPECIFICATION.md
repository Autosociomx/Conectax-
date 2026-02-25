# 📑 ESPECIFICACIÓN TÉCNICA DE LA API - CX INFRASTRUCTURE v1.0

Esta especificación define los contratos de comunicación entre el Frontend y los Microservicios de la infraestructura CX.

---

## 🔐 1. AUTH SERVICE
**Base URL:** `/api/v1/auth`

### `POST /login`
Autentica a un Partner y devuelve un token JWT.
- **Request:**
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```
- **Response (200 OK):**
  ```json
  { "token": "jwt_token_here", "partner": { "id": "uuid", "name": "John Doe", "plan": "PRO" } }
  ```

---

## 📥 2. LEAD SERVICE
**Base URL:** `/api/v1/leads`

### `POST /analyze`
Punto de entrada principal. Recibe el texto del post y orquesta los motores C1 y JODA.
- **Request:**
  ```json
  { "original_text": "Busco bomba de gasolina para Versa 2014", "platform": "FACEBOOK", "niche_id": "uuid" }
  ```
- **Response (201 Created):**
  ```json
  {
    "lead_id": "uuid",
    "status": "VALIDATED",
    "c1_output": { "vehicle": "Nissan Versa 2014", "part": "Bomba de Gasolina", "risk": "MEDIO" },
    "joda_output": { "public_reply": "...", "private_script": "..." }
  }
  ```

### `GET /`
Lista los leads del partner autenticado.
- **Query Params:** `status`, `limit`, `offset`.
- **Response (200 OK):** `Array<Lead>`

---

## 🧠 3. C1 ENGINE (INTERNAL)
**Base URL:** `/api/v1/c1`

### `POST /process`
Analiza técnicamente el texto.
- **Request:** `{ "text": "..." }`
- **Response (200 OK):**
  ```json
  {
    "entities": { "brand": "Nissan", "model": "Versa", "year": 2014, "part": "Bomba de Gasolina" },
    "required_validations": ["Motor 1.6L", "Tipo de conector"],
    "risk_score": 0.65
  }
  ```

---

## 🟣 4. JODA ENGINE (INTERNAL)
**Base URL:** `/api/v1/joda`

### `POST /generate-scripts`
Genera guiones basados en el análisis C1.
- **Request:** `{ "c1_data": { ... }, "partner_context": { ... } }`
- **Response (200 OK):**
  ```json
  {
    "public_reply": "Texto para Facebook...",
    "private_flow": { "step_1": "...", "step_2": "...", "step_3": "..." },
    "strategy": "Authority-First"
  }
  ```

---

## 💰 5. COMMISSION SERVICE
**Base URL:** `/api/v1/commissions`

### `POST /register-conversion`
Registra una venta exitosa.
- **Request:**
  ```json
  { "lead_id": "uuid", "sale_amount": 1500.00, "ml_order_id": "order_123" }
  ```
- **Response (200 OK):**
  ```json
  { "conversion_id": "uuid", "partner_commission": 45.00, "status": "PENDING" }
  ```

---

## 🛠️ ESTÁNDARES GLOBALES
- **Formato:** JSON
- **Autenticación:** Bearer Token (JWT)
- **Códigos de Error:**
  - `400`: Bad Request (Datos inválidos)
  - `401`: Unauthorized (Token inválido o expirado)
  - `403`: Forbidden (Plan insuficiente)
  - `422`: Unprocessable Entity (IA no pudo procesar el texto)
  - `500`: Internal Server Error
