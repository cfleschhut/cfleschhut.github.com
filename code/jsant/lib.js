// Getting Multiple Scripts to Work on the Same Page
function addLoadListener(fn) {
	if (typeof window.addEventListener != "undefined") {
		window.addEventListener("load", fn, false);
	} else if (typeof document.addEventListener != "undefined") {
		document.addEventListener("load", fn, false);
	} else if (typeof window.attachEvent != "undefined") {
		window.attachEvent("onload", fn);
	} else {
		var oldfn = window.onload;
		if (typeof window.onload != "function") {
			window.onload = fn;
		} else {
			window.onload = function() {
				oldfn();
				fn();
			};
		}
	}
}

/* NUMBERS */

// Rounding a Number to x Decimal Places
function roundTo(base, precision) {
	var m = Math.pow(10, precision);
	var a = Math.round(base * m) / m;
	return a;
}

// Creating and Constraining Random Numbers
function randomBetween(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

// Formatting Currency Values
function formatTo(base, precision) {
	
}

// Converting a String to a Number
function testNumberConversion(input) {
	var a = parseInt(input, 10);
	return isNaN(a) ? input + ' cannot be converted' : input + ' converts to ' + a;
}

// Converting Numbers to Ordinals
function getOrdinal(n) {
	var ord = "th";
	if (n % 10 == 1 && n % 100 != 11) {
		ord = "st";
	} else if(n % 10 == 2 && n % 100 != 12) {
		ord = "nd";
	} else if(n % 10 == 3 && n % 100 != 13) {
		ord = "rd";
	}
	return ord;
}


/* STRINGS */


/* ARRAYS */




/* DATES & TIME */

Date.prototype.getDateString = function(str) {
	var dnames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		dnames_DE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	var mnames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		mnames_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];;
	str = str.replace("%day", dnames[this.getDay()]);
	str = str.replace("%tag", dnames_DE[this.getDay()]);
	str = str.replace("%date", this.getDate());
	str = str.replace("%ordinal", this.getDateOrdinal());
	str = str.replace("%month", mnames[this.getMonth()]);
	str = str.replace("%monat", mnames_DE[this.getMonth()]);
	str = str.replace("%year", this.getFullYear());
	return str;
};
Date.prototype.getDateOrdinal = function() {
	var n = this.getDate();
	var ord = "th";
	if (n % 10 == 1 && n % 100 != 11) {
		ord = "st";
	} else if(n % 10 == 2 && n % 100 != 12) {
		ord = "nd";
	} else if(n % 10 == 3 && n % 100 != 13) {
		ord = "rd";
	}
	return ord;
};
