const express = require('express');
const router = express.Router();

// 檔案處理
const multer = require("multer");
// 檔案輸出
const fs = require("fs-extra");
// uuid
const uuidv = require('uuid');

const upload = multer({
    limit: {
      // 限制上傳檔案大小為 10000000 byte
      fileSize: 10000000
    }
})

module.exports = function(db) {

    // 路由
    router.get("/", async function(req,res){
        const collection = db.collection("message");
        let result = await collection.find({}).toArray();
        res.render("index.ejs", { data : result.reverse() });
    });

    // 送出
    router.post('/sent', upload.single('file'), async function(req,res) {
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
    return router;
};