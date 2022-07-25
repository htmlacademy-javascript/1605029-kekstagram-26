import {
  getPicturesItems,
  setPicturesListMarkup
} from './picture-mini.js';
import {openPictureModal} from './picture-full.js';


const setGallery = (picturesData) => {
  const picturesItemsFragment = getPicturesItems(picturesData);
  setPicturesListMarkup(picturesItemsFragment);

  const picturesListElement = document.querySelector('.pictures');

  picturesListElement.addEventListener('click', (evt) => {
    if ([...evt.target.classList].includes('picture__img')) {
      const itemIndex = [...picturesListElement.querySelectorAll('.picture__img')].indexOf(evt.target);
      openPictureModal(picturesData[itemIndex]);
    }
  });
};


export {setGallery};
