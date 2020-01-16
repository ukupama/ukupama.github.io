(function($){
 
    $.fn.modal = function(){

    	this.background = $(document.createElement('div')).attr({class:'modal-background'});
    	this.container = $(document.createElement('div')).attr({class:'modal-container'});
    	$(document.body).append(this.background);
    }
 
}(jQuery));