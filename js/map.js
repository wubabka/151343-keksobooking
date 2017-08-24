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

var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var pinsMap = document.querySelector('.tokyo__pin-map');
var pinActive = document.querySelector('.pin--active');
var dialogWindow = document.querySelector('.dialog');
var dialogClose = dialogWindow.querySelector('.dialog__close');

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
var createPin = function (item, state) {
  var pin = document.createElement('div');
  var img = document.createElement('img');
  if (state === 0) {
    pin.className = 'pin pin--active';
    pinActive = pin;
  } else {
    pin.className = 'pin';
  }
  pin.style.left = item.location.x - pin.offsetWidth / 2 + 'px';
  pin.style.top = item.location.y - pin.offsetHeight + 'px';
  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = item.author.avatar;
  pin.appendChild(img);
  pin.setAttribute('tabindex', 0);

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
  document.addEventListener('keydown', onCloseDialogEsc);
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

// -----> Нажатие на Esc <-----
var isEscapePressed = function (evt) {
  return evt.keyCode === ESCAPE_KEY_CODE;
};

// -----> Нажатие на Enter <-----
var isEnterPressed = function (evt) {
  return evt.keyCode === ENTER_KEY_CODE;
};

// -----> Клик мышкой <-----
var isClicked = function (evt) {
  return evt.type === 'click';
};

// -----> Закрытие окна с объявлением по клику или Enter <-----
var onCloseDialog = function (evt) {
  if (isEnterPressed(evt) || isClicked(evt)) {
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
    dialogWindow.style.display = 'none';
    document.removeEventListener('keydown', onCloseDialogEsc);
  }
};

// -----> Закрытие окна с объявлением по Esc <-----
var onCloseDialogEsc = function (evt) {
  if (isEscapePressed(evt)) {
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      pinActive = '';
    }
    dialogWindow.style.display = 'none';
  }
};

// -----> Поиск номера объявления по данным аватара <-----
var searchAdvert = function (current) {
  for (var i = 0; i < advertsList.length; i++) {
    if (advertsList[i].author.avatar === current) {
      break;
    }
  }
  return i;
};

// -----> Показать объявление, если на пин кликнули или нажали Enter <-----
var onShowDialog = function (evt) {
  if (isEnterPressed(evt) || isClicked(evt)) {
    var currentPin = '';
    var currentSrc = '';
    var currentTarget = evt.target;
    if (evt.target.className === 'rounded') {
      currentPin = currentTarget.offsetParent;
      currentSrc = currentTarget.getAttribute('src');
    } else if (currentTarget.className === 'pin') {
      currentPin = currentTarget;
      currentSrc = currentTarget.children[0].getAttribute('src');
    }
    // -----> Если у пина уже есть pin--active, то его надо убрать <-----
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
    currentPin.classList.add('pin--active');
    pinActive = currentPin;
    // -----> Создание окна диалога для выбранного пина <-----
    var pinNumber = searchAdvert(currentSrc);
    createDialog(advertsList[pinNumber]);
    dialogWindow.style.display = 'block';
  }
};

pinsMap.addEventListener('click', onShowDialog);
dialogClose.addEventListener('click', onCloseDialog);
pinsMap.addEventListener('keydown', onShowDialog);
dialogClose.addEventListener('keydown', onCloseDialog);
