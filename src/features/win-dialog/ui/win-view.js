import './win-view.scss';
import { el } from '@/shared/lib/dom.js';

/**
 * @param {number} moves
 * @returns {HTMLElement[]}
 */
export function createWinContent(moves) {
  return [
    el('p', { className: 'win__text', text: 'You found all pairs!' }),
    el('p', { className: 'win__result' }, ['Moves: ', el('strong', { text: moves })]),
  ];
}
