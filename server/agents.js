Meteor.publish('agents', function() {
  // return Agents.find();

  var self = this;
  var handle = Meteor.users.find({}, {
      fields: {emails: 1, profile: 1, roles:1}
  }).observeChanges({
      added: function (id, fields) {
        self.added('agents', id, fields);
      },
      changed: function (id, fields) {
        self.changed('agents', id, fields);
      },
      removed: function (id) {
        self.removed('agents', id);
      }
  });

  self.ready();

  self.onStop(function () {
      handle.stop();
  });

});

Agents.allow({
    remove: function (userId, doc) {
        console.log(userId, doc);
    //   return doc.owner === userId;
        return true;
    },
    fetch: []
});
