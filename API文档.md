# 九州集团 API 文档

## 概述
这些API用于管理和获取九州集团网站上的三个关键区域的数据：
1. 九州热点栏目
2. 集团理念宗旨
3. 星际传送门

## API 服务层
API服务层封装在 `src/services/api-service.js` 文件中，提供了以下函数：

### 九州热点栏目
- `getHotColumns()`: 获取九州热点栏目数据
- `updateHotColumns(data)`: 更新九州热点栏目数据

### 集团理念宗旨
- `getGroupPhilosophy()`: 获取集团理念宗旨数据
- `updateGroupPhilosophy(data)`: 更新集团理念宗旨数据

### 星际传送门
- `getStarGate()`: 获取星际传送门数据
- `updateStarGate(data)`: 更新星际传送门数据

### 缓存管理
- `clearApiCache()`: 清空API缓存

## 数据结构

### 九州热点栏目数据结构
```json
{
  "columns": [
    {
      "id": "sand-table",
      "title": "九州沙盘推衍",
      "description": "集团战略智能投资AI，金融市场的沙盘世界。",
      "status": "under-construction",
      "link": null
    },
    // 更多栏目...
  ]
}
```

### 集团理念宗旨数据结构
```json
{
  "title": "九州国际理念宗旨",
  "values": [
    {
      "id": "wisdom",
      "title": "智领未来",
      "description": "以前瞻性视野和创新科技，引领行业变革，创造无限可能。"
    },
    // 更多价值...
  ]
}
```

### 星际传送门数据结构
```json
{
  "title": "九州星河传送门—探索财富之旅",
  "portals": [
    {
      "id": "navigation",
      "title": "星际导航手册",
      "description": "用户须知务必查阅",
      "link": "#"
    },
    {
      "id": "toolbox",
      "title": "九州工具箱",
      "description": "实用工具集合",
      "link": "#",
      "subItems": [
        {
          "id": "free-apps",
          "title": "九州免费产品应用",
          "link": "#"
        },
        // 更多子项...
      ]
    },
    // 更多传送门...
  ]
}
```

## 使用示例

### 在Vue组件中使用
```javascript
import { getHotColumns, getGroupPhilosophy, getStarGate } from '../services/api-service.js';

export default {
  data() {
    return {
      hotColumns: null,
      groupPhilosophy: null,
      starGate: null
    };
  },
  methods: {
    async fetchData() {
      try {
        this.hotColumns = await getHotColumns();
        this.groupPhilosophy = await getGroupPhilosophy();
        this.starGate = await getStarGate();
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
```

## 测试组件
我们提供了一个测试组件 `src/components/ApiTest.vue`，您可以将其添加到任何页面中以测试API的功能。

## 集成到现有网站
要将这些API集成到现有的index.html中，您可以：
1. 引入Vue.js和必要的依赖
2. 创建一个Vue实例
3. 使用API服务获取数据
4. 将数据绑定到DOM元素

## 注意事项
1. 这些API目前是模拟的，在实际项目中，您需要将它们连接到真实的后端服务
2. 数据存储在JSON文件中，方便您进行修改和测试
3. 为了提高性能，API使用了缓存机制
4. 请确保在生产环境中适当保护这些API，避免未授权访问

## 未来扩展
1. 添加身份验证和授权
2. 实现更复杂的查询和过滤功能
3. 增加数据验证和错误处理
4. 集成实时更新功能

希望这个API文档对您有所帮助！如果您有任何问题或建议，请随时联系我们。