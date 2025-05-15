import { type MouseEvent } from 'react';
import '../assets/styles/base/historical-components/_arrow-controls.scss';


export type ArrowControlsStatus = 'left' | 'right' | null;

interface ArrowControlsProps {
  currentPointIndex: number;
  pointsLength: number;
  arrowControlsStatus: ArrowControlsStatus;
  controlClickHandler: (e: MouseEvent, id: number) => void;
}

function ArrowControls({
  currentPointIndex,
  pointsLength,
  arrowControlsStatus,
  controlClickHandler: handleControlClick,
}: ArrowControlsProps) {
  return (
    <div className="arrow-controls">
      <div
        className={`arrow-controls__arrow-left ${
          (currentPointIndex === 1 || arrowControlsStatus !== null) &&
          'arrow-controls__arrow-left_disabled'
        }`}
        onClick={(e) => handleControlClick(e, -1)}
      ></div>
      <div
        className={`arrow-controls__arrow-right ${
          (currentPointIndex === pointsLength ||
            arrowControlsStatus !== null) &&
          'arrow-controls__arrow-right_disabled'
        }`}
        onClick={(e) => handleControlClick(e, 1)}
      ></div>
    </div>
  );
}

export default ArrowControls;
