(function($){
    $.fn.scrollview=function(p1,p2){
    	if(typeof p1=="string"){
			return $.fn.scrollview.methods[p1](this,p2);
		}
		$(this).data("view",{options:$.extend( {}, $.fn.scrollview.defaults,p1)});
		init($(this));
	}
    $.fn.scrollview.methods={
    	options:function(jq){
			return $(jq).data('view').options;
		},
		scrollTo:function(jq,p){
			return jq.each(function(){
				return scrollTo(jq,p.x,p.y,1);						
			});
		},
		getPosition:function(jq){
			var op=$(jq).children()[0];
			return {x:-parseInt($(op).css('left')),y:-parseInt($(op).css('top'))};
		}
	}
    $.fn.scrollview.defaults = {  
       	direction:         null,  // "x", "y", or null for both.
	
		scrollDuration:     1500,  // Duration of the scrolling animation in msecs.
		overshootDuration:  250,   // Duration of the overshoot animation in msecs.
		snapbackDuration:   500,   // Duration of the snapback animation in msecs.
		moveThreshold:      10,   // User must move this many pixels in any direction to trigger a scroll.
		moveIntervalThreshold:   150,   // Time between mousemoves must not exceed this threshold.
		showScrollBars:    	true,
		triggerInterval:	1000,	//触发事件最小间隔
		dis:{x:0,y:0,t:1}
	}
    
    function init(me){
    	var op=me.data('view').options;
    	me.addClass('scrollview');
    	var chds = me.children();
    	//if(chds.length>1)
    		me.wrapInner("<div class='view'></div>");
    	//else
    	//	me.children().addClass('view');
        	op.innerct=me.children();
        	addEvents(me);
  		}
        
    function scrollTo(me,x,y,ani){
    	
    	var op=me.data("view").options,
			ict=op.innerct,
			flag=0;
    	
    	var ow=ict.outerWidth(),
    		cw=me.outerWidth(),
    		oh=ict.outerHeight(),
    		ch=me.outerHeight();
    	
    	if(!op.direction || op.direction==='x'){
    		if(x>=ow-cw){
    			x=ow-cw;
    			flag=1;
    		}
    		if(x<=0){
    			x=0;
    			flag=2;
    		}
    	}
    	if(!op.direction || op.direction==='y'){
    		if(y>=oh-ch){
    			y=oh-ch;
    			flag=3;
    		}
    		if(y<=0){
    			y=0;
    			flag=4;
    		}
    	}
    		
    	var du=0;
    	if(ani)
    		du=op.scrollDuration;
    	if(op.direction==='x'){
    		if(du){
    			ict.animate({'left':-x},du,function(){stopScroll(me,flag)});
    		}else{
    			ict.css('left',-x);
    			if(x==0)
    				onLeftBorder(me);
    			if(x==ow-cw)
    				onRightBorder(me);
    		}
    	}else if(op.direction==='y'){
    		if(du){
    			ict.animate({'top':-y},du);
    		}else{
    			ict.css('top',-y);
    		}
    	}else{
    		ict.css({'left':-x,'top':-y});
    	}
	}
    
    function onDragStart(me,e){
    	var op=me.data("view").options;
    	op.innerct.stop();
    	var x=getX(e),
    		y=getY(e),
    		t=new Date().getTime();
    	
    	op.old={
    		x:x,
    		y:y,
    		t:t
    	}
    	
    	op.dis={
    		x:0,
    		y:0,
    		t:1
    	}
    	op.start=1;
    }
    
    function onDragMove(me,e){
    	var op=me.data("view").options;
    	if(op.start){
    		var nx=getX(e),
    			ny=getY(e),
    			dx=nx-op.old.x,
    			dy=ny-op.old.y,
    			ax=Math.abs(dx),
    			ay=Math.abs(dy),
    			t=new Date().getTime();
    		
    		if(((op.direction==='x' && (ax<5 || ay/ax>10)) || (op.direction=='y' && (ay<5 || ax/ay>10)))){
				return true;
			}
			
			e.stopPropagation();
    		e.preventDefault();

    		var vx=0,vy=0,
    			left = parseInt(op.innerct.css('left')),
    			top = parseInt(op.innerct.css('top'));
    		
    		scrollTo(me,-(left+dx),-(top+dy),0);
    		
    		op.dis={
    			x:dx,
    			y:dy,
    			t:t-op.old.t
    		}
    		op.old={
    			x:nx,
    			y:ny,
    			t:t
    		}
    	}
    }
    
    function onDragStop(me,e){
    	var op=me.data("view").options;
    	if(op.start){
    		op.start=0;
    		var t=new Date().getTime();
    		if(op.dis.t<op.moveIntervalThreshold){//加速滑动
    			var x=getX(e),
    				y=getY(e),
    				ax=Math.abs(op.dis.x),
    				ay=Math.abs(op.dis.y),
    				vx=0,
    				vy=0;
    			
    			if((op.direction==='x' && (ax<op.moveThreshold || ay/ax>2)) || (op.direction=='y' && (ay<op.moveThreshold || ax/ay>2))){
    				return true;
    			}
    			
    			e.stopPropagation();
    			e.preventDefault();
    			//横向速度
    			if(op.direction==='x' && ax>op.moveThreshold){
    				vx = op.dis.x*300/op.dis.t;  //像素/秒
    			}
    			//纵向速度
    			if(op.direction==='y' && ay>op.moveThreshold){
    				vy = op.dis.y*300/op.dis.t;  //像素/秒
    			}
    			scroll(me,vx,vy);
    		}
    	}
    }
    
    function scroll(me,vx,vy){
    	var op=me.data("view").options,
    		t=op.scrollDuration/1000,
    		sx=vx*t/2,
    		sy=vy*t/2,
    		dsx=0,
    		dsy=0,
    		ict=op.innerct;
    	
    	if((op.direction==='x' && vx===0) || (op.direction==='y' && vy===0) || vx===0 && vy===0)
    		return;
    	
    	if(vx!=0){
    		dsx=parseInt(ict.css('left'))+sx;
			if(vx>0 && dsx>0){  //向右
    			dsx=0;
    		}
    	}
    		
    	if(vy!=0){
    		dsy=parseInt(ict.css('top'))+sy;
    		if(vy>0 && dsy>0){  //向下
    			dsy=0;
    		}
    		dsy=Math.abs(dsy);
    	}
    	
		var maxw = ict.width()-me.width(),
			maxh = ict.height()-me.height();
		if(maxw>0 && -dsx > maxw){
			dsx=-maxw;
		}
		if(maxh>0 && -dsy > maxh)
			dsy=-maxh;
    	scrollTo(me,-dsx,-dsy,1);
    }
    
    function stopScroll(me,flag,e){
    	var op=me.data("view").options;
    	if(flag===1){
    		onRightBorder(me);
    	}
    	else if(flag===2){
    		onLeftBorder(me);
    	}
    	me.trigger('scrollstop');
    }
    
    function onRightBorder(me,e){
    	var op=me.data('view').options,
    		nt = new Date().getTime();
    	if(op.tt){
    		if(nt - op.tt < op.triggerInterval)
    			return;
    	}
    	op.tt = nt;
    	console.log('rb');
    	me.trigger('torightborder');
    }
    
    function onLeftBorder(me,e){
    	var op=me.data('view').options,
    		nt = new Date().getTime();
    	if(op.tt){
    		if(nt - op.tt < op.triggerInterval)
    			return;
    	}
    	op.tt = nt;
    	me.trigger('toleftborder');
    }
    
    function addEvents(o){
    	if(!o)
    		return;
    	o.bind({
    		'mousedown':function(e){return onDragStart($(this),e)},
			'mousemove':function(e){return onDragMove($(this),e)},
			'mouseup':function(e){return onDragStop($(this),e)}
		});
    }
        
    function getX(e){
    	return e.clientX;
    	
    	var t = e.originalEvent.targetTouches[0];
    	if(t)
    		return t.pageX;
    	return 0;
    }
    function getY(e){
    	return e.clientY;
    	var t = e.originalEvent.targetTouches[0];
    	if(t)
    		return t.pageY;
    	return 0;
    }
})(jQuery);