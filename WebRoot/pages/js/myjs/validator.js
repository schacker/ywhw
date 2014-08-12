var validator={
	msgs:{
		mobile:'{0}:请输入正确的手机号',
		betweenLength:'{0}:请输入长度为{1}-{2}的字符串',
		number:'{0}:请输入数字',
		numberLength:'{0}:请输入长度为{1}的数字',
		numberBetween:'{0}:请输入长度为{1}-{2}的数字',
		equalTo:'{0}与{1}输入不一致'
	},
	handleMsg:function(msg,d){
		var msg = validator.msgs[msg];
		
		if(d){
			for(var i=0,len=d.length;i<len;i++){
				msg = msg.replace('{' + i + '}',d[i]);
			}
		}
		return msg;
	},
	mobile :function(expr,field){
		if(expr){
			var reg = /^1[358]\d{9}$/;
			if(reg.exec(expr))
				return ;
		}
		return validator.handleMsg('mobile',[field]);
	},
	betweenLength :function(expr,len1,len2,field){
		if(expr){
			var len = expr.length;
			if(len>=len1 && len<=len2)
				return;
		}
		
		return validator.handleMsg('betweenLength',[field,len1,len2]);
	},
	number:function(expr,field){
		if(expr){
			var reg=/^\d+$/;
			if(reg.exec(expr))
				return;
		}
		return validator.handleMsg('number',[field]);
	},
	numberLength:function(expr,len,field){
		if(expr){
			var reg=/^\d+$/;
			
			if(reg.exec(expr) && expr.length==len)
				return;
			
		}
		return validator.handleMsg('numberLength',[field,len]);
	},
	numberBetween:function(expr,len1,len2,field){
		if(expr){
			var reg=/^\d+$/,
				len=expr.length;
			if(reg.exec(expr) && len>=len1 && len<=len2)
				return;
		}
		return validator.handleMsg('numberBetween',[field,len1,len2]);
	},
	equalTo:function(v1,v2,f1,f2){
		if(v1==v2)
			return;
		return validator.handleMsg('equalTo',[f1,f2]);
	}
}