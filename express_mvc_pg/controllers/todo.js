// 先從 model 引入 todos 資料
const todoModel = require('../models/todo')

// 建立一個 todoController 物件，透過方法來存取 model 的資料
const todoController = {
  // 傳入參數 req, res
  getAll: (req, res) => {
    const todos = todoModel.getAll()
    res.render('todos', {
      todos
    })
  },

  get: (req, res) => {
    const id = req.params.id
    const todo = todoModel.get(id)
    res.render('todo', {
      todo
    })
  },

  pg_test: (req, res) => {
    // 改成 callback 非同步操作
    todoModel.dbtest((err, results) => {
      // 如果有 err 就印出錯誤訊息
      if (err) return console.log(err);
      // 不然就把 todos 傳給 view
      console.log(results)
      res.render('pg_data', {
        results: results
      })
    })
  },
}

module.exports = todoController