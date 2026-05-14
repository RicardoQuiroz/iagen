/* ═══════════════════════════════════════════════════════════════════════════
   investigacion.js
   Utilidades ligeras — "La Agencia de Detectives Audiovisuales"
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Inyectar barra de navegación entre actos ────────────────────────────── */
  function buildNav() {
    const acts = [
      { cls: 'nav-i',   id: 'acto-i',   label: '🔵 Acto I'   },
      { cls: 'nav-ii',  id: 'acto-ii',  label: '🟠 Acto II'  },
      { cls: 'nav-iii', id: 'acto-iii', label: '🟣 Acto III' },
      { cls: 'nav-iv',  id: 'acto-iv',  label: '🟢 Acto IV'  },
      { cls: 'nav-print', id: null, label: '🖨 Imprimir', print: true }
    ];

    // Solo inyecta si existe al menos un ancla de acto en la página
    const hasAnchors = acts.some(a => a.id && document.getElementById(a.id));
    if (!hasAnchors) return;

    const nav = document.createElement('nav');
    nav.className = 'act-nav';

    acts.forEach(function (a) {
      const el = document.createElement('a');
      el.className = 'act-nav-btn ' + a.cls;
      el.textContent = a.label;

      if (a.print) {
        el.href = '#';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          window.print();
        });
      } else {
        el.href = '#' + a.id;
      }
      nav.appendChild(el);
    });

    // Insertar después del primer h1 o al inicio del body
    const h1 = document.querySelector('h1');
    if (h1 && h1.nextSibling) {
      h1.parentNode.insertBefore(nav, h1.nextSibling);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  /* ── Marcar checkbox visual al hacer clic ───────────────────────────────── */
  function activateCheckboxes() {
    document.querySelectorAll('.check-box').forEach(function (cell) {
      cell.style.cursor = 'pointer';
      cell.title = 'Clic para marcar / desmarcar';
      cell.addEventListener('click', function () {
        const checked = cell.dataset.checked === '1';
        cell.dataset.checked = checked ? '0' : '1';
        cell.textContent = checked ? '☐' : '☑';
        cell.style.color = checked ? '' : '#2E7D32';
        cell.style.fontWeight = checked ? '' : 'bold';
      });
    });
  }

  /* ── Resaltar acto activo en la barra de nav al hacer scroll ─────────────── */
  function activateScrollSpy() {
    const anchors = ['acto-i', 'acto-ii', 'acto-iii', 'acto-iv']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!anchors.length) return;

    window.addEventListener('scroll', function () {
      const scroll = window.scrollY + 80;
      let current = anchors[0].id;

      anchors.forEach(function (el) {
        if (el.offsetTop <= scroll) current = el.id;
      });

      document.querySelectorAll('.act-nav-btn').forEach(function (btn) {
        btn.style.opacity = btn.href && btn.href.endsWith('#' + current) ? '1' : '0.55';
      });
    });
  }

  /* ── Tabla de puntos acumulados: resaltar fila según puntaje ingresado ───── */
  function activateGradeHighlight() {
    const gradeTable = document.querySelector('.grade-table');
    if (!gradeTable) return;

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 120;
    input.placeholder = 'Escribe tus puntos…';
    input.style.cssText = [
      'margin: 6px 0 10px 0',
      'padding: 5px 10px',
      'font-size: 10pt',
      'border: 1px solid #CCCCCC',
      'border-radius: 4px',
      'width: 180px'
    ].join(';');

    gradeTable.parentNode.insertBefore(input, gradeTable);

    const rows = {
      a: gradeTable.querySelector('.grade-a'),
      b: gradeTable.querySelector('.grade-b'),
      c: gradeTable.querySelector('.grade-c'),
      d: gradeTable.querySelector('.grade-d')
    };

    input.addEventListener('input', function () {
      const v = parseInt(input.value, 10);
      Object.values(rows).forEach(r => { if (r) r.style.outline = ''; });

      if (isNaN(v)) return;
      let target = null;
      if (v >= 90)      target = rows.a;
      else if (v >= 75) target = rows.b;
      else if (v >= 60) target = rows.c;
      else              target = rows.d;

      if (target) target.style.outline = '3px solid #C9A84C';
    });
  }

  /* ── Init ────────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    buildNav();
    activateCheckboxes();
    activateScrollSpy();
    activateGradeHighlight();
  });

})();
