import gsap from 'gsap';

export default function showPointLabel({
  label,
  duration = 0.3,
  animate = true,
}: {
  label: HTMLElement | string;
  duration?: number;
  animate?: boolean;
}) {
  if (animate) {
    gsap.to(label, {
      duration: duration,
      opacity: 1,
      ease: 'power1.out',
    });
  } else {
    gsap.set(label, {
      opacity: 1,
    });
  }
}
