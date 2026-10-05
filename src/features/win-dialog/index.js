import { createModal } from '@/shared/ui/modal/modal.js';
import { createButton } from '@/shared/ui/button/button.js';
import { createWinContent } from './ui/win-view.js';

/**
 * @param {{ onNewGame: () => void }} handlers
 */
export function createWinDialog({ onNewGame }) {
  const modal = createModal({ title: 'Congratulations!' });

  const newGameButton = createButton({
    text: 'New game',
    onClick: () => {
      modal.close();
      onNewGame();
    },
  });

  /** @param {number} moves */
  function open(moves) {
    modal.open({ content: createWinContent(moves), actions: [newGameButton] });
  }

  return { open };
}
