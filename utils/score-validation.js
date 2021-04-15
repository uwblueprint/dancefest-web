const ALLOWED_KEYS = new Set([
  'Backspace',
  'Delete',
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'ArrowLeft',
  'End',
  'Home',
  'PageUp',
  'PageDown',
]);

export function isKeyValidOnNumberInput(key) {
  return ALLOWED_KEYS.has(key);
}
