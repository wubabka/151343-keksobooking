'use strict';

window.showCard = (function () {
  var pinWidth = null;
  var pinHeight = null;

  var searchAdvert = function (adverts, currentX, currentY) {
    for (var i = 0; i < adverts.length; i++) {
      var pinX = adverts[i].location.x - pinWidth / 2;
      var pinY = adverts[i].location.y - pinHeight;
      if (pinX === currentX && pinY === currentY) {
        break;
      }
    }
    return i;
  };

  return function (evt, advertsList) {
    // -----> Показать объявление, если на пин кликнули или нажали Enter <-----
    if (window.utilSet.isEnterPressed(evt) || window.utilSet.isClicked(evt)) {
      var currentPin = '';
      var currentX = '';
      var currentY = '';
      var checkedPin = evt.target;
      if (evt.target.classList.contains('rounded')) {
        currentPin = checkedPin.offsetParent;
        currentX = checkedPin.parentNode.style.left;
        currentY = checkedPin.parentNode.style.top;
      } else if (checkedPin.classList.contains('pin')) {
        currentPin = checkedPin;
        currentX = checkedPin.style.left;
        currentY = checkedPin.style.top;
      }
      // -----> Если у пина уже есть pin--active, то его надо убрать <-----
      if (currentPin && !currentPin.classList.contains('pin__main')) {
        window.utilSet.removeActive('pin--active');
        currentPin.classList.add('pin--active');
        pinHeight = pinHeight || parseInt(getComputedStyle(currentPin).height.slice(0, -2), 10);
        pinWidth = pinWidth || parseInt(getComputedStyle(currentPin).width.slice(0, -2), 10);
        currentX = parseInt(currentX.slice(0, -2), 10);
        currentY = parseInt(currentY.slice(0, -2), 10);
        // -----> Создание окна диалога для выбранного пина <-----
        var pinNumber = searchAdvert(advertsList, currentX, currentY);
        window.setCard(advertsList[pinNumber]);
      }
    }
  };
})();
