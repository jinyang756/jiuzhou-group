<template>
  <div class="goldenLeaf min-h-screen w-full" style="font-family: 'Inter', 'Noto Serif SC', serif; color: rgba(255,255,255,0.9);">
    <header class="py-4 px-4 sm:px-6 lg:px-8 absolute top-0 left-0 w-full z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold text-accent">聚财众发</h1>
        <RouterLink to="/" class="text-xs md:text-sm text-white/70 hover:text-accent transition">返回集团官网</RouterLink>
      </div>
    </header>
    <section class="min-h-screen flex items-center bg-dark-section/50">
      <div class="container mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div class="text-left">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white fade-in">数字时代的新财富范式</h2>
          <p class="text-lg md:text-xl text-white/80 mt-6 fade-in" style="transition-delay: 0.2s;">我们专注于为高净值客户与机构提供稳健的基金产品与财富管理服务，并以前瞻性视野，布局香港港元代币化基金市场。</p>
        </div>
        <div class="hidden md:block fade-in" style="transition-delay: 0.4s;">
          <div class="w-full h-80 bg-black/20 border-2 border-accent/20 rounded-lg flex items-center justify-center">
            <svg class="w-24 h-24 text-accent/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.75 11 12 11c-.75 0-1.536.21-2.121.722L9 12.818M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 sm:px-8">
        <h2 class="text-3xl md:text-4xl text-accent mb-12 text-center fade-in">核心业务</h2>
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div class="border border-white/20 p-8 rounded-lg fade-in">
            <h3 class="text-2xl text-accent mb-4">基金产品与财富管理</h3>
            <p>提供覆盖全球市场的多元化基金产品，并为客户量身定制长周期的资产配置与家族财富传承方案。</p>
          </div>
          <div class="border-2 border-accent/70 p-8 rounded-lg fade-in bg-dark-section" style="transition-delay: 0.2s;">
            <h3 class="text-2xl text-accent mb-4">港元代币化基金 (RWA)</h3>
            <p>我们正积极开拓真实世界资产（RWA）代币化的前沿市场，发行合规的港元代币化基金产品，为传统金融资产注入前所未有的流动性与透明度。</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16 md:py-24 bg-dark-section text-center">
      <div class="container mx-auto px-6 sm:px-8 max-w-4xl">
        <h2 class="text-3xl md:text-4xl text-accent mb-6 fade-in">拥抱未来金融</h2>
        <p class="text-lg leading-loose fade-in">港元代币化基金是连接传统金融与数字资产世界的桥梁。我们邀请合格投资者与机构伙伴，共同探索这一蓝海市场的无限可能。</p>
        <a href="mailto:Athen@lianghuatozi.com" class="mt-8 inline-flex items-center justify-center gap-2 py-3 px-8 border border-accent text-accent text-lg hover-accent transition-colors duration-300 fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
          <span>咨询详情</span>
        </a>
      </div>
    </section>
    <footer class="py-6 text-center text-sm text-white/60">
      <p>&copy; 2025 聚财众发 | 九州集团旗下</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(() => {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
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
.goldenLeaf {
  background-color: #92847B;
  background-image: radial-gradient(at bottom center, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 200%), radial-gradient(at bottom center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
  background-blend-mode: normal,screen;
}
.text-accent { color: #F9F6F1; }
.border-accent { border-color: #F9F6F1; }
.hover-accent:hover {
  background-color: #F9F6F1;
  color: #92847B;
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
</style>
