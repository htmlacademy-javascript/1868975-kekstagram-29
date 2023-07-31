const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const normalizeString = (string) => string.toLowerCase().trim();

export { isEscapeKey, normalizeString };
