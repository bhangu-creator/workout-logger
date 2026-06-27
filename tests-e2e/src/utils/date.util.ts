export function getYesterdayAndToday() {
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return {
    from: yesterday.toISOString().split('T')[0],
    to: today.toISOString().split('T')[0],
  };
}