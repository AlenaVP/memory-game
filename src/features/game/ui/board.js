import { el } from '@/shared/lib/dom.js';
import { createCard, updateCard } from './card.js';
import './board.scss';

/**
 * @param {{ onCardClick: (cardId: string) => void }} handlers
 */
export function createBoard({ onCardClick }) {
  /** @type {Map<string, HTMLButtonElement>} */
  const cardElements = new Map();

  const element = el('div', { className: 'board', on: { click: handleClick } });

  /** @param {MouseEvent} event */
  function handleClick(event) {
    const cardElement = event.target.closest('.card');
    if (cardElement) {
      onCardClick(cardElement.dataset.id);
    }
  }

  /** @param {import('../model/game.state.js').CardState[]} cards */
  function render(cards) {
    cardElements.clear();
    const elements = cards.map((card) => {
      const cardElement = createCard(card);
      cardElements.set(card.id, cardElement);
      return cardElement;
    });
    element.replaceChildren(...elements);
  }

  /** @param {import('../model/game.state.js').CardState[]} cards */
  function update(cards) {
    cards.forEach((card) => updateCard(cardElements.get(card.id), card));
  }

  return { element, render, update };
}
