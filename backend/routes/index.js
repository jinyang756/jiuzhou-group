const express = require('express');
const router = express.Router();

// 首页路由
router.get('/', (req, res) => {
  res.send('Welcome to Jiuzhou Group Backend API');
});

module.exports = router;