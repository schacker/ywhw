
(function($){
	$.widget( "my.querybox", {
		options:{
			width:'95%',
			bgcolor:'#ffffff',
			clear:true,
			value:'',
			callback:null
		},
		_create:function(){
			var el=this.element,
				opt=this.options;
				btn=null,
				clear=null;
			
			el.css({
				'width':opt.width,
				'background':opt.bgcolor				
			});
			if(opt.clear){
				opt.clearBtn = $("<a class='clear' data-role='none' ></a>")
					.appendTo(el)
					.click(function(){
						opt.inputBox.val('');
						$(this).hide();
					});
				if(opt.value)
					opt.clearBtn.show();
			}
			
			opt.inputBox = $("<input data-theme='none' type='text' class='text' style='width:"+ ($(el).width()-30) + "px'/>")
				.appendTo(el)
				.val(opt.value)
				.keyup(function(){
						if(opt.clearBtn){
							if($(this).val())
								opt.clearBtn.show();
							else
								opt.clearBtn.hide();
						}
					}
				);
			$("<a href='javascript:void(0)'><div class='btn'></div></a>")
				.appendTo(el)
				.bind({
					click:function(){
						var text = $(this).prev().val();
						if(!text)
							return;
						return opt.callback(text);
					}
				});
		},
		setValue:function(v){
			if(v){
				this.options.inputBox.val(v);
				this.options.clearBtn.show();
			}
		}
	});
})(jQuery);