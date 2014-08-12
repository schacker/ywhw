/**
 * ios 交互
 */
 
 
function getImei(){
	invokeMethod('getImei');
}
function setImei(v){
	GLOBAL.imei=v;
	localStorage.setItem("imei",v);
}

function getTtid(){
	invokeMethod('getTtid');
}
function setTtid(v){
	GLOBAL.ttid=v;
	localStorage.setItem("ttid",v);
}

function getLocation(){
	invokeMethod('getLocation');
}
function setLocation(v){
	GLOBAL.location=v;
	localStorage.setItem("location",v);
}


// 获取系统名
function getSystemName() {
	return "ios";
}


/**
 * 从ios加载文件
 * @param {Object} pageId
 * @param {Object} content
 */
function IOS_setPage(pageId,content){
    if(!content){
		$('#page_'+pageId).remove();
		$PageHandler.loadPage(pageId);
	}else{
		content = decodeURI(content);
		$('#page_' + pageId).html(content);
        if(!$PageHandler.preloading)
            $PageHandler.changePageInfo(pageId);
		else
            $PageHandler.preloading = false;
        $PageHandler.loading = false;
	}
}

var $IOS_Request={
	reqList:[],
	req:function(method,param){
		//入队列
		this.reqList.push({method:method,param:param});
	//	if(this.reqList.length==1)
            this.invoke();
    },
	reqBack:function(){
       
		if(this.reqList.length==0)
			return;
		this.reqList.splice(0,1);
      
		this.invoke();
       
	},
	invoke:function(){
     
		if(this.reqList.length==0)
			return;
		var o = this.reqList[0],
			method=o.method,
			param=o.param;
		 
		var inv ="invoke://?" + method + '=';
        
		if(param) inv += encodeURI(param);
      
		location.href=inv;
	}
};
// 应用软件交互
function invokeMethod(method, param) {
	$IOS_Request.req(method,param);
}

$(function(){
//   getImei();
  });
