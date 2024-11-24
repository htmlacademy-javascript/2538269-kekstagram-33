import {isEscapeKey} from './util.js';
const MAX_HASHTAG_COUNT = 5;
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtegInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtagReg = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeLoadPhoto();
  }
};

function checkHashtegs(value) {
  const hashtags = value.trim().split(/\s+/);
  const lowerCase = [];
  for (let i = 0; i < hashtags.length; i++) {
    const lowerCaseHashtag = hashtags[i].toLowerCase();
    if (!hashtagReg.test(lowerCaseHashtag)) {
      return false;
    }

    if (lowerCase.includes(lowerCaseHashtag)) {
      return false;
    }
    lowerCase.push(lowerCaseHashtag);
  }
  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }
  return true;
}

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

uploadFile.addEventListener('change', () => {
  openLoad();
});

uploadFile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const closeLoadPhoto = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  uploadForm.reset();
  pristine.reset();
};

cancelButton.addEventListener('click', () => {
  closeLoadPhoto();
});

const removeEsc = (evt) => {
  evt.stopPropagation();
};

hashtegInput.addEventListener('keydown', removeEsc);
commentInput.addEventListener('keydown', removeEsc);
