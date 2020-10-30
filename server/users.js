Meteor.publish('allUsers', function (){
    return Meteor.users.find({});
});

Meteor.methods({
    'deleteUser': function(userId) {
        return Meteor.users.remove(userId);
    }
});
