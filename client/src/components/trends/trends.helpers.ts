export const getRandomTrends = (
  trends: string[] = [],
  count: number
): string[] => {
  return [...trends].sort(() => 0.5 - Math.random()).slice(0, count);
};
