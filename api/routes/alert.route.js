const express = require('express');
const app = express();
const alertRoutes = express.Router();

let Alert = require('../model/Alert');

// api to add alert
alertRoutes.route('/capivair').post(function (req, res) {
  let alert = new Alert(req.body);
  alert.save()
  .then(alert => {
    res.status(200).json({'status': 'success','mssg': 'alert added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get alerts
alertRoutes.route('/').get(function (req, res) {
  Alert.find(function (err, alerts){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','alerts': alerts});
    }
  });
});

// api to get alert
alertRoutes.route('/alert/:id').get(function (req, res) {
  let id = req.params.id;
  Alert.findById(id, function (err, alert){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','alert': alert});
    }
  });
});

// api to update route
alertRoutes.route('/update/:id').put(function (req, res) {
    Alert.findById(req.params.id, function(err, alert) {
    if (!alert){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        alert.name = req.body.name;
        alert.id = req.body.id;
        alert.alert = req.body.alert;

        alert.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
alertRoutes.route('/delete/:id').delete(function (req, res) {
  Alert.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = alertRoutes;