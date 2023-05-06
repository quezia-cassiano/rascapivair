const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Alert = new Schema({
  name: {
    type: String
  },
  id: {
    type: Number
  },
  alerta: {
    type: String
  }
},
{
    collection: 'alert'
});

module.exports = mongoose.model('Alert', Alert);