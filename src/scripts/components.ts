/**
 * Small interactive components: tabs, accordions, the slider, the newsletter
 * form, and smooth scrolling to in-page anchors.
 *
 * Each one enhances markup that already works without JavaScript.
 */

/* ------------------------------------------------------------------ tabs -- */

export function initTabs(): void {
  for (const group of document.querySelectorAll<HTMLElement>('[data-tabs]')) {
    const tabs = [...group.querySelectorAll<HTMLElement>('[data-tab]')];
    const panes = [...group.querySelectorAll<HTMLElement>('[data-tab-pane]')];
    const indicator = group.querySelector<HTMLElement>('[data-tab-indicator]');
    if (!tabs.length) continue;

    const select = (index: number) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        tab.classList.toggle('is-current', active);
      });
      panes.forEach((pane, i) => pane.toggleAttribute('data-active', i === index));
      if (indicator) indicator.style.transform = `translateX(${index * 100}%)`;
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!delta) return;
        event.preventDefault();
        const next = (i + delta + tabs.length) % tabs.length;
        select(next);
        tabs[next].focus();
      });
    });

    select(0);
  }
}

/* ------------------------------------------------------------- accordion -- */

export function initAccordions(): void {
  for (const group of document.querySelectorAll<HTMLElement>('[data-accordion]')) {
    const items = [...group.querySelectorAll<HTMLElement>('[data-accordion-item]')];
    /** Only one panel stays open at a time, matching the source design. */
    const single = group.dataset.accordion !== 'multiple';

    for (const item of items) {
      const trigger = item.querySelector<HTMLButtonElement>('[data-accordion-trigger]');
      const panel = item.querySelector<HTMLElement>('[data-accordion-panel]');
      if (!trigger || !panel) continue;

      trigger.addEventListener('click', () => {
        const open = item.hasAttribute('data-open');
        if (single) {
          for (const other of items) {
            other.removeAttribute('data-open');
            other.querySelector('[data-accordion-trigger]')?.setAttribute('aria-expanded', 'false');
          }
        }
        item.toggleAttribute('data-open', !open);
        trigger.setAttribute('aria-expanded', String(!open));
      });
    }
  }
}

/* ---------------------------------------------------------------- slider -- */

export function initSliders(): void {
  for (const slider of document.querySelectorAll<HTMLElement>('[data-slider]')) {
    const mask = slider.querySelector<HTMLElement>('[data-slider-mask]');
    const slides = [...slider.querySelectorAll<HTMLElement>('[data-slide]')];
    const prev = slider.querySelector<HTMLButtonElement>('[data-slider-prev]');
    const next = slider.querySelector<HTMLButtonElement>('[data-slider-next]');
    const dots = [...slider.querySelectorAll<HTMLButtonElement>('[data-slider-dot]')];
    if (!mask || slides.length < 2) continue;

    const goTo = (index: number) => {
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      mask.scrollTo({ left: slides[clamped].offsetLeft - mask.offsetLeft });
    };

    /** Which slide currently fills the mask. */
    const current = () => {
      const center = mask.scrollLeft + mask.clientWidth / 2;
      return slides.findIndex(
        (slide) => slide.offsetLeft <= center && slide.offsetLeft + slide.clientWidth > center
      );
    };

    prev?.addEventListener('click', () => goTo(current() - 1));
    next?.addEventListener('click', () => goTo(current() + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    const sync = () => {
      const index = current();
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-current', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
      if (prev) prev.disabled = index <= 0;
      if (next) next.disabled = index >= slides.length - 1;
    };

    mask.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    sync();
  }
}

/* ------------------------------------------------------------------ form -- */

/**
 * Posts the newsletter form to whatever endpoint the markup names, and shows
 * the success or error message in place. With no endpoint configured the form
 * still validates and reports success, so the demo behaves sensibly.
 */
export function initForms(): void {
  for (const form of document.querySelectorAll<HTMLFormElement>('[data-newsletter], [data-contact-form]')) {
    const scope = form.closest('div') ?? form.parentElement!;
    const success = scope.querySelector<HTMLElement>('[data-newsletter-success], [data-form-success]');
    const failure = scope.querySelector<HTMLElement>('[data-newsletter-error], [data-form-error]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      success?.setAttribute('hidden', '');
      failure?.setAttribute('hidden', '');

      const endpoint = form.getAttribute('action');
      const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const label = submit?.textContent;
      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Please wait…';
      }

      try {
        if (endpoint) {
          const response = await fetch(endpoint, {
            method: form.getAttribute('method') ?? 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' },
          });
          if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        }
        form.reset();
        form.hidden = true;
        success?.removeAttribute('hidden');
      } catch {
        failure?.removeAttribute('hidden');
      } finally {
        if (submit) {
          submit.disabled = false;
          if (label) submit.textContent = label;
        }
      }
    });
  }
}

/* --------------------------------------------------------- anchor scroll -- */

export function initAnchors(): void {
  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href')!.slice(1);
    const target = id ? document.getElementById(id) : document.body;
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Keep the keyboard in step with the visual jump.
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}
