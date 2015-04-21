$.Zoomable = function (el) {
  this.$el = $(el);
  this.focusBoxSize = [50, 50];
  this.$focusBox = $("<div class='focus-box'></div>");
  this.$focusBox.css('display', 'none');
  this.$zoomedImg = $("<div class='zoomed-image'></div>");
  // this.$focusBox.css('visibility', 'hidden')
  this.$el.append(this.$focusBox);
  this.$el.on("mousemove", function (event) {
    this.showFocusBox(event);
  }.bind(this));
  this.$el.on("mouseleave", function (event) {
    this.removeFocusBox(event);
  }.bind(this));
};

$.Zoomable.prototype.showFocusBox = function (event) {
  var x = event.clientX - 25;
  var y = event.clientY - 25;
  if (x >= 200) {
    x = 200;
  }
  if (y >= 106) {
    y = 106;
  }
  if (x <= 0) {
    x = 0;
  }
  if (y <= 0) {
    y = 0;
  }
  this.$focusBox.css('display', 'inline');
  this.$focusBox.css('top', y + "px");
  this.$focusBox.css('left', x + "px");
  this.showZoom(x,y);
};

$.Zoomable.prototype.removeFocusBox = function (event) {
  this.$focusBox.css('display', 'none');
  // this.$focusBox.css('visibility', 'hidden')
};

$.Zoomable.prototype.showZoom = function (xDiff, yDiff) {
  $('body').append(this.$zoomedImg);
  this.$zoomedImg.css('width', $( window ).height());
  this.$zoomedImg.css('background-image', 'url("http://cdn.wonderfulengineering.com/wp-content/uploads/2014/03/high-resolution-wallpapers-25.jpg")');
  this.$zoomedImg.css('background-position', Math.floor(xDiff/200)*100, Math.floor(yDiff/106)*100);
};

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
