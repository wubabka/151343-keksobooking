'use strict';

window.pinSet = (function (advertsList) {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var pinActive = document.querySelector('.pin--active');
  var dialogWindow = document.querySelector('.dialog');
  // var advertsList = window.utilSet.createAdv();

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

  // -----> Удалить пин с карты <-----
  var deletePin = function (pin) {
    pinsMap.removeChild(pin);
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
    if (window.utilSet.isEnterPressed(evt) || window.utilSet.isClicked(evt)) {
      var currentPin = '';
      var currentSrc = '';
      var currentTarget = evt.target;
      if (evt.target.className === 'rounded') {
        currentPin = currentTarget.offsetParent;
        currentSrc = currentTarget.getAttribute('src');
      } else if (currentTarget.className === 'pin' || currentTarget.className === 'pin pin--active') {
        currentPin = currentTarget;
        currentSrc = currentTarget.children[0].getAttribute('src');
      }
      // -----> Если у пина уже есть pin--active, то его надо убрать <-----
      if (currentPin.className && currentPin.className !== 'pin  pin__main') {
        if (pinActive !== null) {
          pinActive.classList.remove('pin--active');
        }
        currentPin.classList.add('pin--active');
        pinActive = currentPin;
        // -----> Создание окна диалога для выбранного пина <-----
        var pinNumber = searchAdvert(currentSrc, advertsList);
        window.cardSet(advertsList[pinNumber]);
      }
    }
  };

  // -----> Добавление пинов в DOM <-----
  return function (currentArray) {
    advertsList = currentArray;
    var fragment = document.createDocumentFragment();
    var allPins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    if (allPins.length !== 0) {
      allPins.forEach(function (item) {
        deletePin(item);
      });
    }
    for (var i = 0; i < advertsList.length; i++) {
      fragment.appendChild(createPin(advertsList[i]));
    }
    pinsMap.appendChild(fragment);
    dialogWindow.style.display = 'none';
    pinsMap.addEventListener('click', onShowDialog);
    pinsMap.addEventListener('keydown', onShowDialog);
  };

})();
