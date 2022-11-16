const express = require('express');
const app = express();
const port = 5001;
const db = require('./db')

const morgan = require('morgan')
app.use(morgan('combined'))

// 引入 controller
const todoController = require('./controllers/todo')

// 設定 view engine
app.set('view engine', 'ejs')

app.get('/todos', todoController.getAll)
app.get('/todo/:id', todoController.get)
app.get('/db', todoController.pg_test)


app.listen(port, () => {
    db.connect()
    console.log(`Example app listening at http://localhost:${port}`)
})