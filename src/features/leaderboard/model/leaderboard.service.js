import { readJson, writeJson } from '@/shared/lib/storage.js';

const STORAGE_KEY = 'memory-game:leaderboard';
const MAX_RESULTS = 10;

/**
 * @typedef {{ moves: number, date: number }} GameResult
 */

/**
 * @param {unknown} item
 * @returns {item is GameResult}
 */
const isValidResult = (item) => Number.isInteger(item?.moves) && item.moves > 0 && Number.isFinite(item?.date);

/**
 * Fewer moves first; for equal moves, the earlier game first.
 *
 * @param {GameResult} a
 * @param {GameResult} b
 */
const compareResults = (a, b) => a.moves - b.moves || a.date - b.date;

/**
 * @returns {GameResult[]} up to 10 best results, sorted
 */
export function getTopResults() {
  const stored = readJson(STORAGE_KEY, []);

  if (!Array.isArray(stored)) {
    return [];
  }

  return stored.filter(isValidResult).sort(compareResults).slice(0, MAX_RESULTS);
}

/**
 * Adds a finished game to the leaderboard and keeps only the top 10.
 *
 * @param {number} moves
 */
export function saveResult(moves) {
  const result = { moves, date: Date.now() };
  const topResults = [...getTopResults(), result].sort(compareResults).slice(0, MAX_RESULTS);

  writeJson(STORAGE_KEY, topResults);
}
