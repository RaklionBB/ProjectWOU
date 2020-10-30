Template.adminMenu.rendered = function(){
    // Scheme.updateHeight();
    ThemeHelper.app();
}

Template.adminMenu.helpers({

});

Template.adminMenu.events({
  'click #reset': function(e){
		e.preventDefault();
		var params ={

		}

		Meteor.call('removeChat', params, function(error, result){
			if (error) console.log("error", error);
			if (result){
				console.log("deleted chat");
			}
		});
	},

});
