const mongo = require("mongodb");
// load env
require('dotenv').config();
console.log(process.env.mongodb_url);

const url = process.env.mongodb_url;
const clinet = new mongo.MongoClient(url);

clinet.connect(async function(err){
    if(err){
        console.log("錯誤",err);
        return;
    }
    console.log("連線成功");
    let db = clinet.db("website")
    let collection = db.collection("user")

    //--------------------------------------------新增
    // 新增單筆
    // let result = await collection.insertOne({
    //     email:"test2@test.com",
    //     password:"test2",
    //     level:1
    // })
    // console.log("資料編號",result.insertedId)

    // 新增多筆
    // let result = await collection.insertMany([{
    //     email:"test0@test.com",
    //     password:"test0",
    //     level:0
    // },{
    //     email:"test1@test.com",
    //     password:"test1",
    //     level:0
    // },{
    //     email:"test2@test.com",
    //     password:"test2",
    //     level:0
    // },{
    //     email:"test3@test.com",
    //     password:"test3",
    //     level:3
    // },{
    //     email:"test4@test.com",
    //     password:"test4",
    //     level:4
    // },
    // {
    //     email:"test5@test.com",
    //     password:"test5",
    //     level:5
    // }]);
    // console.log("資料編號",result.insertedIds);

    //--------------------------------------------更新
    //       $set 覆蓋、新增
    //       $unset 刪欄位
    //       $inc +- int
    //       $mul */ int

    // // 更新資料
    // let result= await collection.updateOne({
    //     email:"test3@test.com"
    // },{
    //     $set:{
    //         password:"azaz"
    //     }
    // });

    // 更新多筆資料
    // let result= await collection.updateMany({
    //     level:1
    // },{
    //     $set:{
    //         password:"111",
    //         role:"reader"
    //     }
    // });

    //刪除欄位
    // let result= await collection.updateMany({
    //     level:1
    // },{
    //     $unset:{
    //         role:""
    //     }
    // });

    // console.log("符合條件數量",result.matchedCount);
    // console.log("實際更新數量",result.modifiedCount);

    //-------------------刪除-----------------------
    // 單筆
    // let result=await collection.deleteOne({
    //     email:"test@test.com"
    // });
    // console.log("實際刪除的資料數量",result.deletedCount)
    // 多筆
    // let result=await collection.deleteMany({
    //     level:1
    // });
    // console.log("實際刪除的資料數量",result.deletedCount)

    // result=collection.deleteOne({_id:new ObjectId("61d5a2876cf2a77ae518fbe6")});
    // console.log("刪除的數量",result.deleted_count)
    // collection.deleteOne({_id: new ObjectId("61d5a2876cf2a77ae518fbe6")},  function(err, res) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Done");
    //     }
    //   });


    //-------------------篩選-----------------------
    // let result= await collection.find({
    //     level:0
    // })
    // await result.forEach(function(data){
    //     console.log(data)
    // })
    // 多條件  $and  ,  $or
    // let result= await collection.find({
    //     $and:[
    //         {level:0},
    //         {email:"test1@test.com"}
    //     ]
    // });
    // await result.forEach(function(data){
    //     console.log(data)
    // });

    // 排序
    let result= await collection.find({}).sort({
        level:-1 //根據level排序 -1大到小  1小到大
    });
    await result.forEach(function(data){
        console.log(data)
        console.log(data.email)

    });

    clinet.close();
    console.log("---資料庫關閉---");

})
