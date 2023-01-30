const express = require('express')
const userApi = express.Router();

userApi.get('/', (req, res) => {
  /*
    #swagger.tags = ['Users']
  } */


  let user = {
      "name":"J",
      "age":18
  }
  res.send('user info is ' + JSON.stringify(user))
})

userApi.post('/', (req, res) => {
    /* 	#swagger.tags = ['Users']
        #swagger.description = 'description' */
  /*
  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User information.',
        required: true,
        schema:{
          "name":"J",
          "age":18
        }
    }
  */
  let user = JSON.parse(req.body)
  res.send('get user data, user name is ' + user.name)
})

userApi.put('/', (req, res) => {
  /*
    #swagger.tags = ['Users']
  } */
  let user = JSON.parse(req.body)
  user.age += 1
  res.send('return user info is ' + JSON.stringify(user))

})

userApi.delete('/', (req, res) => {
  /*
    #swagger.tags = ['Users']
  } */

  /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: 'User information.',
        required: true,
        schema: { $ref: "#/definitions/AddUser" }
  } */
  let user = JSON.parse(req.body)
  res.send('user is deleted : ' + user.name)
})

module.exports = userApi;