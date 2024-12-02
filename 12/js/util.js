const showTime = 5000;
const body = document.querySelector('body');
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
  setTimeout(() => error.remove(),
    showTime
  );
}

function showPictureError() {
  const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.appendChild(error);
}

function showPictureSuccess() {
  const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successButton = success.querySelector('.success__button');
  body.addEventListener('keydown', onEscDown);
  body.addEventListener('click', onBodyClick);
  successButton.addEventListener('click', hideMessage);
  document.body.appendChild(success);
}

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  body.removeEventListener('keydown', onEscDown);
  body.removeEventListener('click', onBodyClick);
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
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}
export {getRandomInteger, isEscapeKey, showDataError, showPictureError, showPictureSuccess};

