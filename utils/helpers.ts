export function calculatePercentage(num1: number, num2: number): number {
  const percentage = (num1 / num2) * 100;
  return parseFloat(percentage.toFixed(2));
}