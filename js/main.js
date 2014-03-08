var dm = {
  init: function(user) {
    this.username = user;
    this.url = 'http://api.dailymile.com/people/' + this.username + '/entries.json';
    this.container = $('#container');

    this.getEntries();
  },

  getEntries: function() {
    $.ajax({
      url: this.url,
      dataType: 'jsonp',
      success: function(response) {
        var data = response.entries;
        dm.insertEntries(data);
      },
      error: function() {}
    });
  },

  removeLoading: function() {
    var spinner = $('#loading');
    spinner.remove();
  },

  toPaddedString: function(val) {
    if(val < 10) {
      val = "0" + val;
    }
    return val;
  },

  insertEntries: function(entries) {
    this.removeLoading();

    var list = [];
    list.push('<ul id="dailymile">');

    $(entries).each(function(index, entry) {
      var workout = entry.workout;
      var date = new Date(entry.at);

      if (workout && workout.activity_type == 'Running' && workout.distance) {
        var title = workout.title;
        var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear(),
          date_str = dm.toPaddedString(day) + '.' + dm.toPaddedString(month) + '.' + year;

        var dist = workout.distance,
          distValue = dist.value,
          distUnits = (dist.units == 'kilometers' ? 'km' : 'miles'),
          dist_str = distValue.toFixed(1) + ' ' + distUnits;
        var distFull = 50,
          distPercent = (distValue / distFull) * 100;

        list.push('<li>');
        list.push('<h3>' + date_str + ' &middot; ' + title + '</h3>');
        list.push('<p>');
        list.push('<span style="width: ' + distPercent + '%"></span>');
        list.push('<em>' + dist_str + '</em>');
        list.push('</p>');
        list.push('</li>');
      }
    });

    list.push('</ul>');
    list = list.join('');
    this.container.append(list);
    this.insertMoreLink(this.username);
  },

  insertMoreLink: function(username) {
    this.container.append(
      $('<p class="more"><a href="http://www.dailymile.com/people/' + username + '">more</a></p>')
    );
  }
};

$(document).ready(function() {
  dm.init('ChristianF');
});
