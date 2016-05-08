//RT
function $(str) {
	return document.querySelector(str);
}
//RT
function $$(str) {
	return document.querySelectorAll(str);
}
//nav trigger
$(".nav_trigger").addEventListener("click", function(e) {
	$(".global").className = "global nav--on";
}, false);
$(".nav_close").addEventListener("click", function(e) {
	$(".global").className = "global";
}, false);
//nav--hide ?  scroll up  : scroll down;
var nav = {};
nav.before_scroll = document.body.scrollTop;
window.addEventListener("scroll", function() {
	nav.after_scroll = document.body.scrollTop;
	nav.scroll_delta = nav.after_scroll - nav.before_scroll;
	if (nav.scroll_delta > 0) {
		$(".global").className = "global nav--hide";
	} else {
		$(".global").className = "global";
	}
	nav.before_scroll = nav.after_scroll;
}, false);
