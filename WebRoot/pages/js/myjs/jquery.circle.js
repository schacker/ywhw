function circleimg(config){
	var clickEvent='click';
	var me = this;
	function init(config){
		var ct = $(config.ct),
			imgs = config.imgs,
			rimg;
		ct.empty();
		ct.append("<div class='circleimg-back'></div>" +
				"<div class='circleimg-front'></div>");
		
		var ctfront = $(ct.find('.circleimg-front')[0]),
			ctback = $(ct.find('.circleimg-back')[0]);
			
		var len = imgs.length;
		var n = 5/len - 1;
		for(var i = 0; i < n; i++)
			for(var j = 0; j < len; j++)
				imgs.push(imgs[j]);
		len = imgs.length;	
		for(var i=0;i<len;i++){
			switch(i){
			case len - 1:
				ctfront.prepend($("<div class='box left' data-id='" + imgs[i].companyId + "'><img class='adImg' src='" + imgs[i].adImg + "'/><img class='iconImg' src='" + imgs[i].iconImg + "'/></div>"));
				break;
			case 0:
				ctfront.append($("<div class='box center' data-id='" + imgs[i].companyId + "'><img class='adImg' src='" + imgs[i].adImg + "'/><img class='iconImg' src='" + imgs[i].iconImg + "'/></div>"));
				break;
			case 1:	
				ctfront.append($("<div class='box right' data-id='" + imgs[i].companyId + "'><img class='adImg' src='" + imgs[i].adImg + "'/><img class='iconImg' src='" + imgs[i].iconImg + "'/></div>"));
				break;
			default:
				ctfront.append($("<div class='box' data-id='" + imgs[i].companyId + "'><img class='adImg' src='" + imgs[i].adImg + "'/><img class='iconImg' src='" + imgs[i].iconImg + "'/></div>"));
			}
		}
		ct.find('.box').bind('click', function() {
			var companyId = $(this).attr('data-id');
			if(companyId) {
				localStorage.setItem('companyId', companyId);
				$PageHandler.moveToPage('counterDetail.html');
			}
		});
		var limg;
		for(var i=0;i<len;i++){
			switch(i){
			case 3:
				ctback.prepend($("<img src='" + imgs[i].adImg + "' class='left_hide'/>"));
				break;
			case 2:
				ctback.prepend($("<img src='" + imgs[i].adImg + "' class='left_show'/>"));
				break;
			case 1:	
				ctback.prepend($("<img src='" + imgs[i].adImg + "' class='right_show'/>"));
				break;
			case 0:	
				ctback.prepend($("<img src='" + imgs[i].adImg + "' class='right_hide'/>"));
				break;
			default:
				if(limg)
					limg = $("<img src='" + imgs[i].adImg + "'/>").insertBefore(limg);
				else
					limg = $("<img src='" + imgs[i].adImg + "'/>").appendTo(ctback);
			}
		}
		
		// 绑定事件
		ct.bind('touchstart', function(event) {
			me.touch_start(event.originalEvent, this);
		});
		
		ct.bind('touchmove', function(event) {
			me.touch_move(event.originalEvent, this);
		});
		
		ct.bind('touchend', function(event) {
			me.touch_end(event.originalEvent, this);
		});
	}
	
	init(config);
}

circleimg.prototype.touch_start = function(e, ct) {
	var x = e.touches[0].clientX;
	var y = e.touches[0].clientY;
	$(ct).attr('data-x-old', x);
	$(ct).attr('data-y-old', y);
}

circleimg.prototype.touch_move = function(e, ct) {
	e.preventDefault();
	if($(ct).attr('data-x-old')) {
		var x = e.touches[0].clientX;
		var y = e.touches[0].clientY;
		$(ct).attr('data-x-new', x);
		$(ct).attr('data-y-new', y);
	}
}

circleimg.prototype.touch_end = function(e, ct) {
	if($(ct).attr('data-x-old') && $(ct).attr('data-x-new')) {
		var x_old = $(ct).attr('data-x-old');
		var y_old = $(ct).attr('data-y-old');
		var x_new = $(ct).attr('data-x-new');
		var y_new = $(ct).attr('data-y-new');
		if(Math.abs((x_new - x_old)/(y_new - y_old)) >= 2) {
			var w = $(ct).width() / 5;
			if(x_new - x_old > w) {
				this.prev($(ct));
			} else if(x_old - x_new > w) {
				this.next($(ct));
			}
		}
		$(ct).removeAttr('data-x-old');
		$(ct).removeAttr('data-y-old');
		$(ct).removeAttr('data-x-new');
		$(ct).removeAttr('data-y-new');
	}
}

circleimg.prototype.prev = function(ct) {
	var ctfront = $(ct.find('.circleimg-front')[0]),
		ctback = $(ct.find('.circleimg-back')[0]),
		frontChd = ctfront.children(),
		backChd = ctback.children(),
		limg = $(frontChd[0]),
		cimg = $(frontChd[1]),
		rimg = $(frontChd[2]),
		limg_new = $(frontChd[frontChd.length-1]);
	ctfront.animate({left:ct.width() + 'px'},500,
		function(){
			// left
			limg.removeClass('left');
			limg.addClass('center');
			// center
			cimg.removeClass('center');
			cimg.addClass('right');
			// right
			rimg.removeClass('right');
			// new
			ctfront.remove(limg_new);
			limg_new.addClass('left');
			ctfront.prepend(limg_new);
			// ctfront
			ctfront.css('left',0);
		}
	);
	var width = ct.width() / 2;
	ctback.animate({left:-width+'px'},500,
		function(){
			// left_hide
			ctback.remove($(backChd[0]));
			$(backChd[0]).removeClass('left_hide');
			ctback.append($(backChd[0]));
			// left_show
			$(backChd[1]).removeClass('left_show');
			$(backChd[1]).addClass('left_hide');
			// right_show
			$(backChd[2]).removeClass('right_show');
			$(backChd[2]).addClass('left_show');
			// right_hide
			$(backChd[3]).removeClass('right_hide');
			$(backChd[3]).addClass('right_show');
			// right_hide_new
			$(backChd[4]).addClass('right_hide');
			// ctback
			ctback.css('left','0px');
		}
	);
}

circleimg.prototype.next = function(ct) {
	var ctfront = $(ct.find('.circleimg-front')[0]),
		ctback = $(ct.find('.circleimg-back')[0]),
		frontChd = ctfront.children(),
		backChd = ctback.children(),
		limg = $(frontChd[0]),
		cimg = $(frontChd[1]),
		rimg = $(frontChd[2]),
		rimg_new = $(frontChd[3]),
		blimg = $(backChd[0]),
		brimg = $(backChd[backChd.length-1]); 
	ctfront.animate({left:-ct.width() + 'px'},500,
		function(){
			// left
			ctfront.remove(limg);
			limg.removeClass('left');
			limg.appendTo(ctfront);
			// center
			cimg.removeClass('center');
			cimg.addClass('left');
			// right
			rimg.removeClass('right');
			rimg.addClass('center');
			// new
			rimg_new.addClass('right');
			// ctfront
			ctfront.css('left',0);
		}
	);
	var width = ct.width() / 2;
	ctback.animate({left:width+'px'},500,
		function(){
			// left_hide
			$(backChd[0]).removeClass('left_hide');
			$(backChd[0]).addClass('left_show');
			// left_show
			$(backChd[1]).removeClass('left_show');
			$(backChd[1]).addClass('right_show');
			// right_show
			$(backChd[2]).removeClass('right_show');
			$(backChd[2]).addClass('right_hide');
			// right_hide
			$(backChd[3]).removeClass('right_hide');
			// left_hide_new
			ctback.remove($(backChd[backChd.length-1]));
			$(backChd[backChd.length-1]).addClass('left_hide');
			ctback.prepend($(backChd[backChd.length-1]));
			// ctback
			ctback.css('left','0px');
		}
	);
}