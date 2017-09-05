'use strict';

(function () {
  window.synchronizeFields = function (fieldOne, fieldTwo, callback, dataOne, dataTwo) {
    fieldOne.addEventListener('change', function () {
      var currentValue = dataTwo[dataOne.indexOf(fieldOne.value)];
      callback(fieldTwo, currentValue);
    });
  };
})();
