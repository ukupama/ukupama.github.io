$(function(){

	var size = $('.gallery-preview').length;

	var createModal = function(data){

		var fileReader = new FileReader(),

		modalHeader = $(document.createElement('div')).addClass('modal-content-header'),
		modalBody = $(document.createElement('div')).addClass('modal-content-body'),
		modalFooter = $(document.createElement('div')).addClass('modal-content-footer'),
		close = $(document.createElement('button')).html($(document.createElement('img')).attr({class:'icon close',src:'/images/svg/x.svg'})),

		prev = $(document.createElement('button')),
		next = $(document.createElement('button'));

		fileReader.onloadend = function(){
			if(this.result.match(/^data:image/)){
				modalBody.html($(document.createElement('img')).attr('src', this.result));
			}else
			if(this.result.match(/^data:video/)){
				var video = $(document.createElement('video'));
				video.click(function(e){
					if(this.paused){
						this.play();
					}else{
						this.pause();
					}
					
				});
				modalBody.html(video.attr({'src': this.result,'controls':true}));
			}
		}

		fileReader.readAsDataURL(data);

		close.click(function(){
			$.modal.close();
		});

		modalHeader.html(close);

		$.modal.open(// Open modal with content loaded
			$(document.createElement('div')).html([modalHeader,modalBody,modalFooter])
			);
	}

	$('.gallery-preview').each(function(index, element){

		$(element).click(function(){

			$.ajax({
				url: $(this).data('target'),
				cache: false,
				xhr: function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType = 'blob';
					return xhr;
				}
			}).done(createModal);

		});

		/*$(element).modal('click', function(e){

			var _index = $(e).index('.gallery-preview');

			$.ajax({
				url: $(e).data('target'),
				cache: false,
				xhr: function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType = 'blob';
					return xhr;
				}
			}).done(function(data){

				var fileReader = new FileReader();
				
				fileReader.onloadend = function() {

					e.open({
						header: function(){

							var close = $(document.createElement('button')).text('Close');

							close.click(function(){
								e.close();
							});

							return close;
						},
						body: function(){
							
							var imageContainer = $(document.createElement('div')),
							image = $(document.createElement('img')).attr('src',fileReader.result),
							prev = $(document.createElement('button')),
							next = $(document.createElement('button'));

							prev.text('<<');
							next.text('>>');

							next.click(function(){

								console.log($('.gallery-preview').eq(index).data('target'));
								/*$.ajax({
									url: $(e).next().data('target'),
									cache: false,
									xhr: function(){
										var xhr = new XMLHttpRequest();
										xhr.responseType = 'blob';
										return xhr;
									}
								}).done(function(data){

									var fileReaderLoad = new FileReader();

									fileReaderLoad.onloadend = function(res){
										console.log(res);
									}

									fileReaderLoad.readAsDataURL(data);

								});*//*
							});

							return imageContainer.append(image).append(prev).append(next);
						}
					});

                }

                fileReader.readAsDataURL(data);
			});
			
		});*/

	});

})