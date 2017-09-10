module.exports = function (Model, options) {
  'use strict';

  Model.observe('before save', function event(ctx, next) { //Observe any insert/update event on Model

    if (ctx.instance) {
      ctx.instance.created_at = new Date();
      ctx.instance.updated_at = new Date();

    } else {
      ctx.data.updated_at = new Date();
    }
    next();
  });

};
