/**
 * Formats numbers into K/M format only if they exceed 1000 or 1000000
 * @param {number} num - The number to format
 * @returns {string} Original number or formatted with K/M suffix if large enough
 */
export const formatCompactNumber = (num) => {
  if (num >= 1000000) {
    const millions = num / 1000000;
    // Only show decimal if it's not a whole number
    return (millions % 1 !== 0 ? millions.toFixed(1) : millions) + "M";
  }
  if (num >= 1000) {
    const thousands = num / 1000;
    // Only show decimal if it's not a whole number
    return (thousands % 1 !== 0 ? thousands.toFixed(1) : thousands) + "K";
  }
  return num;
};
