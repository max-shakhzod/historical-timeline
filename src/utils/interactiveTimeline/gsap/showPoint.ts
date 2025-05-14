import gsap from "gsap";

export default function showPoint({
  point,
  pointNumber,
  duration = 0.2,
  animate = true,
}: {
  point: HTMLDivElement | string;
  pointNumber: HTMLElement | string;
  duration?: number;
  animate?: boolean;
}) {
  if (animate) {
    gsap.to(point, {
      duration: duration,
      top: '-5%',
      left: '-5%',
      width: '110%',
      height: '110%',
      ease: "power1.out"
    });
    gsap.set(pointNumber, {
      backgroundColor: '#f5f6fa',
      cursor: 'pointer',
    });
    gsap.to(pointNumber, {
      duration: duration,
      width: 56,
      height: 56,
      ease: "power1.out"
    });
  } else {
    gsap.set(point, {
      zIndex: 3,
      top: '-5%',
      left: '-5%',
      width: '110%',
      height: '110%',
    });
    gsap.set(pointNumber, {
      backgroundColor: '#f5f6fa',
      width: 56,
      height: 56,
    });
  }
}
