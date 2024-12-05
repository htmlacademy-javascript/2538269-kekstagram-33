const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const editImage = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');
const minesButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');

const scaleImage = (value = MAX_SCALE) => {
  editImage.style.transform = `scale(${value / MAX_SCALE})`;
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

minesButton.addEventListener('click', () => onScaleButtonClick(false));
plusButton.addEventListener('click', () => onScaleButtonClick(true));

const resetScale = () => {
  scaleImage(MAX_SCALE);
};

export {resetScale};
