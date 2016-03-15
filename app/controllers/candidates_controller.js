/**
 * Created by gsolis on 3/9/16.
 */

var Util = require('../utils/util'),
    Candidate = require('../models/candidate'),
    CandidateHour = require('../models/candidate_hour');

var CandidatesController = function(app){

  app.get('/api/candidates', function(req, res){
    Candidate.find(function(err, candidates){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(candidates);
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
        else{
          res.status(201).send(candidate);
          setupCandidateInitialHours(candidate);
        }
      })
    }
  });

  app.delete('/api/candidates/:id', function(req, res){
    Candidate.remove({id: req.params.id}, function(err){
      if(err)
        logError(res, err, 500, 'Unable to delete the candidate.');
      else{
        res.status(200).send('Candidate successfully deleted.');
        deleteCandidateHours(req.params.id);
      }
    })
  });

  /* Candidate Hours */
  app.post('/api/candidates/hours', function(req, res){
    var candidateHours = req.body;
    if(candidateHours.id){
      CandidateHour.findOneAndUpdate({id: candidateHours.id}, candidateHours, {new: true}, function(err, _candidateHours) {
        if(err)
          logError(res, err, 500, 'Unexpected Error.');
        else
          res.status(200).send('Hours successfully saved');
      });
    }
    else {
      candidateHours = new CandidateHour(candidateHours);
      candidateHours.id = Util.newId();
      candidateHours.save(function(err, _candidateHours){
        if(err)
          logError(res, err, 500, 'Unexpected Error.');
        else
          res.status(200).send('Hours successfully saved.');
      })
    }
  });

  app.get('/api/candidates/:id/hours', function(req, res){
    CandidateHour.findOne({candidateId: req.params.id}, function(err, candidateHours){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(candidateHours);
    })
  });

  function setupCandidateInitialHours(candidate){
    var candidateHours = new CandidateHour();
    candidateHours.id = Util.newId();
    candidateHours.candidateId = candidate.id;
    candidateHours.hours = {};

    var firstYear = candidate.startDate.getFullYear();
    var lastYear = candidate.endDate.getFullYear();
    var startMonth = candidate.startDate.getMonth();
    var endMonth = candidate.endDate.getMonth();
    if(firstYear === lastYear){
      var months = getMonths();
      var i = 0;
      for(var month in months){
        if(i >= startMonth && i <= endMonth)
          months[month].active = true;
        i++;
      }
      candidateHours.hours[firstYear] = months;
    }else {
      for (var year =+ candidate.startDate.getFullYear(), to =+ candidate.endDate.getFullYear(); year<=to; year++){
        var months = getMonths();
        var i = 0;
        for(var month in months){
          if((firstYear == year && i >= startMonth) ||
            (lastYear == year && i <= endMonth) ||
            (firstYear != year && lastYear != year))
            months[month].active = true;
          i++;
        }
        candidateHours.hours[year] = months;
      }
    }

    candidateHours.save(function(err){
      if(err) console.log(err);
    });
  }

  function getMonths(){
    return {
      jan: {active: false, value: 0},
      feb: {active: false, value: 0},
      mar: {active: false, value: 0},
      apr: {active: false, value: 0},
      may: {active: false, value: 0},
      jun: {active: false, value: 0},
      jul: {active: false, value: 0},
      aug: {active: false, value: 0},
      sep: {active: false, value: 0},
      oct: {active: false, value: 0},
      nov: {active: false, value: 0},
      dec: {active: false, value: 0}
    };
  }

  function deleteCandidateHours(candidateId){
    CandidateHour.remove({candidateId: candidateId}, function(err){
      if(err) console.log(err);
    })
  }

  function logError(response, error, code, message){
    if(error) console.log(error);
    response.status(code).send(message);
  }

};

module.exports = CandidatesController;