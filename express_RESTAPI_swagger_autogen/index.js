var express = require('express');
const app = express()
const port = 3310

// url, 檔案路徑
app.use('/api/user', require('./api/user'));
app.use('/api/test', require('./api/test'));

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const bodyParser = require('body-parser')
app.use(bodyParser.text({type: '*/*'}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/doc`)
})