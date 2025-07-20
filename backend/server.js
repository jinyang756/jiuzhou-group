const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 引入路由
const indexRouter = require('./routes/index');
const hotColumnsRouter = require('./routes/hot-columns');
const philosophyRouter = require('./routes/philosophy');
const galaxyMapRouter = require('./routes/galaxy-map');
const toolboxRouter = require('./routes/toolbox');
const joinUsRouter = require('./routes/join-us');
const starGateRouter = require('./routes/star-gate');

// 使用路由
app.use('/', indexRouter);
app.use('/hot-columns', hotColumnsRouter);
app.use('/philosophy', philosophyRouter);
app.use('/galaxy-map', galaxyMapRouter);
app.use('/toolbox', toolboxRouter);
app.use('/join-us', joinUsRouter);
app.use('/star-gate', starGateRouter);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;