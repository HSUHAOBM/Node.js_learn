// 資料庫
const mongo = require("mongodb");

// load env
require('dotenv').config();
console.log(process.env.mongodb_url);
const url = process.env.mongodb_url;

const clinet = new mongo.MongoClient(url);
let db = null;

clinet.connect(async function(err){
    if(err){
        console.log("資料庫連線錯誤",err);
        return;
    }
    db = clinet.db("member_system")
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
app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/member",async function(req,res){
    if(req.session.member){
    const name = req.session.member.name;

    //取所有會員資料
    const collection = db.collection("member")
    let result = await collection.find({})
    let data = [];
    await result.forEach(function(member){
        data.push(member);
    })
    // console.log(data)
    res.render("member.ejs",{name:name,data:data});
    }else{
        res.redirect("/")
    }
});

app.get("/error",function(req,res){
    const msg = req.query.msg;
    res.render("error.ejs",{msg:msg});
});

// 註冊功能
app.post('/signup',async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //檢查資料庫資料
    const collection = db.collection("member")
    let result= await collection.findOne({
        email:email
    });
    if (result !== null){
        res.redirect("/error?msg=註冊失敗,信箱重複");
        return;
    };

    // 將新會員的資料存入資料庫
    result = await collection.insertOne({
        name:name,
        email:email,
        password:password
    });
    // 成功 導至
    res.redirect("/")
})

//登入
app.post('/signin',async function(req,res){
    const email =req.body.email;
    const password =req.body.password;

    const collection=db.collection("member")
    let result= await collection.findOne({
        $and:[
            {email:email},
            {password:password}
        ]
    });
    if (result === null){
        res.redirect("/error?msg=帳號密碼錯誤");
        return;
    };
    req.session.member=result;
    res.redirect('/member')
});

//登出
app.get('/signout',async function(req,res){
    req.session.member=null;
    res.redirect('/')
})



app.listen(3000, function() {
    console.log("my first server")
});