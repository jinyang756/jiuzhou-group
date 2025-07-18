<template>
  <div class="autumn min-h-screen">
    <header class="py-4 px-4 sm:px-6 lg:px-8 absolute top-0 left-0 w-full z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold text-accent">贤智汇聚</h1>
        <router-link to="/portal" class="text-xs md:text-sm text-gray-700 hover:text-accent transition">返回集团官网</router-link>
      </div>
    </header>

    <section class="min-h-screen flex items-center">
      <div class="container mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div class="text-left">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 fade-in">汇聚贤智，共筑生态</h2>
          <p class="text-lg md:text-xl text-gray-600 mt-6 fade-in" style="transition-delay: 0.2s;">我们是九州生态的连接者与培育者。我们负责打造高品质的社群，发掘并培养未来的领袖，让每一个不凡的灵魂，都能在此找到归属与共鸣。</p>
        </div>
        <div class="hidden md:block fade-in" style="transition-delay: 0.4s;">
          <div class="w-full h-96 bg-white/50 border-2 border-accent/20 rounded-lg flex items-center justify-center">
            <p class="text-accent/50 text-2xl">[ 社群成员互动 概念视觉 ]</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-light-section">
      <div class="container mx-auto px-6 sm:px-8">
        <h2 class="text-3xl md:text-4xl text-accent mb-12 text-center fade-in">我们的核心使命</h2>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div class="mission-card bg-white/70 p-8 rounded-lg shadow-lg fade-in">
            <h3 class="text-2xl text-accent mb-4">九州社区运营</h3>
            <p>构建并运营线上与线下的“九州国际社区”，策划高品质文化活动与思想交流会，营造独一无二的社群体验。</p>
          </div>
          <div class="mission-card bg-white/70 p-8 rounded-lg shadow-lg fade-in" style="transition-delay: 0.2s;">
            <h3 class="text-2xl text-accent mb-4">九州学院</h3>
            <p>建立集团的内部培训与发展体系，为成员与伙伴提供涵盖领导力、专业技能与人文素养的成长课程。</p>
          </div>
          <div class="mission-card bg-white/70 p-8 rounded-lg shadow-lg fade-in" style="transition-delay: 0.4s;">
            <h3 class="text-2xl text-accent mb-4">未来领袖招募</h3>
            <p>负责集团高端人才的寻访与招募，为九州元老院与各大军团，发掘并引荐具备“创造者”精神的未来州牧。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 text-center">
      <div class="container mx-auto px-6 sm:px-8">
        <h2 class="text-3xl md:text-4xl text-accent mb-4 fade-in">与智者同行</h2>
        <p class="text-lg mb-8 fade-in">无论您是渴望加入社群的探索者，还是寻求更大舞台的领导者，我们都期待您的声音。</p>
        <a href="mailto:Athen@lianghuatozi.com" class="inline-flex items-center justify-center gap-2 py-3 px-12 border border-accent text-accent text-lg hover-accent transition-colors duration-300 fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
          <span>建立联系</span>
        </a>
      </div>
    </section>

    <footer class="py-6 text-center text-sm text-gray-600 bg-black/5">
      <p>&copy; 2025 贤智汇聚 | 九州集团旗下</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

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
.autumn {
  background-color: #F9F6F1; /* Fallback */
  background-image: radial-gradient(27% 185%, #F9F6F1 0%, #D7D0C5 100%);
}
body {
  font-family: 'Inter', sans-serif;
  color: #333;
}
h1, h2, h3, h4 {
  font-family: 'Noto Serif SC', serif;
}
.text-accent { color: #8c7851; }
.border-accent { border-color: #8c7851; }
.bg-light-section { background-color: rgba(255,255,255,0.5); }
.hover-accent:hover {
  background-color: #8c7851;
  color: #F9F6F1;
}
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
.mission-card {
  transition: all 0.3s ease;
}
.mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>