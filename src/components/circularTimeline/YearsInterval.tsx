
interface YearsIntervalProps {
  startYear: number;
  lastYear: number;
}

function YearsInterval({ startYear, lastYear }: YearsIntervalProps) {
  return (
    <div className="time-intervals__years-interval">
      <span className="years-interval__start-year">{startYear}</span>
      &nbsp;&nbsp;
      <span className="years-interval__final-year">{lastYear}</span>
    </div>
  );
}

export default YearsInterval;
