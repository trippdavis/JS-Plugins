$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data('content-tabs'));
  this.$activeTab = this.$contentTabs.find('.active');
  this.$el.on('click', 'a', this.clickTab.bind(this));

};

$.Tabs.prototype.clickTab = function(event) {
  event.preventDefault();
  var $nextLink = $(event.currentTarget);
  var $activeLink = $('a.active');
  $activeLink.removeClass('active');
  // $('div.tab-pane').removeClass('active');
  this.$activeTab.removeClass('active');
  this.$activeTab.addClass('transitioning');
  $nextLink.addClass('active');
  this.$activeTab.one('transitionend', (function () {
    this.$activeTab.removeClass('transitioning');
    var $nextTab = this.$contentTabs.find($nextLink.attr('href'));
    $nextTab.addClass('active transitioning');
    setTimeout(function() {$nextTab.removeClass('transitioning');}, 0);
    this.$activeTab = $nextTab;
  }).bind(this));
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
