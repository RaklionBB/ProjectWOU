Router.configure({
  layoutTemplate: 'main.layout',
  layoutTemplate: 'admin.layout',
  layoutTemplate: 'auth.layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'homepage',
  layoutTemplate: 'main.layout',
  waitOn: function() {
      return [
          Meteor.subscribe('chats')
      ]
  },
});

Router.route('/adminLogin', {name: 'adminLogin', layoutTemplate: 'auth.layout'});
Router.route('/adminRegister', {name: 'adminRegister', layoutTemplate: 'auth.layout'});

Router.route('/channel', {
  name: 'homepageChannel',
  layoutTemplate: 'main.layout',
    waitOn: function() {
        return [
            Meteor.subscribe('channels'),
            Meteor.subscribe('chats'),
            Meteor.subscribe('roles'),
            Meteor.subscribe('admins', Meteor.userId()),
        ]
    },
    onBeforeAction: function(){
        if(!Meteor.userId()){
            // Session.set('BROWSE_ID', this.params._id);
          Router.go('/');
          }
          this.next();
      }

});

Router.route('/chat/:_id', {
  name: 'homepage2',
  layoutTemplate: 'main.layout',
    waitOn: function() {
        return [
            // Meteor.subscribe('channels'),
            Meteor.subscribe('chats'),
            Meteor.subscribe('roles'),
            Meteor.subscribe('admins', Meteor.userId()),
        ]
    },
    onBeforeAction: function(){
        if(!Meteor.userId()){
            // Session.set('BROWSE_ID', this.params._id);
          Router.go('/');
          }
          this.next();
      }

});

Router.route('/adminHome', {
  name: 'adminHome3',
  layoutTemplate: 'admin.layout',
  waitOn: function () {
        return [
            Meteor.subscribe('roles'),
            Meteor.subscribe('admins', Meteor.userId()),
            Meteor.subscribe('chats'),
            Meteor.subscribe('messages'),
        ];
    },
    onBeforeAction: function(){
        if(!Meteor.userId()){
          Router.go('/adminLogin');
          } else if(!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('/adminLogin');
        } else{
          this.next();
        }

      }
});


// MainController = RouteController.extend({
//   action: function() {
//   	this.render('home', {
// 	    data: function () {
// 	      return { posts: ['post red', 'post blue'] }
// 	    }
//   	});
//   }
// });
