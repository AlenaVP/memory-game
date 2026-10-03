const pad = (value) => String(value).padStart(2, '0');

/**
 * Formats a timestamp as DD.MM.YYYY in the user's local time.
 *
 * @param {number} timestamp milliseconds since epoch (Date.now())
 * @returns {string}
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}
