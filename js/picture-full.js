import {picturesItems} from './picture-mini.js';
import {isEscapeKey} from './util.js';


const pictureItem = picturesItems[1];

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsItemsElements = commentsListElement.querySelectorAll('.social__comment');
const closeButtonElement = bigPictureElement.querySelector('#picture-cancel');


const openPicture = () => {
  bigPictureElement.querySelector('.big-picture__img img').src = pictureItem.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = pictureItem.description;
  bigPictureElement.querySelector('.likes-count').textContent = pictureItem.likes;
  bigPictureElement.querySelector('.comments-count').textContent = pictureItem.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = pictureItem.description;

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

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePicture = () => {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
};

openPicture();

closeButtonElement.addEventListener('click', closePicture);
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
});

