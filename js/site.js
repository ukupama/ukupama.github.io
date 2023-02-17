$(function(){

	//Page animation in
	$(document.body).ready(function(event){
		
		$(document.body).fadeIn(500, function(){
			$(this).removeClass('loading');
		});

	});

	$(document.body).click(function(event){
			
		if($(event.target).is('.modal-background, .modal-container')){
			$.modal.close();
		}
		
	});

	//Preview of gallery images
	$.preview = function(data){

		$.modal.open();

		$.get(data.src, function(response){

			var frame = $.modal.frame({
				header: function(){

					var close = $(document.createElement('a'))
					.attr('href','home#gallery')
					.append($(document.createElement('img')).attr('src','/images/svg/x.svg').css({width:20}));

					close.addClass('button-icon').click(function(){
						$.modal.close();
					});

					return close;
				},
				body: function(){

					var image = $(document.createElement('img')).attr('src', data.src);

					image.css({maxWidth:'100%'});

					return image;
				}
			});
			
			$.modal.content(frame);

		});

	}

	$.popup = function(title, action){

		$(document.body).addClass('body-modal');

		$.get(action, function(response){
			
			var frame = $.modal.frame({
				header: function(){
					return '<h2>'+title+'</h2><a style="position:absolute;float:left;cursor:pointer;" class="btn button-icon left btn-close" type="button" onclick="$.popclose();"><span>X</span></a>';
				},
				body: function(){
					return response;
				}
	
			});

			$.modal.open(frame);
		});
		
	}

	$.popclose = function(){
		$(document.body).removeClass('body-modal');
		$.modal.close();
	}
	
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
				createModal($(document.createElement('img')).attr('src', filename));
			}

		});

	});

})