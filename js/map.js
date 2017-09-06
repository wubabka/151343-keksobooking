'use strict';

var URL = 'https://1510.dump.academy/keksobooking/data';
var onLoad = function (loadedData) {
  window.pinSet(loadedData);
};
window.load(URL, onLoad);

var pinMain = document.querySelector('.pin__main');
var addressField = document.querySelector('#address');
var currentCoordinate = null;

// -----> Определить стартовые координаты <-----
var onPinMouseDown = function (evt) {
  evt.preventDefault();
  var startCoordinate = {
    x: evt.clientX,
    y: evt.clientY
  };
  currentCoordinate = startCoordinate;
  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

pinMain.addEventListener('mousedown', onPinMouseDown);

var onPinMouseUp = function (evt) {
  evt.preventDefault();
  document.removeEventListener('mousemove', onPinMouseMove);
  document.removeEventListener('mouseup', onPinMouseUp);
};

// -----> Передвижение пина <-----
var onPinMouseMove = function (evt) {
  evt.preventDefault();
  // -----> Ограничение области передвижения <-----
  var PIN_COORDINATE = {
    MIN_X: 0,
    MIN_Y: 0,
    MAX_X: pinMain.offsetParent.clientWidth - pinMain.clientWidth,
    MAX_Y: pinMain.offsetParent.clientHeight - pinMain.clientHeight
  };
  var shift = {
    x: currentCoordinate.x - evt.clientX,
    y: currentCoordinate.y - evt.clientY
  };
  currentCoordinate = {
    x: evt.clientX,
    y: evt.clientY
  };

  var newCoordinateX = pinMain.offsetLeft - shift.x;
  var newCoordinateY = pinMain.offsetTop - shift.y;

  if ((newCoordinateX >= PIN_COORDINATE.MIN_X && newCoordinateX <= PIN_COORDINATE.MAX_X) && (newCoordinateY >= PIN_COORDINATE.MIN_Y && newCoordinateY <= PIN_COORDINATE.MAX_Y)) {
    pinMain.style.left = newCoordinateX + 'px';
    pinMain.style.top = newCoordinateY + 'px';
  }

  addressField.value = 'x: ' + Math.floor(newCoordinateX + pinMain.clientWidth / 6) + ', y: ' + Math.floor(newCoordinateY + pinMain.clientHeight / 6);
};
