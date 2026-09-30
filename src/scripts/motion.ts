/**
 * Motion layer.
 *
 * Everything here is driven by `data-anim` attributes in the markup, so a page
 * declares what it wants and this file decides how it moves. To slow the whole
 * site down, retime it, or switch an effect off, edit `EFFECTS` below — nothing
 * else needs to change.
 *
 * Hover states are deliberately *not* here; they live in `styles/behavior.css`
 * as CSS transitions, which is cheaper and works before this script loads.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Reveal animations start when the element is this far into the viewport. */
const START = 'top 85%';

/** The odometer's easing, taken from the source design. */
const ODOMETER_EASE = 'cubic-bezier(0.784, 0.325, 0.222, 0.98)';

type Effect = (el: HTMLElement, options: Options) => void;

interface Options {
  delay: number;
  duration: number;
  /** Per-effect argument, e.g. the marquee's cycle length. */
  value: string | null;
}

/* ---------------------------------------------------------------- effects -- */

const EFFECTS: Record<string, Effect> = {
  /** Rises into place. The workhorse reveal, used across every page. */
  'fade-up': (el, { delay, duration }) => {
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /** Scales up from slightly small — used for cards and framed images. */
  grow: (el, { delay, duration }) => {
    gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: 'sine.out',
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /** Slides in from the left. */
  'fade-left': (el, { delay, duration }) => {
    gsap.fromTo(
      el,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /** Slides in from the right. */
  'fade-right': (el, { delay, duration }) => {
    gsap.fromTo(
      el,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /** An image settling out of an over-scaled crop. */
  'zoom-out': (el, { delay }) => {
    gsap.fromTo(
      el,
      { scale: 1.5 },
      {
        scale: 1,
        duration: 1,
        delay,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /**
   * Section headings assemble character by character as they scroll in.
   *
   * A heading may also carry a muted tail — `<span class="section-span">` —
   * whose words darken one by one as the reader scrolls past. SplitText keeps
   * that span in the DOM, so both effects can share a single split.
   */
  title: (el, { value }) => {
    const split = new SplitText(el, { type: 'words,chars', mask: 'chars' });

    gsap.fromTo(
      split.chars,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.015,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      }
    );

    const tail = el.querySelector<HTMLElement>('.section-span');
    if (!tail) return;

    const tailWords = split.words.filter((word) => tail.contains(word));
    if (!tailWords.length) return;

    const to = value === 'white' ? 'var(--color-white)' : 'var(--color-ink)';
    gsap.to(tailWords, {
      color: to,
      stagger: 0.5,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 50%', scrub: true },
    });
  },

  /** The hero heading, which plays on load rather than on scroll. */
  'hero-title': (el) => {
    // Splitting words as well as characters keeps words from breaking mid-word
    // across lines once each character becomes its own inline element.
    const split = new SplitText(el, { type: 'words,chars', mask: 'chars' });
    gsap.from(split.chars, {
      yPercent: 100,
      duration: 0.8,
      stagger: 0.015,
      ease: 'power2.out',
    });
  },

  /**
   * A statement paragraph whose words darken one by one as the reader scrolls
   * through it. `data-anim-value="white"` inverts it for dark sections.
   */
  words: (el, { value }) => {
    const split = new SplitText(el, { type: 'words' });
    const to = value === 'white' ? 'var(--color-white)' : 'var(--color-ink)';

    gsap.set(split.words, { color: 'var(--color-muted)' });
    gsap.to(split.words, {
      color: to,
      stagger: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: true,
      },
    });
  },

  /**
   * The odometer counter. The markup holds two digit strips; they roll in
   * opposite directions so the final digit lands on the target value.
   */
  counter: (el) => {
    const strips = el.querySelectorAll<HTMLElement>('[data-count-forward], [data-count-reverse]');
    if (!strips.length) return;

    // Each strip lists its target digit first, so rolling from the far end back
    // to the top lands on the right numeral.
    gsap.fromTo(
      strips,
      { yPercent: -1000 },
      {
        yPercent: 0,
        duration: 2,
        ease: ODOMETER_EASE,
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /** A horizontal logo belt that loops forever. */
  marquee: (el, { value }) => {
    const track = el.firstElementChild as HTMLElement | null;
    if (!track) return;

    // A second copy makes the wrap seamless.
    const clone = track.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    el.append(clone);

    const seconds = Number(value) || 45;
    gsap.to(el.children, {
      xPercent: -100,
      duration: seconds,
      ease: 'none',
      repeat: -1,
    });
  },

  /** Cards that converge toward the center as the section scrolls past. */
  converge: (el) => {
    const cards = el.querySelectorAll<HTMLElement>('[data-converge-from]');
    if (!cards.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true },
    });

    for (const card of cards) {
      const [x = '0', y = '0'] = (card.dataset.convergeFrom ?? '').split(',');
      timeline.fromTo(card, { x: Number(x), y: Number(y) }, { x: 0, y: 0, ease: 'none' }, 0);
    }
  },

  /** A stack of cards that shrink slightly as the next one covers them. */
  stack: (el) => {
    const cards = [...el.querySelectorAll<HTMLElement>('[data-stack-item]')];
    if (cards.length < 2) return;

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.9 + i * 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      });
    });
  },

  /**
   * The timeline on the about page: a line grows, its dots light up, and each
   * panel's image is revealed in turn.
   */
  timeline: (el) => {
    const line = el.querySelector<HTMLElement>('[data-timeline-line]');
    const dots = [...el.querySelectorAll<HTMLElement>('[data-timeline-dot]')];
    const images = [...el.querySelectorAll<HTMLElement>('[data-timeline-image]')];

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 80%', scrub: true },
    });

    /*
     * The line spans the whole timeline. Left to its default duration it would
     * reach the last milestone at the halfway point of the scroll and then sit
     * finished, which reads as no animation at all through the second half.
     */
    if (line) {
      timeline.fromTo(line, { height: '0%' }, { height: '100%', duration: 1, ease: 'none' }, 0);
    }

    const span = 1 / Math.max(dots.length, 1);
    dots.forEach((dot, i) => {
      timeline.to(dot, { backgroundColor: 'var(--color-ink)', duration: 0.01 }, i * span);
    });
    images.forEach((image, i) => {
      timeline.fromTo(image, { height: '0%' }, { height: '100%', duration: span, ease: 'none' }, i * span);
    });
  },

  /** A rule that draws itself across the section. */
  line: (el, { value }) => {
    gsap.fromTo(
      el,
      { width: '0%' },
      {
        width: value ?? '100%',
        duration: 0.8,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: el, start: START, once: true },
      }
    );
  },

  /** The 404 illustration's eye, which blinks on a loop. */
  blink: (el) => {
    const lid = el.querySelector<HTMLElement>('[data-blink-lid]');
    const pupil = el.querySelector<HTMLElement>('[data-blink-pupil]');
    if (!lid || !pupil) return;

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    timeline
      .to(pupil, { scale: 0.5, opacity: 0, duration: 0.18, ease: 'power1.in' })
      .to(lid, { height: '0%', duration: 0.18, ease: 'power1.in' }, '<')
      .to(lid, { height: '100%', duration: 0.18, ease: 'power1.out' })
      .to(pupil, { scale: 1, opacity: 1, duration: 0.18, ease: 'power1.out' }, '<');
  },

  /** An image that grows taller as the reader scrolls into the hero. */
  'hero-image': (el) => {
    gsap.fromTo(
      el,
      { height: '30%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: true },
      }
    );
  },
};

/* ------------------------------------------------------- cursor parallax -- */

/**
 * Artwork that drifts with the pointer inside its card. Skipped on touch
 * devices, where there is no pointer to follow.
 */
function initCursorParallax(): void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  for (const area of document.querySelectorAll<HTMLElement>('[data-cursor-parallax]')) {
    const target = area.querySelector<HTMLElement>('[data-cursor-parallax-target]');
    if (!target) return;

    const range = Number(area.dataset.cursorParallax) || 50;
    const moveX = gsap.quickTo(target, 'x', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(target, 'y', { duration: 0.6, ease: 'power3.out' });

    area.addEventListener('pointermove', (event) => {
      const box = area.getBoundingClientRect();
      moveX(((event.clientX - box.left) / box.width - 0.5) * range * 2);
      moveY(((event.clientY - box.top) / box.height - 0.5) * range * 2);
    });

    area.addEventListener('pointerleave', () => {
      moveX(0);
      moveY(0);
    });
  }
}

/* -------------------------------------------------------------- bootstrap -- */

export function initMotion(): void {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-anim]')];

  // With motion turned down, reveal everything immediately and run nothing else.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const el of elements) el.setAttribute('data-anim-ready', '');
    return;
  }

  for (const el of elements) {
    const name = el.dataset.anim!;
    const effect = EFFECTS[name];
    el.setAttribute('data-anim-ready', '');

    if (!effect) {
      if (import.meta.env.DEV) console.warn(`[motion] unknown effect "${name}"`, el);
      continue;
    }

    effect(el, {
      delay: Number(el.dataset.animDelay) || 0,
      duration: Number(el.dataset.animDuration) || 0.8,
      value: el.dataset.animValue ?? null,
    });
  }

  initCursorParallax();

  // Late-loading images change the page height; recompute the trigger points.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
