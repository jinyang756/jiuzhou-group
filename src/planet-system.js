// 九州集团行星系统
// 导入数据加载函数 (假设它们位于 /js/services/data-loader.js)
import { fetchGroupData, fetchSubsidiaryData, fetchBusinessData } from '/js/services/data-loader.js';
// 导入Three.js库 (假设Three.js位于 /js/three.module.js)
import * as THREE from '/js/three.module.js'; // 根据您实际的Three.js路径调整

class PlanetSystem {
  constructor() {
    this.realms = {};
    this.planetsData = [];
    this.activeRealm = null;
    this.animationFrameId = null;
    this.mouse = { x: 0, y: 0 };
    this.mousePlanet = { x: 0, y: 0 };
    this.galaxyContainer = null;
    this.realmContainer = null;
    this.backButton = null;
    this.faderObserver = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.stars = null;
    this.orbitRadii = { 0: 0, 1: 180, 2: 300, 3: 420 };

    // 定义每个子域的实际URL，用于点击行星时跳转
    this.subsidiaryUrls = {
      home: 'https://jiuzhougroup.vip/',
      ridou: 'https://jiuzhougroup-rdtz.web.app/',
      jucaizhongfa: 'https://jiuzhougroup-jczf.web.app/',
      xianzhi: 'https://jiuzhougroup-xzhj.web.app/',
      xunfeitong: 'https://jiuzhougroup-xft.web.app/',
      passport: 'https://jiuzhougroup-txz.web.app/', // 注意：这里使用了 'passport' 作为内部ID，与之前提到的 '通行证' 匹配
      sandbox: 'https://jiuzhougroup-jzsp.web.app/',
      media: 'https://jiuzhougroup-jzcm.web.app/',
      tools: 'https://tools.jiuzhougroup.vip/', // 九州工具集没有提供新域名，暂时保留旧的
      // 其他子域的URL也需要在这里定义
      peininghui: 'https://jiuzhougroup.vip/peininghui.html', // 示例：如果不是子域名，而是主域下的路径
      baimumeile: 'https://jiuzhougroup.vip/baimumeile.html',
      qinqiuliuer: 'https://jiuzhougroup.vip/qinqiuliuer.html',
      huoyanmedia: 'https://jiuzhougroup.vip/huoyanmedia.html',
      juxuanxi: 'https://jiuzhougroup.vip/juxuanxi.html',
      xianuo: 'https://jiuzhougroup.vip/xianuo.html',
      lvtingqinxin: 'https://jiuzhougroup.vip/lvtingqinxin.html',
      mirouchushi: 'https://jiuzhougroup.vip/mirouchushi.html',
      pingsheng: 'https://jiuzhougroup.vip/pingsheng.html'
    };
  }

  // 初始化函数空间星球系统
  init() {
    this.galaxyContainer = document.getElementById('galaxy-container');
    this.realmContainer = document.getElementById('realm-container'); // 这个在跳转模式下可能不会被实际使用
    this.backButton = document.getElementById('back-to-galaxy'); // 这个按钮在跳转模式下也可能不再需要

    this.initThree();
    this.loadRealmData();
    this.initEventListeners();
  }

  // 异步加载领域数据
  async loadRealmData() {
    try {
      await this.fetchRealmData();
    } catch (error) {
      console.error('Error in loadRealmData:', error);
    }
  }

  // 实际获取领域数据的方法
  async fetchRealmData() {
    try {
      // 这里的 groupData 假设是您之前提供的结构，包含 subsidiaries
      // 为了演示，我将直接使用硬编码的数据，您可以替换为实际的 fetchGroupData() 调用
      const groupData = {
        subsidiaries: [
          { id: 'ridou', name: '日斗投资', type: 'investment' },
          { id: 'jucaizhongfa', name: '聚财众发', type: 'finance' },
          { id: 'xianzhi', name: '贤智汇聚', type: 'hr' },
          { id: 'xunfeitong', name: '讯飞通', type: 'technology' },
          { id: 'media', name: '九州传媒', type: 'media' },
          { id: 'sandbox', name: '九州沙盘', type: 'strategy' },
          { id: 'passport', name: '统一通行证', type: 'core' },
          // 确保所有子公司都在这里定义，以便在行星系统中显示
          { id: 'tools', name: '九州工具集', type: 'tools' },
          { id: 'peininghui', name: '容沛凝惠', type: 'ecommerce' },
          { id: 'baimumeile', name: '白慕梅乐', type: 'ecommerce' },
          { id: 'qinqiuliuer', name: '芹秋柳尔', type: 'ecommerce' },
          { id: 'huoyanmedia', name: '火炎传媒', type: 'media' },
          { id: 'juxuanxi', name: '聚轩喜', type: 'ecommerce' },
          { id: 'xianuo', name: '夏诺', type: 'ecommerce' },
          { id: 'lvtingqinxin', name: '绿听芹新', type: 'ecommerce' },
          { id: 'mirouchushi', name: '觅柔初诗', type: 'technology' },
          { id: 'pingsheng', name: '平声', type: 'ecommerce' }
        ]
      };

      this.realms = {};
      this.planetsData = [];

      // 添加主域作为第一个行星 (中央星)
      this.realms['home'] = {
        name: '九州集团',
        type: 'core',
        theme: 'theme-core',
        // content 在这种跳转模式下不再直接渲染，但可以作为元数据保留
        content: `<div><h2>九州集团核心</h2></div>`
      };
      this.planetsData.push({
        id: 'home',
        shortName: '九州集团',
        orbit: 0,
        angle: 0,
        speed: 0.00015,
        activity: 1.0,
        currentAngle: 0
      });

      // 解析集团数据并为每个子公司创建领域和行星数据
      groupData.subsidiaries.forEach((subsidiary, index) => {
        // 轨道分配逻辑
        let orbit = 1;
        let speed = 0.0001;

        if (index >= 3 && index < 7) { // 调整轨道分配，以适应更多行星
          orbit = 2;
          speed = 0.00008; // 稍微快一点
        } else if (index >= 7 && index < 12) {
          orbit = 3;
          speed = 0.00006;
        } else if (index >= 12) {
          orbit = 4; // 新增第四轨道
          this.orbitRadii[4] = 540; // 定义第四轨道半径
          speed = 0.00004;
        }

        const angle = (index * 360 / groupData.subsidiaries.length) * (Math.PI / 180); // 将角度转换为弧度
        const activity = Math.random() * 0.7 + 0.3;

        // 构建领域数据 (这里的内容不会被渲染，因为我们会直接跳转)
        this.realms[subsidiary.id] = {
          name: subsidiary.name,
          type: subsidiary.type || 'general',
          theme: `theme-${subsidiary.type || 'dark-amber'}`,
          content: `<div><h2>${subsidiary.name}</h2><p>点击前往官网</p></div>`
        };

        // 构建行星数据
        this.planetsData.push({
          id: subsidiary.id,
          shortName: subsidiary.name.length > 5 ? subsidiary.name.substring(0, 5) + '...' : subsidiary.name, // 缩短名称以适应小行星
          orbit: orbit,
          angle: angle,
          speed: speed,
          activity: activity,
          currentAngle: angle
        });
      });

      // 初始化行星（DOM元素）
      this.initPlanets();
      this.bindEvents(); // 绑定点击事件

      // 开始动画
      this.animatePlanets();
      this.animateThree(); // 启动Three.js动画

    } catch (error) {
      console.error('Failed to load realm data:', error);
    }
  }

  // 加载子公司详细数据 (在跳转模式下，此方法可能不再需要其内部的realmElement更新逻辑，因为它会直接导航)
  async loadSubsidiaryDetails() {
    // 理论上，在跳转模式下，这里的主要目的是确保 realms 数据完整，
    // 而不是更新DOM，因为DOM会随页面跳转而重建。
    // 如果这些数据被用于其他目的（如行星的tooltip信息），则仍需加载。
    try {
      for (const [id, realm] of Object.entries(this.realms)) {
        if (id === 'home') continue; // 主域不需要加载子公司详情

        // 假设 fetchSubsidiaryData 仍返回相关数据，即使不用于DOM渲染
        const subsidiaryData = await fetchSubsidiaryData(id).catch(err => {
            console.warn(`Could not fetch details for ${id}:`, err);
            return {}; // 返回空对象以避免后续错误
        });

        this.realms[id] = {
          ...realm,
          theme: subsidiaryData.theme || realm.theme,
          // content 仍然可以更新，但不会被 showRealm 内部渲染
          content: `<div><h2>${subsidiaryData.name || realm.name}</h2><p>点击前往官网</p></div>`
        };
      }
    } catch (error) {
      console.error('Failed to load subsidiary details:', error);
    }
  }

  // 初始化Three.js场景
  initThree() {
    const canvas = document.getElementById('three-canvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 1;
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 创建星空
    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.8 });
    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
  }

  // 初始化行星DOM元素
  initPlanets() {
    // 清空现有内容，确保DOM更新正确
    while (this.galaxyContainer.firstChild) {
      this.galaxyContainer.removeChild(this.galaxyContainer.firstChild);
    }
    if (this.realmContainer) { // realmContainer在跳转模式下可能不再需要DOM操作
        while (this.realmContainer.firstChild) {
            this.realmContainer.removeChild(this.realmContainer.firstChild);
        }
    }

    // 创建轨道
    for (const radius of Object.values(this.orbitRadii)) {
      if (radius === 0) continue; // 核心行星没有轨道线
      const orbitEl = document.createElement('div');
      orbitEl.className = 'orbit';
      orbitEl.style.width = `${radius * 2}px`;
      orbitEl.style.height = `${radius * 2}px`;
      orbitEl.style.marginLeft = `-${radius}px`;
      orbitEl.style.marginTop = `-${radius}px`;
      this.galaxyContainer.appendChild(orbitEl);
    }

    // 创建行星元素
    if (this.planetsData && this.planetsData.length > 0) {
      this.planetsData.forEach(pData => {
        const realm = this.realms[pData.id];
        const planetEl = document.createElement('div');
        planetEl.id = `planet-${pData.id}`;
        planetEl.className = `celestial-body planet ${realm.theme}`;
        planetEl.dataset.target = pData.id;

        const glowSize = 15 + pData.activity * 20;
        const glowColor = `rgba(255, 255, 255, ${0.1 + pData.activity * 0.4})`;
        planetEl.style.setProperty('--glow-size', `${glowSize}px`);
        planetEl.style.setProperty('--glow-color', glowColor);
        planetEl.style.animationDuration = `${5 - pData.activity * 2}s`;

        planetEl.innerHTML = `
          <div class="text-accent font-bold">${pData.shortName}</div>
          <div class="tooltip">${realm.name}</div>
        `;
        this.galaxyContainer.appendChild(planetEl);
      });

      // 创建领域元素 (这些现在是占位符，因为点击会跳转)
      for (const [id, realm] of Object.entries(this.realms)) {
        if (this.realmContainer) { // 只有 realmContainer 存在时才操作
          const realmEl = document.createElement('div');
          realmEl.id = `realm-${id}`;
          realmEl.className = `realm-view ${realm.theme}`;
          realmEl.innerHTML = realm.content; // 这里的内容不会被实际看到，因为会跳转
          this.realmContainer.appendChild(realmEl);
        }
      }

      // 初始化交叉观察器用于淡入效果 (如果realm-view被重新使用，这里仍然有用)
      this.faderObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    }
  }

  // 绑定事件
  initEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mousePlanet.x = e.clientX;
      this.mousePlanet.y = e.clientY;
    }, false);

    // 返回按钮点击事件 (在跳转模式下可能不再需要，或者链接到主域)
    if (this.backButton) {
      this.backButton.addEventListener('click', () => {
        // 如果有需要返回主域的逻辑，可以在这里实现
        window.location.href = this.subsidiaryUrls.home;
      });
    }

    this.addPlanetClickEvents = () => {
      document.querySelectorAll('.celestial-body').forEach(el => {
        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
        // 修改点击事件：直接跳转到对应子域URL
        newEl.addEventListener('click', () => this.showRealm(newEl.dataset.target));
      });
    };
  }

  // 在initPlanets方法结束时调用此方法绑定事件
  bindEvents() {
    this.addPlanetClickEvents();
  }

  // 动画Three.js场景
  animateThree() {
    // 这里使用 requestAnimationFrame 递归调用，以保持动画平滑
    this.animationFrameId = requestAnimationFrame(() => this.animateThree()); // 使用 this.animationFrameId
    const now = Date.now() * 0.0001;
    this.stars.rotation.y = now * 0.1;
    this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.02;
    this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.02;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  // 动画行星DOM元素
  animatePlanets() {
    this.animationFrameId = requestAnimationFrame(() => this.animatePlanets()); // 确保这里是递归调用
    this.planetsData.forEach(pData => {
      const planetEl = document.getElementById(`planet-${pData.id}`);
      if (!planetEl) return; // 防止元素未找到的错误

      const planetRect = planetEl.getBoundingClientRect();
      const planetCenterX = planetRect.left + planetRect.width / 2;
      const planetCenterY = planetRect.top + planetRect.height / 2;
      const distance = Math.hypot(this.mousePlanet.x - planetCenterX, this.mousePlanet.y - planetCenterY);
      const maxDistance = 200;
      let slowdownFactor = 1;
      if (distance < maxDistance) {
        slowdownFactor = Math.pow(distance / maxDistance, 2);
        slowdownFactor = Math.max(0.05, slowdownFactor);
      }

      pData.currentAngle += pData.speed * slowdownFactor * 20; // 乘以20来加速动画以更好地展示
      const radius = this.orbitRadii[pData.orbit];
      const x = radius * Math.cos(pData.currentAngle);
      const y = radius * Math.sin(pData.currentAngle);
      const scale = 1 + (1 - slowdownFactor) * 0.15;
      planetEl.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;

      // 更新 tooltip 位置
      const tooltipEl = planetEl.querySelector('.tooltip');
      if (tooltipEl) {
          tooltipEl.style.transform = `translateY(-${50 + (1 - slowdownFactor) * 20}px)`; // 鼠标接近时tooltip上浮
      }
    });
  }

  // 显示领域 (修改为直接跳转)
  showRealm(id) {
    if (this.subsidiaryUrls[id]) {
      window.location.href = this.subsidiaryUrls[id]; // 直接跳转到子域URL
    } else {
      console.warn(`No URL defined for realm: ${id}`);
      // Fallback: 如果没有定义URL，可以显示一个默认信息或保持在当前页面
      alert(`正在尝试访问 ${this.realms[id].name}，但其URL未定义或不可用。`);
    }
    // 在跳转模式下，不再需要以下DOM操作
    // document.body.classList.add('realm-active');
    // this.activeRealm = document.getElementById(`realm-${id}`);
    // this.activeRealm.classList.add('active');
    // this.backButton.classList.remove('hidden');
    // cancelAnimationFrame(this.animationFrameId); // 取消行星动画，因为页面将跳转

    // const faders = this.activeRealm.querySelectorAll('.fade-in');
    // faders.forEach(fader => {
    //   fader.classList.remove('visible');
    //   this.faderObserver.observe(fader);
    // });
  }

  // 隐藏领域 (在跳转模式下不再需要，除非有其他返回主域的逻辑)
  hideRealms() {
    // document.body.classList.remove('realm-active');
    // if (this.activeRealm) {
    //   this.activeRealm.classList.remove('active');
    //   this.activeRealm = null;
    // }
    // this.backButton.classList.add('hidden');
    // this.animationFrameId = requestAnimationFrame(() => this.animatePlanets()); // 重新启动行星动画
  }
}

// 初始化函数空间星球系统
document.addEventListener('DOMContentLoaded', () => {
  const planetSystem = new PlanetSystem();
  planetSystem.init();
});