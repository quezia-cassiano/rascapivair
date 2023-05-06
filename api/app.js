var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/note', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const alertRoute = require('./routes/alert.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/alert', alertRoute);
app.get('/', function(req, res){
   res.send("Hello World!");
});

app.listen(27017,function(){
    console.log('Listening on port 27017!');
});

const SERVER_KEY = 'AAAAgrUYNJU:APA91bGlrOhpAm3dw_TY0MRi5KWyQO0od-Ymn3L2WzjNjZZvYchRD1RG5eRsF5NEU91yumiuiHNPVBtD-JVGX3aUHV_9nY4fM9UTqGo0SfEQYKAXXBgnit4uYYAPjEi65TDMk3VH0QD3';

// Registrar o serviço de notificação push
async function subscribePush() {
  const subscription = await navigator.serviceWorker.register('/sw.js');

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
async function sendPushNotification() {
  const title = 'Você tem um novo alerta';
  const message = 'Atenção! Você possui um novo alerta';
  const icon = '/images/pin-loc-orange.png';

  // Obter as informações de inscrição do usuário do servidor
  const subscription = await fetch('/subscription').then(res => res.json());

  // Enviar a notificação push
  await webpush.sendNotification(subscription, JSON.stringify({
    title: title,
    message: message,
    icon: icon
  }));
}
