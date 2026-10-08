// Moves focus to `element`. After a keyboard action the focus ring shows
// as usual; after a mouse or touch action it's hidden (data-quiet-focus,
// see globals.css). The mark goes away when the element loses focus or the
// visitor presses a key on it, so keyboard users always see the ring.
export function moveFocus(element: HTMLElement | null, fromKeyboard: boolean) {
  if (!element) return;
  if (!fromKeyboard) {
    element.dataset.quietFocus = "";
    const clear = () => {
      delete element.dataset.quietFocus;
      element.removeEventListener("blur", clear);
      element.removeEventListener("keydown", clear);
    };
    element.addEventListener("blur", clear);
    element.addEventListener("keydown", clear);
  }
  element.focus();
}
