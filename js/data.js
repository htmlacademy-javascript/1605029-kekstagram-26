import {
  getRandomInteger,
  extractRandomItems,
  getSequenceItems
} from './util.js';


const DESCRIPTIONS_COUNT = 25;
const DESCRIPTION_MIN_ID = 1;
const DESCRIPTION_MAX_ID = 25;
const PHOTO_MIN_ID = 1;
const PHOTO_MAX_ID = 25;
const PHOTO_URL = 'photos/.jpg';
const DESCRIPTIONS = [
  'Стою и смотрю с задумчивым видом...',
  'А вот что у меня сегодня было на обед!',
  'Вот такой необычный объект решил запечатлеть.',
  'Замечательная композиция!'
];
const LIKES_MIN = 15;
const LIKES_MAX = 200;

const COMMENT_ID_MIN = 1;
const COMMENT_ID_MAX = 375;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const COMMENTS_COUNT_MIN = 0;
const COMMENTS_COUNT_MAX = 15;
const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const AVATAR_URL = 'img/avatar-.svg';
const NAMES = [
  'Пётр',
  'Анастасия',
  'Элеонора',
  'Аристарх',
  'Платон',
  'Анна-Мария'
];


const commentIdItems = getSequenceItems(COMMENT_ID_MIN, COMMENT_ID_MAX);
const descriptionIdItems = getSequenceItems(DESCRIPTION_MIN_ID, DESCRIPTION_MAX_ID);
const photoUrlIdItems = getSequenceItems(PHOTO_MIN_ID, PHOTO_MAX_ID);


// Получение Url для фотографии
const createUrl = (url, id) => {
  const dotIndex = url.indexOf('.');
  return [url.slice(0, dotIndex), id, url.slice(dotIndex)].join('');
};


// Получение текста комментария
const getCommentText = () => COMMENTS[getRandomInteger(0, COMMENTS.length - 1)];


// Получение имени автора комментария
const getAuthorName = () => NAMES[getRandomInteger(0, NAMES.length - 1)];


// Получение описания фотографии
const getDescriptionText = () => DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];


// Генерация объекта - комментария
const createPhotoComment = () => ({
  id: extractRandomItems(commentIdItems),
  avatar: createUrl(AVATAR_URL, getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)),
  message: getCommentText(),
  name: getAuthorName(),
});

// Получение массива объектов комментариев
const getCommentsItems = (count) => Array.from({length: count}, createPhotoComment);


// Генерация объекта - описания фотографии
const createPhotoDescription = () => {
  const commentsCount = getRandomInteger(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);

  return {
    id: extractRandomItems(descriptionIdItems),
    url: createUrl(PHOTO_URL, extractRandomItems(photoUrlIdItems)),
    description: getDescriptionText(),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: getCommentsItems(commentsCount)  //массив объектов — список комментариев, количество - на своё усмотрение.
  };
};


// Генерация массива из объектов-объявлений
const getPhotoDescriptions = () => Array.from({length: DESCRIPTIONS_COUNT}, createPhotoDescription);


export {getPhotoDescriptions};
