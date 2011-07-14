<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>24 Ways &ndash; 2005/01 | Easy Ajax with Prototype</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js"></script>
<script>

Event.observe(window, "load", function() {
  $("greeting-submit").style.display = "none";
  Event.observe("greeting-name", "keyup", function() {
    new Ajax.Updater("greeting", "greeting.php", {
      method: "get",
      parameters: "greeting-name=" + escape($F("greeting-name"))
    });
  });
});

</script>
</head>

<body>

<form method="get" action="greeting.php" id="greeting-form">
  <div>
    <label for="greeting-name">Enter your name:</label>
    <input id="greeting-name" type="text" name="greeting-name" />
    <input id="greeting-submit" type="submit" value="Greet me!" />
  </div>
  <div id="greeting"></div>
</form>

</body>
</html>
