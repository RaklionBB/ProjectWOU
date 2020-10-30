Template.greetings.helpers({

  thisYear: function() {
        var date = new Date();
        return moment(date).format('YYYY');
    },
    
  greetWeekend: function() {
    var date = new Date();
    var days = date.getDay();
    if (days==6){
      return moment(days);
    }
    else if (days==0){
      return moment(days);
    }
  },

  greetMorning: function() {
    var date = new Date();
    var hrs = date.getHours();
    var days = date.getDay();
    if (days!=0 && days!=6){
      if (hrs>=0 && hrs<12){
        return moment(hrs).format('HH:MM:SS');
      }
    }
  },

  greetAfternoon: function() {
    var date = new Date();
    var hrs = date.getHours();
    var days = date.getDay();
    if(days!=0 && days!=6){
      if (hrs>=12 && hrs<=15){
        return moment(hrs).format('HH:MM:SS');
      }
    }
  },

  greetEvening: function() {
    var date = new Date();
    var hrs = date.getHours();
    var days = date.getDay();
    if(days!=0 && days!=6){
      if (hrs>15 && hrs<=23){
        return moment(hrs).format('HH:MM:SS');
      }
    }
  }

});

Template.greetings.events({



});
