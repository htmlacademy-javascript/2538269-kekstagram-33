import {isEscapeKey, showPictureError, showPictureSuccess} from './util.js';
import {resetScale, resetImageEffect} from './scale-photo.js';
import {resetSlider} from './image-effect.js';
import {sendData} from './api.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_LENGTH = 140;
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
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

function checkHashtags(value) {
  const trimmed = value.trim();
  if (trimmed === '') {
    return true;
  }
  const hashtags = trimmed.split(/\s+/);
  return !hashtags.some((hashtag) => !hashtagReg.test(hashtag));
}

function checkRepeatHashtags(value) {
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

function checkCommentLength(value) {
  return value.length <= MAX_LENGTH;
}

pristine.addValidator(
  hashtagInput,
  checkRepeatHashtags,
  'хэштеги повторяются'
);

pristine.addValidator(
  hashtagInput,
  checkHashtegCount,
  'превышено количество хэштегов'
);

pristine.addValidator(
  commentInput,
  checkCommentLength,
  `Длина комментария больше ${MAX_LENGTH} символов`
);

pristine.addValidator(
  hashtagInput,
  checkHashtags,
  'Неправильный хештег '
);

uploadForm.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
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
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
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

hashtagInput.addEventListener('keydown', removeEsc);
commentInput.addEventListener('keydown', removeEsc);
