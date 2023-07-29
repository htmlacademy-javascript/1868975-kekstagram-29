const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const normalizeString = (string) => string.toLowerCase().trim();

export { getRandomInteger, getRandomArrayElement, isEscapeKey, normalizeString };
