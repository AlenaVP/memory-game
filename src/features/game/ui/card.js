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
