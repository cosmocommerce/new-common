$(function(){
	$('.solution-video').each(function() {
		var that = $(this);
		var text = that.find('.video-text');
		var btn = that.find('.J_btn_play');
		btn.click(function(e) {
			e.preventDefault();
			text.fadeOut();
			var img = that.find('img');
			var gifImg = $('<img src="'+ btn.attr('href') +'" style="display:none" />');
			img.replaceWith(gifImg);
			gifImg.fadeIn();
			that.append('<img style="position:absolute;right:0;top:0;" src="'+ btn.attr('data-stamp') +'" />');
		});
	});
});