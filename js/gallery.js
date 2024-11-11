import {photos} from './data.js';

const pictureList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const listFragment = document.createDocumentFragment();

photos.forEach(({url, description, like, comments}) =>{
  const pictureElement = templatePicture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = like;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  listFragment.appendChild(pictureElement);
});

pictureList.appendChild(listFragment);

export {pictureList};
