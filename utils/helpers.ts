export function calculatePercentage(num1: number, num2: number): number {
  const percentage = (num1 / num2) * 100;
  const roundedPercentage = parseFloat(percentage.toFixed(2));

  if (isNaN(roundedPercentage)) {
    return 0;
  }

  return roundedPercentage;
}
