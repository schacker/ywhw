(function($){
	var $window=$(window);
	
	$.fn.lazyload=function(p1,p2){
    	if(typeof p1=="string"){
			return $.fn.lazyload.methods[p1](this,p2);
		}
		$(this).data("lazyload",{options:$.extend( {}, $.fn.lazyload.defaults,p1)});
		init($(this));
	}
    $.fn.lazyload.methods={
    	options:function(jq){
			return $(jq).data('lazyload').options;
		}
	}
    $.fn.lazyload.defaults = {  
       	threshold: 0,
        failure_limit: 0,
        events: ["scroll"],
        data_attribute: "original",
        skip_invisible: true,
        page:''
	}
    
    function init(me){
    	var settings=me.data('lazyload').options;
    	var $container = (settings.container === undefined||settings.container===$window) ? $window : $(settings.container);
	    for(var i=0,len=settings.events.length;i<len;i++){
	    	$container.bind(settings.events[i], function (event) {
	    		me.data("lazyload",{options:settings});
	    		return update(me);
	        });
	    }
	    
	    me.each(function (i,o) {
        	var self = this,
            	$self = $(self),
//            	width = $self.css('width'),
//            	height = $self.css('height');
            	width = $self.attr('data-width'),
            	height = $self.attr('data-height'),
        		style = 'overflow:visible;';

        	if(parseInt(width)) {
        		style += 'width:' + width + 'px;';
        	} else {
        		width = $self.css('width');
        		if(parseInt(width))
            		style += 'width:' + width + ';';
        	}
        	if(parseInt(height)) {
        		style += 'height:' + height + 'px;';
        	} else {
        		height = $self.css('height');
        		if(parseInt(height))
            		style += 'height:' + height + ';';
        	}
        	
        	$self.wrap("<div class='img-lazy-ct' style='"+ style + "'></div>");
        	$self.css('display','none');
        		
        	$self.bind('error',function(){
        		$self.css('display','none');
        		self.error=true;
            });
        	$self.bind("appear", function () {
        		if (!self.loaded) {
                    self.loaded=true;
                    $self.attr('src',$self.attr('data-' + settings.data_attribute));
                    $self.removeAttr('data-' + settings.data_attribute);
                	$self.bind('load',function(){
		        		$self.fadeIn();
                    });
                }else{
                	if(!self.error)
                		$self.fadeIn();
                }
            })
        });
	    settings.me=me;
	    update(me);
    }
    
    function update(me) {
    	
        var op=me.data('lazyload').options,
        	counter = 0,
        	elements = me;
        elements.each(function () {
        	var $this = $(this);
            if (inviewport($this.parent(),op)) {
                $this.trigger("appear");
                counter = 0;
            }else{
            	$this.trigger('disappear');
            }
        });
    }
    
    //位置计算
    function belowthefold(element, settings) {
        var fold;
        if (settings.container === undefined||settings.container===$window) {
            fold = $window.height() + $window.scrollTop();
        } else {
        	var $container=$(settings.container);
            fold = $container.offset().top + $container.height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    }
    
    function rightoffold(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container===$window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
        	var $container=$(settings.container);
            fold = $container.offset().left + $container.width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    }
    
    function abovethetop(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === $window) {
            fold = $window.scrollTop();
        } else {
            var $container=$(settings.container);
        	fold = $container.offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    }
    
    function leftofbegin(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = setting.container.offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    }
    
    function inviewport(element, settings) {
        return !rightoffold(element, settings) && !leftofbegin(element, settings) && !belowthefold(element, settings) && !abovethetop(element, settings);
    }
    
})(jQuery);