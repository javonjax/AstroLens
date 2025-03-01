export type UnitOfMeasurement = 'Kilometers' | 'Miles';
export const calculateDistance = (
  x: number,
  y: number,
  z: number,
  units: UnitOfMeasurement,
): number => {
  if (units === 'Kilometers') {
    return Math.round(Math.sqrt(x ** 2 + y ** 2 + z ** 2));
  } else {
    return Math.round(Math.sqrt(x ** 2 + y ** 2 + z ** 2) * 0.621371);
  }
};
