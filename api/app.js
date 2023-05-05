//import express from 'express';
//import cors from 'cors';
//import WebPush from 'web-push';

const express = require('express');
const FCM = require('fcm-node');
const SERVER_KEY = 'AAAAgrUYNJU:APA91bGlrOhpAm3dw_TY0MRi5KWyQO0od-Ymn3L2WzjNjZZvYchRD1RG5eRsF5NEU91yumiuiHNPVBtD-JVGX3aUHV_9nY4fM9UTqGo0SfEQYKAXXBgnit4uYYAPjEi65TDMk3VH0QD3';

const app = express();

// Middleware para análise de corpo JSON
app.use(express.json());

// Rota para enviar mensagem FCM
app.post('/send-fcm', async (req, res, next) => {
  try {
    const fcm = new FCM(SERVER_KEY);
    const message = {
      to: `/topics/${req.body.topic}`,
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: 'default',
        click_action: 'FCM_PLUGIN_ACTIVITY',
        icon: 'fcm_push_icon'
      }
    };
    fcm.send(message, (err, response) => {
      if (err) {
        next(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    next(error);
  }
});

function enviarNotificacao() {
    // envia a notificação para o usuário
    notificacoes.enviar({
        titulo: "Ponto de Monitoramento atualizado",
        mensagem: "O ponto de monitoramento foi atualizado com sucesso.",
        url: "http"
    });
}

// Inicia o servidor
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
