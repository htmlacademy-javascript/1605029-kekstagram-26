const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


// Получение фрагмента с разметкой элементов мини-фотографий
const getPicturesItems = (picturesItemsData) => {
  const picturesItemsFragment = document.createDocumentFragment();

  picturesItemsData.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    picturesItemsFragment.appendChild(pictureElement);
  });

  return picturesItemsFragment;
};


// Создание разметки со списком мини-фотографий
const setPicturesListMarkup = (picturesData) => {
  const picturesContainerElement = document.querySelector('.pictures');
  const picturesItems = picturesContainerElement.querySelectorAll('.picture');

  if (picturesItems.length > 0) {
    picturesItems.forEach((item) => item.remove());
  }

  const picturesItemsFragment = getPicturesItems(picturesData);
  picturesContainerElement.appendChild(picturesItemsFragment);
};


export {
  getPicturesItems,
  setPicturesListMarkup
};
