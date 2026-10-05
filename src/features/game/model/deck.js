import { shuffle } from '@/shared/lib/shuffle.js';
import { CARD_IMAGES } from './cards.data.js';

/**
 * @typedef {{ id: string, pairId: string, face: string }} Card
 */

/**
 * Creates 16 shuffled cards: two cards for each image.
 *
 * @returns {Card[]}
 */
export function createDeck() {
  const cards = CARD_IMAGES.flatMap(({ id, face }) => [
    { id: `${id}-1`, pairId: id, face },
    { id: `${id}-2`, pairId: id, face },
  ]);

  return shuffle(cards);
}
