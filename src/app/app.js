import { el } from '@/shared/lib/dom.js';
import { createGame } from '@/features/game/index.js';
import { createLeaderboard } from '@/features/leaderboard/index.js';
import { createWinDialog } from '@/features/win-dialog/index.js';
import { createHeader } from './layout/header.js';
import './app.scss';

export function createApp() {
  const leaderboard = createLeaderboard();

  const game = createGame({
    onWin: (moves) => {
      leaderboard.save(moves);
      winDialog.open(moves);
    },
  });

  const winDialog = createWinDialog({
    onNewGame: () => game.start(),
  });

  const header = createHeader({
    onNewGame: () => game.start(),
    onLeaderboard: () => leaderboard.open(),
  });

  return el('div', { className: 'app' }, [header, el('main', { className: 'app__main' }, [game.element])]);
}
