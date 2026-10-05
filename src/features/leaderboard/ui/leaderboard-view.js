import { el } from '@/shared/lib/dom.js';
import { formatDate } from '@/shared/lib/format-date.js';
import './leaderboard.scss';

const COLUMNS = ['Place', 'Moves', 'Date'];

/**
 * @param {import('../model/leaderboard.service.js').GameResult[]} results
 * @returns {HTMLElement[]}
 */
export function createLeaderboardContent(results) {
  if (results.length === 0) {
    return [el('p', { className: 'leaderboard__empty', text: 'No results yet' })];
  }

  const headerRow = el(
    'tr',
    {},
    COLUMNS.map((title) => el('th', { text: title, attrs: { scope: 'col' } })),
  );

  const rows = results.map((result, index) =>
    el('tr', {}, [
      el('td', { text: index + 1 }),
      el('td', { text: result.moves }),
      el('td', { text: formatDate(result.date) }),
    ]),
  );

  return [el('table', { className: 'leaderboard' }, [el('thead', {}, [headerRow]), el('tbody', {}, rows)])];
}
