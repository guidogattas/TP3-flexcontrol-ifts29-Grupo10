# NEXO — Dos sentencias, dos soluciones | IFTS 29
## Práctica Formativa TP3 · Desarrollo de Sistemas Web / Front End (2026 - 2do Cuatrimestre)

Landing page institucional y técnica desarrollada para la presentación de dos propuestas de automatización agéntica para la startup **NEXO**, abordando el bloque asignado de **Permisos y contratación** (Sentencias **R3** y **R4**).

---

## 1. Datos del Proyecto y Asignación Académica

- **Institución:** Instituto de Formación Técnica Superior Nº 29 (IFTS 29).
- **Carrera:** Tecnicatura Superior en Desarrollo de Software.
- **Asignatura:** Desarrollo de Sistemas Web / Front End.
- **Trabajo Práctico:** TP3 – Dos sentencias, dos soluciones.
- **Asignación Docente (Sorteo):** S11-B · Grupo 07 (NEXO).
- **Comisión y Grupo de Cursada:** Comisión B · Grupo 10.
- **Startup Asignada:** NEXO.
- **Rubro:** Servicios y reparaciones.
- **Bloque Asignado:** Permisos y contratación.
- **Eslogan Oficial:** *“Lo que necesitás, cuando lo necesitás.”*

---

## 2. Integrantes del Grupo y Aportes Concretos

| Integrante | Rol Principal | Aportes Concretos y Tareas Realizadas |
| :--- | :--- | :--- |
| **Guido Gattás** | Front End & Coordinación | Coordinación del encargo agéntico, definición de la arquitectura de la landing page, estructuración semántica en HTML5 y gestión del repositorio. `[Completar detalle adicional si aplica: ...]` |
| **María Belén Gatto** | Lógica de Flujos & UI/UX | Análisis proposicional de las sentencias R3 y R4, distinción entre reglas originales y supuestos de diseño, y diseño de la experiencia visual y contraste tipográfico. `[Completar detalle adicional si aplica: ...]` |
| **Lucas Katz** | Accesibilidad & Componentes | Implementación de navegación por teclado, focus rings visibles, compatibilidad ARIA en desplegables (`<details>`) y codificación de diagramas vectoriales en SVG interactivo. `[Completar detalle adicional si aplica: ...]` |
| **Gonzalo Santini** | Testing & Documentación | Pruebas de compilación en Vite, validación de ausencia de desbordes en desktop, redacción del informe técnico y verificación de la rúbrica académica. `[Completar detalle adicional si aplica: ...]` |

### Evidencia de Colaboración y Revisión entre Integrantes (Rúbrica - Nivel Propone)
- **Revisión 1 (Gattás & Gatto):** Durante el análisis de la sentencia R3, se detectó el riesgo de confundir la *"falta de autorización"* con un *"rechazo"* del cliente. Se acordó explícitamente en el flujo que la propuesta debe permanecer en espera activa (estado `PENDIENTE`) sin cancelar el presupuesto, incorporando como decisión de diseño un recordatorio sutil y un temporizador de caducidad antes del archivo pasivo.
- **Revisión 2 (Katz & Santini):** Al diagramar la sentencia R4, se observó que la regla exige una conjunción estricta de tres condiciones independientes ($Vigente \land Verificado \land Disponible$). Para evitar ambigüedades, se implementó en la landing un simulador interactivo con tres interruptores booleanos independientes que demuestran qué ocurre cuando falla cualquiera de las tres variables por separado y qué acción de intervención humana corresponde en cada caso.

---

## 3. Sobre la Startup NEXO

### Contexto y Origen
NEXO nació originalmente como un modelo de negocio ideado por estudiantes del **IFTS 16**, quienes definieron sus reglas funcionales mediante lógica proposicional formal. El equipo de Front End del **IFTS 29** toma esta producción para diseñar su interfaz de usuario, comunicar sus soluciones mediante flujos agénticos comprensibles y plasmarlo en una web moderna y accesible.

### Descripción del Servicio
NEXO es una plataforma digital orientada a conectar clientes que necesitan reparaciones del hogar y comercio (plomería, electricidad, gas, cerrajería, pintura y climatización) con profesionales técnicos independientes verificados, seleccionados en función de:
1. El tipo de servicio requerido.
2. La geolocalización y cercanía.
3. La disponibilidad horaria en tiempo real.

### El Problema que Resuelve
En el mercado tradicional de reparaciones existe alta informalidad, incertidumbre en los presupuestos, falta de constatación de matrículas habilitantes y fallas recurrentes en la coordinación de turnos. NEXO formaliza y transparenta la intermediación técnica.

### Valor de la Validación Previa
- **Protección del consentimiento:** Evita comprometer al cliente con una contratación que no revisó ni autorizó expresamente.
- **Cero solicitudes obsoletas:** Comprueba que la cotización del técnico no haya caducado antes de despachar el pedido.
- **Garantía de idoneidad y agenda:** Impide que se asignen trabajos a profesionales cuya matrícula venció, que se encuentran suspendidos o que tienen su agenda ocupada en la franja solicitada.

---

## 4. Las Dos Sentencias Originales Asignadas

> **Sentencia 1 – R3:**  
> *“Si el cliente todavía no autorizó una propuesta concreta, el sistema la mantiene pendiente y no envía una solicitud de contratación.”*

> **Sentencia 2 – R4:**  
> *“Si el cliente autoriza una propuesta vigente de un profesional verificado y disponible, el sistema envía la solicitud y la muestra pendiente de aceptación del profesional.”*

---

## 5. Resumen de las Dos Propuestas de Automatización

### Propuesta 1 — Control de Autorización y Solicitudes Pendientes (R3)
- **Foco:** Consentimiento del usuario y bloqueo de contrataciones prematuras.
- **Acción de la regla:** Si el cliente aún no autorizó una propuesta concreta, se mantiene en estado `PENDIENTE` y no se envía ninguna solicitud de contratación al profesional.
- **Decisiones de diseño adicionales:**
  - Envío de una notificación informativa no invasiva en el panel del cliente.
  - Temporizador de caducidad para archivar propuestas inactivas tras 72 hs sin respuesta.
  - Si el cliente autoriza, no se genera una contratación inmediata: se transfiere la propuesta al flujo de la Propuesta 2 (R4) para verificar viabilidad técnica.
- **Herramientas consultadas:** `ProposalRegistryService`, `ClientConsentAuditTool`, `NotificationCenterTool`.
- **Intervención humana:** Botón de ayuda para resolver dudas sobre el presupuesto antes de autorizar.

### Propuesta 2 — Validación Previa al Envío de una Contratación (R4)
- **Foco:** Verificación trifactorial pre-despacho ($Vigencia \land Verificación \land Disponibilidad$).
- **Acción de la regla:** Si el cliente autoriza y se cumplen conjuntamente las tres condiciones, el sistema despacha la solicitud formal de contratación y la cataloga como *“Pendiente de aceptación del profesional”* (no es contratación confirmada).
- **Decisiones de diseño adicionales:**
  - Si alguna condición no se cumple: retención inmediata del envío y diagnóstico de la causa específica.
  - Si caducó la vigencia: sugerir al cliente solicitar una actualización de cotización.
  - Si el profesional no está disponible: ofrecer reprogramación o buscar técnicos sustitutos en la misma zona.
  - Si falló la verificación de seguridad: bloqueo total y escalado al área de Compliance / Seguridad.
  - Temporizador de SLA (24 horas) para que el técnico responda antes de derivar a un operador de guardia.
- **Herramientas consultadas:** `ProposalValidityCheckerTool`, `ProfessionalAccreditationService`, `RealTimeCalendarSchedulerTool`, `ContractRequestDispatcherTool`.

---

## 6. Tecnologías Utilizadas

- **HTML5:** Estructura semántica completa (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<details>`, `<footer>`), enlaces de salto de accesibilidad (*skip links*), atributos ARIA y conformidad con lectores de pantalla.
- **CSS3 Moderno:** Variables nativas (Custom Properties), tipografía fluida (`clamp()`), Glassmorphism con `backdrop-filter`, paleta de contraste alineada al isotipo original de NEXO, CSS Grid y Flexbox responsive. Sin frameworks pesados innecesarios.
- **JavaScript (Vanilla ES Modules):** Lógica ligera para el control interactivo de los diagramas de flujo, resaltado de nodos SVG, simulador dinámico de caminos de decisión y control por teclado accesible para `<details>`.
- **SVG Nativo:** Diagramación gráfica vectorial escalable, con puntas de flecha marker estandarizadas, nodos rotulados para inicio, consultas, decisiones, acciones y estados finales.
- **Vite 6:** Bundler y servidor de desarrollo moderno para compilación optimizada y previsualización estricta para producción.

---

## 7. Instrucciones para Ejecutar el Proyecto Localmente

### Requisitos Previos
Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y `npm`.

### Paso a Paso
1. **Clonar o ubicarse en el directorio del proyecto:**
   ```bash
   cd tp3-nexo-ifts29
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre automáticamente tu navegador en `http://localhost:3000` (o el puerto indicado por la terminal).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera los archivos minificados y optimizados en la carpeta `dist/`.

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## 8. Herramientas de IA y Construcción Agéntica

En estricto cumplimiento con la consigna de *“Construcción 100% Agéntica: Ustedes dirigen, el agente construye”*:

- **Entorno de Trabajo / Aplicación:** Google Antigravity (AGY IDE / CLI).
- **Modelo de Lenguaje Seleccionado:** `Gemini 3.8 Flash (High)` (seleccionado e informado en la interfaz de trabajo).
- **Para qué se utilizó:**
  - Inspección del PDF oficial de consignas y lectura del sorteo asignado.
  - Extracción binaria del logo original de NEXO desde los recursos del PDF.
  - Generación de la estructura semántica de la landing y de los estilos en CSS3.
  - Dibujo de los dos diagramas de flujo vectoriales en SVG e implementación de los simuladores interactivos en JavaScript.
  - Configuración del entorno de Vite, scripts de compilación y `.gitignore`.
  - Redacción y verificación integral de la documentación del proyecto.

### Evidencia de Iteración (Rúbrica - Nivel Propone)
- **Instrucción inicial:** Se solicitó iniciar la construcción del proyecto a partir de los datos del prompt y un archivo de imagen adjunto.
- **Problema detectado:** Se constató que la imagen subida manualmente pertenecía a otra startup (`FlexControl`), mientras que la asignación docente del PDF correspondía al **Grupo 07 (NEXO - S11-B)**. Utilizar un logo diferente o improvisar uno falso violaría la directiva: *"No inventes que un logo nuevo es el original ni reemplaces silenciosamente la identidad asignada"*.
- **Corrección ejecutada:** Se ejecutó un script en Python para inspeccionar los objetos XObject del documento PDF original (`media_...pdf`). Se identificó el objeto `54 0 obj` en la página 20 del PDF correspondiente al bloque S11-B y se decodificó su flujo `FlateDecode` a un PNG en alta resolución (1254x1254 px) con la identidad visual completa de NEXO (*"Lo que necesitás, cuando lo necesitás"*).
- **Resultado obtenido:** Se incorporó el recurso gráfico original verificado en `public/assets/nexo-logo.png` y se integró armónicamente en el header, hero y ficha institucional de la landing.

---

## 9. Enlaces del Proyecto

- **Repositorio de GitHub:** `[https://github.com/TU_USUARIO/tp3-nexo-ifts29]` *(Reemplazar con la URL final del repositorio del grupo)*
- **Landing Page Publicada:** `[https://tu-usuario.github.io/tp3-nexo-ifts29/]` o `[https://nexo-tp3-ifts29.vercel.app]` *(Reemplazar una vez desplegado en Vercel, Netlify o GitHub Pages)*

---

## 10. Comprobación y Verificación de Criterios

- [x] Startup identificada correctamente: **NEXO** (Servicios y reparaciones).
- [x] Bloque asignado: **Permisos y contratación**.
- [x] Sentencias R3 y R4 reproducidas con su texto original y sin alteraciones.
- [x] Dos propuestas agénticas diferenciadas y detalladas.
- [x] Dos diagramas gráficos en SVG nítidos, legibles y con ramificaciones coherentes.
- [x] Simuladores interactivos en tiempo real con resaltado dinámico de nodos.
- [x] Desplegables accesibles por teclado y clic con etiquetas ARIA.
- [x] Logo original recuperado e incorporado en alta definición.
- [x] Diseño responsive probado en desktop sin desbordes.
- [x] Compilación exitosa en Vite con `npm run build` sin errores.
- [x] Archivo `.gitignore` configurado (excluyendo `node_modules` y `dist`).
#   t p 3 - n e x o - i f t s 2 9  
 