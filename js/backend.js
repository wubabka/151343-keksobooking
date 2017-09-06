'use strict';

window.load = (function (url, onLoad) {

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.className = 'alert-message';
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        onError('Неверный запрос');
        break;
      case 401:
        onError('Пользователь не авторизован');
        break;
      case 404:
        onError('Ничего не найдено');
        break;
      default:
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000;

  xhr.open('GET', url);
  xhr.send();

});
