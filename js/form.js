import {isEscapeKey} from './util.js';


const uploadFileElement = document.querySelector('#upload-file');
const formModalElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = formModalElement.querySelector('#upload-cancel');


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
  document.body.classList.remove('modal-open');
  formModalElement.classList.add('hidden');
  uploadFileElement.value = '';

  document.removeEventListener('keydown', onFormModalEscDown);
}


// Открытие модального окна формы
function openFormModal () {
  formModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFormModalEscDown);
}


uploadFileElement.addEventListener('change', openFormModal);
closeButtonElement.addEventListener('click', closeFormModal);
