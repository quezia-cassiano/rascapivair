const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Alert = new Schema({
  name: {
    type: String
  },
  empresa: {
    type: String
  },
  alert: {
    type: String
  }
},
{
    collection: 'alert'
});

module.exports = mongoose.model('Alert', Alert);