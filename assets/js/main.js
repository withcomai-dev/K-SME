/* ==========================================================================
   중소기업정책자금지원원 — 공용 스크립트
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Mobile nav ---------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------- Count-up stats ---------------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('ko-KR');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString('ko-KR');
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(el => cio.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------------- Accordion (FAQ) ---------------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const q = item.querySelector('.acc-q');
    const a = item.querySelector('.acc-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.acc-list')?.querySelectorAll('.acc-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.acc-a').style.maxHeight = null;
          other.querySelector('.acc-q').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      q.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------------- Chip select groups ---------------- */
  document.querySelectorAll('.chip-group').forEach(group => {
    const multi = group.getAttribute('data-multi') === 'true';
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (!multi) {
          group.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
        }
        chip.classList.toggle('selected');
      });
    });
  });

  /* ---------------- 3-Step diagnosis form ---------------- */
  const diagForms = document.querySelectorAll('[data-diag-form]');
  diagForms.forEach(initDiagForm);

  function initDiagForm(root) {
    const panels = root.querySelectorAll('.diag-panel');
    const steps = root.querySelectorAll('.diag-steps .step');
    const confirm = root.querySelector('.diag-confirm');
    let current = 1;

    const liveRegion = root.querySelector('[data-live-count]');
    if (liveRegion) {
      let base = parseInt(liveRegion.getAttribute('data-base') || '24', 10);
      setInterval(() => {
        if (Math.random() > 0.5) base += 1;
        liveRegion.textContent = base;
      }, 9000);
    }

    function showStep(n) {
      panels.forEach(p => p.classList.toggle('active', parseInt(p.dataset.step, 10) === n));
      steps.forEach((s, i) => {
        s.classList.toggle('done', i + 1 < n);
        s.classList.toggle('active', i + 1 === n);
      });
      current = n;
    }

    function validateStep(n) {
      const panel = root.querySelector(`.diag-panel[data-step="${n}"]`);
      if (!panel) return true;
      let valid = true;
      panel.querySelectorAll('.chip-group[data-required="true"]').forEach(group => {
        if (!group.querySelector('.chip.selected')) {
          valid = false;
          group.classList.add('needs-attn');
        } else {
          group.classList.remove('needs-attn');
        }
      });
      panel.querySelectorAll('input[required], select[required]').forEach(input => {
        if (!input.checkValidity()) {
          valid = false;
          input.reportValidity();
        }
      });
      return valid;
    }

    root.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!validateStep(current)) return;
        if (current < panels.length) showStep(current + 1);
      });
    });
    root.querySelectorAll('[data-prev]').forEach(btn => {
      btn.addEventListener('click', () => showStep(Math.max(1, current - 1)));
    });

    const form = root.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateStep(current)) return;
        // 실제 서비스에서는 이 지점에서 서버(API)로 진단 데이터 전송
        root.querySelectorAll('.diag-body > *').forEach(el => { if (!el.classList.contains('diag-confirm')) el.style.display = 'none'; });
        root.querySelector('.diag-steps')?.style.setProperty('display', 'none');
        root.querySelector('.diag-head')?.style.setProperty('display', 'none');
        if (confirm) {
          confirm.classList.add('active');
          const nameEl = confirm.querySelector('[data-applicant-name]');
          const nameInput = form.querySelector('input[name="applicant_name"]');
          if (nameEl && nameInput && nameInput.value) {
            nameEl.textContent = nameInput.value.trim();
          }
        }
      });
    }

    showStep(1);
  }

  /* ---------------- Generic filter chips (cases / insights) ---------------- */
  document.querySelectorAll('.filter-row[data-filter-target]').forEach(row => {
    const targetSel = row.getAttribute('data-filter-target');
    const attr = row.getAttribute('data-filter-attr') || 'category';
    const items = document.querySelectorAll(targetSel);
    row.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        row.querySelectorAll('.chip').forEach(c => c.removeAttribute('data-active'));
        chip.setAttribute('data-active', 'true');
        const value = chip.getAttribute('data-value');
        items.forEach(item => {
          const match = value === 'all' || item.getAttribute('data-' + attr) === value;
          item.hidden = !match;
        });
      });
    });
  });

  /* ---------------- Header shadow on scroll ---------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

});
