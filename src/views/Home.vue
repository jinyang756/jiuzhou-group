<template>
  <div class="bg-dark-amber">
    <!-- Scene 1: The Foyer -->
    <section id="foyer" class="scene h-screen">
      <canvas ref="particleCanvas" class="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div class="z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-light fade-in">我们为探索未知而生。</h1>
        <p class="text-lg md:text-xl text-accent mt-4 fade-in" style="transition-delay: 0.5s;">九州集团 | Jiuzhou Group</p>
      </div>
      <div class="scroll-indicator text-white/50 fade-in" style="transition-delay: 2s;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
    <!-- Scene 2: The Charter -->
    <section id="charter" class="scene">
      <div class="text-center max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl text-accent mb-12 fade-in">《九州宪章》</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="fade-in">
            <h3 class="text-2xl mb-3">共生性使命</h3>
            <p class="text-lg leading-relaxed">我们与成员共同进化，成员的成长定义了我们的边界。</p>
          </div>
          <div class="fade-in">
            <h3 class="text-2xl mb-3">四大信条</h3>
            <p class="text-lg leading-relaxed">绝对诚信、无尽探索、底线原则、共赢生态。</p>
          </div>
          <div class="fade-in">
            <h3 class="text-2xl mb-3">成功的定义</h3>
            <p class="text-lg leading-relaxed">我们以“人的成长”与“文化印记”作为衡量伟大的标尺。</p>
          </div>
          <div class="fade-in">
            <h3 class="text-2xl mb-3">九州世界观</h3>
            <p class="text-lg leading-relaxed">我们视财富为工具，权力为责任。信奉科技向善，人文向美。</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Scene 3: The Governance -->
    <section id="governance" class="scene">
      <div class="text-center w-full max-w-5xl mx-auto">
        <h2 class="text-4xl md:text-5xl text-accent mb-4 fade-in">我们的治理</h2>
        <p class="text-xl mb-16 max-w-2xl mx-auto fade-in">我们摒弃王座，因无人独享智慧。九席虚位以待，共同组成“九州元老院”，以集体智慧守护集团的未来。</p>
        <div ref="governanceCircle" class="governance-circle relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto fade-in">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border border-accent flex items-center justify-center text-accent text-2xl">九州</div>
        </div>
      </div>
    </section>
    <!-- Scene 4: The Ecosystem -->
    <section id="ecosystem" class="scene">
      <div class="text-center w-full max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl text-accent mb-4 fade-in">生态体系</h2>
        <p class="text-xl mb-20 max-w-3xl mx-auto fade-in">五大军团各司其职，协同运作，共同服务于我们的“共生性使命”，构成一个和谐而强大的价值网络。</p>
        <div ref="ecosystemDiagram" class="relative w-full h-[500px] fade-in">
          <div id="center-node" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-accent bg-dark-amber flex items-center justify-center text-2xl text-accent">九州</div>
        </div>
      </div>
    </section>
    <!-- Scene 5: The Calling -->
    <section id="calling" class="scene bg-black/20">
      <div class="text-center">
        <h2 class="text-4xl md:text-5xl text-accent mb-6 fade-in">共赴九州之约</h2>
        <p class="text-xl max-w-2xl mb-10 fade-in">我们寻找的，不是优秀的雇员，而是能与我们共赴星辰大海的“事业共同体”。</p>
        <a href="https://jiuzhougroup-xft.web.app/" target="_blank" class="inline-block py-3 px-10 border border-accent text-accent text-xl hover:bg-accent hover:text-black transition-colors duration-300 fade-in">获取沙盘通行证</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const particleCanvas = ref<HTMLCanvasElement | null>(null);
const governanceCircle = ref<HTMLElement | null>(null);
const ecosystemDiagram = ref<HTMLElement | null>(null);

onMounted(() => {
  // 粒子动画
  if (particleCanvas.value) {
    const canvas = particleCanvas.value;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray: any[];
    class Particle {
      x: number; y: number; directionX: number; directionY: number; size: number; color: string;
      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
      }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = 'rgba(191, 163, 116, 0.2)'; ctx.fill(); }
      update() { if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; } if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; } this.x += this.directionX; this.y += this.directionY; this.draw(); }
    }
    function initParticles() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#bfa374'));
      }
    }
    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
    }
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); });
  }

  // fade-in 动画
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { if (!entry.isIntersecting) { return; } else { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, appearOptions);
  faders.forEach(fader => { appearOnScroll.observe(fader); });

  // 治理圆环
  if (governanceCircle.value) {
    const seatsData = [ '创始之火', '贤智汇聚', '日斗投资', '聚财众发', '讯飞通', '九州传媒', '外界之贤', '外界之贤', '创始之火' ];
    const radius = governanceCircle.value.offsetWidth / 2 - 40;
    const angleStep = 360 / seatsData.length;
    seatsData.forEach((name, index) => {
      const angle = angleStep * index - 90;
      const x = (governanceCircle.value!.offsetWidth / 2) + radius * Math.cos(angle * Math.PI / 180) - 40;
      const y = (governanceCircle.value!.offsetHeight / 2) + radius * Math.sin(angle * Math.PI / 180) - 40;
      const seatEl = document.createElement('div');
      seatEl.className = 'seat'; seatEl.style.left = `${x}px`; seatEl.style.top = `${y}px`; seatEl.textContent = name;
      governanceCircle.value!.appendChild(seatEl);
    });
  }

  // 生态体系节点
  if (ecosystemDiagram.value) {
    const nodesData = [
      { name: '贤智汇聚', url: 'https://jiuzhougroup-xzhj.web.app/' },
      { name: '日斗投资', url: 'https://jiuzhougroup-rdtz.web.app/' },
      { name: '聚财众发', url: 'https://jiuzhougroup-jczf.web.app/' },
      { name: '讯飞通', url: 'https://jiuzhougroup-xft.web.app/' },
      { name: '九州传媒', url: 'https://jiuzhougroup-jzcm.web.app/' }
    ];
    const ecoRadius = ecosystemDiagram.value.offsetHeight / 2 - 40;
    const ecoAngleStep = 360 / nodesData.length;
    nodesData.forEach((node, index) => {
      const angle = ecoAngleStep * index - 90;
      const x = (ecosystemDiagram.value!.offsetWidth / 2) + ecoRadius * Math.cos(angle * Math.PI / 180) - 60;
      const y = (ecosystemDiagram.value!.offsetHeight / 2) + ecoRadius * Math.sin(angle * Math.PI / 180) - 30;
      const nodeEl = document.createElement('a');
nodeEl.href = node.url;
nodeEl.target = '_blank';
      nodeEl.className = 'ecosystem-node absolute w-32 h-16 p-2 border border-white/10 rounded-lg flex items-center justify-center text-center text-lg text-white/80 hover:text-accent hover:border-accent';
      nodeEl.style.left = `${x}px`; nodeEl.style.top = `${y}px`;
      nodeEl.textContent = node.name;
      ecosystemDiagram.value!.appendChild(nodeEl);
      // 画线
      const line = document.createElement('div');
      const centerX = ecosystemDiagram.value!.offsetWidth / 2; const centerY = ecosystemDiagram.value!.offsetHeight / 2;
      const nodeCenterX = x + 60; const nodeCenterY = y + 32;
      const distance = Math.sqrt(Math.pow(nodeCenterX - centerX, 2) + Math.pow(nodeCenterY - centerY, 2));
      const lineAngle = Math.atan2(nodeCenterY - centerY, nodeCenterX - centerX) * 180 / Math.PI;
      line.className = 'ecosystem-line'; line.style.width = `${distance}px`; line.style.height = '1px'; line.style.left = `${centerX}px`; line.style.top = `${centerY}px`; line.style.transformOrigin = '0 0'; line.style.transform = `rotate(${lineAngle}deg)`;
      ecosystemDiagram.value!.appendChild(line);
    });
  }
});
</script>

<style scoped>
.text-accent { color: #bfa374; }
.border-accent { border-color: #bfa374; }
.bg-dark-amber { background-image: linear-gradient(-180deg, #15140F 0%, #34312C 97%); }
.scene {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  position: relative;
}
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
  40% { transform: translate(-50%, -20px); }
  60% { transform: translate(-50%, -10px); }
}
.governance-circle .seat {
  position: absolute;
  width: 80px; height: 80px;
  border: 2px solid rgba(191, 163, 116, 0.3);
  border-radius: 50%;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
.governance-circle .seat:hover {
  border-color: #bfa374;
  transform: scale(1.1);
  z-index: 10;
}
.ecosystem-node {
  transition: all 0.3s ease;
}
.ecosystem-node:hover {
  transform: scale(1.05);
  background-color: rgba(191, 163, 116, 0.05);
}
.ecosystem-line {
  position: absolute;
  background-color: rgba(191, 163, 116, 0.2);
  z-index: -1;
}
</style>
