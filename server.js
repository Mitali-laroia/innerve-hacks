const express = require("express");
const ejs = require("ejs");
const http = require("http");
// const { Server } = require("socket.io");
const path = require("path");
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const fetch = require("node-fetch");

const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "ba18c402",
  apiSecret: "oNAWX0httVNJ9N74"
})
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use('/public/images/', express.static('./public/images'));
app.set('view engine', 'ejs');
// const server = http.createServer(app);
// const io = new Server(server);
// var usernames = {};
// var rooms = [
//   { name: "global", creator: "Anonymous" },
//   { name: "chess", creator: "Anonymous" },
// ];
// const server = http.createServer();


    
app.get('/', function(req,res){
    res.render('index');
})

app.get('/chat', function(req,res) {
    //chat stuff
    // Global variables to hold all usernames and rooms created
    

res.render('room');
})

// io.of('/chat').on("connection", function (socket) {
//   console.log(`User connected to server.`);

//   socket.on("createUser", function (username) {
//     socket.username = username;
//     usernames[username] = username;
//     socket.currentRoom = "global";
//     socket.join("global");

//     console.log(`User ${username} created on server successfully.`);

//     socket.emit("updateChat", "INFO", "You have joined global room");
//     socket.broadcast
//       .to("global")
//       .emit("updateChat", "INFO", username + " has joined global room");
//     io.sockets.emit("updateUsers", usernames);
//     socket.emit("updateRooms", rooms, "global");
//   });

//   socket.on("sendMessage", function (data) {
//     io.sockets.to(socket.currentRoom).emit("updateChat", socket.username, data);
//   });

//   socket.on("createRoom", function (room) {
//     if (room != null) {
//       rooms.push({ name: room, creator: socket.username });
//       io.sockets.emit("updateRooms", rooms, null);
//     }
//   });

//   socket.on("updateRooms", function (room) {
//     socket.broadcast
//       .to(socket.currentRoom)
//       .emit("updateChat", "INFO", socket.username + " left room");
//     socket.leave(socket.currentRoom);
//     socket.currentRoom = room;
//     socket.join(room);
//     socket.emit("updateChat", "INFO", "You have joined " + room + " room");
//     socket.broadcast
//       .to(room)
//       .emit(
//         "updateChat",
//         "INFO",
//         socket.username + " has joined " + room + " room"
//       );
//   });

//   socket.on("disconnect", function () {
//     console.log(`User ${socket.username} disconnected from server.`);
//     delete usernames[socket.username];
//     io.sockets.emit("updateUsers", usernames);
//     socket.broadcast.emit(
//       "updateChat",
//       "INFO",
//       socket.username + " has disconnected"
//     );
//   });
// });


//catch post from out main js
app.get('/sms', function(req,res){
  res.render('sms');
})

app.post('/sms', function(req, res){
  // response.send(request.body);
  // console.log(request.body)
  const phoneNumber = req.body.number;
  const textMessage = req.body.text;
  console.log(phoneNumber);

  const from = 'Vonage APIs';
  const to = phoneNumber;
  const text =  textMessage;
//     nexmo.message.sendSms(from, to, text, {type:'unicode'}, (error,responseData) =>{
//         if(error){
//             console.log(error)
//         }else{
//             console.dir(responseData);
//             //get repsponse data
//             const data = {
//                 id: responseData.messages[0]['message-id'],
//                 number: responseData.messages[0]['to']
//             }
//             //send to client
//             io.emit('smsStatus', data);
//         }
//     });

//     const from = "Vonage APIs"
// const to = "919643286358"
// const text = 'A text message sent using the Vonage SMS API'

vonage.message.sendSms(from, to, text, (err, responseData) => {
  if (err) {
      console.log(err);
  } else {
      if(responseData.messages[0]['status'] === "0") {
          console.log("Message sent successfully.");
      } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      }
  }
})
});

var port = process.env.PORT || 8080;
const server = app.listen(port, function(){
    console.log("server up and running on port 8000");
});

//connect to sockets
const io = socketio(server);
io.on('connection', (socket) =>{
    console.log('Connected'); 
    io.on('disconnect', () =>{
        console.log('Disconnected');
    })
});