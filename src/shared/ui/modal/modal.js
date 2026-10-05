import { el } from '@/shared/lib/dom.js';
import { createButton } from '@/shared/ui/button/button.js';
import './modal.scss';

let modalCount = 0;

/**
 * Creates a reusable modal dialog shell.
 *
 * @param {{ title: string }} options
 */
export function createModal({ title }) {
  modalCount += 1;
  const titleId = `modal-title-${modalCount}`;

  const body = el('div', { className: 'modal__body' });
  const actions = el('div', { className: 'modal__actions' });
  const closeButton = createButton({ text: 'Close', onClick: close });

  const dialog = el(
    'dialog',
    {
      className: 'modal',
      attrs: { 'aria-labelledby': titleId },
      on: { pointerdown: handlePointerDown, click: handleClick },
    },
    [
      el('div', { className: 'modal__panel' }, [
        el('h2', { className: 'modal__title', text: title, attrs: { id: titleId } }),
        body,
        actions,
      ]),
    ],
  );

  let isPressedOnBackdrop = false;

  /** @param {PointerEvent} event */
  function handlePointerDown(event) {
    isPressedOnBackdrop = event.target === dialog;
  }

  /** @param {MouseEvent} event */
  function handleClick(event) {
    if (isPressedOnBackdrop && event.target === dialog) {
      close();
    }
  }

  /**
   * @param {{ content: Array<Node | string>, actions?: HTMLElement[] }} options
   */
  function open({ content, actions: extraActions = [] }) {
    body.replaceChildren(...content);
    actions.replaceChildren(...extraActions, closeButton);

    if (!dialog.isConnected) {
      document.body.append(dialog);
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function close() {
    dialog.close();
  }

  return { open, close };
}
