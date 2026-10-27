/**
 * FlexControl — TP3: Dos sentencias, dos soluciones | IFTS 29
 * Logística y distribución · Bloque: Preparación y aviso
 * Grupo 10 · Comisión B
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
 * 2. Simulador Interactivo para Flujo 1 (R3 - FlexControl)
 * “Si el paquete está en preparación y la persona responsable confirma que está preparado, el sistema lo marca como listo para retirar.”
 */
function initSimulatorR3() {
  const toggleEnPrep = document.getElementById('toggle-r3-prep');
  const toggleResponsable = document.getElementById('toggle-r3-resp');
  const badgeResult = document.getElementById('r3-result-badge');
  const textResult = document.getElementById('r3-result-text');

  if (!toggleEnPrep || !toggleResponsable) return;

  function updateR3() {
    const isEnPrep = toggleEnPrep.checked;
    const isRespConfirma = toggleResponsable.checked;

    // Remove prior SVG highlights
    document.querySelectorAll('.svg-r3-node').forEach(el => el.classList.remove('node-highlight'));

    // Highlight starting nodes
    document.getElementById('r3-node-start')?.classList.add('node-highlight');
    document.getElementById('r3-node-query')?.classList.add('node-highlight');
    document.getElementById('r3-node-decision')?.classList.add('node-highlight');

    const bothConditionsMet = isEnPrep && isRespConfirma;

    if (bothConditionsMet) {
      // Rama SÍ: regla estricta R3
      document.getElementById('r3-node-action-yes')?.classList.add('node-highlight');
      document.getElementById('r3-node-design-yes')?.classList.add('node-highlight');
      document.getElementById('r3-node-end-yes')?.classList.add('node-highlight');

      badgeResult.textContent = 'ESTADO: LISTO PARA RETIRAR (REGLA R3)';
      badgeResult.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
      badgeResult.style.color = '#10b981';
      badgeResult.style.border = '1px solid rgba(16, 185, 129, 0.4)';
      textResult.innerHTML = '<strong>Regla R3 aplicada con éxito:</strong> El paquete está en preparación y la persona responsable confirmó que está listo. El sistema <em>marca el paquete como listo para retirar</em> y lo habilita para el área de despacho.';
    } else {
      // Rama NO
      document.getElementById('r3-node-action-no')?.classList.add('node-highlight');
      document.getElementById('r3-node-end-no')?.classList.add('node-highlight');

      let failedReasons = [];
      if (!isEnPrep) failedReasons.push('el paquete no figura en preparación');
      if (!isRespConfirma) failedReasons.push('falta la confirmación de la persona responsable');

      badgeResult.textContent = 'NO CAMBIA ESTADO (CONSERVA EN PREPARACIÓN)';
      badgeResult.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
      badgeResult.style.color = '#f59e0b';
      badgeResult.style.border = '1px solid rgba(245, 158, 11, 0.4)';
      textResult.innerHTML = `<strong>Condición no cumplida (${failedReasons.join(' y ')}):</strong> El sistema <em>no lo marca como listo para retirar</em> y conserva el estado de empaque previo. (Decisión de diseño: si excede el SLA de preparación, se emite alerta al supervisor de depósito).`;
    }
  }

  toggleEnPrep.addEventListener('change', updateR3);
  toggleResponsable.addEventListener('change', updateR3);
  updateR3(); // Initial run
}

/**
 * 3. Simulador Interactivo para Flujo 2 (R4 - FlexControl)
 * “Si el paquete está listo para retirar, hay un contacto de transportista autorizado y el aviso de retiro no está enviado, en curso ni con un error pendiente, el sistema solicita su envío; solo lo registra como enviado tras la confirmación exitosa del servicio de mensajería.”
 */
function initSimulatorR4() {
  const toggleListo = document.getElementById('toggle-r4-listo');
  const toggleTransportista = document.getElementById('toggle-r4-transp');
  const toggleSinConflicto = document.getElementById('toggle-r4-sinconflicto');
  const toggleMensajeriaOk = document.getElementById('toggle-r4-mensajeria');
  const badgeResult = document.getElementById('r4-result-badge');
  const textResult = document.getElementById('r4-result-text');

  if (!toggleListo || !toggleTransportista || !toggleSinConflicto || !toggleMensajeriaOk) return;

  function updateR4() {
    const isListo = toggleListo.checked;
    const isTransportista = toggleTransportista.checked;
    const isSinConflicto = toggleSinConflicto.checked;
    const isMensajeriaOk = toggleMensajeriaOk.checked;

    // Remove prior SVG highlights
    document.querySelectorAll('.svg-r4-node').forEach(el => el.classList.remove('node-highlight'));

    // Highlight starting nodes
    document.getElementById('r4-node-start')?.classList.add('node-highlight');
    document.getElementById('r4-node-queries')?.classList.add('node-highlight');
    document.getElementById('r4-node-decision-1')?.classList.add('node-highlight');

    const canRequestDispatch = isListo && isTransportista && isSinConflicto;

    if (canRequestDispatch) {
      document.getElementById('r4-node-action-solicitar')?.classList.add('node-highlight');
      document.getElementById('r4-node-decision-2')?.classList.add('node-highlight');

      if (isMensajeriaOk) {
        // Confirmación exitosa: registra como enviado
        document.getElementById('r4-node-action-enviado')?.classList.add('node-highlight');
        document.getElementById('r4-node-end-success')?.classList.add('node-highlight');

        badgeResult.textContent = 'REGISTRADO COMO ENVIADO (REGLA R4)';
        badgeResult.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        badgeResult.style.color = '#10b981';
        badgeResult.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        textResult.innerHTML = '<strong>Regla R4 completa:</strong> Condiciones previas cumplidas (Listo + Transportista autorizado + Sin aviso previo/conflicto). El sistema <em>solicitó el envío</em> y, al recibir la confirmación exitosa de la mensajería, <em>lo registra como enviado</em>.';
      } else {
        // En espera de confirmación exitosa o error
        document.getElementById('r4-node-action-wait')?.classList.add('node-highlight');
        document.getElementById('r4-node-end-wait')?.classList.add('node-highlight');

        badgeResult.textContent = 'ENVÍO SOLICITADO (PENDIENTE DE CONFIRMACIÓN)';
        badgeResult.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
        badgeResult.style.color = '#f59e0b';
        badgeResult.style.border = '1px solid rgba(245, 158, 11, 0.4)';
        textResult.innerHTML = '<strong>Regla R4 en curso:</strong> El sistema solicitó el despacho al servicio de mensajería, pero <em>aún no lo registra como enviado</em> porque la regla estipula que <strong>solo lo registra tras la confirmación exitosa</strong> del servicio.';
      }
    } else {
      // Rama NO inicial: No solicita envío
      document.getElementById('r4-node-action-no')?.classList.add('node-highlight');
      document.getElementById('r4-node-human')?.classList.add('node-highlight');
      document.getElementById('r4-node-end-no')?.classList.add('node-highlight');

      let failed = [];
      if (!isListo) failed.push('el paquete no está listo para retirar');
      if (!isTransportista) failed.push('no hay contacto de transportista autorizado');
      if (!isSinConflicto) failed.push('el aviso ya fue enviado, está en curso o posee un error pendiente');

      badgeResult.textContent = 'NO SE SOLICITA ENVÍO (RETENCIÓN PREVENTIVA)';
      badgeResult.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
      badgeResult.style.color = '#f87171';
      badgeResult.style.border = '1px solid rgba(239, 68, 68, 0.4)';

      let advice = '';
      if (!isTransportista) {
        advice = '<strong>Intervención Humana Logística:</strong> Derivar a mesa de despacho para asignar un transportista habilitado.';
      } else if (!isSinConflicto) {
        advice = '<strong>Revisión de Avisos:</strong> Si hay error pendiente, derivar a soporte técnico para limpiar la incidencia sin duplicar avisos.';
      } else {
        advice = '<strong>Control de Depósito:</strong> El paquete aún debe completar la etapa de preparación en R3.';
      }

      textResult.innerHTML = `<strong>Bloqueo estricto (${failed.join('; ')}):</strong> El sistema <em>NO solicita el envío</em>. ${advice}`;
    }
  }

  toggleListo.addEventListener('change', updateR4);
  toggleTransportista.addEventListener('change', updateR4);
  toggleSinConflicto.addEventListener('change', updateR4);
  toggleMensajeriaOk.addEventListener('change', updateR4);
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
