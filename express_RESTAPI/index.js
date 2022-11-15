var express = require('express');
const app = express()
const port = 3310

// url, 檔案路徑
app.use('/api/user', require('./api/user'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})