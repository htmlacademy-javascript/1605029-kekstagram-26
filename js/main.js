import {showAlert} from './util.js';
import {openSuccessModal, openErrorModal} from './form-modal.js';
import {setGallery} from './gallery.js';
import {setForm, closeFormModal} from './form.js';
import {setFormSubmit} from './form-validation.js';
import {getData} from './api.js';


getData(setGallery, showAlert);
setForm();
setFormSubmit(() => {
  closeFormModal();
  openSuccessModal();
}, openErrorModal);
