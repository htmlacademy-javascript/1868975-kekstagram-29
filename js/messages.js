import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeMessage();
  }
  evt.stopPropagation();
}

const onButtonClick = () => {
  closeMessage();
};

const showMessage = (message, closeButtonClass) => {
  body.appendChild(message);
  document.addEventListener('keydown', onDocumentKeydown, true);
  body.addEventListener('click', onBodyClick);
  message.querySelector(closeButtonClass).addEventListener('click', onButtonClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
