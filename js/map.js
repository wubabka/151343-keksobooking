'use strict';

var NEIGHBORS = 8;
var USER_ID = ['01', '02', '03', '04', '05', '06', '07', '08'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
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
var TYPES = ['flat', 'house', 'bungalo'];
var TYPE_NAMES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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
  var dialog = {
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
  return dialog;
};

// -----> Создание списка предложений <-----
var createAdverts = function (count) {
  var adverts = [];
  for (var i = 0; i < count; i++) {
    adverts.push(createAdvert());
  }
  return adverts;
};

// -----> Создание пина <-----
var createPin = function (item) {
  var pin = document.createElement('div');
  var img = document.createElement('img');

  pin.className = 'pin';
  pin.style.left = item.location.x - pin.offsetWidth / 2 + 'px';
  pin.style.top = item.location.y - pin.offsetHeight + 'px';
  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = item.author.avatar;
  pin.appendChild(img);

  return pin;
};

// -----> Добавление данных о квартире в DOM <-----
var createDialog = function (advertItem) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');
  var dialog = document.querySelector('.dialog');
  var dialogPanel = document.querySelector('.dialog__panel');

  lodgeTitle.textContent = advertItem.offer.title;
  lodgeAddress.textContent = advertItem.offer.address;
  lodgePrice.innerHTML = advertItem.offer.price + ' ' + '&#8381;/ночь';
  lodgeType.textContent = TYPE_NAMES[advertItem.offer.type];
  lodgeRooms.textContent = 'Для ' + advertItem.offer.guests + ' гостей в ' + advertItem.offer.rooms + ' комнатах';
  lodgeCheckin.textContent = 'Заезд после ' + advertItem.offer.checkin + ', выезд до ' + advertItem.offer.checkout;

  for (var i = 0; i < advertItem.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + advertItem.offer.features[i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = advertItem.offer.description;
  document.querySelector('.dialog__title img').src = advertItem.author.avatar;

  dialog.replaceChild(lodgeItem, dialogPanel);
};

// -----> Добавление пинов в DOM <-----
var renderPins = function (pin) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.length; i++) {
    fragment.appendChild(createPin(pin[i]));
  }
  pinMap.appendChild(fragment);
};

var advertsList = createAdverts(NEIGHBORS);
renderPins(advertsList);
createDialog(advertsList[0]);
