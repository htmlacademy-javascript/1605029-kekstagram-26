import {setPicturesListMarkup} from './picture-mini.js';
import {openPictureModal} from './picture-full.js';
import {filterPictures} from './filters.js';


const setGallery = (picturesData) => {
  setPicturesListMarkup(filterPictures(picturesData));

  const picturesListElement = document.querySelector('.pictures');

  picturesListElement.addEventListener('click', (evt) => {
    if ([...evt.target.classList].includes('picture__img')) {
      const itemIndex = [...picturesListElement.querySelectorAll('.picture__img')].indexOf(evt.target);
      openPictureModal(picturesData[itemIndex]);
    }
  });
};


export {setGallery};
