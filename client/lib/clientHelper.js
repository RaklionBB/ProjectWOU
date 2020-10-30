ClientHelper = {

	activeMenu : function(menu, parent) {
		$('#menu-nav').find('li[id^=menu-]').each(function(){
			$(this).removeClass('active');
		});
		$('#menu-nav').find('#menu-'+menu).addClass('active');
		if(parent) {
			$('#menu-nav').find('#menu-'+parent).addClass('active');
			$('#menu-'+menu).parent().css('display', 'block');
		}
	},

	alertSuccess: function(msg) {
		var str = '<div class="alert alert-success alert-styled-left alert-arrow-left alert-bordered">';
			str += '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button><h5>' + msg + '</h5></div>';
		return str;
	},

	alertDanger: function(msg) {
		var str = '<div class="alert alert-danger alert-styled-left alert-bordered">';
			str += '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button><h5>' + msg + '</h5></div>';
		return str;
	},

	alertWarning: function(msg) {
		var str = '<div class="alert alert-warning alert-styled-left">';
			str += '<button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button><h5>' + msg + '</h5></div>';
		return str;
	},

	// notify: function(type, msg) {
	// 	var notice = new PNotify({
	// 		title: msg,
	// 		addclass: 'stack-bottom-left bg-' + type,
	// 		stack: {'dir1': 'right', 'dir2': 'up', 'push': 'top'},
	// 		hide: false,
	// 		buttons: {
	// 			closer: false,
	// 			sticker: false
	// 		}
	// 	});
	// 	notice.get().click(function() {
	// 		notice.remove();
	// 	});
	// },

	notify: function(type, msg) {
		var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
		var notice = new PNotify({
			title: msg,
			addclass: 'stack-bottom-right bg-' + type,
			stack: stack_bottomright,
			hide: true,
			delay: 3000,
			opacity: 0.9,
			buttons: {
				closer: true,
				sticker: false
			}
		});
		notice.get().click(function() {
			notice.remove();
		});
	},

	confirm: function(type, msg) {
		var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
		var notice = new PNotify({
			title: msg,
			addclass: 'stack-bottom-right bg-' + type,
			stack: stack_bottomright,
			hide: false,
			opacity: 0.9,
			confirm: {
                confirm: true,
                buttons: [
                    {
                        text: 'Yes',
                        addClass: 'btn-md'
                    },
					{
						text: 'Cancel',
                        addClass: 'btn-md'
                    }
                ]
            },
			buttons: {
				closer: false,
				sticker: false
			},
            history: {
                history: false
            }
		});
		return notice;
	},

}
