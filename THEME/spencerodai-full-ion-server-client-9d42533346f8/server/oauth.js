var request = require('request');
var qs = require('querystring');

module.exports = function (app, config) {

  var User = app.models[config.USER_MODEL];
  var authHeader = config.AUTH_HEADER;


  function sendAccessToken(req, res) {
    var user = req.user;
    user.createAccessToken(User.settings.ttl, function (err, token) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({
        user: user,
        userId: token.userId,
        id: token.id,
        ttl: token.ttl
      });
    });
  }


  // GOOGLE
  app.post('/auth/google',
    // Step 1. Exchange authorization code for access token.
    function (req, res, next) {
      var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
      };

      request.post(accessTokenUrl, {
        json: true,
        form: params
      }, function (err, response, token) {
        if (response.statusCode !== 200) {
          res.status(500).send(err);
          return;
        }
        var accessToken = token.access_token;
        req.accessToken = accessToken;
        next();
      });
    },

    // Step 2. Retrieve profile information about the current user.
    function (req, res, next) {
      var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
      var accessToken = req.accessToken;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };
      request.get({
        url: peopleApiUrl,
        headers: headers,
        json: true
      }, function (err, response, profile) {
        if (response.statusCode !== 200) {
          console.log(res.status(500).send(err));
          return;
        }
        req.profile = profile;
        next();
      });
    },

    // Step 3a. Link user accounts.
    function (req, res, next) {
      if (!req.headers[authHeader]) {
        next();
        return;
      }
      var profile = req.profile;
      User.find({
        where: {
          google: profile.sub
        }
      }, function (err, users) {
        var user = users[0];
        if (user) {
          res.status(409).send({
            message: 'There is already a Google account that belongs to you'
          });
          return;
        }

        var token = req.headers[authHeader].split(' ')[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        User.findById(payload.sub, function (err, user) {
          if (!user) {
            res.status(400).send({
              message: 'User not found'
            });
            return;
          }
          user.google = profile.sub;
          user.displayName = user.displayName || null;
          user.firstName = profile.given_name || null;
          user.lastName = profile.family_name || null;
          user.gender = profile.gender || null

          user.save(function () {
            res.send({
              token: createToken(user),
              user: user
            });
          });
        });
      });
    },

    // Step 3b. Create a new user account or return an existing one.
    function (req, res, next) {
      var profile = req.profile;
      var filter = {
        or: [{
          google: profile.sub
        }, {
          email: profile.email
        }]
      };

      User.find({
        where: filter
      }, function (err, users) {
        var user = users[0];

        if (user) {
          if (!user.google) {
            user.google = profile.sub;
            user.displayname = user.displayName || profile.name;
            user.firstname = profile.given_name || null;
            user.lastname = profile.family_name || null;
            user.gender = profile.gender || null
            picture: profile.picture,
              user.save(function () {
                req.user = user;
                next();
              });
            return;
          }

          req.user = user;
          next();
          return;
        }

        User.create({
          displayName: profile.name,
          google: profile.sub,
          email: profile.email,
          password: profile.sub,
          picture: profile.picture,
          firstname: profile.given_name || null,
          lastname: profile.family_name || null,
          gender: profile.gender || null,
        }, function (err, user) {
          if (err) {
            res.status(500).send(err);
            return;
          }
          User.app.models.Contact.create({
            firstname: user.firstname,
            lastname: user.lastname,
            picture: profile.picture,
            email: user.email,
            gender: profile.gender || null,
            accountId: user.id,
            created_at: new Date(),
            created_by: user.id,
            updated_at: new Date(),
            updated_by: user.id
          }, function (err, contact) {
            if (err) {
              res.status(500).send(err);
              return;
            }
            User.app.models.Preference.create({
              contactId: contact.id,
              created_at: new Date(),
              created_by: contact.id,
              updated_at: new Date(),
              updated_by: contact.id
            }, function (err, preference) {
              if (err) {
                res.status(500).send(err);
                return;
              }
            });
          })
          req.user = user;
          next();
        });

      });
    }, sendAccessToken);

  // FACEBOOK
  app.post('/auth/facebook',
    // Step 1. Exchange authorization code for access token.
    function (req, res, next) {
      var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
      };

      request.get({
        url: accessTokenUrl,
        qs: params,
        json: true
      }, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
          res.status(500).send({
            message: accessToken.error.message
          });
          return;
        }
        req.accessToken = accessToken;
        next();
      });
    },

    // Step 2. Retrieve profile information about the current user.
    function (req, res, next) {
      var graphApiUrl = 'https://graph.facebook.com/v2.8/me?fields=id,name,first_name,last_name,gender,email,picture{url}';
      var accessToken = req.accessToken;

      request.get({
        url: graphApiUrl,
        qs: accessToken,
        json: true
      }, function (err, response, profile) {
        if (response.statusCode !== 200) {
          res.status(500).send({
            message: profile.error.message
          });
          return;
        }
        req.profile = profile;
        next();
      });
    },

    // Step 3a. Link user accounts.
    function (req, res, next) {
      if (!req.headers[authHeader]) {
        next();
        return;
      }
      var profile = req.profile;

      User.find({
        where: {
          facebook: profile.id
        }
      }, function (err, users) {
        var user = users[0];
        if (user) {
          res.status(409).send({
            message: 'There is already a Facebook account that belongs to you'
          });
          return;
        }
        var token = req.headers[authHeader].split(' ')[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        User.findById(payload.sub, function (err, user) {
          if (!user) {
            res.status(400).send({
              message: 'User not found'
            });
            return;
          }
          user.facebook = profile.id;
          user.displayName = user.displayName || profile.name;
          user.save(function () {
            res.send({
              token: createToken(user),
              user: user
            });
          });
        });
      });
    },
    // Step 3b. Create a new user account or return an existing one.
    function (req, res, next) {
      var profile = req.profile;
      var filter = {
        or: [{
          facebook: profile.id
        }, {
          email: profile.email
        }]
      };

      User.find({
        where: filter
      }, function (err, users) {
        var user = users[0];

        if (user) {
          if (!user.facebook) {
            user.facebook = profile.id;
            user.displayName = user.displayName || profile.name;
            user.save(function () {
              req.user = user;
              next();
            });
            return;
          }

          req.user = user;
          next();
          return;
        }

        User.create({
          displayName: profile.name,
          firstname: profile.first_name,
          lastname: profile.last_name,
          picture: profile.picture.data.url,
          facebook: profile.id,
          email: profile.email,
          password: profile.id
        }, function (err, user) {
          if (err) {
            res.send(err);
            return;
          }
          User.app.models.Contact.create({
            firstname: user.firstname,
            lastname: user.lastname,
            picture: user.picture,
            email: user.email,
            gender: profile.gender || null,
            accountId: user.id,
            created_at: new Date(),
            created_by: user.id,
            updated_at: new Date(),
            updated_by: user.id
          }, function (err, contact) {
            if (err) {
              res.status(500).send(err);
              return;
            }
            User.app.models.Preference.create({
              contactId: contact.id,
              created_at: new Date(),
              created_by: contact.id,
              updated_at: new Date(),
              updated_by: contact.id
            }, function (err, preference) {
              if (err) {
                res.status(500).send(err);
                return;
              }
            });
          })
          req.user = user;
          next();
        });
      });
    }, sendAccessToken);




};
