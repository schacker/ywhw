/**
 * 生成toast
 * @param {Object} msg:消息内容
 * @param {Object} timer:延迟时间 默认2000ms
 * @param {Object} bottom:底部距离 默认150
 * @param {Object} theme: 颜色主题 默认b
 * @memberOf {TypeName} 
 */
function toast(msg,timer,theme,bottom){
	var me = this;
	if(!timer)
		timer=3000;
	if(!theme)
		theme=GLOBAL.dialogTheme;
	if(!bottom)
		bottom=60;
	var box = $('<div>'+ msg +'</div>').appendTo($('body'));
	box.attr('class','ui-btn-up-' + theme);
	box.css({
		'max-width':'80%',
		'position':'absolute',
		'bottom':bottom + 'px',
		'overflow':'visible',
		'font-size':'12px',
		'text-shadow':'0 0 0',
		'font-weight':'normal',
		'border-width':'2px',
		'border-radius':'8px',
		'padding':'15px',
		'z-index':1000
	});
	box.css('left',((window.innerWidth - box.width())/2-5) + 'px');
	box.fadeIn().delay(timer).fadeOut("slow",function(){
		box.remove();
	});
}
