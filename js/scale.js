const scaleControlField = document.querySelector('.scale');
const scaleValue = scaleControlField.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const Scale = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25,
};

scaleValue.value = `${Scale.DEFAULT}%`;

const setScale = (newScaleValue) => {
  imagePreview.style.transform = `scale(${newScaleValue / 100})`;
  scaleValue.value = `${newScaleValue}%`;
};

const calculateScale = (scaleFactor) => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  const newScaleValue = currentScaleValue + scaleFactor * Scale.STEP;
  if (newScaleValue >= Scale.MIN && newScaleValue <= Scale.MAX) {
    setScale(newScaleValue);
  }
};

const onScaleControlFieldClick = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    calculateScale(-1);
  }else if (evt.target.classList.contains('scale__control--bigger')) {
    calculateScale(1);
  }
};

const resetScale = () => {
  setScale(Scale.DEFAULT);
};

scaleControlField.addEventListener('click', onScaleControlFieldClick);

export { resetScale };
