function disappear(element, step) {
	step = (typeof step != "undefined") ? step : 100;
	if (timeoutID) {
		clearTimeout(timeoutID);
	}
	element.style.opacity = step/100;
	// console.log(step);
	if (step <= 0) { return; }
	var newstep = step - 5;
	var timeoutID = setTimeout(function() {
		disappear(element, newstep);
	}, 40);
}

function fadeUp(element, red, green, blue) {
	// console.log(red, green, blue);
	// console.log(element.fade);
	if (element.fade) {
		clearTimeout(element.fade);
	}
	element.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
	if (red == 255 && green == 255 && blue == 255) {
		return;
	}
	var newred = red + Math.ceil((255 - red)/10);
	var newgreen = green + Math.ceil((255 - green)/10);
	var newblue = blue + Math.ceil((255 - blue)/10);
	var repeat = function() {
		fadeUp(element, newred, newgreen, newblue);
	};
	element.fade = setTimeout(repeat, 40);
}


function getHTTPObject() {
	var xhr = false;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xhr = false;
			}
		}
	}
	return xhr;
}

function grabFile(file) {
	var request = getHTTPObject();
	if (request) {
		request.onreadystatechange = function() {
			displayResponse(request);
		};
		request.open("GET", file, true);
		request.send(null);
	}
}

function displayResponse(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			alert(request.responseText);
		}
	}
}
