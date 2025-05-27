export const getFirstSentence = (text: string): string => {
  if (!text) return "";
  const match = text.match(/.*?[.!?](\s|$)/);
  return match ? match[0].trim() : text.trim();
};
