/**
 * Creates a DOM element via document.createElement.
 *
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {{
 *   className?: string,
 *   text?: string | number,
 *   attrs?: Record<string, string | number | boolean | null | undefined>,
 *   on?: Record<string, EventListener>,
 * }} [options]
 * @param {Array<Node | string>} [children]
 * @returns {HTMLElementTagNameMap[K]}
 */
export function el(tag, options = {}, children = []) {
  const { className, text, attrs = {}, on = {} } = options;
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = String(text);
  }

  Object.entries(attrs).forEach(([name, value]) => {
    if (value === false || value === null || value === undefined) {
      return;
    }
    element.setAttribute(name, value === true ? '' : String(value));
  });

  Object.entries(on).forEach(([eventName, handler]) => {
    element.addEventListener(eventName, handler);
  });

  element.append(...children);

  return element;
}
