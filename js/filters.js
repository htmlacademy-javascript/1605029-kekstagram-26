import {getShuffledUniqueElements} from './util.js';


const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const RANDOM_PICTURES_COUNT = 10;
const FILTER_RANDOM_ID = 'filter-random';
const FILTER_DISCUSSED_ID = 'filter-discussed';

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = filtersContainerElement.querySelector('.img-filters__form');


const showFilters = () => {
  filtersContainerElement.classList.remove('img-filters--inactive');
};


const getRandomUniquePictures = (picturesData) =>
  getShuffledUniqueElements(picturesData, RANDOM_PICTURES_COUNT);


const getSortedByCommentsDesc = (picturesData) =>
  picturesData
    .slice()
    .sort((firstPicture, secondPicture) =>
      secondPicture.comments.length - firstPicture.comments.length
    );


const isActiveFilter = (element) => [...element.classList].includes(BUTTON_ACTIVE_CLASS);


const getActiveFilter = () => filtersFormElement.querySelector(`.${BUTTON_ACTIVE_CLASS}`);


const setActiveClass = (element) => {
  const activeElement = getActiveFilter();
  activeElement.classList.remove(BUTTON_ACTIVE_CLASS);

  element.classList.add(BUTTON_ACTIVE_CLASS);
};


const filterPictures = (picturesData) => {
  const activeFilter = getActiveFilter();

  if (activeFilter.id === FILTER_RANDOM_ID) {
    return getRandomUniquePictures(picturesData);
  }

  if (activeFilter.id === FILTER_DISCUSSED_ID) {
    return getSortedByCommentsDesc(picturesData);
  }

  return picturesData;
};


const setFilterChange = (cb) => {
  filtersFormElement.addEventListener('click', (evt) => {
    const selectedFilter = evt.target;

    if (!isActiveFilter(selectedFilter)) {
      setActiveClass(selectedFilter);
      cb();
    }
  });
};


export {showFilters, setFilterChange, filterPictures};
