Meteor.publish('chats', function() {
  return Chats.find();
});

Meteor.methods({
    insertChat:function(params){
         return Chats.insert(params);
    },
    removeChat:function(params){
         return Chats.remove(params);
    }
});
