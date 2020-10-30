Template.adminHome3.rendered = function(){
	Session.get('CHAT_ID');
	Session.get('MY_EMAIL');
}

Template.adminHome3.helpers({

  chats: function(){
    var chats = Chats.find({
			// chatid: Session.get('CHAT_ID')
		}, {
				sort: {
						time: -1
				},
				limit: 5
		});
		// console.log(chats, Session.get('CHAT_ID'))
    return chats;
  },

  isSenderChatId: function(chatid){
    return chatid == Session.get('CHAT_ID') ? true : false;
  },

	isCurrentSenderChatId: function(current){
		if (current == Chats.findOne({_id: 1}))return true;
		else return false;
  },

  messages: function() {
    var results = Messages.find({
      chatid: Session.get('CHAT_ID')
    });
    console.log(results, Session.get('CHAT_ID'));
    return results;

  },

  isMyChat: function(userId) {
    if(userId == Meteor.userId()) return true;
    else return false;
  },

	today: function() {
				var date = new Date();
				return moment(date).format('MMM Do YYYY');
		},

		counter: function(){
			return Chats.find({}).count();
		}

});

Template.adminHome3.events({

  'submit #chat-form': function(e) {
    e.preventDefault();
    var elem = $(e.currentTarget);
    var chatid = elem.data('chatid');
    var sender =  Meteor.userId();
    var time = new Date();

    var params = {
      chatid : chatid,
      sender: sender,
      message: $('#text-chat').val(),
      time : time
    }
    // console.log(params);
    Meteor.call('insertMessage', params, function(error, result){
      if(error) console.log("error", error);
      if(result){
        $('#text-chat').val('');
				Session.set('CHAT_ID', chatid);
      }
    });
  },

});
