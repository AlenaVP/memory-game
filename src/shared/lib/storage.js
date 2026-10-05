/**
 * Reads and parses a JSON value from localStorage.
 * Returns the fallback if the key is missing, the JSON is invalid,
 * or storage is unavailable.
 *
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Serializes a value and writes it to localStorage.
 *
 * @param {string} key
 * @param {unknown} value
 * @returns {boolean} true if the value was saved
 */
export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
