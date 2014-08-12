(function($){
    $.fn.zoomview=function(p1,p2){
    	if(typeof p1=="string"){
			return $.fn.zoomview.methods[p1](this,p2);
		}
		$(this).data("view",{options:$.extend( {}, $.fn.zoomview.defaults,p1)});
		init($(this));
	}
    $.fn.zoomview.methods={
    	options:function(jq){
			return $(jq).data('view').options;
		},
		show:function(jq,p){
			return jq.each(function(){
				return show($(jq));						
			});
		},
		changeUrl:function(jq,p){
			return jq.each(function(){
				return changeUrl($(jq),p);						
			});
		}
	}
	
    $.fn.zoomview.defaults = {
    	width:200,
    	height:200,
    	minScale:1,
    	maxScale:3,
    	curScale:1,
    	curScale:1,
    	ow:200,
    	oh:200,
    	url:'',
    	step:0.2
	}
	
    
	function show(me){
		me.popup('open');
	}
    function init(me){
    	var op=me.data('view').options;
    	
    	me.css({
    		'width':op.width,
    		'height':op.height,
    		'overflow':'hidden'
    	});
    	me.html("<div style='width:100%;height:100%'><img src='"+ op.url +"' style='max-width:"+ op.width +"px;max-height:"+ op.height +"px'/></div>");
    	me.append("<a href='#' data-rel='back' data-theme='a' data-icon='delete' data-iconpos='notext' style='position:absolute;right:5px;top:0px;'></a>");
    	me.append("<div style='position:absolute;bottom:10px;right:5px;' align='center'>"+
    		"<a href='javascript:void(0)' data-icon='plus' data-iconpos='notext' ></a><br/>" +
    		"<a href='javascript:void(0)' data-icon='minus' data-iconpos='notext'></a>" +
    		"</div>");
    	var btns = me.find('a').button();
    	
    	$(btns[2]).bind('click',function(){
    		zoomIn(me);
    	});
    	$(btns[1]).bind('click',function(){
    		zoomOut(me);
    	});
//    	$(me).popup();
    	$(me.children('div')[0]).scrollview();
    	op.img=$(me.find('img')[0]);
    	op.img.bind('load',function(){
    		op.ow=$(this).width();
    		op.oh=$(this).height();
    	});
  	}
  	
    function changeUrl(me,url){
    	var op=me.data('view').options;
    	op.url=url;
    	op.img.attr('src',url);
    	op.img.css({
    		'max-width':op.width,
  			'max-height':op.height
    	});
    	op.curScale=1;
    }
  	function zoomOut(me){
  		var op=me.data('view').options;
  		if(op.curScale >= op.maxScale)
  			return;
  		op.curScale += op.step;
  		op.img.css({
  			'max-width':10000,
  			'max-height':10000
  		});
  		op.img.width(op.ow * op.curScale);
  		op.img.height(op.oh * op.curScale);
  	}	
  	
  	function zoomIn(me){
  		var op=me.data('view').options;
  		if(op.curScale <= op.minScale)
  			return;
  		op.curScale -= op.step;
  		op.img.width(op.ow * op.curScale);
  		op.img.height(op.oh * op.curScale);
  	}
   
})(jQuery);