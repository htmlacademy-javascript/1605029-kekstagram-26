import {setPicturesListMarkup} from './picture-mini.js';
import {openPictureModal} from './picture-full.js';
import {filterPictures} from './filters.js';


const setGallery = (picturesData) => {
  const filteredPicturesData = filterPictures(picturesData);
  setPicturesListMarkup(filteredPicturesData);

  const picturesListElement = document.querySelector('.pictures');

  picturesListElement.addEventListener('click', (evt) => {
    if ([...evt.target.classList].includes('picture__img')) {
      const itemIndex = [...picturesListElement.querySelectorAll('.picture__img')].indexOf(evt.target);
      openPictureModal(filteredPicturesData[itemIndex]);
    }
  });
};


export {setGallery};
