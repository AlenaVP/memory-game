import { createModal } from '@/shared/ui/modal/modal.js';
import { getTopResults, saveResult } from './model/leaderboard.service.js';
import { createLeaderboardContent } from './ui/leaderboard-view.js';

export function createLeaderboard() {
  const modal = createModal({ title: 'Leaderboard' });

  function open() {
    modal.open({ content: createLeaderboardContent(getTopResults()) });
  }

  return { open, save: saveResult };
}
