import {showAlert, debounce} from './util.js';
import {openSuccessModal, openErrorModal} from './form-modal.js';
import {setGallery} from './gallery.js';
import {showFilters, setFilterChange} from './filters.js';
import {setForm, closeFormModal} from './form.js';
import {setFormSubmit} from './form-validation.js';
import {getData} from './api.js';


const RERENDER_DELAY = 500;

getData(
  (picturesData) => {
    setGallery(picturesData);
    showFilters();
    setFilterChange(debounce(
      () => setGallery(picturesData),
      RERENDER_DELAY
    ));
  },
  showAlert
);

setForm();

setFormSubmit(
  () => {
    closeFormModal();
    openSuccessModal();
  },
  openErrorModal
);
