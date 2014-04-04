(function() {
  $.fn.tabify = function(options) {
    return this.each(function(i, el) {
      var defaults, hideAllTabs, highlightActiveLink, settings, showCurrentTab;
      defaults = {
        container: $(this),
        tabsItems: $(this).find('.tabs__item')
      };
      settings = $.extend(defaults, options);
      showCurrentTab = function(ev) {
        var href, tab;
        ev.preventDefault();
        href = $(this).attr('href');
        tab = $(href);
        highlightActiveLink(this);
        hideAllTabs();
        return tab.show();
      };
      hideAllTabs = function() {
        return settings.tabsItems.hide();
      };
      highlightActiveLink = function(link) {
        var listItems;
        link = $(link);
        listItems = link.parent().siblings();
        listItems.removeClass('is-active');
        return link.parent().addClass('is-active');
      };
      settings.container.on('click.tabify', '> nav a', showCurrentTab);
      return settings.container.find('nav a:first').trigger('click');
    });
  };

  $(function() {
    return $('.tabs').tabify();
  });

}).call(this);
