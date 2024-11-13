import {getRandomInteger} from './util.js';

const ACCOUNTS = 25;
const COMMENTS = 30;
const AVATARS = 6;
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Антон',
  'Вадим',
  'Максим',
  'Мария',
  'Кирилл',
  'Вова',
  'Марина',
  'Ирина',
  'Полина',
  'Вася',
  'Юля',
  'Илья',
  'Артем',
  'Ксюша',
  'Маша',
  'Миша',
  'Никита',
];

const DESCRIPTION = [
  'красивый город',
  'голубое небо',
  'солнечный день',
  'интересная прогулка',
  'красивое платье',
  'люксовая косметика',
  'прекрасное путешествие',
  'дождливая погода',
  'дурацкий телефон',
];

const MASSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Likes = {
  MIN: 15,
  MAX: 200
};
//функция для 1 комментария
function getComment(commentID) {
  const randomName = getRandomInteger(0, NAMES.length - 1);
  const randomMassage = getRandomInteger(0, MASSAGES.length - 1);
  const randomAvatar = getRandomInteger(0, AVATARS);
  return {
    id: commentID,
    avatar: `img/avatar-${randomAvatar}.svg`,
    massage: MASSAGES[randomMassage],
    name: NAMES[randomName],
  };
}

//функция получения массива комментариев
function addComments() {
  const comments = [];
  const numberComments = getRandomInteger(0, COMMENTS);
  for (let i = 0; i < numberComments; i++) {
    comments.push(getComment(i));
  }
  return comments;
}


//функция для создания 1 объекта
function getObject(objectId) {
  const randomDescription = getRandomInteger(0, DESCRIPTION.length - 1);
  return {
    id: objectId,
    url: `photos/${objectId + 1}.jpg`,
    description: DESCRIPTION[randomDescription],
    like: getRandomInteger(Likes.MIN, Likes.MAX),
    comments: addComments(),
  };
}


//функция для создания массива объектов
function getObjects() {
  const objects = [];
  for (let i = 1; i < ACCOUNTS; i++) {
    objects.push(getObject(i));
  }
  return objects;
}
const photos = getObjects();
export {photos};
