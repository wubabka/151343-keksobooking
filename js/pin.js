'use strict';

window.pinSet = (function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  // -----> Создание пина <-----
  var createPin = function (advert) {
    var pin = document.createElement('div');
    var img = document.createElement('img');
    pin.className = 'pin';
    pin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advert.location.y - PIN_HEIGHT + 'px';
    img.className = 'rounded';
    img.width = 40;
    img.height = 40;
    img.src = advert.author.avatar;
    pin.appendChild(img);
    pin.setAttribute('tabindex', 0);
    return pin;
  };

  // -----> Добавление пинов в DOM <-----
  return function (advertsList) {
    var fragment = document.createDocumentFragment();
    var allPins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    if (allPins.length !== 0) {
      for (var i = 0; i < allPins.length; i++) {
        pinsMap.removeChild(allPins[i]);
      }
    }
    for (var j = 0; j < advertsList.length; j++) {
      fragment.appendChild(createPin(advertsList[j]));
    }
    pinsMap.appendChild(fragment);
  };

})();
