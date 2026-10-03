/**
 * @typedef {import('./deck.js').Card & { isOpen: boolean, isMatched: boolean }} CardState
 * @typedef {{
 *   cards: CardState[],
 *   openIds: string[],
 *   moves: number,
 *   pairs: number,
 *   totalPairs: number,
 * }} GameState
 * @typedef {'ignored' | 'first' | 'match' | 'mismatch'} OpenResult
 */

/**
 * @param {import('./deck.js').Card[]} deck
 * @returns {GameState}
 */
export function createGameState(deck) {
  return {
    cards: deck.map((card) => ({ ...card, isOpen: false, isMatched: false })),
    openIds: [],
    moves: 0,
    pairs: 0,
    totalPairs: deck.length / 2,
  };
}

/** @param {GameState} state */
export const isWon = (state) => state.pairs === state.totalPairs;

/** @param {GameState} state */
export const isBoardLocked = (state) => state.openIds.length === 2;

/**
 * @param {GameState} state
 * @param {string} cardId
 */
const findCard = (state, cardId) => state.cards.find((card) => card.id === cardId);

/**
 * Opens a card if the rules allow it and reports what happened.
 * Mutates the state.
 *
 * @param {GameState} state
 * @param {string} cardId
 * @returns {OpenResult}
 */
export function openCard(state, cardId) {
  const card = findCard(state, cardId);

  if (!card || card.isOpen || isBoardLocked(state) || isWon(state)) {
    return 'ignored';
  }

  card.isOpen = true;
  state.openIds.push(card.id);

  if (state.openIds.length === 1) {
    return 'first';
  }

  state.moves += 1;
  const [first, second] = state.openIds.map((id) => findCard(state, id));

  if (first.pairId === second.pairId) {
    first.isMatched = true;
    second.isMatched = true;
    state.pairs += 1;
    state.openIds = [];
    return 'match';
  }

  return 'mismatch';
}

/**
 * Closes the cards of a mismatched pair and unlocks the board.
 * Mutates the state.
 *
 * @param {GameState} state
 */
export function closeOpenCards(state) {
  state.openIds.forEach((id) => {
    findCard(state, id).isOpen = false;
  });
  state.openIds = [];
}
