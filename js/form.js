'use strict';

window.formSet = (function () {
  var TYPE_COSTS = {
    flat: 1000,
    home: 5000,
    house: 10000,
    bungalo: 0
  };

  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];

  var submit = document.querySelector('.form__submit');
  var selectBuildingType = document.querySelector('#type');
  var inputOfferPrice = document.querySelector('#price');
  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');
  var capacity = document.getElementById('capacity');
  var roomNumber = document.getElementById('room_number');

  // -----> Минимальная цена в соответствии с типом жилья <-----
  var onInputOfferPrice = function (el1, el2) {
    var buildingType = 'flat';
    if (el2.value < TYPE_COSTS['flat']) {
      buildingType = 'bungalo';
    } else if (el2.value >= TYPE_COSTS['house']) {
      buildingType = 'house';
    } else if (el2.value >= TYPE_COSTS['home']) {
      buildingType = 'home';
    }
    if (el1.value !== buildingType) {
      el1.value = buildingType;
      el2.setAttribute('min', TYPE_COSTS[buildingType]);
    }
  };

  // var onSelectBuilding = function () {
  //   var minPrice = TYPE_COSTS[selectBuildingType.children[selectBuildingType.selectedIndex].value];
  //   inputOfferPrice.value = minPrice;
  // };

  // selectBuildingType.addEventListener('change', onSelectBuilding);
  // inputOfferPrice.addEventListener('input', onInputOfferPrice);

  // var onInputOfferPrice = function (element, value) {
  //   element.value = value;
  //   element.min = value;
  // };

  // -----> Количество гостей относительно комнат <-----
  (function () {
    var update = function (i) {
      var value = '';
      for (i = 1; i <= roomNumber.value; i++) {
        value = value + '<option value=' + i + '>для ' + i + ' гост' + (i === 1 ? 'я' : 'ей') + '</option>';
      }
      capacity.innerHTML = value || '<option>не для гостей</option>';
    };
    update();
    roomNumber.addEventListener('change', update, false);
  })(document.getElementById('capacity'), document.getElementById('room_number'));

  // -----> Время выезда === время заезда <-----
  var syncOnChange = function (element1, element2) {
    element1.value = element2;
  };

  // -----> Цвет рамки в зависимости от валидности <-----
  var borderPaint = function borderPaint(element, condition) {
    element.style.borderColor = !condition ? 'green' : 'red';
  };

  // -----> Запуск проверки заполнения формы <-----
  var onSubmitClick = function (e) {
    if (!isFormValidate()) {
      e.preventDefault();
    }
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

  window.synchronizeFields(selectBuildingType, inputOfferPrice, onInputOfferPrice, ['flat', 'home', 'house', 'bungalo'], [1000, 5000, 10000, 0]);

  window.synchronizeFields(selectTimeIn, selectTimeOut, syncOnChange, CHECK_IN, CHECK_OUT);
  window.synchronizeFields(selectTimeOut, selectTimeIn, syncOnChange, CHECK_IN, CHECK_OUT);

  submit.addEventListener('click', onSubmitClick);

})();
