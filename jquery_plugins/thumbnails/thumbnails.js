$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$gutterImages = $('div.gutter-images');
  this.$activeImg = this.$gutterImages.children().eq(0);
  this.activate(this.$activeImg);
  this.gutterIdx = 0;
  this.$images = this.$gutterImages.children();
  this.fillGutterImages();
  this.bindEvents();
};

$.Thumbnails.prototype.bindEvents = function() {
  this.$gutterImages.on('click', 'img', function (event) {
    this.$activeImg = $(event.currentTarget);
    this.activate(this.$activeImg);
  }.bind(this));
  this.$gutterImages.on('mouseenter', 'img', function (event) {
    this.activate($(event.currentTarget));
  }.bind(this));
  this.$gutterImages.on('mouseleave', 'img', function (event) {
    this.activate(this.$activeImg);
  }.bind(this));
  this.$gutter = $('div.gutter');
  this.$gutter.on('click', 'a', function(event) {
    this.rotateCallback(event);
  }.bind(this));
};

$.Thumbnails.prototype.rotateCallback = function (event) {
  var newIdx;
  if ($(event.currentTarget).hasClass("left")) {
    newIdx = this.gutterIdx - 1;
  } else {
    newIdx = this.gutterIdx + 1;
  }
  if (newIdx < 0 || newIdx >= (this.$images.length - 4)) {
    return;
  }
  this.gutterIdx = newIdx;
  this.fillGutterImages();
};


$.Thumbnails.prototype.activate = function($img) {
  $('div.active').html("");
  $img.clone().appendTo('div.active');
};

$.Thumbnails.prototype.fillGutterImages = function () {
  $('div.gutter-images').html("");
  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    this.$gutterImages.append(this.$images[i]);
  }
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
