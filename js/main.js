function toPaddedString(val) {
  if(val < 10) { val = "0" + val; }
  return val;
}

function dailymileCB(data) {
  var loading = document.getElementById("loading");
  loading.style.display = "none";
  var container = document.getElementById("container");
  var list = [];
  list.push('<ul id="dailymile">');

  for(var i=0, len=data.entries.length; i<len; i++) {
    if (typeof data.entries[i].workout == "undefined" || typeof data.entries[i].workout.distance == "undefined") { continue; }
    if (data.entries[i].workout && data.entries[i].workout.activity_type == "Running") {
      var date = new Date(data.entries[i].at.replace(/^(\d{4})-(\d{2})-(\d{2}).+$/, "$2/$3/$1")),
        day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear(),
        calendarDate = toPaddedString(day) + "." + toPaddedString(month) + ".";
      var distanceValue = data.entries[i].workout.distance.value,
        distanceUnits = data.entries[i].workout.distance.units,
        distance = distanceValue + " " + distanceUnits;
      var title = data.entries[i].workout.title || "Untitled Workout";
      list.push('<li title="' + title + '">');
      list.push('<h3>' + calendarDate + ' &middot; ' + title + '</h3>');
      var fixedDist = distanceValue.toFixed(1);
      var distStr = fixedDist + " km";
      var barWidth = fixedDist * 10;
      list.push('<p><span style="width: ' + barWidth + 'px"><em>' + distStr + '</em></span></p>');
      // if (data.entries[i].geo) {
      //  var lat = data.entries[i].geo.coordinates[1];
      //  var lon = data.entries[i].geo.coordinates[0];
      //  list.push('<img src="http://maps.google.com/maps/api/staticmap?center=' + lat + ',' + lon + '&amp;zoom=14&amp;size=500x312&amp;maptype=hybrid&amp;markers=color:red|' + lat + ',' + lon + '&amp;sensor=false" alt="" />');
      // }
      list.push('</li>');
    }
  }

  list.push('</ul>');
  container.innerHTML += list.join("");

  var morelink = [];
  morelink.push('<p class="more">');
  morelink.push('<a href="http://www.dailymile.com/people/ChristianF">more</a>');
  morelink.push('</p>');
  container.innerHTML += morelink.join("");
}

function getScript(url) {
  var scripttag = document.createElement("script");
  scripttag.setAttribute("type", "text/javascript");
  scripttag.setAttribute("src", url);
  document.getElementsByTagName("head")[0].appendChild(scripttag);
}

// window.onload = function() {
//
//  var username = "christianf";
//  getScript('http://api.dailymile.com/people/' + username + '/entries.json?callback=dailymileCB');
//
// };
