import {isEscapeKey} from './util.js';


const PICTURE_WIDTH = 600;
const PICTURE_HEIGHT = 600;

const pictureModalElement = document.querySelector('.big-picture');
const commentsListElement = pictureModalElement.querySelector('.social__comments');
const commentsItemsElements = commentsListElement.querySelectorAll('.social__comment');
const closeButtonElement = pictureModalElement.querySelector('#picture-cancel');


// Создание и добавление в документ элемента фотографии
const createPicture = (pictureItemData) => {
  const pictureElement = document.createElement('img');
  pictureElement.src = pictureItemData.url;
  pictureElement.alt = pictureItemData.description;
  pictureElement.width = PICTURE_WIDTH;
  pictureElement.height = PICTURE_HEIGHT;
  pictureModalElement.querySelector('.big-picture__img').appendChild(pictureElement);
};


// Заполнение полей модального окна
const setFieldsContent = (pictureItemData) => {
  pictureModalElement.querySelector('.likes-count').textContent = pictureItemData.likes;
  pictureModalElement.querySelector('.comments-count').textContent = pictureItemData.comments.length;
  pictureModalElement.querySelector('.social__caption').textContent = pictureItemData.description;
};


// Добавление комментариев в модальное окно
const createCommentsList = (pictureItemData) => {
  if (!pictureItemData.comments || pictureItemData.comments.length === 0) {
    commentsListElement.remove();
  } else {
    const commentsItemsFragment = document.createDocumentFragment();

    pictureItemData.comments.forEach((comment) => {
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


// Функция события - нажатия клавиши Esc
const onPictureModalEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};


//Закрытие модального окна
function closePictureModal () {
  document.body.classList.remove('modal-open');
  pictureModalElement.classList.add('hidden');
  const pictureElement = pictureModalElement.querySelector('.big-picture__img img');
  pictureModalElement.querySelector('.big-picture__img').removeChild(pictureElement);

  document.removeEventListener('keydown', onPictureModalEscDown);
}


// Открытие модального окна с фотографией
function openPictureModal (pictureItemData) {
  createPicture(pictureItemData);
  setFieldsContent(pictureItemData);
  createCommentsList(pictureItemData);

  pictureModalElement.querySelector('.social__comment-count').classList.add('hidden');
  pictureModalElement.querySelector('.comments-loader').classList.add('hidden');

  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPictureModalEscDown);
}


closeButtonElement.addEventListener('click', closePictureModal);


export {openPictureModal};
