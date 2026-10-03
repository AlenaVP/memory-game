import { el } from '@/shared/lib/dom.js';
import { createGame } from '@/features/game/index.js';
import { createHeader } from './layout/header.js';
import './app.scss';

export function createApp() {
  const game = createGame();

  const header = createHeader({
    onNewGame: () => game.start(),
    onLeaderboard: () => {},
  });

  return el('div', { className: 'app' }, [header, el('main', { className: 'app__main' }, [game.element])]);
}
