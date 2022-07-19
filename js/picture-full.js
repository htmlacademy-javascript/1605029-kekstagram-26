import {picturesItems} from './picture-mini.js';
import {isEscapeKey} from './util.js';

const PICTURE_WIDTH = 600;
const PICTURE_HEIGHT = 600;

const pictureItem = picturesItems[1];

const pictureModalElement = document.querySelector('.big-picture');
const commentsListElement = pictureModalElement.querySelector('.social__comments');
const commentsItemsElements = commentsListElement.querySelectorAll('.social__comment');
const closeButtonElement = pictureModalElement.querySelector('#picture-cancel');


// Создание и добавление в документ элемента фотографии
const createPicture = () => {
  const pictureElement = document.createElement('img');
  pictureElement.src = pictureItem.url;
  pictureElement.alt = pictureItem.description;
  pictureElement.width = PICTURE_WIDTH;
  pictureElement.height = PICTURE_HEIGHT;
  pictureModalElement.querySelector('.big-picture__img').appendChild(pictureElement);
};


// Заполнение полей модального окна
const setModalFieldsContent = () => {
  pictureModalElement.querySelector('.likes-count').textContent = pictureItem.likes;
  pictureModalElement.querySelector('.comments-count').textContent = pictureItem.comments.length;
  pictureModalElement.querySelector('.social__caption').textContent = pictureItem.description;
};


// Добавление комментариев в модальное окно
const createCommentsList = () => {
  if (!pictureItem.comments || pictureItem.comments.length === 0) {
    commentsListElement.remove();
  } else {
    const commentsItemsFragment = document.createDocumentFragment();

    pictureItem.comments.forEach((comment) => {
      const commentItemElement = commentsItemsElements[0].cloneNode(true);
      commentItemElement.querySelector('.social__picture').src = comment.avatar;
      commentItemElement.querySelector('.social__picture').alt = comment.name;
      commentItemElement.querySelector('.social__text').textContent = comment.message;

      commentsItemsFragment.appendChild(commentItemElement);
    });

    commentsListElement.innerHTML = '';
    commentsListElement.appendChild(commentsItemsFragment);
  }
};


// Открытие модального окна с фотографией
const openPictureModal = () => {
  createPicture();
  setModalFieldsContent();
  createCommentsList();

  pictureModalElement.querySelector('.social__comment-count').classList.add('hidden');
  pictureModalElement.querySelector('.comments-loader').classList.add('hidden');

  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePicture = () => {
  document.body.classList.remove('modal-open');
  pictureModalElement.classList.add('hidden');
};

openPictureModal();

closeButtonElement.addEventListener('click', closePicture);
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
});

