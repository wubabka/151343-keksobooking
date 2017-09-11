'use strict';

window.utilSet = (function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var CLICKED = 'click';
  var pinActive = null;
  var dialogWindow = document.querySelector('.dialog');

  return {
    // -----> Возврат рандомного значения <-----
    getRandomInt: function (min, max) {
      return min + Math.floor(Math.random() * (max + 1 - min));
    },
    // -----> Возврат рандомного элемента <-----
    getRandomArrayItem: function (array) {
      return array[window.utilSet.getRandomInt(0, array.length - 1)];
    },
    // -----> Возврат конкретного элемента <-----
    getRandomUniqueItem: function (array) {
      return array.splice(window.utilSet.getRandomInt(0, array.length - 1), 1);
    },
    // -----> Нажатие на Esc <-----
    isEscapePressed: function (evt) {
      return evt.keyCode === ESCAPE_KEY_CODE;
    },
    // -----> Нажатие на Enter <-----
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },
    // -----> Клик мышкой <-----
    isClicked: function (evt) {
      return evt.type === CLICKED;
    },
    // -----> Удалить активный пин <-----
    removeActive: function (itClass) {
      pinActive = document.querySelector('.' + itClass);
      if (pinActive !== null) {
        pinActive.classList.remove(itClass);
      }
    },
    // -----> Спрятать карточку объявления <-----
    hideCard: function () {
      dialogWindow.style.display = 'none';
    },
    // -----> Показать карточку объявления <-----
    displayCard: function () {
      dialogWindow.style.display = 'block';
    }
  };

})();
