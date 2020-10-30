Template.chat.rendered = function(){
	Session.set('CHAT_ID', null);
	Session.set('MY_EMAIL', null);
}

Template.chat.helpers({

	messages: function() {
		var results = Messages.find({
			chatid: Session.get('CHAT_ID')
		});
		console.log(results, Session.get('CHAT_ID'));
		return results;
	},

	isMyChat: function(sender_email) {
		return sender_email == Session.get('MY_EMAIL') ? true : false;
	},

	today: function() {
				var date = new Date();
				return moment(date).format('MMM Do YY');
		},

});

Template.chat.events({

	'submit #chat-form': function(e) {
		e.preventDefault();
		var elem = $(e.currentTarget);
		var chatid = elem.attr('data-chatid');
		var sender = Chats.findOne(chatid);
		var time = new Date();

		var params = {
			chatid : chatid,
			sender_name : sender.name,
			sender_email : sender.email,
			message: $('#text-chat').val(),
			time : time
		}
		// console.log(params);
		Meteor.call('insertMessage', params, function(error, result){
			if(error) console.log("error", error);
			if(result){
				$('#text-chat').val('');
			}
		});
	},

	'submit #form-register': function(e){
		e.preventDefault();
		var elem = $(e.currentTarget);
		var time = new Date();
		var name = $('#name').val();
		var email = $('#email').val();
		// var password = CryptoJS.MD5( $('#password').val() ).toString();


		var isExist = Chats.findOne({
			email: email
		});

		if(!isExist) {
			var params = {
				name : name,
				email : email,
				// password : password,
				time : time
			}

			Meteor.call('insertChat', params, function(error, result){
				if(error) console.log("error", error);
				if(result){
					var chatid = result;
					$('#panel-register').addClass('hide');
					$('#panel-chatbox').removeClass('hide');
					$('#chat-form').attr('data-chatid', chatid);
					$('#text-chat').val('');
					Session.set('CHAT_ID', chatid);
					Session.set('MY_EMAIL', email);
				}
			});
		}
		else {
			$('#panel-register').addClass('hide');
			$('#panel-chatbox').removeClass('hide');
			$('#chat-form').attr('data-chatid', isExist._id);
			$('#text-chat').val('');
			Session.set('CHAT_ID', isExist._id);
			Session.set('MY_EMAIL', email);
		}
	},

});
