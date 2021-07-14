$(function(){

	var size = $('.gallery-preview').length;

	var createModal = function(htmlBody){

		let modalHeader = $(document.createElement('div')).addClass('modal-content-header'),
		modalBody = $(document.createElement('div')).addClass('modal-content-body'),
		modalFooter = $(document.createElement('div')).addClass('modal-content-footer'),
		close = $(document.createElement('button')).html($(document.createElement('img')).attr({class:'icon close',src:'/images/svg/x.svg'})),

		prev = $(document.createElement('button')),
		next = $(document.createElement('button'));

		modalBody.html(htmlBody);

		close.click(function(){
			$.modal.close();
		});

		modalHeader.html(close);

		$.modal.open($(document.createElement('div')).html([modalHeader,modalBody,modalFooter]));
	}

	$('.gallery-preview').each(function(index, element){

		$(element).click(function(){

			var filename = $(this).data('target');
			var thumbnail = $(this).data('tmp');
			var extension = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;

			if(extension[0] == 'mp4' || extension[0] == 'm4v'){

				var vidContainer = $(document.createElement('div')).attr({id:'jp_container_1', class:'jp-type-single'});
				vidContainer.append($(document.createElement('div')).attr({id:'jquery_jplayer_2',class:'jp-jplayer'}));
				//vidContainer.append($(document.createElement('div')).addClass('jp-gui').append($(document.createElement('div')).html( $(document.createElement('button')).attr({class:'jp-video-play-icon',role:'button',tabindex:0}).text('play') ).addClass('jp-video-play')));
				vidContainer.append($(document.createElement('div')).addClass('jp-interface').append($(document.createElement('div')).addClass('jp-progress').append($(document.createElement('div')).addClass('jp-seek-bar').html($(document.createElement('div')).addClass('jp-play-bar')))));
				vidContainer.append($(document.createElement('div')).addClass('jp-controls-holder').append($(document.createElement('div')).addClass('jp-controls').html($(document.createElement('button')).attr({class:'jp-play',role:'button',tabindex:0}))));
				vidContainer.append($(document.createElement('div')).addClass('jp-volume-controls').append($(document.createElement('div')).addClass('jp-volume-bar').html($(document.createElement('div')).addClass('jp-volume-bar-value'))));
				//vidContainer.append($(document.createElement('div')).addClass('jp-toggles').html($(document.createElement('button')).attr({class:'jp-full-screen',role:'button',tabindex:0}).text('full screen')));

				createModal(vidContainer);

				$("#jquery_jplayer_2").jPlayer({
					ready: function () {
						$(this).jPlayer("setMedia", {
							title: "Video title",
							m4v: filename,
							poster: thumbnail
						});
					},
					swfPath: "../../dist/jplayer",
					supplied: "webmv, ogv, m4v",
					size: {
						width: "100%",
						height: "auto",
						cssClass: "jp-video-360p"
					},
					useStateClassSkin: true,
					autoBlur: false,
					smoothPlayBar: true,
					keyEnabled: true,
					remainingDuration: true,
					toggleDuration: true
				});

			}else
			if(extension[0] == 'mp3'){

				var vidContainer = $(document.createElement('div')).attr({id:'jp_container_1', class:'jp-type-single'});
				vidContainer.append($(document.createElement('div')).attr({id:'jquery_jplayer_2',class:'jp-jplayer'}));
				vidContainer.append($(document.createElement('div')).addClass('jp-interface').append($(document.createElement('div')).addClass('jp-progress').append($(document.createElement('div')).addClass('jp-seek-bar').html($(document.createElement('div')).addClass('jp-play-bar')))));
				vidContainer.append($(document.createElement('div')).addClass('jp-controls-holder').append($(document.createElement('div')).addClass('jp-controls').html($(document.createElement('button')).attr({class:'jp-play',role:'button',tabindex:0}))));
				vidContainer.append($(document.createElement('div')).addClass('jp-volume-controls').append($(document.createElement('div')).addClass('jp-volume-bar').html($(document.createElement('div')).addClass('jp-volume-bar-value'))));

				createModal(vidContainer);

				$("#jquery_jplayer_2").jPlayer({
					ready: function () {
						$(this).jPlayer("setMedia", {
							title: "Video title",
							mp3: filename
						});
					},
					swfPath: "../../dist/jplayer",
					supplied: "mp3",
					wmode: "window",
					useStateClassSkin: true,
					autoBlur: false,
					smoothPlayBar: true,
					keyEnabled: true,
					remainingDuration: true,
					toggleDuration: true
				});

			}else{

				var loadingAnim = $(document.createElement('div')).attr({class:'lds-dual-ring'});
				$(this).append(loadingAnim);

				$.ajax({
					url: $(this).data('target'),
					cache: false,
					xhr: function(){
						var xhr = new XMLHttpRequest();
						xhr.responseType = 'blob';
						return xhr;
					},
					complete: function(){
						loadingAnim.remove();
					}
				}).done(function(response){
					var fileReader = new FileReader();
					
					fileReader.onloadend = function(){
						if(this.result.match(/^data:image/)){
							createModal($(document.createElement('img')).attr('src', this.result));
						}
					}

					fileReader.readAsDataURL(response);
				});

			}

		});

	});

})