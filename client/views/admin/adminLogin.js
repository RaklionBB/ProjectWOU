Template.adminLogin.rendered = function(){


}



Template.adminLogin.helpers({

  thisYear: function() {
        var date = new Date();
        return moment(date).format('YYYY');
    },

        Weekend: function() {
          var date = new Date();
          var days = date.getDay();
          if (days==6){
            return moment(days);
          }
          else if (days==0){
            return moment(days);
          }
        },

        Morning: function() {
          var date = new Date();
          var hrs = date.getHours();
          var days = date.getDay();
          if (days!=0 && days!=6){
            if (hrs>=0 && hrs<12){
              return moment(hrs).format('HH:MM:SS');
            }
          }
        },

        Afternoon: function() {
          var date = new Date();
          var hrs = date.getHours();
          var days = date.getDay();
          if(days!=0 && days!=6){
            if (hrs>=12 && hrs<=16){
              return moment(hrs).format('HH:MM:SS');
            }
          }
        },

        Evening: function() {
          var date = new Date();
          var hrs = date.getHours();
          var days = date.getDay();
          if(days!=0 && days!=6){
            if (hrs>16 && hrs<=19){
              return moment(hrs).format('HH:MM:SS');
            }
          }
        },

        Night: function() {
          var date = new Date();
          var hrs = date.getHours();
          var days = date.getDay();
          if(days!=0 && days!=6){
            if (hrs>19 && hrs<=23){
              return moment(hrs).format('HH:MM:SS');
            }
          }
        },




});

Template.adminLogin.events({

'submit .form-login' : function(e){
  e.preventDefault();
  var emailVar = e.target.loginId.value;
  var passwordVar = e.target.loginPassword.value;

  Meteor.loginWithPassword(emailVar, passwordVar,
            function(err){
              console.log('works');
                if(!err) {
                  console.log('success');
                    Router.go('/adminHome');
                } else {
                  console.log(err);
                  var msg = ClientHelper.alertDanger('Incorrect login ID or password.');
                  $('.alertBox').html(msg);
                }
            });

},







});
