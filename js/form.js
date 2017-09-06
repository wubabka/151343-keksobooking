'use strict';

window.formSet = (function () {
  var TYPES = ['flat', 'house', 'palace', 'bungalo'];
  var TYPE_COSTS = [1000, 5000, 10000, 0];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];

  var form = document.querySelector('.notice__form');
  // var submit = document.querySelector('.form__submit');
  var selectBuildingType = document.querySelector('#type');
  var inputOfferPrice = document.querySelector('#price');
  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');
  var capacity = document.getElementById('capacity');
  var roomNumber = document.getElementById('room_number');

  // -----> Минимальная цена в соответствии с типом жилья <-----
  var onInputOfferPrice = function (element, value) {
    element.value = value;
    element.placeHolder = value;
    element.min = value;
  };

  // -----> Количество гостей относительно комнат <-----
  var onRoomNumber = function (price, room) {
    var update = function (i) {
      var value = '';
      for (i = 1; i <= room.value; i++) {
        value = value + '<option value=' + i + '>для ' + i + ' гост' + (i === 1 ? 'я' : 'ей') + '</option>';
      }
      price.innerHTML = value || '<option>не для гостей</option>';
    };
    update();
    room.addEventListener('change', update, false);
  };

  onRoomNumber(capacity, roomNumber);

  // -----> Время выезда === время заезда <-----
  var syncOnChange = function (element1, element2) {
    element1.value = element2;
  };

  // -----> Цвет рамки в зависимости от валидности <-----
  var borderPaint = function borderPaint(element, condition) {
    element.style.borderColor = !condition ? 'green' : 'red';
  };

  // -----> Обработчик события нажатия кнопки "Опубликовать" <-----
  var isFormValidate = function () {
    var title = document.querySelector('#title');
    var price = document.querySelector('#price');

    var invalid = {
      titleRules: !title.hasAttribute('required') ||
        (title.value.length < 30 || title.value.length > 100),
      priceRules:
        !price.hasAttribute('required') ||
        (price.value < 1000 || price.value > 1000000)
    };

    borderPaint(title, invalid.titleRules);
    borderPaint(price, invalid.priceRules);

    return invalid.titleRules || invalid.priceRules;
  };

  form.addEventListener('submit', function (e) {
    window.backend.save(new FormData(form), isFormValidate, window.onError);
    e.preventDefault();
    form.reset();
  });

  // if (form.checkValidity()) {
  //   form.submit();
  //   window.backend.save(new FormData(form), isFormValidate, window.onError);
  // }

  // submit.addEventListener('click', isFormValidate);

  window.synchronizeFields(selectBuildingType, inputOfferPrice, onInputOfferPrice, TYPES, TYPE_COSTS);

  window.synchronizeFields(selectTimeIn, selectTimeOut, syncOnChange, CHECK_IN, CHECK_OUT);
  window.synchronizeFields(selectTimeOut, selectTimeIn, syncOnChange, CHECK_IN, CHECK_OUT);

})();
