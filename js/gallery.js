import {photos} from './data.js';
import {isEscapeKey} from './util.js';
const pictureList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const listFragment = document.createDocumentFragment();
const userModalPicture = document.querySelector('.big-picture');
const userModalCloseButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const commentsCountElement = document.querySelector('.social__comment-total-count');
const body = document.querySelector('body');


const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPhoto();
  }
};

photos.forEach(({url, description, like, comments}) =>{
  const pictureElement = templatePicture.cloneNode(true);
  const imgElement = pictureElement.querySelector('.picture__img');
  imgElement.src = url;
  imgElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = like;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  imgElement.addEventListener('click', (evt) => {
    openUserPhoto(url, description, like, comments);
  });
  listFragment.appendChild(pictureElement);
});

pictureList.appendChild(listFragment);

function openUserPhoto (url, description, likes, comments) {
  userModalPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  bigPicture.src = url;
  bigPicture.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentsCountElement.textContent = comments.length;
  body.classList.add('.modal-open');
}

function closeUserPhoto() {
  userModalPicture.classList.add('hidden');
  userModalPicture.classList.remove('big-picture');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
}

userModalCloseButton.addEventListener('click', () => {
  closeUserPhoto();
});

export {pictureList};

