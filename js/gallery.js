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
			}).done(createModal);

		});

	});

})