/**
 * Formats a number in a compact representation with K (thousands) or M (millions) suffix
 * @param {number} num The number to format
 * @returns {string} Original number or formatted with K/M suffix if large enough
 */
export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000) {
    const millions = num / 1000000;
    // Only show decimal if it's not a whole number
    return Number.isInteger(millions) 
      ? `${millions}M` 
      : `${millions.toFixed(1)}M`;
  }
  
  if (num >= 1000) {
    const thousands = num / 1000;
    // Only show decimal if it's not a whole number
    return Number.isInteger(thousands) 
      ? `${thousands}K` 
      : `${thousands.toFixed(1)}K`;
  }
  
  return num.toString();
};
