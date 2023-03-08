// server log
const morgan = require('morgan')
const express = require("express");
// 載入session 並設定
const session = require("express-session");
// 資料庫
const mongo = require("mongodb");
// load env
require("dotenv").config();

const http = require('http');
const socketIO = require('socket.io');

const url = process.env.mongodb_url;
const clinet = new mongo.MongoClient(url);
let db = null;

// 建立物件
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// // server log
// app.use(morgan('combined'))

// 靜態檔案
app.use(express.static("static"));
//處理post方法傳遞的參數
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// 設定樣板引擎// 並樣板檔案資料夾
app.set("view engine","ejs");
app.set("views","./views");

app.use(session({
    secret:"anywordisoklikess",
    resave:false,
    saveUninitialized:true
}))


clinet.connect(async function(err){
    if(err){
        console.log("資料庫連線錯誤",err);
        return;
    }
    db = clinet.db("learn_node")
    console.log("資料庫連線成功");

    // 將 io 傳遞給路由
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // 將路由與應用程式連接
    const indexRouter = require("./routes/index");
    app.use("/", indexRouter(db));

    let connectedClients = 0;
    // socket.io
    io.on('connection', (socket) => {
        connectedClients++;
        console.log(`a user connected, total connected clients: ${connectedClients}`);
        io.emit('connected clients', connectedClients);

        socket.on('set nickname', (nickname) => {
            socket.nickname = nickname;
            io.emit('chat message' , nickname + ' join the room\r');

        });

        // 訊息傳送
        socket.on('chat message', (msg) => {
            io.emit('chat message',  socket.nickname + " : " + msg );
        });

        socket.on('disconnect', () => {
            console.log(socket.nickname + 'disconnected');
            connectedClients--;
            console.log(`a user disconnected, total connected clients: ${connectedClients}`);
            io.emit('connected clients', connectedClients);

        });
    });



    server.listen(3000, function() {
        console.log("server is running, http://localhost:3000")
    });
});




