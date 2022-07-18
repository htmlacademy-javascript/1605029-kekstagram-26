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
}


// Проверка максимальной длины строки
const checkMaxStringLength = (string, maxLength) => {
  return string.length <= maxLength;
}


// Получение возрастающей последовательности из заданного количества чисел
const getSequenceItems = (min, max) => {
  const items = [];
  for (let i = min; i <= max; i++) {
    items.push(i);
  }

  return items;
}


// Извлечение из массива элементов в случайном порядке
const extractRandomItems = (items) => {
  let id;

  while (!items.includes(items[id])) {
    id = getRandomInteger(0, items.length - 1);
  }

  return items.splice(id, 1)[0];
}


export {
  getRandomInteger,
  extractRandomItems,
  getSequenceItems
}
