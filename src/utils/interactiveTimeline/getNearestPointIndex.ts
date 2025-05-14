function getClockAngle(ax: number, ay: number, bx: number, by: number) {
  const dy = by - ay;
  const dx = bx - ax;
  let theta = Math.atan2(dy, dx);

  theta *= 180 / Math.PI;
  theta += 90;

  if (theta < 0) {
    theta += 360;
  }

  return theta;
}

export default function getNearestPointIndex({
  ax,
  ay,
  bx,
  by,
}: {
  ax: number;
  ay: number;
  bx: number;
  by: number;
}): number {
  const angle = getClockAngle(ax, ay, bx, by);

  const inaccuracy = 30;

  if (angle - 30 <= inaccuracy) {
    return 1;
  } else if (angle - 90 <= inaccuracy) {
    return 2;
  } else if (angle - 150 <= inaccuracy) {
    return 3;
  } else if (angle - 210 <= inaccuracy) {
    return 4;
  } else if (angle - 270 <= inaccuracy) {
    return 5;
  } else if (angle - 330 <= inaccuracy) {
    return 6;
  } else {
    return 0;
  }
}
