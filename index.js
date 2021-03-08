const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port,(err)=>err?console.log(err):console.log('Serven opened'));

const wss = new WebSocket.Server({server,path:'/webSocket'});

wss.on('listening',()=>console.log('Web Socket opened'));

wss.on('connection',ws=>{
    ws.on('message',(data)=>{
        wss.clients.forEach(client=>{
            if(client!==ws && client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
})