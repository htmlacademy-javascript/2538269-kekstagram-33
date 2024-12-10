const Method = {
  GET: 'GET',
  POST: 'POST',
};

const fetchImpl = (url, onSuccess, onFail, method, body, errText) => {
  fetch(url, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(errText);
      }
      return response.json();
    }).then(onSuccess)
    .catch((error) => onFail(error.message));
};

const getData = (url, onSuccess, onFail) => {
  fetchImpl(url, onSuccess, onFail, Method.GET, null, 'Не удалось получить данные');
};

const sendData = (url, data, onSuccess, onFail) => {
  fetchImpl(url, onSuccess, onFail, Method.POST, data, 'Ошибка отправки данных');
};

export {getData, sendData};
