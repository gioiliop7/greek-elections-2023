export function formatPercentage(percentage: number) {
  const formattedNumber = percentage.toFixed(2);
  return `${formattedNumber}%`;
}

export function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('el-GR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('el-GR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return `${formattedDate}, ${formattedTime}`;
}