import { el } from '@/shared/lib/dom.js';
import { TOTAL_PAIRS } from './model/cards.data.js';
import { createDeck } from './model/deck.js';
import { closeOpenCards, createGameState, isWon, openCard } from './model/game.state.js';
import { createBoard } from './ui/board.js';
import { createStats } from './ui/stats.js';
import './game.scss';

const MISMATCH_DELAY_MS = 1000;

/**
 * @param {{ onWin?: (moves: number) => void }} [options]
 */
export function createGame({ onWin } = {}) {
  /** @type {import('./model/game.state.js').GameState} */
  let state;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let closeTimerId = null;

  const stats = createStats(TOTAL_PAIRS);
  const board = createBoard({ onCardClick: handleCardClick });

  const element = el('section', { className: 'game', attrs: { 'aria-label': 'Game board' } }, [
    stats.element,
    board.element,
  ]);

  function render() {
    board.update(state.cards);
    stats.update(state);
  }

  function scheduleClose() {
    closeTimerId = setTimeout(() => {
      closeTimerId = null;
      closeOpenCards(state);
      render();
    }, MISMATCH_DELAY_MS);
  }

  function cancelClose() {
    clearTimeout(closeTimerId);
    closeTimerId = null;
  }

  /** @param {string} cardId */
  function handleCardClick(cardId) {
    const result = openCard(state, cardId);

    if (result === 'ignored') {
      return;
    }

    render();

    if (result === 'mismatch') {
      scheduleClose();
    }

    if (result === 'match' && isWon(state)) {
      onWin?.(state.moves);
    }
  }

  function start() {
    cancelClose();
    state = createGameState(createDeck());
    board.render(state.cards);
    stats.update(state);
  }

  start();

  return { element, start };
}
