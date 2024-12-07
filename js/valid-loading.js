import {isEscapeKey, showPictureError, showPictureSuccess} from './util.js';
import {resetScale, resetImageEffect} from './scale-photo.js';
import {resetSlider} from './image-effect.js';
import {sendData} from './api.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_LENGTH = 140;
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtegInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagReg = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeLoadPhoto();
  }
};

function checkHashtegs(value) {
  const trimmed = value.trim();
  if (trimmed === '') {
    return true;
  }
  const hashtags = trimmed.split(/\s+/);
  return !hashtags.some((hashtag) => !hashtagReg.test(hashtag));
}

function repiteHashtegs(value) {
  const hashtags = value.trim().split(/\s+/);
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const isDuplicate = lowerCaseHashtags.some((hashtag, index) =>
    lowerCaseHashtags.indexOf(hashtag) < index);
  return !isDuplicate;
}

function checkHashtegCount(value) {
  const hashtags = value.trim().split(/\s+/);
  return hashtags.length <= MAX_HASHTAG_COUNT;
}

function lengthComment(value) {
  return value.length <= MAX_LENGTH;
}

pristine.addValidator(
  hashtegInput,
  repiteHashtegs,
  'хэштеги повторяются'
);

pristine.addValidator(
  hashtegInput,
  checkHashtegCount,
  'превышено количество хэштегов'
);

pristine.addValidator(
  commentInput,
  lengthComment,
  `Длина комментария больше ${MAX_LENGTH} символов`
);

pristine.addValidator(
  hashtegInput,
  checkHashtegs,
  'Неправильный хештег '
);

const openLoad = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

uploadForm.addEventListener('change', () => {
  openLoad();
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    submitButton.disabled = true;
    sendData(
      'https://32.javascript.htmlacademy.pro/kekstagram/',
      formData,
      () => {
        submitButton.disabled = false;
        closeLoadPhoto();
        showPictureSuccess();
      },
      () => {
        submitButton.disabled = false;
        showPictureError();
      }
    );
  }
});

function closeLoadPhoto() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetSlider();
  resetImageEffect();
}

cancelButton.addEventListener('click', () => {
  closeLoadPhoto();
});

const removeEsc = (evt) => {
  evt.stopPropagation();
};

hashtegInput.addEventListener('keydown', removeEsc);
commentInput.addEventListener('keydown', removeEsc);
