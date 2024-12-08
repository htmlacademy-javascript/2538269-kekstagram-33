import {createPictures} from './gallery.js';
import {debounce} from './util.js';

const RENDER_DELAY = 500;
const PICTURE_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const imageFilters = document.querySelector('.img-filters');
let currentFilter = '';
let pictures = [];

const turnFilterOn = (loadPictures) => {
  imageFilters .classList.remove('img-filters--inactive');
  pictures = [...loadPictures];
  currentFilter = Filter.DEFAULT;
};

const filterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(() => Math.random() - 0.5).slice(0, PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return [...pictures];
  }
};

const debounceCreatePictures = debounce(createPictures, RENDER_DELAY);

imageFilters.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  imageFilters.querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  debounceCreatePictures(filterPictures());
});

export {turnFilterOn, filterPictures};

