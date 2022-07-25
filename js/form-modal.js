import {isEscapeKey} from './util.js';


const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';

let modalTemplate;
let modalElement;
let modalInnerElement;
let closeButtonElement;


const onModalEscDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};


const onDocumentClick = () => {
  closeModal();
};


const onCloseButtonClick = () => {
  closeModal();
};


const onModalInnerClick = (evt) => {
  evt.stopPropagation();
};


function closeModal () {
  modalElement.remove();

  document.removeEventListener('keydown', onModalEscDown);
  document.removeEventListener('click', onDocumentClick);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  modalInnerElement.removeEventListener('click', onModalInnerClick);
}


function openModal (isSuccess) {
  return () => {
    const result = isSuccess ? SUCCESS_CLASS : ERROR_CLASS;

    modalTemplate = document.querySelector(`#${result}`)
      .content.querySelector(`.${result}`);
    modalElement = modalTemplate.cloneNode(true);
    modalInnerElement = modalElement.querySelector(`.${result}__inner`);
    closeButtonElement = modalElement.querySelector(`.${result}__button`);

    document.body.append(modalElement);

    document.addEventListener('keydown', onModalEscDown);
    document.addEventListener('click', onDocumentClick);
    modalInnerElement.addEventListener('click', onModalInnerClick);
    closeButtonElement.addEventListener('click', onCloseButtonClick);
  };
}


const openSuccessModal = openModal(true);
const openErrorModal = openModal(false);


export {openSuccessModal, openErrorModal};
