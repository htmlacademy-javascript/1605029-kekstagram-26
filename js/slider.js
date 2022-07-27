const sliderDefault = {
  min: 0,
  max: 1,
  start: 1,
  step: 0.1
};

const formElement = document.querySelector('.img-upload__overlay');
const sliderContainerElement = formElement.querySelector('.effect-level');
const sliderElement = formElement.querySelector('.effect-level__slider');
const sliderValueElement = formElement.querySelector('.effect-level__value');


noUiSlider.create(sliderElement, {
  range: {
    min: sliderDefault.min,
    max: sliderDefault.max
  },
  start: sliderDefault.start,
  step: sliderDefault.step,
  connect: 'lower'
});

const slider = sliderElement.noUiSlider;


// Изменение значения слайдера
const onSliderChange = (cb) => {
  slider.on('change', () => {
    sliderValueElement.value = slider.get();
    cb();
  });
};


// Обновление настроек слайдера
const updateSlider = (min, max, start, step) => {
  slider.updateOptions({
    range: {
      min,
      max
    },
    start,
    step
  });
};


// Сброс настроек слайдера
const resetSlider = () => {
  updateSlider(
    sliderDefault.min,
    sliderDefault.max,
    sliderDefault.start,
    sliderDefault.step
  );
};


// Слайдер становится видимым
const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};


// Скрытие слайдера
const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};


export {
  updateSlider,
  resetSlider,
  onSliderChange,
  showSlider,
  hideSlider
};
