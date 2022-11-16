const db = require('../db')

const todos = [
    'first todo', 'second todo', 'third todo'
  ]

// 建立一個 todoModel 物件，裡面放存取資料的方法（function）
const todoModel = {
  getAll: () => {
    return todos
  },

  get: id => {
    return todos[id]
  },
  // 測試
  dbtest:(cb) => {
    db.query(
      'select name from hr_employee', (err, results) => {
      if (err) return cb(err);
      // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
      cb(null, results)
      db.end()
    });
  },
}

module.exports = todoModel