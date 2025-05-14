
interface BulletsPaginationProps {
  currentPointIndex: number;
  pointsLength: number;
  bulletClickHandler: (id: number) => void;
}

function BulletsPagination({
  currentPointIndex,
  pointsLength,
  bulletClickHandler: handleBulletClick,
}: BulletsPaginationProps) {
  const bullets = [];

  for (let i = 1; i <= pointsLength; i++) {
    bullets.push(
      <span
        key={`pagination-bullet-${i}`}
        className={`historical-dates__bullets-pagination__bullet ${
          i === currentPointIndex &&
          'historical-dates__bullets-pagination__bullet_active'
        }`}
        onClick={() => handleBulletClick(i)}
      ></span>,
    );
  }

  return <div className="historical-dates__bullets-pagination">{bullets}</div>;
}

export default BulletsPagination;
