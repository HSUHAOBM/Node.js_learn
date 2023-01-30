const express = require('express');
const router_test = express.Router();

router_test.get('/', function (req, res, next) {
    // #swagger.tags = ['Index']
    res.status(200).json({
      msg: [],
      message: 'Delete!'
    })
  })
  .post('/post', function (req, res, next) {
    // #swagger.tags = ['Index']
    res.render('index', { title: 'post' });
  })
  .put('/put', function (req, res, next) {
    // #swagger.tags = ['Index']
    res.render('index', { title: 'put' });
  })
  .delete('/delete', function (req, res, next) {
    // #swagger.tags = ['Index']
    res.render('index', { title: 'delete' });
  });

module.exports = router_test;