const express = require('express')
const bodyParser = require('body-parser')

var userApi = express.Router();
userApi.use(bodyParser.text({type: '*/*'}))

userApi.get('/', (req, res) => {
  var user = JSON.parse(req.body)
  res.send('user info is ' + JSON.stringify(user))
})

userApi.post('/', (req, res) => {
  var user = JSON.parse(req.body)
  res.send('get user data, user name is ' + user.name)
})

userApi.put('/', (req, res) => {
  var user = JSON.parse(req.body)
  user.age += 1
  res.send('return user info is ' + JSON.stringify(user))
})

userApi.delete('/', (req, res) => {
  var user = JSON.parse(req.body)
  res.send('user is deleted : ' + user.name)
})

module.exports = userApi;