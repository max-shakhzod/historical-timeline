import gsap from 'gsap';

export default function hidePointLabel(label: HTMLElement | string) {
  gsap.set(label, {
    opacity: 0,
  });
}
