import './scale-photo.js';

const EFFECTS = {
  'effect-chrome': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'grayscale',
    unit: ''
  },
  'effect-sepia': {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    filter: 'sepia',
    unit: ''
  },
  'effect-marvin': {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    },
    filter: 'invert',
    unit: '%'
  },
  'effect-phobos': {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'blur',
    unit: 'px'
  },
  'effect-heat': {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    filter: 'brightness',
    unit: ''
  }
};


const uploadForm = document.querySelector('#upload-select-image');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderBlock = document.querySelector('.img-upload__effect-level');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const inputEffectLevel = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

const slider = noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update',changeSlider);

effectList.addEventListener('click', (evt) => {
  const target = evt.target.closest('.effects__radio');
  if (target) {
    changeEffect(target);
  }
});

function changeEffect(target) {
  if(target.getAttribute('id') !== 'effect-none') {
    sliderElement.noUiSlider.updateOptions(EFFECTS[target.getAttribute('id')].options);

    sliderBlock.classList.remove('hidden');
  } else {
    imageUploadPreview.style.removeProperty('filter');
    sliderBlock.classList.add('hidden');
  }
}

function changeSlider() {
  const currentSliderValue = slider.get();
  inputEffectLevel.value = currentSliderValue;
  const chooseEffect = uploadForm.querySelector('input[name="effect"]:checked').getAttribute('id');
  if (chooseEffect !== 'effect-none') {
    imageUploadPreview.style.filter = `${EFFECTS[chooseEffect].filter}(${currentSliderValue}${EFFECTS[chooseEffect].unit})`;
  }
}
