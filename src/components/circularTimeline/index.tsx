import { useEffect, useRef } from 'react';
import type { ArrowControlsStatus } from '@/components/ArrowControls';
import getActualPointIndex from '@/utils/interactiveTimeline/getActualPointIndex';
import getNearestPointIndex from '@/utils/interactiveTimeline/getNearestPointIndex';
import changePointZPosition from '@/utils/interactiveTimeline/gsap/changePointZPosition';
import hidePoint from '@/utils/interactiveTimeline/gsap/hidePoint';
import rotatePoints from '@/utils/interactiveTimeline/gsap/rotatePoints';
import showPoint from '@/utils/interactiveTimeline/gsap/showPoint';
import showPointLabel from '@/utils/interactiveTimeline/gsap/showPointLabel';
import matrixToDegrees from '@/utils/interactiveTimeline/matrixToDegrees';
import Point from './Point';
import YearsInterval from './YearsInterval';

interface PointData {
  id: string;
  index: number;
  label: string;
}

interface TimeIntervalsProps {
  currentPointIndex: number;
  startYear: number;
  lastYear: number;
  pointsData: PointData[];
  rotationDuration: number;
  bulletClickHandler: (id: number) => void;
  arrowControlsStatus: ArrowControlsStatus;
  arrowControlsStatusSetter: (status: ArrowControlsStatus) => void;
}

function TimeIntervals({
  currentPointIndex,
  arrowControlsStatus,
  startYear,
  lastYear,
  pointsData,
  rotationDuration,
  bulletClickHandler: handleBulletClick,
  arrowControlsStatusSetter: setArrowControlsStatus,
}: TimeIntervalsProps) {
  const ancestorRef = useRef<HTMLDivElement>(null);
  const activePointNumberRef = useRef<HTMLSpanElement | null>(null);
  const activePointRef = useRef<HTMLDivElement | null>(null);
  const prevPointNumberRef = useRef<HTMLSpanElement | null>(null);
  const prevPointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ancestorEl = ancestorRef.current;
    if (!ancestorEl) return;

    const firstPoint = ancestorEl.querySelector<HTMLDivElement>('.time-intervals__point');
    const firstPointNumber = firstPoint?.querySelector<HTMLSpanElement>('.point-number');

    if (firstPoint && firstPointNumber) {
      prevPointRef.current = firstPoint;
      prevPointNumberRef.current = firstPointNumber;

      showPoint({ point: firstPoint, pointNumber: firstPointNumber, animate: false });

      const label = firstPoint.querySelector<HTMLSpanElement>('.point-label');
      if (label) showPointLabel({ label, animate: false });
    }

    const circleCoords = ancestorEl.getBoundingClientRect();
    let circleRadius = circleCoords.width / 2;
    let circleX = circleCoords.x + circleRadius + window.scrollX;
    let circleY = circleCoords.y + circleRadius + window.scrollY;

    const handleWindowResize = () => {
      const newCoords = ancestorEl.getBoundingClientRect();
      circleRadius = newCoords.width / 2;
      circleX = newCoords.x + circleRadius + window.scrollX;
      circleY = newCoords.y + circleRadius + window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentEl = e.target as HTMLElement;
      if (!currentEl) return;

      if (currentEl.classList.contains('point-number')) {
        if (
          currentEl !== prevPointNumberRef.current &&
          currentEl !== activePointNumberRef.current
        ) {
          activePointNumberRef.current = currentEl as HTMLSpanElement;
          const point = activePointRef.current;
          if (point && activePointNumberRef.current) {
            showPoint({ point, pointNumber: activePointNumberRef.current });
          }
        }
        return;
      }

      if (activePointRef.current) {
        changePointZPosition({ point: activePointRef.current, direction: 'down' });
        activePointRef.current = null;
      }

      const nearestPointIndex = getNearestPointIndex({
        ax: circleX,
        ay: circleY,
        bx: e.pageX,
        by: e.pageY,
      });

      const actualNearestPointIndex = getActualPointIndex({
        index: nearestPointIndex,
        pointsQuantity: pointsData.length,
        firstPointNumber: Number(prevPointNumberRef.current?.innerText || 0),
      });

      const actualPoint = ancestorEl.querySelector<HTMLDivElement>(`.point${actualNearestPointIndex}`);
      if (actualPoint) {
        changePointZPosition({ point: actualPoint, direction: 'up' });
        activePointRef.current = actualPoint;
      }

      if (activePointNumberRef.current) {
        hidePoint({
          point: activePointRef.current!,
          pointNumber: activePointNumberRef.current,
        });
        activePointNumberRef.current = null;
      }
    };

    const handleClick = () => {
      const point = activePointRef.current;
      const pointNumber = activePointNumberRef.current;
      if (!point || !pointNumber) return;

      const transform = window.getComputedStyle(point).transform;
      const chosenPosition = matrixToDegrees(transform);
      const allPoints = ancestorEl.querySelectorAll('.time-intervals__point');

      if (prevPointRef.current && prevPointNumberRef.current) {
        rotatePoints({
          chosenPosition,
          activePointNumber: pointNumber,
          prevPoint: prevPointRef.current,
          prevPointNumber: prevPointNumberRef.current,
          points: allPoints,
          pointsQuantity: allPoints.length,
          duration: rotationDuration,
        });

        prevPointRef.current = point;
        prevPointNumberRef.current = pointNumber;
        activePointRef.current = null;
        activePointNumberRef.current = null;

        setTimeout(() => {
          const label = prevPointRef.current?.querySelector<HTMLSpanElement>('.point-label');
          if (label) showPointLabel({ label });
        }, rotationDuration * 1000);
      }
    };

    ancestorEl.addEventListener('mousemove', handleMouseMove);
    ancestorEl.addEventListener('click', handleClick);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      ancestorEl.removeEventListener('mousemove', handleMouseMove);
      ancestorEl.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [pointsData.length, rotationDuration]);

  useEffect(() => {
    if (arrowControlsStatus === null) return;
    const ancestorEl = ancestorRef.current;
    if (!ancestorEl) return;

    const point = ancestorEl.querySelector<HTMLDivElement>(`.point${currentPointIndex}`);
    const pointNumber = point?.querySelector<HTMLSpanElement>('.point-number');

    if (point && pointNumber) {
      activePointRef.current = point;
      activePointNumberRef.current = pointNumber;

      showPoint({ point, pointNumber });
      pointNumber.click();

      setTimeout(() => setArrowControlsStatus(null), rotationDuration * 1000 + 300);
    }
  }, [arrowControlsStatus, currentPointIndex, rotationDuration, setArrowControlsStatus]);

  return (
    <div className="time-intervals" ref={ancestorRef}>
      <YearsInterval startYear={startYear} lastYear={lastYear} />
      {pointsData.map(({ id, index, label }) => (
        <Point
          key={id}
          index={index}
          label={label}
          bulletClickHandler={() => handleBulletClick(index)}
        />
      ))}
    </div>
  );
}

export default TimeIntervals;
