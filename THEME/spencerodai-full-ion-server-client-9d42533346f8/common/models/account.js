'use strict';
var async = require("async");

module.exports = function (Account) {

  Account.beforeRemote('**', function (ctx, unused, next) {

    if (ctx.req.accessToken) {
      var userId = ctx.req.accessToken.userId;
    } else {
      var userId = -1;
    }

    if (ctx.methodString == 'Account.create') {
      ctx.args.data.created_by = userId;
      ctx.args.data.updated_by = userId;
    }

    if (ctx.methodString == 'Account.updateAttributes') {
      ctx.args.data.updated_by = userId;
    }
    next();
  });


  Account.afterRemote('create', function (context, modelInstance, next) {
    var res = context.res;
    var user = context.result.__data;
    var names = user.fullname.split(' ');
    async.waterfall([
      function (callback) {
        Account.app.models.Contact.create({
          firstname: names[0],
          lastname: names[names.length - 1],
          picture: "http://www.ionicity.co.uk/wp-content/uploads/2017/01/placeholder.png",
          email: user.email,
          accountId: user.id,
          created_at: new Date(),
          created_by: user.id,
          updated_at: new Date(),
          updated_by: user.id
        }, function (err, contact) {
          if (err) next(new Error(err))
          if (!err && !contact) {
            next(new Error(err))
          }
          callback(err, user, contact);
        });
      },
      function (user, contact, callback) {
        Account.app.models.Preference.create({
          contactId: contact.id,
          created_at: new Date(),
          created_by: contact.id,
          updated_at: new Date(),
          updated_by: contact.id
        }, function (err, preference) {
          if (err) next(new Error(err))
          if (!err && !preference) {
            next(new Error(err))
          }
          next(err, user);
        });
      }
    ])
  });
};
