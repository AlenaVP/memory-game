import { el } from '@/shared/lib/dom.js';
import { createCard } from './card.js';
import './board.scss';

export function createBoard() {
  const element = el('div', { className: 'board' });

  /**
   * @param {import('../model/deck.js').Card[]} deck
   */
  function render(deck) {
    element.replaceChildren(...deck.map(createCard));
  }

  return { element, render };
}
