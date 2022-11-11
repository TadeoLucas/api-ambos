const { sequelizeDB } = require('./models');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// io.on("connection", (socket) => {
  
//     socket.on("conectado", () => {
//       console.log('usuario conectado');
//     }); 
// });


require('dotenv').config();
const PORT = process.env.DB_PORT || 3001

const socketio = require('socket.io');
const io = socketio(server);


io.on('connection', (socket) => {
  

  socket.on('conectado', () => {
    console.log('usuario conectado');
  })
});



sequelizeDB.sync().then(()=>{
  server.listen(PORT, () => console.log(`listening.... ${PORT}`));
}).catch((error) => console.log('ERROR db.sync: __________', error));

