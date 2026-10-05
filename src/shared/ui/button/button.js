import { el } from '@/shared/lib/dom.js';
import './button.scss';

/**
 * @param {{ text: string, onClick: EventListener, className?: string }} options
 * @returns {HTMLButtonElement}
 */
export function createButton({ text, onClick, className = '' }) {
  return el('button', {
    className: `button ${className}`.trim(),
    text,
    attrs: { type: 'button' },
    on: { click: onClick },
  });
}
