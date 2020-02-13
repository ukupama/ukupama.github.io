(function($){
 
    $.modal = {

        open: function(frame){

            this.background = $(document.createElement('div')).attr({class:'modal-background'});
            this.modalContent = $(document.createElement('div')).addClass('modal-content');

            if(frame)
                this.modalContent.append(frame);

            this.background.append(
                $(document.createElement('div')).addClass('modal-container').append(this.modalContent)
                );

            $(document.body).data('noscroll', 1).append(this.background.css({opacity:0}).animate({opacity:1},300));

        },
        close: function(){

            if($(document.body).data('noscroll')){
                $(document.body).find('.modal-background').animate({opacity:0}, 150, function(){
                    $(this).empty().remove();
                });
            }
        }

    }
 
}(jQuery));