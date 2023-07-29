import { isEscapeKey, normalizeString } from './utils.js';

const errorMessage = {
  INVALID_SYMBOLS: 'строка после решётки должна состоять из букв и чисел',
  INVALID_HASHTAG_AMOUNT: 'нельзя указать больше пяти хэш-тегов',
  HASHTAG_REPEAT: 'один и тот же хэш-тег не может быть использован дважды',
  HASHTAG_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  INVALID_SEPARATOR: 'хэш-теги должны разделяться пробелами',
  INVALID_FIRST_SYMBOL: 'хэш-тег должен начинаться с символа # (решётка)',
};
const MAX_LENGTH = 20;
const MAX_HASHTAG_AMOUNT = 5;
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const overlay = body.querySelector('.img-upload__overlay');
const formCloseButton = overlay.querySelector('.img-upload__cancel');
const form = document.querySelector('#upload-select-image');
const hashtagInput = overlay.querySelector('.text__hashtags');
const submitButton = overlay.querySelector('.img-upload__submit');

let errorAlert = '';
const error = () => errorAlert;

const hashtagValidator = (inputValue) => {
  errorAlert = '';

  const normalizedInput = normalizeString(inputValue);

  if (!normalizedInput) {
    return true;
  }

  const inputArray = normalizedInput.split(/\s+/);

  if (!inputArray.length) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: errorMessage.INVALID_SEPARATOR,
    },
    {
      check: inputArray.some((hashtag) => hashtag[0] !== '#'),
      error: errorMessage.INVALID_FIRST_SYMBOL,
    },
    {
      check: inputArray.some((hashtag, _, array) => array.indexOf(hashtag) !== array.lastIndexOf(hashtag)),
      error: errorMessage.HASHTAG_REPEAT,
    },
    {
      check: inputArray.some((hashtag) => hashtag.length > MAX_LENGTH),
      error: errorMessage.HASHTAG_LENGTH,
    },
    {
      check: inputArray.length > MAX_HASHTAG_AMOUNT,
      error: errorMessage.INVALID_HASHTAG_AMOUNT,
    },
    {
      check: inputArray.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      error: errorMessage.INVALID_SYMBOLS,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorAlert = rule.error;
    }
    return !isInvalid;
  });
};

const pristine = new Pristine (form, {
  classTo: 'field-validate',
  errorClass: 'field-validate--invalid',
  successClass: 'field-validate--valid',
  errorTextParent: 'field-validate',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

pristine.addValidator(hashtagInput, hashtagValidator, error, 2, false);

const closeForm = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formCloseButton.removeEventListener('click', onFormCloseButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    closeForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

function onFormCloseButtonClick() {
  closeForm();
}

formCloseButton.addEventListener('click', onFormCloseButtonClick);

const onUploadFileChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onHashtagInput = () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

uploadFile.addEventListener('change', onUploadFileChange);
hashtagInput.addEventListener('input', onHashtagInput);
