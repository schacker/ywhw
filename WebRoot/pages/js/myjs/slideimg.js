
(function($){
	$.fn.slideimg=function(p1,p2){
		if(typeof p1=="string"){
			return $.fn.slideimg.methods[p1](this,p2);
		}
		$(this).data("view",{options:$.extend( {}, $.fn.slideimg.defaults,p1)});
		init($(this));
	}
	
	$.fn.slideimg.method={
		
	}
	
	$.fn.slideimg.defaults={
		width:200,
		height:300,
		imgs:[],
		current:1,
		norcolor:'#888',
		curcolor:'#ffcc00'
	}
	
	function init(me){
		var op = me.data('view').options;
		var imgs = op.imgs;
		var len = imgs.length; 
		var oldX,oldY,flag,curmils;
		if(len==0)
			return;
		me.css({
			'width':op.width+'px',
			'height':op.height + 'px',
			'position':'relative'
		});
		me.wrapInner("<div style='height:100%;position:relative;left:0px;width:"+ op.width +"px;overflow:hidden;'></div>");
		op.ctp=$(me.children()[0]);
		op.ctp.wrapInner("<div style='height:100%;position:relative;left:0px;overflow:visible;'></div>");
		op.ct = $(op.ctp.children()[0]);
		
		var sdot='',simg='';
		
		for(var i=0;i<len;i++){
			var linkurl='';
			if(imgs[i].linkUrl)
				linkurl = "linkurl='" + imgs[i].linkUrl + "'";
			if(op.lazy){
				simg += "<img src='"+ op.defaultImg +"' data-original='"+ imgs[i].url + "' style='width:"+ op.width +"px;height:"+ op.height +"px;float:left;' " + linkurl + "/>";
			}else{
				simg += "<img src='"+ imgs[i].url + "' style='width:"+ op.width +"px;height:"+ op.height +"px;float:left;' " + linkurl + "/>";
			}
				
			if(len>1){
				var bg=op.norcolor;
				if(i==0)
					bg=op.curcolor;
				sdot += "<a href='javascript:void(0)' class='slideimg-pager'></a>";
			}
		}
		var ctwidth = len * op.width;
		op.ct.width(ctwidth);
		op.ct.html(simg);
		
		op.ct.find("img[linkurl]").bind('click',function(){
			var linkurl = $(this).attr('linkurl'),
				ind = linkurl.indexOf("?"),
				hash=''; 
			if(ind > 0)	
				hash = linkurl.substring(ind+1);  
			if(hash) {  
				window.localStorage.setItem('hash', hash); 
				linkurl = linkurl.substring(0,ind);
				moveToPage(linkurl);
			} 
		});
		if(len > 1){
			
			op.pg = $("<div class='slideimg-pagerct'></div>")
				.css('left',(op.width-len*10)/2 + 'px')
				.append(sdot)
				.appendTo(me);
			//图片小圆点
			op.pg.find('a').each(function(i){
				if(i==0)
					$(this).css('background-color',op.curcolor);
				else
					$(this).css('background-color',op.norcolor);
			});
		}
		addEvents(me);
	}
	
	function onDragStart(me,e){
		var op=me.data("view").options,
    		x=getX(e),
    		y=getY(e);
		if(op.start)
			return;
		op.old={
    		x:x,
    		y:y
    	}
    	op.start=1;
	}
	
    function onDragStop(me,e){
    	var op=me.data("view").options;
    	
    	if(op.start){
    		op.start = 0;
    		if(op.doing)
    			return;
			var x=getX(e),
				y=getY(e),
				ax=Math.abs(x-op.old.x),
				ay=Math.abs(y-op.old.y);
			
			if(ax<2 || ay/ax>2){
				return true;
			}
			
			e.stopPropagation();
			e.preventDefault();
			var o = op.ct,
				left = o.offset().left;
				dx = x-op.old.x,
				pw = me.width(),
				cw = o.width(),
				dis = 0;
			
			if(dx>0){
				if(op.current==1 || left==0)
					return;
				if(left+pw>0)
					dis=0;
				else
					dis=left+pw;
			}else{
				if(op.current==op.imgs.length || left+cw == pw)
					return;
				if(left+cw < pw)
					dis=pw-cw;
				else
					dis=left-pw;
			}
    		op.doing = 1;
			o.animate({'left':dis},function(){changedot(me)});
		}
    }
	
	function addEvents(o){
    	if(!o)
    		return;
    	o.bind({
    		'touchstart':function(e){return onDragStart($(this),e)},
			'touchmove':function(e){return onDragStop($(this),e)}
  		});
	}
	
	function getX(e){
    	var t = e.originalEvent.targetTouches[0];
    	if(t)
    		return t.pageX;
    	return 0;
    }
	function getY(e){
    	var t = e.originalEvent.targetTouches[0];
    	if(t)
    		return t.pageY;
    	return 0;
    }
	
	function changedot(me){
		var op = me.data('view').options;
		if(op){
    		op.doing = 0;
			var left = parseInt(op.ct.css('left')),
				ind;
			if(!left)
				left = 0;
			ind = Math.abs(Math.floor((left+2)/op.width));
			op.current=ind+1;
			op.pg.find('a').each(function(i){
				if(i==ind)
					$(this).css('background-color',op.curcolor);
				else
					$(this).css('background-color',op.norcolor);
			});
		}
	}
})(jQuery);