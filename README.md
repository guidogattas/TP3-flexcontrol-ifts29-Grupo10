# FlexControl — Dos sentencias, dos soluciones | IFTS 29
## Práctica Formativa TP3 · Desarrollo de Sistemas Web / Front End (2026 - 2do Cuatrimestre)

Landing page institucional y técnica desarrollada para la presentación de dos propuestas de automatización agéntica para la startup **FlexControl**, abordando el bloque asignado de **Preparación y aviso** (Sentencias **R3** y **R4**).

---

## 1. Datos del Proyecto y Asignación Académica

- **Institución:** Instituto de Formación Técnica Superior Nº 29 (IFTS 29).
- **Carrera:** Tecnicatura Superior en Desarrollo de Software.
- **Asignatura:** Desarrollo de Sistemas Web / Front End.
- **Trabajo Práctico:** TP3 – Dos sentencias, dos soluciones.
- **Comisión y Grupo de Cursada:** Comisión B · Grupo 10.
- **Asignación Docente (Sorteo Oficial):** Sorteo S06-B · Grupo 10.
- **Startup Asignada:** FlexControl.
- **Rubro:** Logística y distribución.
- **Bloque Asignado:** Preparación y aviso.
- **Objetivo de la Startup:** Control de paquetes y coordinación de retiros mediante lectura de etiquetas y avisos al transportista.

---

## 2. Integrantes del Grupo y Aportes Concretos

| Integrante | Rol Principal | Aportes Concretos y Tareas Realizadas |
| :--- | :--- | :--- |
| **Guido Gattás** | Front End & Coordinación | Coordinación del flujo agéntico, maquetación semántica en HTML5, arquitectura de componentes, estructuración del repositorio y setup de Vite. |
| **María Belén Gatto** | Lógica de Flujos & UI/UX | Análisis proposicional de las sentencias R3 y R4 de FlexControl, diseño de experiencia de usuario, contraste de paleta (amarillo/verde de FlexControl) y definición de árboles de decisión. |
| **Lucas Katz** | Accesibilidad & Componentes | Implementación de navegación accesible por teclado (focus ring, ARIA roles), desarrollo de desplegables `<details>` y diagramación vectorial en SVG interactivo. |
| **Gonzalo Santini** | Testing & Documentación | Pruebas de compilación en Vite, validación responsive sin desbordes en desktop, desarrollo de simuladores interactivos de prueba y redacción del informe técnico. |

### Evidencia de Colaboración y Revisión entre Integrantes (Rúbrica - Nivel Propone)
- **Revisión 1 (Gattás & Gatto):** Al analizar la sentencia R3, se remarcó la importancia de no interpretar la falta de confirmación del operador como un descarte del paquete, sino como la permanencia en el estado de empaque previo (`EN_PREPARACION`). Como decisión de diseño, se incorporó un temporizador de alerta (SLA de preparación) para avisar al supervisor de piso si un bulto excede el tiempo estimado de embalaje.
- **Revisión 2 (Katz & Santini):** Al desarmar la sentencia R4, se identificó que la regla contiene dos momentos lógicos disociados: primero la *solicitud de envío* (sujeta a 3 condiciones previas: paquete listo, transportista autorizado y sin avisos previos/errores) y segundo el *registro efectivo como enviado*, el cual **solo** puede ocurrir tras la confirmación exitosa (acuse de recibo) del servicio de mensajería. Se diseñó en la interfaz un simulador de 4 estados que permite comprobar cómo opera el sistema si la mensajería aún no confirmó la entrega del aviso.

---

## 3. Sobre la Startup FlexControl

### Contexto y Origen
Las condiciones de funcionamiento de FlexControl fueron planteadas inicialmente mediante lógica proposicional por estudiantes del **IFTS 16**. En esta segunda fase formativa, el **Grupo 10 de la Comisión B** del **IFTS 29** toma esa producción para traducirla en propuestas de automatización agéntica claras y comunicarlas a través de una landing page moderna, funcional y accesible.

### Descripción del Servicio
FlexControl es una solución integral para depósitos, centros de distribución y operadores de e-commerce que automatiza el seguimiento de bultos mediante lectores de código de barras/etiquetas y coordina la notificación oportuna a los transportistas encargados del retiro de mercadería.

### El Problema que Resuelve
La desincronización entre el empaque físico en depósito y la comunicación con el transportista ocasiona que los choferes lleguen antes de que el pedido esté cerrado o que los paquetes queden olvidados en dársena. FlexControl resuelve este cuello de botella asegurando que los avisos solo salgan cuando el paquete fue físicamente verificado y que el transportista homologado reciba la notificación fehacientemente.

### Valor de la Validación Previa
- **Control de calidad físico:** Evita que se marque como listo un paquete que todavía está siendo embalado o que carece de etiqueta.
- **Prevención de avisos duplicados:** Bloquea envíos concurrentes si ya hay un aviso en curso o con error pendiente.
- **Garantía de acuse de recibo:** Exige que la mensajería confirme la entrega del mensaje antes de darlo por enviado en la base de datos de expedición.

---

## 4. Las Dos Sentencias Originales Asignadas (S06-B · Grupo 10)

> **Sentencia 1 – R3:**  
> *“Si el paquete está en preparación y la persona responsable confirma que está preparado, el sistema lo marca como listo para retirar.”*

> **Sentencia 2 – R4:**  
> *“Si el paquete está listo para retirar, hay un contacto de transportista autorizado y el aviso de retiro no está enviado, en curso ni con un error pendiente, el sistema solicita su envío; solo lo registra como enviado tras la confirmación exitosa del servicio de mensajería.”*

---

## 5. Resumen de las Dos Propuestas de Automatización

### Propuesta 1 — Control de Preparación y Confirmación de Bultos (R3)
- **Foco:** Verificación interna de empaque antes de habilitar el retiro.
- **Acción de la regla:** Si el paquete está en preparación y la persona responsable confirma su preparación, el sistema actualiza su estado a `LISTO_PARA_RETIRAR`.
- **Decisiones de diseño adicionales:**
  - Asignación automática de bahía/estantería física de despacho en depósito.
  - Temporizador de alerta preventiva si el empaque supera los 45 minutos.
  - Registro de auditoría con timestamp e ID biométrico/tarjeta del operario responsable.
- **Herramientas consultadas:** `WarehouseInventoryTool`, `OperatorAuthService`, `BarcodeValidationScanner`.
- **Intervención humana:** Si hay rotura de producto, falta de stock o etiqueta ilegible, derivación a supervisor de depósito.

### Propuesta 2 — Gestión de Aviso y Acuse de Mensajería (R4)
- **Foco:** Comunicación externa coordinada y registro condicional a acuse de recibo.
- **Acción de la regla:** Si el paquete está listo para retirar, hay transportista autorizado y el aviso no está enviado, en curso ni con error pendiente, el sistema solicita el envío; **solo** lo registra como enviado tras la confirmación exitosa de la mensajería.
- **Decisiones de diseño adicionales:**
  - Despliegue de estado transitorio *“Envío solicitado - Esperando acuse de mensajería”*.
  - Si el aviso posee un error pendiente, se retiene y deriva a la mesa de ayuda técnica para corregir el canal de contacto antes de reintentar.
  - Clave de idempotencia única por paquete para evitar duplicación de mensajes por reintentos de red.
- **Herramientas consultadas:** `PackageReadinessTool`, `AuthorizedCarrierDirectoryTool`, `CarrierMessagingGateway`.
- **Intervención humana:** Asignación manual de transportista si no hay uno configurado, o auditoría de error si el gateway de mensajería responde con código de falla.

---

## 6. Tecnologías Utilizadas

- **HTML5 Semántico:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<details>`, `<footer>`, enlaces de salto (*skip to content*) y roles ARIA.
- **CSS3 Moderno:** Variables nativas (Custom Properties), tipografía fluida con `clamp()`, layout con CSS Grid y Flexbox, foco visible para navegación por teclado, sin dependencias pesadas.
- **JavaScript Modular (ES6):** Control de los simuladores interactivos de caminos lógicos, alternancia de estados de prueba, resaltado dinámico de nodos SVG y listeners de teclado para `<details>`.
- **SVG Vectorial Nativo:** Dos diagramas de flujo escalables, con marcadores de flecha definidos, cajas de decisión rotuladas y caminos SÍ / NO diferenciados por color.
- **Vite 6:** Entorno de compilación ultrarrápido y servidor de previsualización para producción.

---

## 7. Instrucciones para Ejecutar el Proyecto Localmente

### Requisitos Previos
Contar con [Node.js](https://nodejs.org/) (versión 18 o superior) y `npm`.

### Paso a Paso
1. **Ingresar a la carpeta del proyecto:**
   ```powershell
   cd "TP3-flexcontrol-ifts29-Grupo10"
   ```

2. **Instalar dependencias:**
   ```powershell
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```powershell
   npm run dev
   ```
   Abrir en el navegador `http://localhost:3000`.

4. **Compilar para producción:**
   ```powershell
   npm run build
   ```
   Genera el bundle optimizado en la carpeta `dist/`.

5. **Previsualizar la versión de producción:**
   ```powershell
   npm run preview
   ```

---

## 8. Herramientas de IA y Construcción Agéntica

En cumplimiento de la consigna de *“Construcción 100% Agéntica: Ustedes dirigen, el agente construye”*:

- **Entorno de Trabajo / Aplicación:** Google Antigravity (AGY IDE / CLI).
- **Modelo de Lenguaje Seleccionado:** `Gemini 3.8 Flash (High)` (declarado e informado por el entorno).
- **Usos de la IA:**
  - Análisis y reformulación de las sentencias R3 y R4 del sorteo S06-B (FlexControl).
  - Integración del logo oficial de FlexControl aportado por el equipo.
  - Generación del código HTML5 semántico, CSS3 responsive y JS modular.
  - Trazado de diagramas de flujo vectoriales SVG con marcadores y simulación en tiempo real.
  - Verificación de compilación en Vite y preparación del repositorio Git.

### Evidencia de Iteración (Rúbrica - Nivel Propone)
- **Instrucción inicial:** Se solicitó iniciar la construcción del proyecto a partir de los datos base del sorteo docente.
- **Problema detectado:** En la formulación inicial de requerimientos existía una discrepancia con el sorteo docente S11-B frente a la asignación real del equipo. El equipo detectó la inconsistencia y aclaró que la asignación oficial correspondiente al Grupo 10 (Comisión B) es el bloque S06-B: **FlexControl** (Logística y distribución), adjuntando el isotipo oficial de la marca.
- **Corrección ejecutada:** Se reexaminó la página 23 del PDF oficial de consignas (Grupo 10 · S06-B · Preparación y aviso). Se incorporó el logo oficial en formato WebP en `public/assets/flexcontrol-logo.webp`, se adaptó la paleta cromática a la identidad de FlexControl (amarillo logístico `#F59E0B` y verde esmeralda `#10B981`) y se reconstruyeron por completo las sentencias R3 y R4, las propuestas agénticas, los diagramas de flujo SVG y los simuladores interactivos de prueba.
- **Resultado obtenido:** Proyecto 100% fiel a la asignación de sorteo del Grupo 10 (FlexControl), con diagramas lógicos precisos, validación de acuse de mensajería y compilación verificada.

---

## 9. Enlaces del Proyecto

- **Repositorio de GitHub:** [https://github.com/guidogattas/TP3-flexcontrol-ifts29-Grupo10](https://github.com/guidogattas/TP3-flexcontrol-ifts29-Grupo10)
- **Landing Page Publicada en Vercel:** [https://tp3-flexcontrol-ifts29-grupo10.vercel.app/](https://tp3-flexcontrol-ifts29-grupo10.vercel.app/)

---

## 10. Lista de Control de Criterios (Rúbrica)

- [x] Startup identificada correctamente: **FlexControl** (Logística y distribución).
- [x] Grupo asignado: **Grupo 10 · Comisión B** (Sorteo docente S06-B).
- [x] Bloque asignado: **Preparación y aviso**.
- [x] Sentencias R3 y R4 reproducidas de manera idéntica y sin alteraciones.
- [x] Dos propuestas agénticas estructuradas con entradas, condiciones, acciones y resultados.
- [x] Dos diagramas gráficos en SVG nítidos, legibles y con flujos rotulados.
- [x] Simuladores interactivos en tiempo real con resaltado dinámico de nodos SVG.
- [x] Desplegables accesibles por teclado y clic con etiquetas ARIA.
- [x] Logo oficial de FlexControl incorporado en cabecera, hero y sección startup.
- [x] Diseño responsive sin desbordes en desktop.
- [x] Compilación exitosa con `npm run build` en Vite (0 errores).
- [x] Repositorio Git y despliegue en Vercel configurados y publicados.
