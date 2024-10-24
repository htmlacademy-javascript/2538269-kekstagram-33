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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//функция для создания 1 объекта
function createObject(objectId) {
  const randomName = getRandomInteger(0, NAMES.length - 1);
  const randomDescription = getRandomInteger(0, DESCRIPTION.length - 1);
  return {
    id: objectId,
    url: 'photos/' + objectId + '.jpg',
    name: NAMES[randomName],
    description: DESCRIPTION[randomDescription],
    like: getRandomInteger(15, 200),
  };
}

//функция для создания массива объектов
function getObjects() {
  const objects = [];
  for (let i = 1; i <= 25; i++) {
    objects.push(createObject(i));
  }
  return objects;
}

console.log(getObjects());

// функция для получения URL
function getUrl() {
  const urlUser = [];
  for (let i = 1; i <= 25; i++) {
  }
}

