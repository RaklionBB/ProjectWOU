Meteor.publish('roles', function (){
    return Meteor.roles.find({});
});

Meteor.publish('admins', function(userId) {
    return Meteor.users.find({
        _id: userId
    });
});

Meteor.startup(function(){
    var users = [
          {
            name:"Prossimo Admin", username: 'admin', password: 'Zaq!Xsw@Cde#', email:"admin@prossimo.com", roles:['admin'],
             name:"Dalini Priya", username: 'raklionBB', password: 'Kala1965', email:"dalini@prossimo.com", roles:['admin'],
          }
    ];

    _.each(users, function (user) {
          var chkusr = Meteor.users.findOne({'profile.email': user.email});
          if(!chkusr) {
             var id = Accounts.createUser({
                username: user.username,
                password: user.password,
                profile: {
                    email: user.email,
                    name: user.name
                }
             });

             if (user.roles.length > 0) {
                //  console.log(id);
                 Roles.addUsersToRoles(id, user.roles);
             }
          }
    });
});


Meteor.methods({
    promoteAdmin: function(id){
         Roles.addUsersToRoles(id, ['admin']);
    },

    revokeAdmin: function(id) {
        Roles.setUserRoles(id, []);
    }
});
