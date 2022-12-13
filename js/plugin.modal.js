/*
 * Name: Modal plugin
 * Project: Modular
 * version: 1.0
 * email: manyandamariano@hotmail.com
 */

(function($){

    $.modal = {
        
        frame: function(blade){

            var elements = [], modalHeader = $(document.createElement('div')).addClass('modal-content-header'),
            modalBody = $(document.createElement('div')).addClass('modal-content-body'),
            modalFooter = $(document.createElement('div')).addClass('modal-content-footer');

            if(blade.header instanceof Function) elements.push(modalHeader.html(blade.header()));
            if(blade.body instanceof Function) elements.push(modalBody.html(blade.body()));
            if(blade.footer instanceof Function) elements.push(modalFooter.html(blade.footer()));
            
            return elements;
        },

        open: function(frame, time = 300){

            if(!$(document.body).find('.modal-background').length){

                this._background = $(document.createElement('div')).addClass('modal-background');

                this._container = $(document.createElement('div')).addClass('modal-container');

                this._content = $(document.createElement('div')).addClass('modal-content');

                if(frame){
                    this._content.html(frame);
                }

                this._background.append(this._container.append(this._content));
            
                $(document.body).data('noscroll', 1)
                .append(this._background.css({opacity:0})
                .animate({opacity:1}, time));

            }

        },

        content : function(html_content){

            if(this._content.length){
                this._content.html(html_content);
            }

        },

        loading : function(html_text){

            if(this._content.length){

                this._waiting = $(document.createElement('div')).addClass('modal-waiting')
                .html($(document.createElement('div')).addClass('modal-loading-icon'));
                
                this._content.append(this._waiting);

            }
            
        },

        complete : function(time = 150){

            if(this._waiting.length){
                
                this._waiting.fadeOut(time, function(){
                    $(this).remove();
                })

            }

        },

        close : function(time = 150){

            if($(document.body).data('noscroll')){
                
                if(this._background.length){

                    this._background.animate({opacity:0}, time, function(){
                        $(this).remove();
                    })

                }
                
            }

        }

    }
 
}(jQuery));