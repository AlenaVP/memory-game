import { el } from '@/shared/lib/dom.js';
import './stats.scss';

/**
 * @param {number} totalPairs
 */
export function createStats(totalPairs) {
  const movesValue = el('span', { className: 'stats__value' });
  const pairsValue = el('span', { className: 'stats__value' });

  const element = el('div', { className: 'stats' }, [
    el('p', { className: 'stats__item' }, ['Moves: ', movesValue]),
    el('p', { className: 'stats__item' }, ['Pairs: ', pairsValue]),
  ]);

  /**
   * @param {{ moves: number, pairs: number }} values
   */
  function update({ moves, pairs }) {
    movesValue.textContent = String(moves);
    pairsValue.textContent = `${pairs} / ${totalPairs}`;
  }

  return { element, update };
}
