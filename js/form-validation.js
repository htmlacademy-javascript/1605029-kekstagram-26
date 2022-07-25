import {blockSubmitButton, unblockSubmitButton} from './form.js';
import {sendData} from './api.js';


const formElement = document.querySelector('.img-upload__form');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'validation-error'
});


// Проверка одного хэштега
const validateHashtag = (hashtag) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  hashtag = hashtag.trim();
  return re.test(hashtag);
};


// Проверка списка хэштегов на наличие дубликатов
const hasDuplicates = (hashtags) => {
  for (let i = 0; i < hashtags.length - 1; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return true;
      }
    }
  }

  return false;
};


// Проверка строки хэштегов, веедённой в поле формы
const validateHashtagsString = (string) => {
  const hashtags = string
    .split(' ')
    .filter((hashtag) => hashtag.length > 0);

  if (hashtags.some((hashtag) => !validateHashtag(hashtag))
    || hashtags.length > 5
    || hasDuplicates(hashtags)
  ) {
    return false;
  }

  return true;
};


pristine.addValidator(
  formElement.querySelector('.text__hashtags'),
  validateHashtagsString,
  'Заполните правильно поле хэштега.'
);


const setFormSubmit = (onSuccess, onFail) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          onSuccess();
        },
        () => {
          unblockSubmitButton();
          onFail();
        },
        new FormData(evt.target)
      );
    }
  });
};


export {setFormSubmit};
