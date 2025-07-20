const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 数据文件路径
const dataFilePath = path.join(__dirname, '..', 'data', 'philosophy.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// 确保数据文件存在
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// 获取所有理念宗旨
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// 添加新的理念宗旨
router.post('/', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const philosophy = JSON.parse(data);
    philosophy.push(req.body);
    fs.writeFileSync(dataFilePath, JSON.stringify(philosophy, null, 2));
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// 更新理念宗旨
router.put('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const philosophy = JSON.parse(data);
    const index = philosophy.findIndex(item => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    philosophy[index] = { ...philosophy[index], ...req.body };
    fs.writeFileSync(dataFilePath, JSON.stringify(philosophy, null, 2));
    res.json(philosophy[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// 删除理念宗旨
router.delete('/:id', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const philosophy = JSON.parse(data);
    const filtered = philosophy.filter(item => item.id !== req.params.id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2));
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

module.exports = router;