(function () {

})();

var rangeViewContainer = document.querySelector('#tranform-label-js');
var rangeView = document.querySelector('#range-js');
var beforeImg = document.querySelector('#before-js');
var rangeControl = document.querySelector('#transform-js');
var beforeButton = document.querySelector('#example__control--before-js');
var afterButton = document.querySelector('#example__control--after-js');
var point = document.querySelector('#example__point-js');

if (rangeViewContainer && rangeView && beforeImg) {
  var calculateCurrentWidth = function (offsetX) {
    var padding = rangeView.offsetLeft - rangeViewContainer.offsetLeft;
    var fullWidthRange = rangeViewContainer.offsetWidth - 2 * padding;
    var rangeViewX = rangeView.getBoundingClientRect().left;

    if (rangeViewX + fullWidthRange >= offsetX
      && offsetX > rangeViewX) {
        var currentWidth = Math.round((offsetX - rangeViewX)
          / fullWidthRange * 100);
        changeWidthBeforeImg(currentWidth);
    }
  };

  var changeWidthBeforeImg = function (value) {
    beforeImg.style.width = value + '%';
    rangeView.style.width = value + '%';
    rangeControl.value = value;
  };

  var onRangeInputChange = function (evt) {
    changeWidthBeforeImg(rangeControl.value);
  };

  var onRangeClick = function (moudedownEvt) {
    moudedownEvt.preventDefault();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      calculateCurrentWidth(moveEvt.clientX);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      calculateCurrentWidth(upEvt.clientX);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  var onRangeTouch = function () {
    var onTouchMove = function (moveEvt) {
      calculateCurrentWidth(moveEvt.changedTouches[0].clientX);
    };

    var onTouchEnd = function (endEvt) {
      endEvt.preventDefault();

      calculateCurrentWidth(endEvt.changedTouches[0].clientX);

      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  var onRangeFocus = function () {
    rangeViewContainer.classList.add('example__transform--focus');

    rangeControl.removeEventListener('focus', onRangeFocus);
    rangeControl.addEventListener('blur', onRangeBlur);
  };

  var onRangeBlur = function () {
    if (rangeViewContainer.classList.contains('example__transform--focus')) {
      rangeViewContainer.classList.remove('example__transform--focus');
    }

    rangeControl.removeEventListener('blur', onRangeBlur);
    rangeControl.addEventListener('focus', onRangeFocus);
  };

  var init = function () {
    rangeControl.addEventListener('change', onRangeInputChange);
    rangeControl.addEventListener('focus', onRangeFocus);

    rangeViewContainer.addEventListener('mousedown', onRangeClick);
    rangeViewContainer.addEventListener('touchstart', onRangeTouch);

    beforeButton.addEventListener('click', function () {
      changeWidthBeforeImg(0);
    });

    afterButton.addEventListener('click', function () {
      changeWidthBeforeImg(100);
    });
  };

  init();


}
