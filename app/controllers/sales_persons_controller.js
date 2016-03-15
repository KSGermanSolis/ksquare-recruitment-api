/**
 * Created by gsolis on 3/11/16.
 */

var Util = require('../utils/util'),
    SalesPerson = require('../models/sales_person');

var SalesPersonsController = function(app){

  app.get('/api/sales_persons', function(req, res){
    SalesPerson.find({deleted: false}, function(err, salesPersons){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(salesPersons);
    })
  });

  app.get('/api/sales_persons/:id', function(req, res){
    SalesPerson.findOne({id: req.params.id}, function(err, salesPerson){
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send(salesPerson);
    })
  });

  app.post('/api/sales_persons', function(req, res){
    var salesPerson = req.body;
    if(salesPerson.id){
      SalesPerson.findOneAndUpdate({id: salesPerson.id}, salesPerson, {new: true}, function(err, _salesPerson) {
        if(err)
          logError(res, err, 500, 'Unexpected Error.');
        else
          res.status(200).send(_salesPerson);
      });
    }else{
      salesPerson = new SalesPerson(salesPerson);
      salesPerson.id = Util.newId();
      salesPerson.deleted = false;
      salesPerson.save(function(err){
        if(err)
          logError(res, err, 500, 'Unable to create the recruiter.');
        else{
          res.status(201).send(salesPerson);
        }
      })
    }
  });

  app.delete('/api/sales_persons/:id', function(req, res){
    SalesPerson.findOneAndUpdate({id: req.params.id}, {deleted: true}, {new: true}, function(err) {
      if(err)
        logError(res, err, 500, 'Unexpected Error.');
      else
        res.status(200).send('Sales Person successfully deleted.');
    });
  });

  function logError(response, error, code, message){
    if(error) console.log(error);
    response.status(code).send(message);
  }

};

module.exports = SalesPersonsController;