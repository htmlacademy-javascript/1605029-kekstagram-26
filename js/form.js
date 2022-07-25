import './slider.js';
import {
  updateSlider,
  resetSlider,
  onSliderChange,
  showSlider,
  hideSlider
} from './slider.js';
import {isEscapeKey} from './util.js';


const SCALE_DEFAULT = 100;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_CHANGE_STEP = 25;

const filters = {
  none: {
    effect: null,
    min: null,
    max: null,
    step: null,
    units: null
  },
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%'
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    units: ''
  }
};

const formElement = document.querySelector('.img-upload__form');
const uploadFileElement = document.querySelector('#upload-file');
const formModalElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = formModalElement.querySelector('#upload-cancel');
const submitButtonElement = formModalElement.querySelector('#upload-submit');
const scaleValueElement = formModalElement.querySelector('.scale__control--value');
const scaleIncreaseButton = formModalElement.querySelector('.scale__control--bigger');
const scaleDecreaseButton = formModalElement.querySelector('.scale__control--smaller');
const pictureElement = formModalElement.querySelector('.img-upload__preview img');
const effectsButtonsElements = formModalElement.querySelector('.img-upload__effects');
const sliderValueElement = formModalElement.querySelector('.effect-level__value');


// Формирование строки стиля фильтра
const createFilterStyleString = (effect, value, units) =>
  effect === null
    ? null
    : `${effect}(${value}${units})`;


// Применение эффекта фильтра к картинке
const setPictureEffect = (effect) => {
  pictureElement.style.filter = effect;
};


// Сброс фильтра
const resetFilters = () => {
  sliderValueElement.value = '';
  effectsButtonsElements.querySelector('#effect-none').checked = 'true';
  hideSlider();
  resetSlider();
  setPictureEffect(null);
};


// Изменение уровня эффекта
const changeEffectLevel = () => {
  const selectedEffect = effectsButtonsElements
    .querySelector('input[type="radio"]:checked').value;

  const value = sliderValueElement.value;
  const {effect, units} = filters[selectedEffect];
  const filterString = createFilterStyleString(effect, value, units);
  setPictureEffect(filterString);
};


// Функция-обработчик нажатия на кнопку фильтра
const onEffectsButtonClick = (evt) => {
  const filterName = evt.target.value;
  const {
    effect,
    min,
    max,
    step,
    units
  } = filters[filterName];

  const filterString = createFilterStyleString(effect, max, units);

  if (!filters[filterName].effect) {
    hideSlider();
    resetSlider();
  } else {
    updateSlider(min, max, max, step);
    showSlider();
  }

  setPictureEffect(filterString);
};


// Изменение масштаба фотографии
const setPictureScale = (value) => {
  pictureElement.style.transform = `scale(${value/100})`;
};


// Установка значения в поле масштаба изображения
const setScaleValue = (value) => {
  scaleValueElement.value = `${value}%`;
};


// Получение значения из поля масштаба изображения
const getScaleValue = () =>
  +scaleValueElement
    .value
    .slice(0, scaleValueElement.value.length - 1);


// Функция-обработчик нажатия на кнопку увеличения масштаба
const onIncreaseScaleButtonClick = () => {
  const scaleValue = getScaleValue();

  if (scaleValue < SCALE_MAX) {
    setScaleValue(scaleValue + SCALE_CHANGE_STEP);
    setPictureScale(scaleValue + SCALE_CHANGE_STEP);
  }
};


// Функция-обработчик нажатия на кнопку уменьшения масштаба
const onDecreaseScaleButtonClick = () => {
  const scaleValue = getScaleValue();

  if (scaleValue > SCALE_MIN) {
    setScaleValue(scaleValue - SCALE_CHANGE_STEP);
    setPictureScale(scaleValue - SCALE_CHANGE_STEP);
  }
};


// Функция события - нажатия клавиши Esc
const onFormModalEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
      closeFormModal();
    }
  }
};


// Закрытие модального окна формы
function closeFormModal () {
  const errorModalElement = document.querySelector('.error');

  if (!errorModalElement) {
    document.body.classList.remove('modal-open');
    formModalElement.classList.add('hidden');

    formElement.reset();
    uploadFileElement.value = '';
    setScaleValue(SCALE_DEFAULT);
    setPictureScale(SCALE_DEFAULT);
    resetFilters();

    document.removeEventListener('keydown', onFormModalEscDown);
  }
}


// Блокирование кнопки "Опубликовать"
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};


// Разблокирование кнопки "Опубликовать"
const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};


// Открытие модального окна формы
function openFormModal () {
  formModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFormModalEscDown);
}


const setForm = () => {
  hideSlider();
  uploadFileElement.addEventListener('change', openFormModal);
  closeButtonElement.addEventListener('click', closeFormModal);
  scaleIncreaseButton.addEventListener('click', onIncreaseScaleButtonClick);
  scaleDecreaseButton.addEventListener('click', onDecreaseScaleButtonClick);
  effectsButtonsElements.addEventListener('change', onEffectsButtonClick);
  onSliderChange(changeEffectLevel);
};


export {
  setForm,
  closeFormModal,
  blockSubmitButton,
  unblockSubmitButton
};
