const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3310

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const session = require("express-session");

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: false
});
app.use(sessionMiddleware);

// middlewares
const wrap = middleware => (
  socket, next) => middleware(socket.request, {}, next);

// 空間
const chat_space = io.of("/chat");
// add middlewares
chat_space.use(wrap(sessionMiddleware));

chat_space.on('connection', (socket) => {
  let session = socket.request.session;
  let user = session.user;
  let room = session.room;

  // 加房間
  socket.join(room);

  // 使用者加入
  chat_space.to(room).emit('chat message', user + " join the room\r");

  // 訊息傳送
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    chat_space.to(room).emit('chat message', user + " : " + msg );
  });

  // 登出聊天室按鈕
  socket.on('left', () => {
    console.log(session)
    session.destroy(()=>{
      chat_space.to(room).emit("chat message", user + " leave the room\n");
      chat_space.to(session.id).disconnectSockets()
    });
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on('broadcast', (msg) => {
    console.log(msg);
    chat_space.local.emit("chat message", user + ':' + msg + ' （在' + room + '房）\n');
  });
});

// 首頁
app.get("/",function(req,res){
  let user = req.session.user;
  let room = req.session.room;
  if(user && room){
    res.redirect("/chatroom")
  }else{
    res.render("room");
  }
});

app.post("/chat",function(req,res){
  // 接收表單
  req.session.user = req.body.user;
  req.session.room = req.body.room;
  // create session
  let user = req.session.user;
  let room = req.session.room;

  if(user && room){
    res.redirect("/chatroom")
  }
})

app.get("/chatroom",function(req,res){
  let user = req.session.user;
  let room = req.session.room;
  if(user && room){
    res.render('index', {room})
  }else{
    res.redirect("/")
  }
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});