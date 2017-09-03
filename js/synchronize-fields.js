'use strict';

(function () {
  window.synchronizeFields = function (fieldOne, fieldTwo, callback, dataOne, dataTwo) {
    fieldOne.addEventListener('change', function () {
      var currentValue = dataTwo[dataOne.indexOf(fieldOne.value)];
      callback(fieldTwo, currentValue);
    });
  };
})();

// 'use strict';

// (function () {
//   window.synchronizeFields = function (firstItem, secondItem, callback) {
//     firstItem.addEventListener('change', function (evt) {
//       if (typeof callback === 'function') {
//         var currentValue = evt.target.value;
//         callback(secondItem, currentValue);
//       }
//     });
//   };
// })();
