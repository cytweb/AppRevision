var windowWidth = window.screen.width;
var windowHeight = window.screen.height;
$("html").height(windowHeight);
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
	if(window.orientation == 180 || window.orientation == 0) {
		var timer = setTimeout(function() {
			updateBodyLandscope(windowHeight); //竖屏时执行的函数  
            
			clearTimeout(timer);
		}, 100);
	}
	if(window.orientation == 90 || window.orientation == 90) {
		var timer = setTimeout(function() {
			updateBodyLandscope(windowWidth); //横屏时执行的函数  

			clearTimeout(timer);
		}, 100);
	}
}, false)

function updateBodyLandscope(screenType) {
	$("html").height(screenType);
}