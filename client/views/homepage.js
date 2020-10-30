var Scheme = {
    scrollChat: function() {
        // Tracker.afterFlush(function(){
            var height = 0;
            var margin = 10;
            $('ul.chat-list li').each(function(i, value){
                height += parseInt($(this).height()) + margin;
            });
            // console.log(height);
            $('#chat-container ul.chat-list').animate({ scrollTop: height }, 'slow');
            $('#text-chat').focus();
        // });
    }
}

Template.homepage.OnRendered = function(){
  var pfx = ["webkit", "moz", "MS", "o", ""];
      function PrefixedEvent(element, type, callback) {
      	for (var p = 0; p < pfx.length; p++) {
      		if (!pfx[p]) type = type.toLowerCase();
      		element.addEventListener(pfx[p]+type, callback, false);
      	}
      }
      function AnimationListener() {
          if($('#chat-container').hasClass('bounceOutDown')) {
              $('#chat-container').addClass('hide').removeClass('bounceOutDown');
          }
          else if($('#chat-container').hasClass('bounceInUp')) {
              $('#chat-container').removeClass('bounceInUp');
          }
      }
      var chatContainer = document.getElementById('chat-container');
      chatContainer.addEventListener("AnimationEnd", AnimationListener, false);
      PrefixedEvent(chatContainer, "AnimationEnd", AnimationListener);
      // var $chatBox = $('#chat-container');
      // $chatBox.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
      //     console.log('AnimationEnd');
      // }, false);
      $(window).resize(function(){
          // var headingHeight = $('#chat-container .panel-heading').height();
          // var formHeight = $('#chat-container .chat-form').height();
          var h = $('#chat-container').height() - 130;
          $('#chat-container ul.chat-list').css('max-height', h);
      });

}



Template.homepage.helpers({

  thisYear: function() {
        var date = new Date();
        return moment(date).format('YYYY');
    },

});

Template.homepage.events({

  // -- chat
    'click #float-btn, click .close-chat': function(e) {
        e.preventDefault();
        console.log("clicked")
        // $('.chat-container').toggleClass('hide').addClass('animated bounceInUp');
        var $chatBox = $('#chat-container');
        if($chatBox.hasClass('hide')) {
            $chatBox.removeClass('hide').addClass('bounceInUp').removeClass('bounceOutDown');
            var h = $('#chat-container').height() - 130;
            $('#chat-container ul.chat-list').css('max-height', h);
            Scheme.scrollChat();
        } else {
            $chatBox.removeClass('bounceInUp').addClass('bounceOutDown');
        }
    },

    'mouseover #chat-container': function(e) {
      e.preventDefault();
      $('body').css('overflow', 'hidden');
    },

    'mouseout #chat-container': function(e) {
        e.preventDefault();
        $('body').css('overflow', 'auto');
      },

    // chatregister

    'submit .form-chat' : function(e){
      e.preventDefault();

      var nameVariable = e.target.chatName.value;
      var emailVariable = e.target.chatEmail.value;
      var passwordVar = e.target.chatPassword.value;

      if (!nameVariable) {
              var msg = 'Your name is required';
              $('.alertBox').html(ClientHelper.alertDanger(msg));
              return false;
          }

      if (!emailVariable) {
              var msg = 'Email is required';
              $('.alertBox').html(ClientHelper.alertDanger(msg));
              return false;
          }

          if (!passwordVar) {
                  var msg = 'Password is required';
                  $('.alertBox').html(ClientHelper.alertDanger(msg));
                  return false;
              }

              // var now = new Date();
              // var elem = $(e.currentTarget);
              // var params = {
              //   name: nameVariable,
              //   created_at: now,
              //   userId: this.userId
              // }
              //
              // Meteor.call("addChannel", params, function(error, result){
              //     if(error){
              //         console.log("error", error);
              //     }
              // });

          Accounts.createUser({
                    email: emailVariable,
                    password: passwordVar,
                    profile: {
                        name: nameVariable,

                    }
                }, function(err) {
                    if(!err) {
                        Router.go('/channel');
                        // $('.chat-register').toggleClass('hide').addClass('.chat-login');
                    } else {
                        var msg = ClientHelper.alertDanger(err.reason);
                        $('.alertBox').html(msg);
                      }
                });

            },

            // 'click #chatregister': function(e) {
            //     e.preventDefault();
            //     $('.chat-register').toggleClass('hide').addClass('.chat-login');
            // },

            // onBeforeAction: function(e){
            //   e.preventDefault();
            //     if(!Meteor.userId()){
            //       $('.chat-login').toggleClass('hide').addClass('.chat-register');
            //       }
            //       this.next();
            //   }

});
