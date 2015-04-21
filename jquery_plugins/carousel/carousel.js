$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.transitioning = false;
  this.numPhotos = $('div.items').children().length; // update when photos are added

  // var $firstChild = $('div.items img:first-child');

  var $firstChild = $('div.items').children().eq(this.activeIdx);
  $firstChild.addClass('active');
  this.$el.on("click", "a.slide-left", this.slideLeft.bind(this));
  this.$el.on("click", "a.slide-right", this.slideRight.bind(this));
};

$.Carousel.prototype.slideLeft = function () {
  this.slide(1);
};

$.Carousel.prototype.slideRight = function () {
  this.slide(-1);
};

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) {
    return;
  }
  this.transitioning = true;
  var $currImg = $('div.items').children().eq(this.activeIdx)
  if (dir === 1) {
    $currImg.addClass('left');
  } else {
    $currImg.addClass('right');
  }

  var newIdx = this.activeIdx + dir;
  if (newIdx >= this.numPhotos) {
    this.activeIdx = (newIdx % this.numPhotos);
  } else if (newIdx < 0) {
    this.activeIdx = (this.numPhotos + newIdx);
  } else {
    this.activeIdx = newIdx;
  }
  var $newImg = $('div.items').children().eq(this.activeIdx);
  if (dir === 1) {
    $newImg.addClass('active right');
  } else {
    $newImg.addClass('active left');
  }
  setTimeout(function () {
    $newImg.removeClass('right left');
  }, 0);
  $currImg.one('transitionend', function () {
    this.transitioning = false;
    $currImg.removeClass('active left right');
    }.bind(this)
  );
};


$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
