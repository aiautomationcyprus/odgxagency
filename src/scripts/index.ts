/** Entry point for the theme's client-side behavior. */
import { initAccordions, initAnchors, initForms, initSliders, initTabs } from './components';
import { initHeader } from './header';
import { initMotion } from './motion';
import { initSmoothScroll } from './smooth-scroll';
import { initBackgroundVideo } from './video';

function init(): void {
  initHeader();
  initTabs();
  initAccordions();
  initSliders();
  initForms();
  initAnchors();
  initMotion();
  // initSmoothScroll(); // Test: Momentum-Scrolling deaktiviert
  initBackgroundVideo();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
