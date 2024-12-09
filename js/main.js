import {createPictures} from './gallery.js';
import './valid-loading.js';
import './image-effect.js';
import './api.js';
import {getData} from './api.js';
import {filterPictures, turnFilterOn} from './filter.js';
import {showDataError} from './util.js';
const GET_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  createPictures(filterPictures());
};

getData(GET_URL, onGetDataSuccess, showDataError);
