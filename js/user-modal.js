import {isEscapeKey} from './util.js';
import './gallery.js';
const userModalPicture = document.querySelector('.big-picture');
const userModalOpenPicture = document.querySelector('.picture');
const userModalCloseButton = document.querySelector('.big-picture__cancel');
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPhoto();
  }
};


function openUserPhoto () {
  userModalPicture.classList.remove('hidden');
  userModalOpenPicture.classList.add('big-picture');
  document.addEventListener('keydown', onModalEscKeydown);
}

function closeUserPhoto() {
  userModalPicture.classList.add('hidden');
  userModalPicture.classList.remove('big-picture');
  document.removeEventListener('keydown', onModalEscKeydown);
}

userModalOpenPicture.addEventListener('click', () => {
  openUserPhoto();
});


userModalCloseButton.addEventListener('click', () => {
  closeUserPhoto();
});


