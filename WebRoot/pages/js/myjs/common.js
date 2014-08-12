var $CommonPkg={
	/**
	 * 格式化数据
	 * @param text:需格式化文本
	 * @return 格式化后文本
	 */
	formatText:function (text) {
		text = text.replace(/&lt;/g, '<');
		text = text.replace(/&gt;/g, '>');
		text = text.replace(/&quot;/g, "'");
		var ind = text.indexOf('http://');
		if (ind >= 0 && text.lastIndexOf('</a>') == -1) {
			var tmp = text.substr(ind);
			text = text.substr(0, ind) + "<a href='" + tmp + "'>" + tmp + "</a>";
		}
		return text;
	},
	
	/**
	 * 提取错误
	 * @param o:数据0
	 * @param map:字段映射
	 * @return 处理后的串 
	 */
	getErr:function (o, map) {
		var s = '';
		if (o && !o.success) {
			if (o.result.msgs) {
				for ( var i in o.result.msgs) {
					if(s!='')
						s+='<br>';
					if (map[i]) {
						s += map[i] + '：' + o.result.msgs[i];
					}
				}
			} else if (o.result.errors) {
				s = o.result.errors;
			}
		}
		return s;
	},
	/**
	 * 转换为服务器网址
	 * @param url:相对路径
	 * @return 转换后路径 
	 */
	toServerUrl:function(url) {
		return GLOBAL.baseUrl + url;
	},
	/**
	 * 将js对象转换为json字符串
	 */
	obj2str:function(o){
	    var r = [];
	    if(typeof o =="string")
	    	return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g," \\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
	    if(typeof o =="undefined")
	    	return "";
	    if(typeof o == "object"){
	        if(o===null)
	        	return "null";
	        else if(!o.sort){
	            for(var i in o){
	                r.push("\""+i+"\":"+obj2str(o[i]))
	            }
	            r="{"+r.join()+"}"
	        }else{
	            for(var i =0;i<o.length;i++)
	                r.push(obj2str(o[i]))
	            r="["+r.join()+"]"
	        }
	        return r;
	    }
	    return o.toString();
	}
}

var $MsgBox = {
	alert : function(msg, timer) {
		if(!timer)
			timer=3000;
		if (!msg)
			msg = "加载中...";
		
		var toast = $('.toast');
		
		toast.hide();
		toast.find('.content').html(msg);
		toast.fadeIn().delay(timer).fadeOut(400);
	},
	
	showLoading:function(msg){
		if (!msg)
			msg = "加载中...";
		$('.toast .content').html(msg);
		$('.toast').fadeIn();
	},
	hideLoading:function(){
		$('.toast').fadeOut();
	},
	confirm : function(text, title) {
		confirm(text, title);
	}
}

var $DateHandler={
		// 字符串转换成日期
		strToDate:function(str) {
			return str.substr(0, 4) + '年' + str.substr(4, 2) + '月' + str.substr(6, 2)
					+ '日';
		
		},
		strToDatehour:function(str) {
			return str.substr(0, 4) + '年' + str.substr(4, 2) + '月' + str.substr(6, 2)
					+ '日' + str.substr(8, 2) + '时';
		
		},
		strToDatetime:function(str) {
			return str.substr(0, 4) + '年' + str.substr(4, 2) + '月' + str.substr(6, 2)
					+ ' ' + str.substr(8, 2) + '时' + str.substr(10, 2) + '分'
					+ str.substr(12, 2) + '秒';
		},
		strToDate1:function(str) {
			return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
		
		},
		strTotime:function(str){
			return str.substr(8, 2)+':'+str.substr(10, 2);
		},
		strTomonth:function(str){
			return str.substr(4, 2)+'月'+ str.substr(6, 2)+'日 ';
		},
		strToDatehour1:function(str) {
			return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)
			+ ' ' + str.substr(8, 2);
		
		},
		strToDatetime1:function(str) {
			return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)
					+ ' ' + str.substr(8, 2) + ':' + str.substr(10, 2) + ':'
					+ str.substr(12, 2);
		},
		format: function( date, format ) {
			 var o = {  
		         "M+" : date.getMonth() + 1, 	// month  
		         "d+" : date.getDate(), 		// day  
		         "m+" : date.getMinutes(), 		// minute  
		         "s+" : date.getSeconds(), 		// second  
		         "q+" : Math.floor((date.getMonth() + 3) / 3), // quarter  
		         "S" : date.getMilliseconds()  
		   	  }  
		   
		     if (/(y+)/.test(format)) {  
		         format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4  
		                         - RegExp.$1.length));  
		     } 
		     
		     if(/(h+)/.test(format)) {
		    	 var hours = date.getHours();
		         format = format.replace(RegExp.$1,  function () {
			 	   return  ((hours>=0 && hours<=12) ? ' 上午 ': ' 下午 ')+ hours % 12;
		         });// hour  )
		     }
		   
		     for (var k in o) {  
		         if (new RegExp("(" + k + ")").test(format)) {  
		            format = format.replace(RegExp.$1, RegExp.$1.length == 1  
		                             ? o[k]  
		                             : ("00" + o[k]).substr(("" + o[k]).length));  // 6: 06分  因为o[k] = 6 
		         }  
		     } 
		     return format;  
		}
}



/********* page relation*********/  
/**
 * page container
 */

var $PageHandler={
	history:[],  //历史记录
	moveToPage:function(url){
		if(!url)
			return;
		var pageId=url.substr(0,url.indexOf('.html'));
		if(pageId)
			this.changePage(pageId);
	},
	changePage:function (pageId){
		this.loading = true;
		if(!pageId)
			return;
		
		var $page = $('#page_' + pageId);
		if(!$page || $page.length==0){
			this.loadPage(pageId);
		}else{
			if(!$page.html())
				this.loadPageFromMobi(pageId);
            else
                this.changePageInfo(pageId);
		}
	},
	/**
	 * 页面切换后处理
	 * @param pageId:页面编号
	 */
	changePageInfo:function(pageId){
		var me = $PageHandler,
			hist = me.history;
		if(!pageId)
			return;
		if(hist.length>1 && pageId != hist[hist.length-2])//保存倒数第2个页面，保证body里面只有两个页面
			me.savePage(hist[hist.length-2]);
		location.hash='page_' + pageId;
		
		if(hist.length>0){
			var cur = $('#page_' + hist[hist.length-1]);
			if(cur)
				cur.hide();
		}
		var $page =$('#page_' + pageId);
		$page.trigger('pagebeforeshow');
		$page.fadeIn('slow',function(){
			$(this).trigger('pageshow');
		});
		if (pageId == this.history[this.history.length - 1]) {
			this.loading = false;
			return;
		}
		hist.push(pageId);
		this.loading = false;
	},
	
	loadPage:function (pageId,fun){
		if(!pageId)
			return;
		$.ajax({
			url: pageId+'.html',
			dataType:'html',
			success:function(data){
				if(!data)
					return;
				$('.pagect').append(data);
				$('#page_' + pageId).trigger('pageinit');
				//回调
				if (fun) {
					fun(pageId);
					this.loading = false;
				} else 
					$PageHandler.changePageInfo(pageId);
			}
		});
	},
	/**
	 * 从手机读取页面内容
	 * @param pageId:页面id
	 */
	loadPageFromMobi:function(pageId){
		if(!pageId)
			return;
		var pageContent = $InterAction.loadPage(pageId);
		if(getSystemName() == 'android'){  //android
			if(!pageContent){  //从 html加载 
				$('#page_'+pageId).remove();
				this.loadPage(pageId);
			}else{	//从缓存文件加载 
				$('#page_' + pageId).html(pageContent);
				if(!this.preloading)
					this.changePageInfo(pageId);
				else
					this.preloading = false;
				this.loading = false;
			}
		}
	},
	savePage:function(pageId){
		if(!pageId)
			return;
		var $page = $('#page_' + pageId);
		if($page && $page.length>0){
			var pageContent = $page.html();
			if(pageContent){
				$InterAction.savePage(pageId , pageContent);
			}
			$page.empty();
		}
	},
	/**
	 * 页面返回
	 */
	pageBack:function(steps){
		if(this.loading)
			return;
        var hash = location.hash,
			hist = this.history;
        if(!hist || !hist.length || hist.length == 1) {
			$InterAction.exit();
		} else if(hash){
			if(hash == '#page_home' || hash == '#page_login') {
				$InterAction.exit();
			} else {
	            this.backFlag=1;
				this.loading = true;
	            location.hash = 'page_' + hist[hist.length-2];
			}
		}
	},
	/**
	 * 处理hash
	 * @memberOf {TypeName}
	 */
    handleHash:function(){
        if(!this.backFlag) {
			this.loading = false;
			return;
		}
		this.backFlag=0;
		hash = location.hash;
		var hist = this.history,
			pOld = hist.pop(),
			pNew = hist[hist.length-1];
		if(pNew){
			$('#page_' + pOld).hide();
			var $pNew = $('#page_' + pNew);
			if($pNew && $pNew.length) {
				$('#page_' + pNew).trigger('pagebeforeshow');
				$('#page_' + pNew).fadeIn('slow',function(){
					$(this).trigger('pageshow');
				});
				this.loading = false;
			} else {
				this.loadPage(pNew);
			}	
			this.savePage(pOld);
			if(hist.length>1) {//预加载前一个页面
                this.preloading = true;
				this.loadPageFromMobi(hist[hist.length-2]);
            }
		} else {
			this.loading = false;
		}
	},
	saveAllPage: function() {
		var div_pages = $('.pagect');
		if(div_pages.html())
			localStorage.setItem('pages', div_pages.html());
		var pages = $('[id^="page_"]');
		if(pages && pages.length) {
			$.each(pages, function(i, c) {
				if(c.id && c.id.length > 5) {
					var pageId = c.id.substring(5);
					if(pageId)
						$PageHandler.savePage(pageId);
				}
			});
		}
	}
}

/***设备与页面交互***/
var $InterAction={
	/**
	 * 获取Imei
	 * @param callback:回调函数
	 */
	getImei:function(callback){
		return invokeMethod('getImei');
	},
	/**
	 * 设置头部
	 * @param title:标题
	 * @param leftBtn:左按钮
	 * @param rightBtn:右按钮
	 */
	setHeader:function(title,leftBtn,rightBtn){
		invokeMethod('setHeader',title + ',' + leftBtn + ',' + rightBtn);
	},
	/**
	 * 隐藏头部
	 */
	hideHeader: function() {
		invokeMethod('hideHeader');
	},
	/**
	 * 获取hash
	 * @returns {} 
	 */
	getHash: function() {
		return invokeMethod('getHash');
	},
	/**
	 * 用浏览器打开url
	 */
	openUrl: function(url) {
		if(url) {
			$PageHandler.saveAllPage();
			var str = obj2str(GLOBAL_CONFIG);
			localStorage.setItem('config', str);
			localStorage.setItem('history', $PageHandler.history)
			return invokeMethod('openUrl', url);
		}
	},
	/**
	 * 检查升级
	 */
	update: function() {
		return invokeMethod('update');
	},
	/**
	 * 获取屏幕宽高度
	 */
	getHeight:function(){
		return window.innerHeight;
	},
	/**
	 * 获取屏幕宽度
	 */
	getWidth:function(callback){
		return window.innerWidth;
	},
	/**
	 * 保存页面
	 * @param content:页面内容
	 */
	savePage:function(pageId,content){
		invokeMethod('savePage',pageId + ',' + content);
	},
	/**
	 * 加载页面
	 * @param pageId: 页面id
	 * @return {TypeName} 
	 */
	loadPage:function(pageId){
		return invokeMethod('loadPage',pageId);
	},
	/**
	 * 上传文件
	 * @param callback:回调函数
	 */
	upload:function(callback){
		return invokeMethod('upload',callback);
	},
	/**
	 * 照相
	 */
	upload_take: function(callback, aspectX, aspectY, outputX, outputY) {
		invokeMethod('takePhoto', callback + ',' + aspectX + ',' + aspectY + ',' + outputX + ',' + outputY);
	},
	/**
	 * 选择图片
	 */
	upload_choose: function(callback, aspectX, aspectY, outputX, outputY) {
		invokeMethod('choosePhoto', callback + ',' + aspectX + ',' + aspectY + ',' + outputX + ',' + outputY);
	},
	/**
	 * 退出软件
	 */
	exit: function() {
		invokeMethod('exit');
	}
}

$(window).bind('scroll',function(){
	var hist = $PageHandler.history,
		len = hist.length,
		$page,
		scrollCB;
	if(len>0){
		scrollCB = "page_" + hist[len-1] + ".scrollCB";
	}
	
	if(eval(scrollCB) && $(document).scrollTop() > 0 && $(document).scrollTop()+$(window).height()==$(document).height()){
		eval(scrollCB + "()");	
	}
});

window.onhashchange=function(){
	$PageHandler.handleHash();
}