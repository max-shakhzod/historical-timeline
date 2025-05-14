import gsap from 'gsap';

export default function hidePoint({
  point,
  pointNumber,
  duration = 0.2,
}: {
  point: HTMLDivElement | string;
  pointNumber: HTMLElement | string;
  duration?: number;
}) {
  gsap.set(point, {
    zIndex: 2,
  });
  gsap.to(point, {
    duration: duration,
    top: '-3.3%',
    left: '-3.3%',
    width: '106.6%',
    height: '106.6%',
    ease: 'power1.in',
  });
  gsap.set(pointNumber, {
    backgroundColor: '#42567b',
  });
  gsap.to(pointNumber, {
    duration: duration,
    width: 9,
    height: 9,
    ease: 'power1.in',
  });
}
