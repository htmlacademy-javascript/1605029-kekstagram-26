const URL_GET_DATA = 'https://26.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://26.javascript.pages.academy/kekstagram';


const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(URL_GET_DATA);

    if (!response.ok) {
      throw new Error();
    }

    const picturesData = await response.json();
    onSuccess(picturesData);
  } catch (error) {
    onFail('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу.');
  }
};


const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      URL_SEND_DATA,
      {
        method: 'POST',
        body
      }
    );

    if (!response.ok) {
      throw new Error();
    }

    onSuccess();
  } catch (error) {
    onFail();
  }
};

export {getData, sendData};
