/**
 * Created by gsolis on 3/8/16.
 */

var Util = require('../utils/util'),
    User = require('../models/user');

var UsersController = function(app){
  var user = null;

  app.post('/api/login', authenticate, function(req, res){
    var userToken = Util.generateToken({id: user.id, username: user.first_name + ' ' + user.last_name});
    res.status(200).send({
      token: userToken,
      user: user
    });
  });

  function authenticate(req, res, next){
    var credentials = req.body;
    User.findOne({id: credentials.userId}, function(err, _user){
      if(err) logError(res, err, 500, 'Unexpected error, please contact support.');
      else {
        if(_user){
          if(Util.comparePassword(credentials.password, _user.salt, _user.password)){
            _user = _user.toObject();
            delete _user.password;
            delete _user.salt;
            user = _user;
            next();
          }
          else logError(res, err, 401, 'Invalid email or password.');
        }
        else
          logError(res, err, 401, 'Invalid email or password.');
      }
    })
  }

  function logError(response, error, code, message){
    if(error) console.log(error);
    response.status(code).send(message);
  }

};

module.exports = UsersController;