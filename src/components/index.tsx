import { type MouseEvent, useState } from 'react';
import ArrowControls from '@/components/ArrowControls';
import FractionPagination from '@/components/FractionPagination';
import Slider from '@/components/Slider';
import Title from '@/components/Title';
import TimeIntervals from '@/components/circularTimeline';
import capitalizeString from '@/utils/capitalizeString';
import BulletsPagination from './BulletsPagination';
import ControlsWrapper from './ControlsWrapper';

export type TimelineEntry = {
  id: string;
  index: number;
  label: string;
  yearsInterval: {
    start: number;
    last: number;
  };
  details: {
    year: number;
    description: string;
  }[];
};

interface TimelineDatesProps {
  timelineData: TimelineEntry[];
}

function TimelineDates({ timelineData }: TimelineDatesProps) {
  // Ensure timelineData has valid entries before destructuring
  const safeData = timelineData.length > 0 ? timelineData : [{
    id: '',
    index: 1,
    label: '',
    yearsInterval: { start: 0, last: 0 },
    details: [],
  }];

  const [currentPointIndex, setCurrentPointIndex] = useState<number>(safeData[0].index);
  const [startYear, setStartYear] = useState<number>(safeData[0].yearsInterval.start);
  const [lastYear, setLastYear] = useState<number>(safeData[0].yearsInterval.last);
  const [arrowControlsStatus, setArrowControlsStatus] = useState<null | 'left' | 'right'>(null);
  const [updatingYears, setUpdatingYears] = useState<boolean>(false);

  if (timelineData.length < 2 || timelineData.length > 6) {
    return null;
  }

  const pointsData = timelineData.map(({ id, index, label }) => ({
    id,
    index,
    label: capitalizeString(label),
  }));

  const sliderData = timelineData[currentPointIndex - 1]?.details ?? [];
  const rotationDuration = 1;
  const isMobileScreen = window.innerWidth <= 768;

  const updateYears = (newIndex: number) => {
    setUpdatingYears(true);

    const newYearsInterval = timelineData[newIndex - 1].yearsInterval;
    const castNumberStart = newYearsInterval.start > startYear ? 1 : -1;
    const castNumberLast = newYearsInterval.last > lastYear ? 1 : -1;

    let startYearCounter = Math.abs(startYear - newYearsInterval.start);
    let lastYearCounter = Math.abs(lastYear - newYearsInterval.last);
    let delay = (rotationDuration * 1000) / 2;

    if (startYearCounter > lastYearCounter) {
      delay /= startYearCounter;
    } else {
      delay /= lastYearCounter;
    }

    const interval = setInterval(() => {
      if (startYearCounter > 0) {
        setStartYear((prev) => prev + castNumberStart);
        startYearCounter--;
      }

      if (lastYearCounter > 0) {
        setLastYear((prev) => prev + castNumberLast);
        lastYearCounter--;
      }

      if (startYearCounter === 0 && lastYearCounter === 0) {
        clearInterval(interval);
        setUpdatingYears(false);
      }
    }, delay);
  };

  const handleBulletClick = (index: number) => {
    if (updatingYears) return;
    updateYears(index);
    setCurrentPointIndex(index);
  };

  const handleControlClick = (e: MouseEvent, castNumber: number) => {
    if (
      updatingYears ||
      e.currentTarget.classList.contains('arrow-controls__arrow-left_disabled') ||
      e.currentTarget.classList.contains('arrow-controls__arrow-right_disabled')
    ) {
      return;
    }

    const nextIndex = currentPointIndex + castNumber;
    if (isMobileScreen) {
      updateYears(nextIndex);
      setCurrentPointIndex(nextIndex);
    } else {
      setArrowControlsStatus(castNumber < 0 ? 'left' : 'right');
      setCurrentPointIndex(nextIndex);
    }
  };

  return (
    <div className="historical-dates">
      <Title />
      <TimeIntervals
        currentPointIndex={currentPointIndex}
        startYear={startYear}
        lastYear={lastYear}
        pointsData={pointsData}
        rotationDuration={rotationDuration}
        bulletClickHandler={handleBulletClick}
        arrowControlsStatus={arrowControlsStatus}
        arrowControlsStatusSetter={setArrowControlsStatus}
      />
      <hr className="historical-dates__delimiter" />
      <ControlsWrapper>
        <FractionPagination
          currentPointIndex={currentPointIndex}
          pointsLength={timelineData.length}
        />
        <ArrowControls
          controlClickHandler={handleControlClick}
          pointsLength={timelineData.length}
          arrowControlsStatus={arrowControlsStatus}
          currentPointIndex={currentPointIndex}
        />
      </ControlsWrapper>
      <Slider
        sliderData={sliderData}
        isMobileScreen={isMobileScreen}
      />
      <BulletsPagination
        currentPointIndex={currentPointIndex}
        pointsLength={timelineData.length}
        bulletClickHandler={handleBulletClick}
      />
    </div>
  );
}

export default TimelineDates;
