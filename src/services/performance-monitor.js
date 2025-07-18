// 性能监控服务
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      frameTime: 0,
      memory: 0,
      elementCount: 0,
      loadTime: 0
    };
    this.observers = [];
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.frameCount = 0;

    // 初始化监控
    this.init();
  }

  // 初始化监控
  init() {
    // 监听页面加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.metrics.loadTime = performance.now() - this.startTime;
        console.log(`页面加载时间: ${this.metrics.loadTime.toFixed(2)}ms`);
      });
    } else {
      this.metrics.loadTime = performance.now() - this.startTime;
      console.log(`页面加载时间: ${this.metrics.loadTime.toFixed(2)}ms`);
    }

    // 启动FPS监控
    requestAnimationFrame(this.update.bind(this));

    // 定期检查内存使用
    setInterval(this.checkMemory.bind(this), 1000);
  }

  // 更新性能指标
  update(timestamp) {
    // 计算FPS
    const delta = timestamp - this.lastFrameTime;
    this.frameCount++;

    if (delta >= 1000) {
      this.metrics.fps = Math.round((this.frameCount * 1000) / delta);
      this.frameCount = 0;
      this.lastFrameTime = timestamp;

      // 通知观察者
      this.notifyObservers();
    }

    // 计算帧时间
    this.metrics.frameTime = delta;

    requestAnimationFrame(this.update.bind(this));
  }

  // 检查内存使用
  checkMemory() {
    if (window.performance && window.performance.memory) {
      this.metrics.memory = Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024));
    }

    // 检查元素数量
    this.metrics.elementCount = document.querySelectorAll('*').length;
  }

  // 添加观察者
  addObserver(observer) {
    if (typeof observer === 'function') {
      this.observers.push(observer);
    }
  }

  // 通知所有观察者
  notifyObservers() {
    const metricsCopy = {...this.metrics};
    this.observers.forEach(observer => {
      try {
        observer(metricsCopy);
      } catch (error) {
        console.error('Observer error:', error);
      }
    });
  }

  // 获取当前性能指标
  getMetrics() {
    return {...this.metrics};
  }

  // 记录自定义性能指标
  recordMetric(name, value) {
    this.metrics[name] = value;
    console.log(`性能指标 [${name}]: ${value}`);
    this.notifyObservers();
  }
}

// 导出单例
const performanceMonitor = new PerformanceMonitor();
export default performanceMonitor;