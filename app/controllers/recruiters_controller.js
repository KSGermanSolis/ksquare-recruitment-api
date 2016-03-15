/**
 * Created by gsolis on 3/11/16.
 */

var Util = require('../utils/util'),
    Recruiter = require('../models/recruiter');

var RecruitersController = function(app){

  app.get('/api/recruiters', function(req, res){
    Recruiter.find({deleted: false}, function(err, recruiters){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(recruiters);
    })
  });

  app.get('/api/recruiters/:id', function(req, res){
    Recruiter.findOne({id: req.params.id}, function(err, recruiter){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(recruiter);
    })
  });

  app.post('/api/recruiters', function(req, res){
    var recruiter = req.body;
    if(recruiter.id){
      Recruiter.findOneAndUpdate({id: recruiter.id}, recruiter, {new: true}, function(err, _recruiter) {
        if(err)
          logError(res, err, 500, 'Unexpected Error.');
        else
          res.status(200).send(_recruiter);
      });
    }else{
      recruiter = new Recruiter(recruiter);
      recruiter.id = Util.newId();
      recruiter.deleted = false;
      recruiter.save(function(err){
        if(err)
          logError(res, err, 500, 'Unable to create the recruiter.');
        else{
          res.status(201).send(recruiter);
        }
      })
    }
  });

  app.delete('/api/recruiters/:id', function(req, res){
    Recruiter.findOneAndUpdate({id: req.params.id}, {deleted: true}, {new: true}, function(err, _recruiter) {
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send('Recruiter successfully deleted.');
    });
    //Recruiter.remove({id: req.params.id}, function(err){
    //  if(err)
    //    logError(res, err, 500, 'Unable to delete the recruiter.');
    //  else{
    //    res.status(200).send('Recruiter successfully deleted.');
    //  }
    //})
  });

  function logError(response, error, code, message){
    if(error) console.log(error);
    response.status(code).send(message);
  }

};

module.exports = RecruitersController;