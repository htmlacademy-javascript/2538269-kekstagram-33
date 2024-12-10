import {isEscapeKey} from './util.js';

const COMMENTS_LOAD = 5;
const pictureList = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const userModalPicture = document.querySelector('.big-picture');
const userModalCloseButton = userModalPicture.querySelector('.big-picture__cancel');
const commentsLoaderButton = userModalPicture.querySelector('.comments-loader');
const socialCommentsList = userModalPicture.querySelector('.social__comments');
let showMoreHandler = false;

const openComments = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const code = `<li class="social__comment">
              <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
               <p class="social__text">${message}</p>
            </li>`;
    socialCommentsList.insertAdjacentHTML('beforeend', code);
  });
  const socialCommentCount = userModalPicture.querySelector('.social__comment-count');
  socialCommentCount.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
};

const openUserPhoto = (url, description, likes, comments) => {
  socialCommentsList.replaceChildren();
  document.addEventListener('keydown', onModalEscKeydown);
  userModalPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const bigPicture = userModalPicture.querySelector('.big-picture__img img');
  bigPicture.src = url;
  bigPicture.alt = description;

  const socialCaption = userModalPicture.querySelector('.social__caption');
  socialCaption.textContent = description;

  const likesCount = userModalPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const commentsCountElement = userModalPicture.querySelector('.social__comment-total-count');
  commentsCountElement.textContent = comments.length;

  const onShowMore = () => {
    const socialCommentShownCount = socialCommentsList.querySelectorAll('li').length;
    openComments(comments.slice(socialCommentShownCount, socialCommentShownCount + COMMENTS_LOAD));
    const newSocialCommentShownCount = socialCommentsList.querySelectorAll('li').length;
    document.querySelector('.social__comment-shown-count').textContent = newSocialCommentShownCount;
    if (newSocialCommentShownCount === comments.length) {
      commentsLoaderButton.classList.add('hidden');
    }
  };

  onShowMore();
  commentsLoaderButton.addEventListener('click', onShowMore);
  showMoreHandler = onShowMore;
};

const createPictures = (pictures) => {
  pictureList.querySelectorAll('.picture').forEach((element) => element.remove());
  const listFragment = document.createDocumentFragment();
  pictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = templatePicture.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    imgElement.addEventListener('click', () => {
      openUserPhoto(url, description, likes, comments);
    });
    listFragment.appendChild(pictureElement);
  });

  pictureList.appendChild(listFragment);
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPhoto();
  }
}

function closeUserPhoto() {
  userModalPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);

  if (showMoreHandler) {
    commentsLoaderButton.removeEventListener('click', showMoreHandler);
    showMoreHandler = false;
  }
}

userModalCloseButton.addEventListener('click', () => {
  closeUserPhoto();
});

export { createPictures };
