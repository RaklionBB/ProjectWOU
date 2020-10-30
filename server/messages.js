Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.methods({
    insertMessage:function(params){
         return Messages.insert(params);
    },
    removeMessage:function(params){
         return Messages.remove(params);
    }
});
