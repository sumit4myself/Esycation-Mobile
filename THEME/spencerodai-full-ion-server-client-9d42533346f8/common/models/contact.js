'use strict';

module.exports = function(Contact) {
    Contact.beforeRemote('**', function(ctx, unused, next) {

        if (ctx.req.accessToken) {
            var userId = ctx.req.accessToken.userId;
        } else {
            var userId = -1;
        }

        if (ctx.methodString == 'Contact.create') {
            ctx.args.data.created_by = userId;
            ctx.args.data.updated_by = userId;
        }

        if (ctx.methodString == 'Contact.updateAttributes') {
            ctx.args.data.updated_by = userId;
        }
        next();
    });
};
