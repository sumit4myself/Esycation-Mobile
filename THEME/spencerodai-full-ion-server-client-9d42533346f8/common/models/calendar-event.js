'use strict';

module.exports = function(Calendarevent) {
Calendarevent.beforeRemote('**', function(ctx, unused, next) {

        if (ctx.req.accessToken) {
            var userId = ctx.req.accessToken.userId;
        } else {
            var userId = -1;
        }

        if (ctx.methodString == 'Calendarevent.create') {
            ctx.args.data.created_by = userId;
            ctx.args.data.updated_by = userId;
        }

        if (ctx.methodString == 'Calendarevent.updateAttributes') {
            ctx.args.data.updated_by = userId;
        }
        next();
    });
};
