'use strict';

(function () {
  window.synchronizeFields = function (fieldOne, fieldTwo, callback, dataOne, dataTwo) {
    fieldOne.addEventListener('change', function () {
      var currentValue = dataTwo[dataOne.indexOf(fieldOne.value)];
      callback(fieldTwo, currentValue);
    });
  };

  window.onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.className = 'alert-message';
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };
})();
