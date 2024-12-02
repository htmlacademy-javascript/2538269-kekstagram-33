function getData(url, onSuccess, onFail) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные');
      }
      return response.json();
    })
    .then(onSuccess)
    .catch((error) => onFail(error.message));
}

function sendData(url, data, onSuccess, onFail) {
  fetch(url,
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка отправки данных');
    }
    return response.json();
  }).then(onSuccess)
    .catch((error) => onFail(error.message));
}

export {getData, sendData};
