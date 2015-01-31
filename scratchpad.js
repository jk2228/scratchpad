jQuery(document).ready(function($) {
	$(document).mousemove(function(e){
		$('#fishy').css({left:e.pageX, top:e.pageY});
	});
});
