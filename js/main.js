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


// Проверка максимальной длины строки
const checkMaxStringLength = (string, maxLength) => {
  const trimmedString = String(string).trim();
  return trimmedString.length <= maxLength;
};
