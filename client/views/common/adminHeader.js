Template.adminHeader.helpers({

});

Template.adminHeader.events({

  'click .logout-btn':function(){
  Meteor.logout(function(err){
    if(!err){
      Router.go('/adminLogin');
    }
    else{
      console.log(err);
    }
  });
},

});
