'use strict';

window.utilSet = (function () {
  var NEIGHBORS = 8;
  var USER_ID = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['flat', 'house', 'palace', 'bungalo'];

  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];

  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var pinActive = null;
  var dialogWindow = document.querySelector('.dialog');

  // -----> Возврат рандомного значения <-----
  var getRandomInt = function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  };

  // -----> Возврат рандомного элемента <-----
  var getRandomItem = function (item) {
    return item[getRandomInt(0, item.length - 1)];
  };

  // -----> Возврат конкретного элемента <-----
  var getRandomUniqueItem = function (item) {
    return item.splice(getRandomInt(0, item.length - 1), 1);
  };

  // -----> Создание описания опций <-----
  var createFeatures = function () {
    var positions = [];
    var rand = getRandomInt(0, FEATURES.length - 1);

    for (var i = 0; i <= rand; i++) {
      positions[i] = getRandomUniqueItem(FEATURES);
    }
    return positions;
  };

  // -----> Создание объявления <-----
  var createAdvert = function () {
    var locationX = getRandomInt(300, 900);
    var locationY = getRandomInt(100, 500);

    return {
      'author': {
        'avatar': 'img/avatars/user' + getRandomUniqueItem(USER_ID) + '.png'
      },

      'offer': {
        'title': getRandomUniqueItem(TITLES),
        'address': locationX + ', ' + locationY,
        'price': getRandomInt(1000, 1000000),
        'type': getRandomItem(TYPES),
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 10),
        'checkin': getRandomItem(CHECK_IN),
        'checkout': getRandomItem(CHECK_OUT),
        'features': createFeatures(),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };

  return {
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
      return evt.type === 'click';
    },

    // -----> Создание списка предложений <-----
    createAdv: function () {
      var adverts = [];
      for (var i = 0; i < NEIGHBORS; i++) {
        adverts.push(createAdvert());
      }
      return adverts;
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
