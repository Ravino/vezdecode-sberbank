"use strict";


const SocketioClient = require("socket.io-client");


const client = SocketioClient('http://localhost:9010', { path: '/websocket', transport: ['websocket'], upgrade: false});


client.on('connect', () => {
  console.log('connect');
  const obj = {
    chatId: 1,
    body: 'test'
  };
  client.emit('room-join', obj);
  setInterval(() => {
    client.emit('room-message', obj);
  }, 1000);
});
