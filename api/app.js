var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/note', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const alertRoute = require('./routes/alert.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/alert', alertRoute);
app.post('/capivair', function(req, res){
   res.send("Hello World!");
});

app.listen(3000,function(){
    console.log('Listening on port 3000!');
});

const SERVER_KEY = 'AAAAgrUYNJU:APA91bGlrOhpAm3dw_TY0MRi5KWyQO0od-Ymn3L2WzjNjZZvYchRD1RG5eRsF5NEU91yumiuiHNPVBtD-JVGX3aUHV_9nY4fM9UTqGo0SfEQYKAXXBgnit4uYYAPjEi65TDMk3VH0QD3';

// Registrar o serviço de notificação push
async function subscribePush() {
  const subscription = await navigator.serviceWorker.register('/service-worker.js');

  // Obter a chave do PushManager
  const subscriptionJson = await subscription.toJSON();

  // Inscrever o usuário com o servidor
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscriptionJson),
    headers: {
      'content-type': 'application/json'
    }
  });
}
// Enviar notificação push para um usuário
async function changeIdPoint() {
  const title = 'Nova mensagem';
  const message = 'Você tem uma nova mensagem';
  const icon = '';
  alert(`text${title} text${message} text.${icon}` );

  // Obter as informações de inscrição do usuário do servidor
  const subscription = await fetch('/subscription').then(res => res.json());

  // Enviar a notificação push
  await webpush.sendNotification(subscription, JSON.stringify({
    title: title,
    message: message,
    icon: icon
  }));
}
