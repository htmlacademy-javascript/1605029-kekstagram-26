const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const LABEL_DEFAULT_IMAGE = './img/upload-button-bg.png';

const fileChooserElement = document.querySelector('#upload-file');
const uploadLabelElement = document.querySelector('.img-upload__label');
const previewElement = document.querySelector('.img-upload__preview img');


const setPreview = (previewUrl) => {
  uploadLabelElement.style.backgroundImage = `url("${previewUrl}")`;
  uploadLabelElement.style.backgroundSize= '100%';

  previewElement.src = previewUrl;
};


const resetPreview = () => {
  uploadLabelElement.style.backgroundImage = `url("${LABEL_DEFAULT_IMAGE}")`;
  previewElement.src = '';
};


fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    previewElement.src = '';
    setPreview(URL.createObjectURL(file));
  }
});


export {resetPreview};
