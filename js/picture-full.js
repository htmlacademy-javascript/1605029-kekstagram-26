import {isEscapeKey} from './util.js';


const PICTURE_WIDTH = 600;
const PICTURE_HEIGHT = 600;
const DISPLAY_COMMENTS_COUNT = 5;

const pictureModalElement = document.querySelector('.big-picture');
const commentsListElement = pictureModalElement.querySelector('.social__comments');
const commentsItemsElements = commentsListElement.querySelectorAll('.social__comment');
const closeButtonElement = pictureModalElement.querySelector('#picture-cancel');
const commentsCountElement = pictureModalElement.querySelector('.social__comment-count');
const commentsLoaderElement = pictureModalElement.querySelector('.comments-loader');
const commentsDisplayedElement = pictureModalElement.querySelector('.comments-displayed');

let commentsDisplayed = 0;


// Создание и добавление в документ элемента фотографии
const createPicture = (pictureItemData) => {
  const pictureContainerElement = pictureModalElement.querySelector('.big-picture__img');
  const pictureElement = document.createElement('img');
  pictureElement.src = pictureItemData.url;
  pictureElement.alt = pictureItemData.description;
  pictureElement.width = PICTURE_WIDTH;
  pictureElement.height = PICTURE_HEIGHT;
  pictureContainerElement.innerHTML = '';
  pictureContainerElement.appendChild(pictureElement);
};


// Заполнение полей модального окна
const setFieldsContent = (pictureItemData) => {
  pictureModalElement.querySelector('.likes-count').textContent = pictureItemData.likes;
  pictureModalElement.querySelector('.comments-count').textContent = pictureItemData.comments.length;
  pictureModalElement.querySelector('.social__caption').textContent = pictureItemData.description;
};


// Очищает значение блока с числом показанных комментариев
const clearCommentsDisplayedCount = () => {
  commentsDisplayedElement.textContent = '';
  commentsDisplayed = 0;
};


// Устанавливается начальное значение блока с числом показанных комментариев.
// Выбирается меньшее из двух значений: количество всех комментариев или DISPLAY_COMMENTS_COUNT
const setCommentsDisplayedCount = (commentsCount) => {
  commentsDisplayed =
    [commentsCount, DISPLAY_COMMENTS_COUNT].sort((a, b) => a - b)[0];
  commentsDisplayedElement.textContent = commentsDisplayed;
};


// Увеличивается значение в блоке числа показанных комментариев
const increaseCommentsDisplayedCount = (commentsCount) => {
  if (commentsDisplayed < commentsCount) {
    commentsDisplayed = commentsCount - commentsDisplayed > DISPLAY_COMMENTS_COUNT
      ? commentsDisplayed + DISPLAY_COMMENTS_COUNT
      : commentsCount;

    commentsDisplayedElement.textContent = commentsDisplayed;
  }
};


// Обработчик события для кнопки "Загрузить ещё"
// "Подгружает" новые комментарии,
// обновляет значение в блоке с числом показанных комментариев
const onAddCommentsButtonClick = () => {
  const commentsLoadedElements = commentsListElement.querySelectorAll('.social__comment');

  const commentsDisplayedBefore = commentsDisplayed;
  increaseCommentsDisplayedCount(commentsLoadedElements.length);
  const commentsDisplayedAfter = commentsDisplayed;

  for (let i = commentsDisplayedBefore - 1; i < commentsDisplayedAfter; i++) {
    commentsLoadedElements[i].classList.remove('hidden');
  }

  if (commentsDisplayedAfter >= commentsLoadedElements.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};


// Формирование элемента комментария
const createCommentItem = (comment, number) => {
  const commentItemElement = commentsItemsElements[0].cloneNode(true);
  commentItemElement.querySelector('.social__picture').src = comment.avatar;
  commentItemElement.querySelector('.social__picture').alt = comment.name;
  commentItemElement.querySelector('.social__text').textContent = comment.message;

  if (number >= DISPLAY_COMMENTS_COUNT) {
    commentItemElement.classList.add('hidden');
  }

  return commentItemElement;
};


// Создание фрагмента списка комментариев
const createCommentsList = (comments) => {
  const commentsItemsFragment = document.createDocumentFragment();

  comments.forEach(
    (comment, number) => commentsItemsFragment.appendChild(createCommentItem(comment, number))
  );

  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(commentsItemsFragment);
  commentsListElement.classList.remove('hidden');
};


// Добавление комментариев в модальное окно
const createCommentsBlockMarkup = ({comments}) => {
  commentsListElement.classList.add('hidden');
  commentsCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  if (comments.length > 0) {
    commentsCountElement.classList.remove('hidden');
    setCommentsDisplayedCount(comments.length);
    createCommentsList(comments);

    if (comments.length > DISPLAY_COMMENTS_COUNT) {
      commentsLoaderElement.classList.remove('hidden');
      commentsLoaderElement.addEventListener('click', onAddCommentsButtonClick);
    }
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
  clearCommentsDisplayedCount();
  commentsLoaderElement.removeEventListener('click', onAddCommentsButtonClick);

  document.removeEventListener('keydown', onPictureModalEscDown);
}


// Открытие модального окна с фотографией
function openPictureModal (pictureItemData) {
  createPicture(pictureItemData);
  setFieldsContent(pictureItemData);
  createCommentsBlockMarkup(pictureItemData);

  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPictureModalEscDown);
}


closeButtonElement.addEventListener('click', closePictureModal);


export {openPictureModal};
