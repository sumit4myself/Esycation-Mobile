'use strict';

module.exports = function(Comment) {
    Comment.beforeRemote('**', function(ctx, unused, next) {

        if (ctx.req.accessToken) {
            var userId = ctx.req.accessToken.userId;
        } else {
            var userId = -1;
        }

        if (ctx.methodString == 'Comment.create') {
            ctx.args.data.created_by = userId;
            ctx.args.data.updated_by = userId;
        }

        if (ctx.methodString == 'Comment.updateAttributes') {
            ctx.args.data.updated_by = userId;
        }
        next();
    });
};
