const fs = require("fs")

// 新增覆蓋
// fs.writeFile("./note", "this is my first", function(err) {
//     if (err) {
//         console.log("Error!!");
//     } else {
//         console.log("成功");
//     }
// });

// 讀取
// fs.readFile("./note", { encoding: "utf-8" }, function(err, data) {
//     if (err) {
//         console.log("Error!!")
//     } else {
//         console.log("成功,資料為:", data)
//     }
// })

//新增不覆蓋
fs.appendFile('note', '\n我很好！', function(err) {
    if (err)
        console.log(err);
    else
        console.log('Append operation complete.');
});