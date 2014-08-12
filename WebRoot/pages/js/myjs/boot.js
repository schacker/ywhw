//var head = $("head");
//if(!head){
//	head = $("<head></head>").insertBefore("body");
//}
//document.write("<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>");

$.ajax({url:'config/config.json', //要访问的后台数据地址
		dataType:'text', //返回text格式的数据
		async:false, //异步下载（更新）
		success:function(data){ //请求成功的回调函数
			data = eval("(" + data + ")");
			if(data.meta){
				for(var i=0,len=data.meta.length;i<len;i++){
					var o = data.meta[i];
					document.write("<meta name='"+ o.name +"' content='"+ o.content +"'/>");
				}
			}
			if(data.css){
				for(var i=0,len=data.css.length;i<len;i++){
						document.write("<link rel='stylesheet'  href='" + data.css[i] + "' />");
				}
			}
			
			if(data.js){
				for(var i=0,len=data.js.length;i<len;i++){
					document.write("<script src='" + data.js[i] + "' ></script>");
				}
			}
		}
});


 
