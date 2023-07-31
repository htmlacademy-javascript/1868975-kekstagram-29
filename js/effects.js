const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  chrome: {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};
const DEFAULT_EFFECT = EFFECTS['none'];

const form = document.querySelector('#upload-select-image');
const effectsList = form.querySelector('.effects__list');
const imagePreview = form.querySelector('.img-upload__preview img');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');
const sliderField = form.querySelector('.img-upload__effect-level');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

const updateSlider = () => {
  effectLevelSlider.classList.remove('hidden');
  sliderField.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });
  if (currentEffect === DEFAULT_EFFECT) {
    effectLevelSlider.classList.add('hidden');
    sliderField.classList.add('hidden');
  }
};

const onEffectsListClick = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = EFFECTS[evt.target.value];
    updateSlider();
  }
};

const onEffectSliderUpdate = () => {
  imagePreview.style.filter = 'none';
  imagePreview.className = '';
  effectLevelValue.value = '';
  if (currentEffect === DEFAULT_EFFECT) {
    return;
  }
  const sliderValue = effectLevelSlider.noUiSlider.get();
  imagePreview.style.filter = `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
  imagePreview.classList.add(`effects__preview--${currentEffect.name}`);
  effectLevelValue.value = sliderValue;
};

updateSlider();

effectsList.addEventListener('click', onEffectsListClick);
effectLevelSlider.noUiSlider.on('update', onEffectSliderUpdate);

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetEffect };
