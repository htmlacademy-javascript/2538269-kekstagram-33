const Method = {
  GET: 'GET',
  POST: 'POST',
};

function fetchImpl(url, onSuccess, onFail, method, body, errText) {
  fetch(url, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(errText);
      }
      return response.json();
    }).then(onSuccess)
    .catch((error) => onFail(error.message));
}

function getData(url, onSuccess, onFail) {
  fetchImpl(url, onSuccess, onFail, Method.GET, null, 'Не удалось получить данные');
}

function sendData(url, data, onSuccess, onFail) {
  fetchImpl(url, onSuccess, onFail, Method.POST, data, 'Ошибка отправки данных');
}

export {getData, sendData};
