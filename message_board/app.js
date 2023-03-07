// server log
const morgan = require('morgan')
const express = require("express");
// 載入session 並設定
const session = require("express-session");
// 資料庫
const mongo = require("mongodb");
// load env
require("dotenv").config();

const url = process.env.mongodb_url;
const clinet = new mongo.MongoClient(url);
let db = null;

// 建立物件
const app = express();
// server log
app.use(morgan('combined'))

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

    // 將路由與應用程式連接
    const indexRouter = require("./routes/index");
    app.use("/", indexRouter(db));

    app.listen(3000, function() {
        console.log("server is running, http://localhost:3000")
    });
});




