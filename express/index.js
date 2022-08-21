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


app.get("/", function(req, res) {
    res.render('home.ejs');

    // res.send("Hello")

    // let data1={x:3}
    // res.send(data1)

    // let data2=[1,2,3,4,5,6]
    // res.send(data2)
})

app.get("/get_reqdata", function(req, res) {
    res.send("Hello? what do you want?")
    console.log("主機IP:", req.ips);
    // console.log("主機餅乾:", req.cookies);
    console.log("主機名稱:", req.hostname);
    console.log("通訊協定:", req.protocol);
    console.log("路徑:", req.path);

    // 標頭
    console.log("使用者代理", req.get("user-agent"));
    console.log("語言偏好", req.get("accept-language"));
    // console.log(res);
})

// 要求字串
app.get("/get_data", function(req, res) {
    const name = req.query.name;
    if (name) {
        res.send({ "name": name })
    } else {
        // 導向
        res.redirect("/")
    }
})

// 使用樣板檔案
app.get("/ejs",function(req,res){
    // const name = req.query.name;
    // req.session.data = name;
    res.render("name.ejs", { name : name })
})

//session test
app.get("/test",function(req,res){
    const name = req.session.data;
    res.send("最近查過" + name)
})

//表單利用
// get 方法
app.get("/get_form_data",function(req,res){
    const name = req.query.data;

    //  save session
    req.session.data = name;

    res.render("name.ejs", { name : name})
})

//處理post 方法傳遞的參數
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.post("/get_form_data",function(req,res){
    const name = req.body.data;

    //  save session
    req.session.data = name;

    res.render("name.ejs", { name : name })
})

app.listen(3000, function() {
    console.log("my first server")
});