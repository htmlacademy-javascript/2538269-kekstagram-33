const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const fileSelector = document.querySelector('.img-upload__input');
const effectsUploadImageNodes = document.querySelectorAll('.effects__preview');

fileSelector.addEventListener('change', () => {
  const file = fileSelector.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageSrc = URL.createObjectURL(file);
    imagePreview.src = imageSrc;
    effectsUploadImageNodes.forEach((element) => {
      element.style.backgroundImage = `url(${imageSrc})`;
    });
  }
});

const resetImageEffect = () => {
  effectsUploadImageNodes.forEach((element) => {
    element.style.backgroundImage = null;
  });
};
const scaleImage = (value = MAX_SCALE) => {
  imagePreview.style.transform = `scale(${value / MAX_SCALE})`;
  scaleInput.value = `${value}%`;
};

const onScaleButtonClick = (isIncrease) => {
  const scaleValue = parseInt(scaleInput.value, 10);
  let newScaleNumber = isIncrease ? scaleValue + SCALE_STEP : scaleValue - SCALE_STEP;
  if (newScaleNumber < MIN_SCALE) {
    newScaleNumber = MIN_SCALE;
  } else if (newScaleNumber > MAX_SCALE) {
    newScaleNumber = MAX_SCALE;
  }

  scaleImage(newScaleNumber);
};

minusButton.addEventListener('click', () => onScaleButtonClick(false));
plusButton.addEventListener('click', () => onScaleButtonClick(true));

const resetScale = () => {
  scaleImage(MAX_SCALE);
};

export {resetScale, resetImageEffect};
