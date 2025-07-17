<template>
  <div class="antialiased blueHour min-h-screen flex flex-col" style="font-family: 'Inter', 'Noto Serif SC', serif; color: rgba(255,255,255,0.9);">
    <header class="py-4 px-4 sm:px-6 lg:px-8 absolute top-0 left-0 w-full z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold text-accent">讯飞通</h1>
        <a href="https://jiuzhougroup.vip" target="_blank" class="text-xs md:text-sm text-white/70 hover:text-accent transition">返回集团官网</a>
      </div>
    </header>

    <section class="min-h-screen flex items-center justify-center text-center">
      <div class="max-w-4xl px-6">
        <h2 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white fade-in">九州数字工作站</h2>
        <p class="text-lg md:text-2xl text-white/80 mt-6 fade-in" style="transition-delay: 0.2s;">一个专为“九州创造者”打造的、集安全环境与高效工具于一体的数字生态系统。在这里，您的思想将拥有最坚实的壁垒与最锋利的兵刃。</p>
        <a href="https://portal.jiuzhougroup.vip" target="_blank" class="mt-10 inline-block py-3 px-12 border border-accent text-accent text-lg hover-accent transition-colors duration-300 fade-in" style="transition-delay: 0.4s;">获取您的工作站</a>
      </div>
    </section>

    <section id="workstation" class="py-16 md:py-24 bg-dark-section">
      <div class="container mx-auto px-6 sm:px-8">
        <div class="grid lg:grid-cols-5 gap-12 md:gap-16 items-center">
          <div class="lg:col-span-2 fade-in">
            <div class="w-full h-80 md:h-96 bg-black/20 border-2 border-accent/20 rounded-lg flex items-center justify-center">
              <p class="text-accent/50 text-2xl">[ 数字工作站 概念视觉 ]</p>
            </div>
          </div>
          <div class="lg:col-span-3 fade-in" style="transition-delay: 0.2s;">
            <h2 class="text-3xl md:text-4xl text-accent mb-6">一个环境，无限可能</h2>
            <div class="space-y-6">
              <div>
                <h3 class="text-2xl text-white mb-2">核心基石：九州云手机</h3>
                <p>我们为您提供一个基于云端的、与物理世界完全隔离的私密操作环境。在这里，您可以安全地进行任何探索，而无需担心隐私泄露或数据安全。</p>
              </div>
              <div>
                <h3 class="text-2xl text-white mb-2">内置武库：九州工具集</h3>
                <p>工作站内预装了我们为您精心锻造的“九州工具集”。首件神兵 <a href="https://tools.jiuzhougroup.vip" target="_blank" class="text-accent hover:underline">Hue CSS色板</a> 已上线，未来将有更多强大的生产力工具陆续加入，为您著书立说、开疆拓土提供源源不断的助力。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 sm:px-8">
        <h2 class="text-3xl md:text-4xl text-accent mb-12 text-center fade-in">核心技术特性</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          <div class="fade-in">
            <div class="feature-icon w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            </div>
            <h3 class="text-2xl text-white mb-2">绝对安全</h3>
            <p>采用抗量子攻击的加密算法与分布式云架构，为您的每一个操作提供军事级别的安全保障。</p>
          </div>
          <div class="fade-in" style="transition-delay: 0.2s;">
            <div class="feature-icon w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            </div>
            <h3 class="text-2xl text-white mb-2">极致性能</h3>
            <p>动态分配的云端算力，确保您在进行复杂运算或高强度工作时，始终拥有流畅、高效的体验。</p>
          </div>
          <div class="fade-in" style="transition-delay: 0.4s;">
            <div class="feature-icon w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11.25 18l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 13.5l.648 1.938a3.375 3.375 0 002.672 2.672L21.5 18l-1.938.648a3.375 3.375 0 00-2.672 2.672z" /></svg>
            </div>
            <h3 class="text-2xl text-white mb-2">持续进化</h3>
            <p>我们的工具集将不断更新，陆续为您集成AI辅助决策、自动化工作流等更多“神兵利器”。</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-6 text-center text-sm text-white/60 bg-black/20 mt-auto">
      <p>&copy; 2025 讯飞通 | 九州集团旗下</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  // fade-in 动画
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const appearOnScroll = new window.IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));
});
</script>

<style scoped>
.blueHour {
  background: linear-gradient(90deg, #7E898F 0%, #636C75 100%), radial-gradient(at top, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.55) 100%), radial-gradient(at top, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.08) 63%);
  background-blend-mode: multiply, screen;
}
.text-accent { color: #D5DEE7; }
.border-accent { border-color: #D5DEE7; }
.hover-accent:hover {
  background-color: #D5DEE7;
  color: #636C75;
}
.bg-dark-section { background-color: rgba(0,0,0,0.2); }
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-icon {
  background-color: rgba(213, 222, 231, 0.1);
  border: 1px solid rgba(213, 222, 231, 0.2);
}
</style>
