const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data,isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(isBinary);
        
        console.log(data);
        
        client.send(data);
      }
    });
  });
});

server.listen(6969, () => {
  console.log(`Server is listening on ws://localhost:6969!`);
});