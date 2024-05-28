const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Middleware para log de conexões WebSocket
io.use((socket, next) => {
    console.log('Novo cliente WebSocket conectado:', socket.id);
    next();
});

io.on('connection', (socket) => {
    console.log(`Novo cliente conectado: ${socket.id}`);
    
    socket.on('mensagem', (data) => {
        console.log(`Mensagem recebida de ${socket.id}: ${data}`)
        io.emit('mensagem', data)        
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`)
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})