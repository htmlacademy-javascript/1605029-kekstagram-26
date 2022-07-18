import {getPhotoDescriptions} from './data.js';


const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesItems = getPhotoDescriptions();

const picturesListFragment = document.createDocumentFragment();

picturesItems.forEach((picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  picturesListFragment.appendChild(pictureElement);
});

picturesListElement.appendChild(picturesListFragment);
