import { el } from '@/shared/lib/dom.js';
import './card.scss';

/**
 * @param {import('../model/deck.js').Card} card
 * @returns {HTMLButtonElement}
 */
export function createCard(card) {
  return el(
    'button',
    {
      className: 'card',
      attrs: { type: 'button', 'data-id': card.id, 'aria-label': 'Closed card' },
    },
    [
      el('span', { className: 'card__inner' }, [
        el('span', { className: 'card__face card__face--back', attrs: { 'aria-hidden': true } }),
        el('span', {
          className: 'card__face card__face--front',
          text: card.face,
          attrs: { 'aria-hidden': true },
        }),
      ]),
    ],
  );
}

/**
 * Syncs the card element with its state.
 *
 * @param {HTMLButtonElement} element
 * @param {import('../model/game.state.js').CardState} card
 */
export function updateCard(element, card) {
  element.classList.toggle('is-open', card.isOpen);
  element.classList.toggle('is-matched', card.isMatched);
  element.setAttribute('aria-label', card.isOpen ? `Card: ${card.pairId}` : 'Closed card');
}
