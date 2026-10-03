import { el } from '@/shared/lib/dom.js';
import { TOTAL_PAIRS } from './model/cards.data.js';
import { createDeck } from './model/deck.js';
import { createBoard } from './ui/board.js';
import { createStats } from './ui/stats.js';
import './game.scss';

export function createGame() {
  const stats = createStats(TOTAL_PAIRS);
  const board = createBoard();

  const element = el('section', { className: 'game', attrs: { 'aria-label': 'Game board' } }, [
    stats.element,
    board.element,
  ]);

  function start() {
    board.render(createDeck());
    stats.update({ moves: 0, pairs: 0 });
  }

  start();

  return { element, start };
}
