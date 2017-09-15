'use strict';

window.filter = function () {
  var offerType = null;
  var offerPrice = null;
  var offerRoom = null;
  var offerGuest = null;
  var offerFeatures = [];
  var listAdverts = [];
  var PRICE_MID_MIN = 10000;
  var PRICE_MID_MAX = 50000;
  var mapFilter = document.querySelector('.tokyo__filters');
  var houseType = mapFilter.querySelector('#housing_type');
  var housePrice = mapFilter.querySelector('#housing_price');
  var houseRooms = mapFilter.querySelector('#housing_room-number');
  var houseGuests = mapFilter.querySelector('#housing_guests-number');
  var houseFeatures = mapFilter.querySelector('#housing_features');
  var houseFeaturesList = houseFeatures.querySelectorAll('input[name=feature]');

  var getFilteredData = function (curArray, field, fieldValue, callback) {
    return curArray.filter(function (it) {
      return callback(it, field, fieldValue);
    });
  };

  var isEqual = function (it, field, fieldValue) {
    if (field === 'guests' || field === 'rooms') {
      return it.offer[field] === parseInt(fieldValue, 10);
    }
    return it.offer[field] === fieldValue;
  };

  var isSuitablePrice = function (it, field, fieldValue) {
    switch (fieldValue) {
      case 'any':
        return it.offer[field];
      case 'middle':
        return it.offer[field] > PRICE_MID_MIN && it.offer[field] <= PRICE_MID_MAX;
      case 'low':
        return it.offer[field] <= PRICE_MID_MIN;
      case 'high':
        return it.offer[field] > PRICE_MID_MAX;
      default:
        return false;
    }
  };

  var isSuitableValue = function (it, field, fieldValue) {
    if (fieldValue === 'any') {
      return true;
    }
    return isEqual(it, field, fieldValue);
  };

  var resetPins = function () {
    window.utilSet.hideCard();
    var currentPinArray = listAdverts.slice();
    if (offerType !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'type', offerType, isSuitableValue);
    }
    if (offerPrice !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'price', offerPrice, isSuitablePrice);
    }
    if (offerRoom !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'rooms', offerRoom, isSuitableValue);
    }
    if (offerGuest !== null) {
      currentPinArray = getFilteredData(currentPinArray, 'guests', offerGuest, isSuitableValue);
    }
    if (offerFeatures && offerFeatures.length > 0) {
      offerFeatures.forEach(function (item) {
        currentPinArray = currentPinArray.filter(function (it) {
          return it.offer.features.indexOf(item) !== -1;
        });
      });
    }
    window.pinSet(currentPinArray);
  };

  return function (advertsList) {
    listAdverts = advertsList.slice();
    houseType.addEventListener('change', function (evt) {
      offerType = evt.currentTarget.value;
      window.debounce(resetPins);
    });
    housePrice.addEventListener('change', function (evt) {
      offerPrice = evt.currentTarget.value;
      window.debounce(resetPins);
    });
    houseRooms.addEventListener('change', function (evt) {
      offerRoom = evt.currentTarget.value;
      window.debounce(resetPins);
    });
    houseGuests.addEventListener('change', function (evt) {
      offerGuest = evt.currentTarget.value;
      window.debounce(resetPins);
    });
    houseFeatures.addEventListener('change', function () {
      offerFeatures = [].filter.call(houseFeaturesList, function (it) {
        return it.checked === true;
      })
          .map(function (it) {
            return it.value;
          });
      window.debounce(resetPins);
    });
  };
}();
