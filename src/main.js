/**
 * NEXO — TP3: Dos sentencias, dos soluciones | IFTS 29
 * Script principal de interacción, simuladores de flujos y accesibilidad.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initSimulatorR3();
  initSimulatorR4();
  initDetailsAccessibility();
});

/**
 * 1. Navegación suave y marcado activo de sección en el header
 */
function initNavScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/**
 * 2. Simulador Interactivo para Flujo 1 (R3)
 * "Si el cliente todavía no autorizó una propuesta concreta, el sistema la mantiene pendiente y no envía una solicitud de contratación."
 */
function initSimulatorR3() {
  const toggleAuth = document.getElementById('toggle-r3-auth');
  const badgeResult = document.getElementById('r3-result-badge');
  const textResult = document.getElementById('r3-result-text');

  if (!toggleAuth) return;

  function updateR3() {
    const isAuthorized = toggleAuth.checked;

    // Remove prior SVG highlights
    document.querySelectorAll('.svg-r3-node').forEach(el => el.classList.remove('node-highlight'));

    // Highlight starting nodes
    document.getElementById('r3-node-start')?.classList.add('node-highlight');
    document.getElementById('r3-node-query')?.classList.add('node-highlight');
    document.getElementById('r3-node-decision')?.classList.add('node-highlight');

    if (!isAuthorized) {
      // Rama NO: regla estricta R3
      document.getElementById('r3-node-action-no')?.classList.add('node-highlight');
      document.getElementById('r3-node-design-no')?.classList.add('node-highlight');
      document.getElementById('r3-node-end-no')?.classList.add('node-highlight');

      badgeResult.textContent = 'ESTADO: PENDIENTE (REGLA R3)';
      badgeResult.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
      badgeResult.style.color = '#f59e0b';
      badgeResult.style.border = '1px solid rgba(245, 158, 11, 0.4)';
      textResult.innerHTML = '<strong>Regla R3 aplicada:</strong> Al no contar con autorización del cliente, la propuesta se <em>mantiene pendiente</em> y <em>NO se envía solicitud de contratación</em> al profesional. (Decisión de diseño: se notifica al cliente que tiene una propuesta lista para revisar).';
    } else {
      // Rama SÍ: derivación de diseño a R4
      document.getElementById('r3-node-action-yes')?.classList.add('node-highlight');
      document.getElementById('r3-node-end-yes')?.classList.add('node-highlight');

      badgeResult.textContent = 'AUTORIZADA -> DERIVA A R4';
      badgeResult.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
      badgeResult.style.color = '#10b981';
      badgeResult.style.border = '1px solid rgba(16, 185, 129, 0.4)';
      textResult.innerHTML = '<strong>Decisión de diseño adicional:</strong> El cliente autorizó la propuesta. R3 no define contratación automática; el sistema deriva el caso a la <strong>Propuesta 2 (R4)</strong> para verificar vigencia, verificación y disponibilidad antes de enviar.';
    }
  }

  toggleAuth.addEventListener('change', updateR3);
  updateR3(); // Initial run
}

/**
 * 3. Simulador Interactivo para Flujo 2 (R4)
 * "Si el cliente autoriza una propuesta vigente de un profesional verificado y disponible, el sistema envía la solicitud y la muestra pendiente de aceptación del profesional."
 */
function initSimulatorR4() {
  const toggleVigente = document.getElementById('toggle-r4-vigente');
  const toggleVerificado = document.getElementById('toggle-r4-verificado');
  const toggleDisponible = document.getElementById('toggle-r4-disponible');
  const badgeResult = document.getElementById('r4-result-badge');
  const textResult = document.getElementById('r4-result-text');

  if (!toggleVigente || !toggleVerificado || !toggleDisponible) return;

  function updateR4() {
    const isVigente = toggleVigente.checked;
    const isVerificado = toggleVerificado.checked;
    const isDisponible = toggleDisponible.checked;

    // Remove prior SVG highlights
    document.querySelectorAll('.svg-r4-node').forEach(el => el.classList.remove('node-highlight'));

    // Highlight starting nodes
    document.getElementById('r4-node-start')?.classList.add('node-highlight');
    document.getElementById('r4-node-queries')?.classList.add('node-highlight');
    document.getElementById('r4-node-decision')?.classList.add('node-highlight');

    const allConditionsMet = isVigente && isVerificado && isDisponible;

    if (allConditionsMet) {
      // Rama SÍ: regla estricta R4
      document.getElementById('r4-node-action-yes')?.classList.add('node-highlight');
      document.getElementById('r4-node-end-yes')?.classList.add('node-highlight');

      badgeResult.textContent = 'SOLICITUD ENVIADA (REGLA R4)';
      badgeResult.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
      badgeResult.style.color = '#10b981';
      badgeResult.style.border = '1px solid rgba(16, 185, 129, 0.4)';
      textResult.innerHTML = '<strong>Regla R4 aplicada exitosamente:</strong> Se cumplen las 3 condiciones conjuntamente (Vigente + Verificado + Disponible). El sistema <em>envía la solicitud de contratación</em> y la muestra como <strong>"Pendiente de aceptación del profesional"</strong>. (No es contratación aceptada aún).';
    } else {
      // Rama NO: decisión de diseño adicional con intervención humana
      document.getElementById('r4-node-action-no')?.classList.add('node-highlight');
      document.getElementById('r4-node-human')?.classList.add('node-highlight');
      document.getElementById('r4-node-end-no')?.classList.add('node-highlight');

      let failedReasons = [];
      if (!isVigente) failedReasons.push('Propuesta caducada/vencida');
      if (!isVerificado) failedReasons.push('Profesional no verificado/auditoría pendiente');
      if (!isDisponible) failedReasons.push('Profesional sin agenda disponible en zona/fecha');

      badgeResult.textContent = 'NO ENVIAR (DECISIÓN DE DISEÑO)';
      badgeResult.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
      badgeResult.style.color = '#f87171';
      badgeResult.style.border = '1px solid rgba(239, 68, 68, 0.4)';

      let advice = '';
      if (!isVerificado) {
        advice = '<strong>Intervención Humana de Seguridad:</strong> Se escala a Compliance de NEXO para auditar credenciales del profesional.';
      } else if (!isDisponible) {
        advice = '<strong>Intervención Asistida:</strong> El sistema retiene el envío y ofrece reprogramar horario o consultar profesionales alternativos en la misma zona.';
      } else {
        advice = '<strong>Revisión Comercial:</strong> Se ofrece al cliente solicitar una actualización de presupuesto al profesional.';
      }

      textResult.innerHTML = `<strong>Bloqueo preventivo:</strong> Falló la condición (${failedReasons.join(', ')}). <em>NO se envía la solicitud como si estuviera todo bien</em>. ${advice}`;
    }
  }

  toggleVigente.addEventListener('change', updateR4);
  toggleVerificado.addEventListener('change', updateR4);
  toggleDisponible.addEventListener('change', updateR4);
  updateR4(); // Initial run
}

/**
 * 4. Accesibilidad y soporte de teclado para los desplegables (<details>)
 */
function initDetailsAccessibility() {
  const detailsElements = document.querySelectorAll('details.interactive-details');

  detailsElements.forEach((detail) => {
    const summary = detail.querySelector('summary');
    if (!summary) return;

    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', detail.open ? 'true' : 'false');

    detail.addEventListener('toggle', () => {
      summary.setAttribute('aria-expanded', detail.open ? 'true' : 'false');
    });

    summary.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        detail.open = !detail.open;
      }
    });
  });
}
