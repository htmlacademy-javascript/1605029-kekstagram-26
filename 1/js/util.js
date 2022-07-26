const ALERT_SHOW_TIME = 7000;


// Получить случайное целое число из диапазона включительно.
const getRandomInteger = (start, end) => {
  let min = Math.min(start, end);
  let max = Math.max(start, end);

  if ((min < 0) && (max < 0)) {
    return;
  }

  min = min < 0 ? 0 : Math.ceil(min);
  max = max < 0 ? 0 : Math.floor(max);

  return min === max ? min : Math.floor(Math.random() * (max - min + 1) + min);
};


// Получить перемешанный массив заданной длины
// из уникальных элементов заданного массива
function getShuffledUniqueElements (elements, elementsCount) {
  const shuffledElements = [];

  if (elements.length < elementsCount) {
    elementsCount = elements.length;
  }

  while (shuffledElements.length < elementsCount) {
    const randomIndex = getRandomInteger(0, elementsCount - 1);
    if (!shuffledElements.includes(elements[randomIndex])) {
      shuffledElements.push(elements[randomIndex]);
    }
  }

  return shuffledElements;
}


// Проверка максимальной длины строки
const checkMaxStringLength = (string, maxLength) => string.length <= maxLength;


// Получение возрастающей последовательности из заданного количества чисел
const getSequenceItems = (min, max) => {
  const items = [];
  for (let i = min; i <= max; i++) {
    items.push(i);
  }

  return items;
};


// Извлечение из массива элементов в случайном порядке
const extractRandomItems = (items) => {
  let id;

  while (!items.includes(items[id])) {
    id = getRandomInteger(0, items.length - 1);
  }

  return items.splice(id, 1)[0];
};


// Проверка на нажатие клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';


// Вывод сообщения о проблеме
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '200px';
  alertContainer.style.right = '0';
  alertContainer.style.width = '500px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.padding = '40px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '1.6';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#000000';
  alertContainer.style.fontWeight = '700';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.style.border = '4px solid #771717';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  getRandomInteger,
  extractRandomItems,
  getSequenceItems,
  checkMaxStringLength,
  isEscapeKey,
  showAlert,
  getShuffledUniqueElements,
  debounce
};
