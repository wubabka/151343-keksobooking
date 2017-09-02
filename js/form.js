'use strict';

window.formSet = (function () {
  var TYPE_COSTS = {
    flat: 1000,
    home: 5000,
    house: 10000,
    bungalo: 0
  };

  var submit = document.querySelector('.form__submit');
  var selectBuildingType = document.querySelector('#type');
  var inputOfferPrice = document.querySelector('#price');

  // -----> Минимальная цена в соответствии с типом жилья <-----
  var onInputOfferPrice = function () {
    var buildingType = 'flat';
    if (inputOfferPrice.value < TYPE_COSTS['flat']) {
      buildingType = 'bungalo';
    } else if (inputOfferPrice.value >= TYPE_COSTS['house']) {
      buildingType = 'house';
    } else if (inputOfferPrice.value >= TYPE_COSTS['home']) {
      buildingType = 'home';
    }
    if (selectBuildingType.value !== buildingType) {
      selectBuildingType.value = buildingType;
      inputOfferPrice.setAttribute('min', TYPE_COSTS[buildingType]);
    }
  };

  var onSelectBuilding = function () {
    var minPrice = TYPE_COSTS[selectBuildingType.children[selectBuildingType.selectedIndex].value];
    inputOfferPrice.setAttribute('min', minPrice);
    inputOfferPrice.value = minPrice;
  };

  selectBuildingType.addEventListener('change', onSelectBuilding);
  inputOfferPrice.addEventListener('input', onInputOfferPrice);

  (function (capacity, roomNumber) {
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
  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');

  var syncOnChange = function (element1, element2) {
    var selected = element1.value;
    element2.value = selected;
  };

  selectTimeIn.addEventListener('change', function () {
    syncOnChange(selectTimeIn, selectTimeOut);
  });
  selectTimeOut.addEventListener('change', function () {
    syncOnChange(selectTimeOut, selectTimeIn);
  });

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

  submit.addEventListener('click', onSubmitClick);

})();
