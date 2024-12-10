const SHOW_TIME = 5000;
const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataError = () => {
  const error = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.appendChild(error);
  setTimeout(() => error.remove(), SHOW_TIME);
};

const onBodyClick = (evt) => {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  onHideMessage();
};

const onEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    onHideMessage();
  }
};

const showPictureError = () => {
  const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.appendChild(error);
  const errorButton = document.querySelector('.error__button');
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
  errorButton.addEventListener('click', onHideMessage);
};

const showPictureSuccess = () => {
  const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successButton = success.querySelector('.success__button');
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
  successButton.addEventListener('click', onHideMessage);
  document.body.appendChild(success);
};

function onHideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.body.removeEventListener('keydown', onEscDown);
  document.body.removeEventListener('click', onBodyClick);
}

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, showDataError, showPictureError, showPictureSuccess, debounce};

