// 九州集团行星系统
import { fetchGroupData, fetchSubsidiaryData, fetchBusinessData } from './services/data-loader.js';

class PlanetSystem {
  constructor() {
    this.realms = {};
    this.planets = [];
    this.activeRealm = null;
    this.animationFrameId = null;
    this.mouse = { x: 0, y: 0 };
  }

  // 初始化函数空间星球系统
  init() {
    this.initThree();
    this.loadRealmData();
    this.initEventListeners();
  }

  // 异步加载领域数据
  async loadRealmData() {
    try {
      // 懒加载数据 - 只有当用户滚动到相关区域时才加载
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 加载数据
            this.fetchRealmData();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      // 观察星系容器
      const galaxyContainer = document.getElementById('galaxy-container');
      if (galaxyContainer) {
        observer.observe(galaxyContainer);
      }
    } catch (error) {
      console.error('Error in loadRealmData:', error);
    }
  }

  // 实际获取领域数据的方法
  async fetchRealmData() {
    try {
      // 从新的数据源加载数据
      const groupData = await fetchGroupData();

      // 处理加载的数据
      this.realms = {};
      this.planetsData = [];

      // 解析集团数据
      const subsidiaries = groupData.subsidiaries;

      // 为每个子公司创建领域和行星数据
      subsidiaries.forEach((subsidiary, index) => {
        // 简单的轨道分配逻辑
        let orbit = 1;
        let speed = 0.0001;
        
        if (index >= 2 && index < 5) {
          orbit = 2;
          speed = 0.00006;
        } else if (index >= 5) {
          orbit = 3;
          speed = 0.00004;
        }

        const angle = 30 + (index * 360 / subsidiaries.length);
        const activity = Math.random() * 0.7 + 0.3;

        // 构建领域数据
        this.realms[subsidiary.id] = {
          name: subsidiary.name,
          type: subsidiary.type || 'general',
          theme: `theme-${subsidiary.type || 'dark-amber'}`,
          content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl md:text-7xl font-bold text-accent">${subsidiary.name}</h2></div>`
        };

        // 构建行星数据
        this.planetsData.push({
          id: subsidiary.id,
          shortName: subsidiary.name.length > 8 ? subsidiary.name.substring(0, 8) + '...' : subsidiary.name,
          orbit: orbit,
          angle: angle,
          speed: speed,
          activity: activity,
          currentAngle: angle
        });
      });

      // 初始化行星
      this.initPlanets();
      this.bindEvents();

      // 开始动画
      this.animatePlanets();

      // 延迟加载子公司详细数据
      setTimeout(() => {
        this.loadSubsidiaryDetails();
      }, 1000);
    } catch (error) {
      console.error('Failed to load realm data:', error);
    }
  }

  // 加载子公司详细数据
  async loadSubsidiaryDetails() {
    try {
      for (const [id, realm] of Object.entries(this.realms)) {
        const subsidiaryData = await fetchSubsidiaryData(id);

        // 更新领域数据
        this.realms[id] = {
          ...realm,
          theme: subsidiaryData.theme || realm.theme,
          content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl md:text-7xl font-bold text-accent">${subsidiaryData.name}</h2></div>`
        };

        // 更新对应的领域元素
        const realmEl = document.getElementById(`realm-${id}`);
        if (realmEl) {
          realmEl.className = `realm-view ${this.realms[id].theme}`;
          realmEl.innerHTML = this.realms[id].content;
        }
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

  // 初始化行星
  initPlanets() {
    this.orbitRadii = { 1: 180, 2: 300, 3: 420 };
    this.galaxyContainer = document.getElementById('galaxy-container');
    this.realmContainer = document.getElementById('realm-container');
    this.backButton = document.getElementById('back-to-galaxy');

    // 清空现有内容
    while (this.galaxyContainer.firstChild) {
      this.galaxyContainer.removeChild(this.galaxyContainer.firstChild);
    }
    while (this.realmContainer.firstChild) {
      this.realmContainer.removeChild(this.realmContainer.firstChild);
    }

    // 创建轨道
    for (const radius of Object.values(this.orbitRadii)) {
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

      // 创建领域元素
      for (const [id, realm] of Object.entries(this.realms)) {
        const realmEl = document.createElement('div');
        realmEl.id = `realm-${id}`;
        realmEl.className = `realm-view ${realm.theme}`;
        realmEl.innerHTML = realm.content;
        this.realmContainer.appendChild(realmEl);
      }

      // 初始化交叉观察器用于淡入效果
      this.faderObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    }
      home: {
        name: '九州国际控股集团',
        theme: 'theme-dark-amber',
        content: `<div class="min-h-screen flex flex-col justify-center items-center text-center p-4"><h1 class="text-5xl md:text-7xl font-light text-white">我们为探索未知而生。</h1><p class="text-xl md:text-2xl text-accent mt-6">九州集团 | Jiuzhou Group</p></div>`
      },
      ridou: {
        name: '日斗投资咨询管理有限公司',
        type: 'investment',
        theme: 'theme-investment',
        content: `
          <section class="min-h-screen flex items-center justify-center text-center bg-black/30">
            <div class="max-w-4xl px-6">
              <p class="text-lg md:text-xl text-accent fade-in">八、九、十月 | 盛大开启</p>
              <h2 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white my-4 fade-in" style="transition-delay: 0.2s;">第九届财富交流会</h2>
              <p class="text-lg md:text-xl text-white/80 mt-6 fade-in" style="transition-delay: 0.4s;">一场面向未来的思想盛宴。顶尖智囊免费公益授教，广募新秀，共赴金九银十的投资新征程。</p>
              <a href="#register-ridou" class="mt-10 inline-block py-3 px-12 border border-accent text-accent text-lg hover-accent transition-colors duration-300 fade-in" style="transition-delay: 0.6s;">立即免费报名</a>
            </div>
          </section>
          <section id="register-ridou" class="py-16 md:py-24 bg-dark-section text-center">
            <div class="container mx-auto px-6 sm:px-8">
              <h2 class="text-3xl md:text-4xl text-accent mb-4 fade-in">立即报名，锁定席位</h2>
              <p class="text-lg mb-10 fade-in">通过以下任一官方渠道与我们取得联系，完成免费报名。</p>
              <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="fade-in"><h4 class="text-xl text-white mb-3">官方邮箱</h4><a href="mailto:Athen@lianghuatozi.com" class="text-accent text-lg break-all inline-flex items-center justify-center gap-2 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span>Athen@lianghuatozi.com</span></a></div>
                <div class="fade-in" style="transition-delay: 0.2s;"><h4 class="text-xl text-white mb-3">企业微信</h4><div class="w-32 h-32 bg-white/90 p-2 rounded-lg mx-auto flex items-center justify-center"><p class="text-black text-sm">[企微二维码]</p></div></div>
                <div class="fade-in" style="transition-delay: 0.4s;"><h4 class="text-xl text-white mb-3">飞书</h4><div class="w-32 h-32 bg-white/90 p-2 rounded-lg mx-auto flex items-center justify-center"><p class="text-black text-sm">[飞书群二维码]</p></div></div>
                <div class="fade-in" style="transition-delay: 0.6s;"><h4 class="text-xl text-white mb-3">百度网盘</h4><div class="w-32 h-32 bg-white/90 p-2 rounded-lg mx-auto flex items-center justify-center"><p class="text-black text-sm">[网盘资料群二维码]</p></div></div>
              </div>
            </div>
          </section>
        `
      },
      jucaizhongfa: {
        name: '聚财众发基金管理有限公司',
        type: 'finance',
        theme: 'theme-finance',
        content: `<div class="min-h-screen flex items-center p-8"><h2 class="text-5xl md:text-7xl font-bold text-accent">数字时代的新财富范式</h2></div>`
      },
      xunfeitong: {
        name: '讯飞通科技服务有限公司',
        type: 'technology',
        theme: 'theme-technology',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl md:text-7xl font-bold text-accent">九州数字工作站</h2></div>`
      },
      media: {
        name: '九州传媒有限公司',
        type: 'media',
        theme: 'theme-media',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl md:text-7xl font-bold text-accent">讲述九州故事</h2></div>`
      },
      xianzhi: {
        name: '贤智汇聚人力资源服务有限公司',
        type: 'hr',
        theme: 'theme-hr',
        content: `<div class="min-h-screen flex items-center p-8"><h2 class="text-5xl md:text-7xl font-bold text-accent">汇聚贤智，共筑生态</h2></div>`
      },
      peininghui: {
        name: '容沛凝惠电子商贸有限公司',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">沛凝惠</h2></div>`
      },
      baimumeile: {
        name: '白慕梅乐商贸有限公司',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">白慕梅乐</h2></div>`
      },
      qinqiuliuer: {
        name: '芹秋柳尔电子商贸有限公司',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">芹秋柳尔</h2></div>`
      },
      huoyanmedia: {
        name: '火炎传媒有限公司',
        type: 'media',
        theme: 'theme-media',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">火炎传媒</h2></div>`
      },
      juxuanxi: {
        name: '聚轩喜电子商务有限公司',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">聚轩喜</h2></div>`
      },
      xianuo: {
        name: '夏诺电子商务有限公司',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">夏诺</h2></div>`
      },
      lvtingqinxin: {
        name: '陕西绿听芹新商贸有限公司',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">绿听芹新</h2></div>`
      },
      mirouchushi: {
        name: '陕西觅柔初诗网络科技有限公司',
        type: 'technology',
        theme: 'theme-technology',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">觅柔初诗</h2></div>`
      },
      pingsheng: {
        name: '沈阳市浑南区平声电子商务行(个体工商户)',
        type: 'ecommerce',
        theme: 'theme-ecommerce',
        content: `<div class="min-h-screen flex items-center justify-center text-center p-4"><h2 class="text-5xl text-accent">平声电子商务行</h2></div>`
      }
    };

    // 动态生成行星数据已移至loadRealmData方法
    // 创建行星元素
    this.createPlanets = () => {
      { id: 'ridou', shortName: '日斗投资', orbit: 1, angle: 30, speed: 0.0001, activity: 0.9 },
      { id: 'jucaizhongfa', shortName: '聚财众发', orbit: 1, angle: 180, speed: 0.0001, activity: 0.8 },
      { id: 'xunfeitong', shortName: '讯飞通', orbit: 2, angle: 100, speed: 0.00006, activity: 1.0 },
      { id: 'media', shortName: '九州传媒', orbit: 2, angle: 250, speed: 0.00006, activity: 0.7 },
      { id: 'xianzhi', shortName: '贤智汇聚', orbit: 2, angle: 330, speed: 0.00006, activity: 0.6 },
      { id: 'peininghui', shortName: '沛凝惠', orbit: 3, angle: 0, speed: 0.00004, activity: 0.5 },
      { id: 'baimumeile', shortName: '白慕梅乐', orbit: 3, angle: 40, speed: 0.00004, activity: 0.4 },
      { id: 'qinqiuliuer', shortName: '芹秋柳尔', orbit: 3, angle: 80, speed: 0.00004, activity: 0.6 },
      { id: 'huoyanmedia', shortName: '火炎传媒', orbit: 3, angle: 120, speed: 0.00004, activity: 0.8 },
      { id: 'juxuanxi', shortName: '聚轩喜', orbit: 3, angle: 160, speed: 0.00004, activity: 0.5 },
      { id: 'xianuo', shortName: '夏诺', orbit: 3, angle: 200, speed: 0.00004, activity: 0.7 },
      { id: 'lvtingqinxin', shortName: '绿听芹新', orbit: 3, angle: 240, speed: 0.00004, activity: 0.3 },
      { id: 'mirouchushi', shortName: '觅柔初诗', orbit: 3, angle: 280, speed: 0.00004, activity: 0.9 },
      { id: 'pingsheng', shortName: '平声电商', orbit: 3, angle: 320, speed: 0.00004, activity: 0.4 }
    ].map(p => ({...p, currentAngle: p.angle}));

    // 从加载的数据创建行星元素
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

    // 创建领域元素
    for (const [id, realm] of Object.entries(this.realms)) {
      const realmEl = document.createElement('div');
      realmEl.id = `realm-${id}`;
      realmEl.className = `realm-view ${realm.theme}`;
      realmEl.innerHTML = realm.content;
      this.realmContainer.appendChild(realmEl);
    }

    // 初始化交叉观察器用于淡入效果
    this.faderObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  }

  // 初始化事件监听器
  initEventListeners() {
    // 窗口调整大小事件
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // 鼠标移动事件
    this.mousePlanet = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mousePlanet.x = e.clientX;
      this.mousePlanet.y = e.clientY;
    }, false);

    // 返回按钮点击事件
    if (this.backButton) {
      this.backButton.addEventListener('click', () => this.hideRealms());
    }

    // 为动态创建的行星元素添加点击事件
    this.addPlanetClickEvents = () => {
      document.querySelectorAll('.celestial-body').forEach(el => {
        // 先移除可能存在的事件监听器
        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
        // 添加新的事件监听器
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
    requestAnimationFrame(() => this.animateThree());
    const now = Date.now() * 0.0001;
    this.stars.rotation.y = now * 0.1;
    this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.02;
    this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.02;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  // 动画行星
  animatePlanets() {
    this.planetsData.forEach(pData => {
      const planetEl = document.getElementById(`planet-${pData.id}`);
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
      pData.currentAngle += pData.speed * slowdownFactor * 20;
      const radius = this.orbitRadii[pData.orbit];
      const x = radius * Math.cos(pData.currentAngle);
      const y = radius * Math.sin(pData.currentAngle);
      const scale = 1 + (1 - slowdownFactor) * 0.15;
      planetEl.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
    });
    this.animationFrameId = requestAnimationFrame(() => this.animatePlanets());
  }

  // 显示领域
  showRealm(id) {
    if (id === 'home') {
      alert('欢迎来到九州集团中央殿堂。');
      return;
    }
    document.body.classList.add('realm-active');
    this.activeRealm = document.getElementById(`realm-${id}`);
    this.activeRealm.classList.add('active');
    this.backButton.classList.remove('hidden');
    cancelAnimationFrame(this.animationFrameId);

    const faders = this.activeRealm.querySelectorAll('.fade-in');
    faders.forEach(fader => {
      fader.classList.remove('visible');
      this.faderObserver.observe(fader);
    });
  }

  // 隐藏领域
  hideRealms() {
    document.body.classList.remove('realm-active');
    if (this.activeRealm) {
      this.activeRealm.classList.remove('active');
      this.activeRealm = null;
    }
    this.backButton.classList.add('hidden');
    this.animationFrameId = requestAnimationFrame(() => this.animatePlanets());
  }
}

// 初始化函数空间星球系统
document.addEventListener('DOMContentLoaded', () => {
  const planetSystem = new PlanetSystem();
  planetSystem.init();
});