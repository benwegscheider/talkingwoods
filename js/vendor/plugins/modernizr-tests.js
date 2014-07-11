Modernizr.addTest('mobile', function(){
	return navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|Fennec|GoBrowser|IEMobile|Maemo|MIB|Minimo|NetFront|Opera Mini|Opera Mobi|SEMC-Browser|SymbianOS|Windows Phone|ZuneWP7)/) != null
});

Modernizr.addTest('ipad', function(){
	return navigator.userAgent.match(/(iPad)/) != null
});

Modernizr.addTest('touchprefered', function(){
	return Modernizr.ipad;
});

Modernizr.addTest('firefox', function(){
	return window.navigator.userAgent.toLocaleLowerCase().indexOf("firefox") >= 0;
});

Modernizr.addTest('snapsscrollonbrowserback', function(){
	return Modernizr.firefox;
});

Modernizr.addTest('flashcss3transformbug', function(){
	return Modernizr.firefox;
});

(function(Modernizr) {

    function getIEVersion() {
        var rv = -1; // Return value assumes failure.
        if (window.navigator.appName == 'Microsoft Internet Explorer') {
            var ua = window.navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }

        return rv;
    }

    Modernizr.addTest('ie8', function() {
        return getIEVersion() === 8.0;
    });

})(Modernizr);
