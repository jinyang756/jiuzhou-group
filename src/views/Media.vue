<template>
  <div class="antialiased northKingdom">
    <header class="py-4 px-4 sm:px-6 lg:px-8 absolute top-0 left-0 w-full z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl md:text-2xl font-bold text-accent">九州传媒</h1>
        <a href="https://jiuzhougroup.vip" target="_blank" class="text-xs md:text-sm text-gray-800 hover:text-accent transition">返回集团官网</a>
      </div>
    </header>
    <section class="min-h-screen flex items-center justify-center text-center bg-black/5">
      <div class="max-w-3xl px-4">
        <h2 class="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 fade-in">讲述九州故事，塑造时代精神</h2>
        <p class="text-lg md:text-2xl text-gray-700 mt-6 fade-in" style="transition-delay: 0.2s;">我们是九州帝国的喉舌与旗帜。通过构建富有美学与思想深度的内容生态，我们向世界传递九州的声音，建立深刻的文化认同。</p>
      </div>
    </section>
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 sm:px-8">
        <h2 class="text-3xl md:text-4xl text-accent mb-12 text-center fade-in">我们的作品</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="work-card rounded-lg fade-in">
            <div class="h-56 bg-cover bg-center work-card-image" style="background-image: url('https://placehold.co/600x400/BDBBBE/2c3e50?text=品牌战役')"></div>
            <div class="p-6">
              <h3 class="text-2xl text-accent mb-3">品牌战役</h3>
              <p class="leading-relaxed">我们为九州生态内的每一个品牌，量身打造直击人心的品牌叙事与市场战略，确保其独一无二的价值被世界看见。</p>
            </div>
          </div>
          <div class="work-card rounded-lg fade-in" style="transition-delay: 0.2s;">
            <div class="h-56 bg-cover bg-center work-card-image" style="background-image: url('https://placehold.co/600x400/BDBBBE/2c3e50?text=深度内容')"></div>
            <div class="p-6">
              <h3 class="text-2xl text-accent mb-3">深度内容</h3>
              <p class="leading-relaxed">我们为“九州沙盘”持续提供思想弹药。每一篇行业洞察、人物专访，都是塑造世界格局的行动。</p>
            </div>
          </div>
          <div class="work-card rounded-lg fade-in" style="transition-delay: 0.4s;">
            <div class="h-56 bg-cover bg-center work-card-image" style="background-image: url('https://placehold.co/600x400/BDBBBE/2c3e50?text=视觉史诗')"></div>
            <div class="p-6">
              <h3 class="text-2xl text-accent mb-3">视觉史诗</h3>
              <p class="leading-relaxed">我们以电影级的制作水准，将九州的宏大理念与抽象哲学，转化为能引发全球共鸣的、震撼人心的视觉篇章。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16 md:py-24 bg-dark-section">
      <div class="container mx-auto px-6 sm:px-8 text-center max-w-4xl">
        <h2 class="text-3xl md:text-4xl text-accent mb-6 fade-in">我们是讲述者</h2>
        <p class="text-xl leading-loose fade-in">“我们不生产信息，我们塑造认知。我们不追逐热点，我们创造议题。在九州传媒，每一位成员都是艺术家、战略家与哲学家。我们以《九州宪章》为罗盘，用文字与影像，为这个时代定义何为‘价值’，何为‘美’。”</p>
        <p class="text-right mt-6 text-accent fade-in">- 九州传媒 团队信条</p>
      </div>
    </section>
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6 sm:px-8 text-center">
        <h2 class="text-3xl md:text-4xl text-accent mb-4 fade-in">九州沙盘</h2>
        <p class="text-lg mb-8 fade-in">我们的思想熔炉与战略推演平台，一个思想即权力的活的沙盘世界。</p>
        <a href="https://portal.jiuzhougroup.vip" target="_blank" class="inline-block py-3 px-8 border border-accent text-accent text-lg hover-accent transition-colors duration-300 fade-in">获取沙盘通行证</a>
      </div>
    </section>
    <footer class="py-6 text-center text-sm text-gray-700 bg-black/10">
      <p>&copy; 2025 九州传媒 | 九州集团旗下</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('visible'); observer.unobserve(entry.target); });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));
});
</script>

<style scoped>
.northKingdom {
  background-color: #E1E6EC;
  background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
  background-blend-mode: normal, lighten, soft-light;
}
body { font-family: 'Inter', sans-serif; color: rgba(10, 10, 20, 0.85); }
h1, h2, h3, h4 { font-family: 'Noto Serif SC', serif; }
.text-accent { color: #2c3e50; }
.border-accent { border-color: #2c3e50; }
.bg-dark-section { background-color: rgba(0,0,0,0.05); }
.hover-accent:hover { background-color: #2c3e50; color: #E1E6EC; }
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
.work-card { background-color: rgba(255, 255, 255, 0.4); border: 1px solid rgba(44, 62, 80, 0.2); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); overflow: hidden; }
.work-card:hover { transform: translateY(-10px) scale(1.02); border-color: rgba(44, 62, 80, 0.5); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.work-card-image { transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.work-card:hover .work-card-image { transform: scale(1.05); }
</style>
