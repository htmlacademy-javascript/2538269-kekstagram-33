const SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';


function showDataError() {
  const error = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.appendChild(error);
  setTimeout(() => error.remove(), SHOW_TIME);
}

function showPictureError() {
  const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.appendChild(error);
  const errorButton = document.querySelector('.error__button');
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
  errorButton.addEventListener('click', hideMessage);
}

function showPictureSuccess() {
  const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successButton = success.querySelector('.success__button');
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
  successButton.addEventListener('click', hideMessage);
  document.body.appendChild(success);
}

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.body.removeEventListener('keydown', onEscDown);
  document.body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}
function onEscDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, isEscapeKey, showDataError, showPictureError, showPictureSuccess, debounce};

