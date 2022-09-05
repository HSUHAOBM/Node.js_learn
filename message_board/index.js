// 資料庫
const mongo = require("mongodb");
// 檔案處理
const multer = require("multer");
// 檔案輸出
const fs = require("fs-extra");
// uuid
const uuidv = require('uuid');

// load env
require("dotenv").config();
const url = process.env.mongodb_url;

const clinet = new mongo.MongoClient(url);
let db = null;

const upload = multer({
    limit: {
      // 限制上傳檔案大小為 10000000 byte
      fileSize: 10000000
    }
  })

clinet.connect(async function(err){
    if(err){
        console.log("資料庫連線錯誤",err);
        return;
    }
    db = clinet.db("learn_node")
    console.log("資料庫連線成功");
});

const express = require("express");
// 建立物件
const app = express();
// 靜態檔案
app.use(express.static("static"));
// 設定樣板引擎// 並樣板檔案資料夾
app.set("view engine","ejs");
app.set("views","./views");
// 載入session 並設定
const session = require("express-session");
app.use(session({
    secret:"anywordisoklikess",
    resave:false,
    saveUninitialized:true
}))

//處理post方法傳遞的參數
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// 路由
app.get("/", async function(req,res){
    const collection = db.collection("message");
    let data = [];
    let result = await collection.find({});

    await result.forEach(function(message_data){
        data.push(message_data);
    })

    res.render("index.ejs", { data : data.reverse() });

});

// 送出
app.post('/sent', upload.single('file'), async function(req,res) {
    // console.log(req.file)
    // console.log(req.body)
    let file_src = null;
    let message = null;
    
    // 文字
    if (req.body.message){
      message = req.body.message;
    }

    // 檔案
    if (req.file){
      // 確認路徑
      if (fs.existsSync("./static/pic/") == false) {
        fs.mkdirSync("./static/pic/")
        console.log('create pic')
      }
      // get file
      let upload_file = req.file.buffer;
      // uuid
      let upload_file_uuid = uuidv.v4();
      // 副檔名
      let file_type = req.file.originalname.split(".")[1];
      file_src = "./static/pic/" + upload_file_uuid + "." + file_type;
      fs.createWriteStream(file_src).write(upload_file);
      file_src = "." + file_src.split("./static")[1]
    }
    const collection = db.collection("message");

    result = await collection.insertOne({
      message : message,
      file : file_src
    });

    res.redirect("/")
  });




app.listen(3000, function() {
    console.log("server is running")
});