import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fadeInUp(element: Element, delay = 0): void {
  gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

export function staggerFadeInUp(
  parent: Element,
  children: string,
  stagger = 0.15
): void {
  gsap.fromTo(
    parent.querySelectorAll(children),
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}
