import {photos} from './data.js';
import './data.js';
import {isEscapeKey} from './util.js';

const pictureList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const listFragment = document.createDocumentFragment();
const userModalPicture = document.querySelector('.big-picture');
const userModalCloseButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCountElement = document.querySelector('.social__comment-total-count');
const body = document.querySelector('body');
const commentsLoaderButton = document.querySelector('.comments-loader');
const socialCommentsList = document.querySelector('.social__comments');
const COMMENTS_LOAD = 5;
let showMoreEventListener = null;

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPhoto();
  }
};

function createPictures(pictures) {
  pictures.forEach(({url, description, like, comments}) => {
    const pictureElement = templatePicture.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = like;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    imgElement.addEventListener('click', () => {
      openUserPhoto(url, description, like, comments);
    });
    listFragment.appendChild(pictureElement);
  });

  pictureList.appendChild(listFragment);
}

createPictures(photos);

function openUserPhoto(url, description, likes, comments) {
  socialCommentsList.replaceChildren();
  userModalPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  bigPicture.src = url;
  bigPicture.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentsCountElement.textContent = comments.length;
  body.classList.add('modal-open');

  function showMore() {
    const socialCommentShownCount = socialCommentsList.querySelectorAll('li').length;
    openComments(comments.slice(socialCommentShownCount, socialCommentShownCount + COMMENTS_LOAD));
    const newSocialCommentShownCount = socialCommentsList.querySelectorAll('li').length;
    document.querySelector('.social__comment-shown-count').textContent = newSocialCommentShownCount;
    if (newSocialCommentShownCount === comments.length) {
      commentsLoaderButton.classList.add('hidden');
    }
  }

  showMore();
  commentsLoaderButton.addEventListener('click', showMore);
  showMoreEventListener = showMore;
}

function closeUserPhoto() {
  userModalPicture.classList.add('hidden');
  userModalPicture.classList.remove('big-picture');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);

  if (showMoreEventListener) {
    commentsLoaderButton.removeEventListener('click', showMoreEventListener);
    showMoreEventListener = null;
  }
}

userModalCloseButton.addEventListener('click', () => {
  closeUserPhoto();
});

export {pictureList};

function openComments(comments) {
  comments.forEach(({avatar, massage, name}) => {
    const code = `<li class="social__comment">
              <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
               <p class="social__text">${massage}</p>
            </li>`;
    socialCommentsList.insertAdjacentHTML('beforeend', code);
  });


  socialCommentCount.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
}

