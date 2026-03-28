import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Fade in with blur — cinematic reveal */
export function blurFadeIn(element: Element, delay = 0): void {
  gsap.fromTo(
    element,
    { opacity: 0, y: 30, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Staggered children with blur + scale (premium grid reveal) */
export function staggerScaleIn(
  parent: Element,
  children: string,
  stagger = 0.12
): void {
  gsap.fromTo(
    parent.querySelectorAll(children),
    { opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Slide in from left */
export function slideInLeft(element: Element, delay = 0): void {
  gsap.fromTo(
    element,
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Slide in from right */
export function slideInRight(element: Element, delay = 0): void {
  gsap.fromTo(
    element,
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Stagger with alternating slide directions */
export function staggerAlternate(
  parent: Element,
  children: string,
  stagger = 0.15
): void {
  const els = parent.querySelectorAll(children);
  els.forEach((el, i) => {
    const fromX = i % 2 === 0 ? -40 : 40;
    gsap.fromTo(
      el,
      { opacity: 0, x: fromX, filter: 'blur(4px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        delay: i * stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}
