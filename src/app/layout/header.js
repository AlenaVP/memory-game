import { el } from '@/shared/lib/dom.js';
import { createButton } from '@/shared/ui/button/button.js';
import './header.scss';

/**
 * @param {{ onNewGame: () => void, onLeaderboard: () => void }} handlers
 * @returns {HTMLElement}
 */
export function createHeader({ onNewGame, onLeaderboard }) {
  return el('header', { className: 'header' }, [
    el('h1', { className: 'header__title' }, [
      el('span', { className: 'header__logo', text: '🃏', attrs: { 'aria-hidden': true } }),
      'Memory Game',
    ]),
    el('div', { className: 'header__actions' }, [
      createButton({ text: 'New game', onClick: onNewGame }),
      createButton({ text: 'Leaderboard', onClick: onLeaderboard }),
    ]),
  ]);
}
