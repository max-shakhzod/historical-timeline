export default function getActualPointIndex({
  index,
  pointsQuantity,
  firstPointNumber,
}: {
  index: number;
  pointsQuantity: number;
  firstPointNumber: number;
}): number {
  let actualPosition;

  if (index > pointsQuantity + 1 - firstPointNumber) {
    actualPosition =
      (index + firstPointNumber) % (pointsQuantity + 1);
  } else {
    actualPosition = index + firstPointNumber - 1;
  }

  return actualPosition;
}
