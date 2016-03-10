/**
 * Created by gsolis on 3/9/16.
 */

var Util = require('../utils/util'),
    Candidate = require('../models/candidate');

var CandidatesController = function(app){

  app.get('/api/candidates', function(req, res){
    Candidate.find(function(err, candidates){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(candidates);
    })
  });

  app.get('/api/candidates/:id', function(req, res){
    Candidate.findOne({id: req.params.id}, function(err, candidate){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(candidate);
    })
  });

  app.post('/api/candidates', function(req, res){
    var candidate = req.body;
    if(candidate.id){
      Candidate.findOneAndUpdate({id: candidate.id}, candidate, {new: true}, function(err, _candidate) {
        if(err)
          logError(res, err, 500, 'Unexpected Error.');
        else
          res.status(200).send(_candidate);
      });
    }else{
      candidate = new Candidate(candidate);
      candidate.id = Util.newId();
      candidate.save(function(err){
        if(err)
          logError(res, err, 500, 'Unable to create the candidate.');
        else
          res.status(201).send(candidate);
      })
    }
  });

  app.delete('/api/candidates/:id', function(req, res){
    Candidate.remove({id: req.params.id}, function(err){
      if(err)
        logError(res, err, 500, 'Unable to delete the candidate.');
      else
        res.status(200).send('Candidate successfully deleted.');
    })
  });

  function logError(response, error, code, message){
    if(error) console.log(error);
    response.status(code).send(message);
  }

};

module.exports = CandidatesController;