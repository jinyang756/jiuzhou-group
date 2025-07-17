<template>
  <div class="graphite min-h-screen w-full" style="font-family: 'Inter', 'Noto Serif SC', serif; color: rgba(255,255,255,0.85);">
    <!-- 登录界面 -->
    <div v-if="!loggedIn" id="login-screen" class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-sm mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-accent">九州：枢密院</h1>
          <p class="text-white/70 mt-2">帝国安全协作中枢</p>
        </div>
        <div class="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl p-6 md:p-8">
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label for="access-code" class="block text-sm text-white/80 mb-2">访问代码</label>
              <input type="password" id="access-code" v-model="accessCode" class="form-input w-full p-3 rounded text-center tracking-[.5em]" placeholder="••••••">
            </div>
            <button type="submit" class="w-full bg-accent text-gray-900 font-bold py-3 rounded hover:opacity-90 transition-opacity duration-300">授权进入</button>
          </form>
        </div>
      </div>
    </div>
    <!-- 控制台界面 -->
    <div v-else id="dashboard-screen" class="min-h-screen">
      <header class="py-4 px-4 sm:px-6 lg:px-8 bg-black/20 border-b border-white/10">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl md:text-2xl font-bold text-accent">枢密院</h1>
          <div class="flex items-center gap-4">
            <span id="currentUser" class="text-sm text-white/70">执政官</span>
            <button @click="handleLogout" class="text-xs text-white/50 hover:text-accent transition">登出</button>
          </div>
        </div>
      </header>
      <main class="container mx-auto p-6 sm:p-8 lg:p-12">
        <h2 class="text-3xl md:text-4xl text-white mb-10 fade-in">核心功能模块</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="module-card rounded-lg p-6 fade-in" style="transition-delay: 0.1s;">
            <div class="text-accent mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.002 3.002 0 01-2.702 0M11 5a3 3 0 11-6 0 3 3 0 016 0zm0 0v1.5a2.25 2.25 0 002.25 2.25m-7.5 0v-1.5a2.25 2.25 0 012.25-2.25m7.5 0v-1.5a2.25 2.25 0 00-2.25-2.25M17 5a3 3 0 11-6 0 3 3 0 016 0zm0 0v1.5a2.25 2.25 0 002.25 2.25" /></svg></div>
            <h3 class="text-2xl text-accent mb-2">元老院议事厅</h3>
            <p class="text-white/70 text-sm">端到端加密的最高安全级别决策空间，用于战略讨论、审议政策与最终投票。</p>
          </div>
          <div class="module-card rounded-lg p-6 fade-in" style="transition-delay: 0.2s;">
            <div class="text-accent mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-1.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg></div>
            <h3 class="text-2xl text-accent mb-2">军机处</h3>
            <p class="text-white/70 text-sm">集成了项目管理、任务分配与跨部门协作的平台，确保帝国齿轮严丝合缝地运转。</p>
          </div>
          <div class="module-card rounded-lg p-6 fade-in" style="transition-delay: 0.3s;">
            <div class="text-accent mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg></div>
            <h3 class="text-2xl text-accent mb-2">九州学院</h3>
            <p class="text-white/70 text-sm">内部专属的知识库与学习平台，沉淀核心方法论，作为培养新晋成员的官方教材。</p>
          </div>
          <div class="module-card rounded-lg p-6 fade-in" style="transition-delay: 0.4s;">
            <div class="text-accent mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h4M8 7a2 2 0 012-2h4a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-4M16 7a2 2 0 012 2v4a2 2 0 01-2 2m-8 2v2m8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2" /></svg></div>
            <h3 class="text-2xl text-accent mb-2">中央档案库</h3>
            <p class="text-white/70 text-sm">拥有最高访问权限的云端保险箱，用于永久、安全地保存帝国所有核心机密文件。</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const loggedIn = ref(false);
const accessCode = ref('');

function handleLogin() {
  // 真实应用应校验 accessCode，这里直接通过
  loggedIn.value = true;
  setTimeout(() => {
    // 触发动画
    document.querySelectorAll('.fade-in').forEach((el: Element) => {
      el.classList.add('visible');
    });
  }, 100);
}
function handleLogout() {
  loggedIn.value = false;
  accessCode.value = '';
}

onMounted(() => {
  // IntersectionObserver 动画
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
.graphite {
  background: #282828;
  background-image: linear-gradient(-90deg, #7B7F82 2%, #303136 100%), radial-gradient(50% 116%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%), linear-gradient(-59deg, rgba(255, 255, 255, 0.5) 7%, rgba(87, 87, 87, 0.5) 68%, rgba(85, 85, 85, 0.5) 76%, rgba(0, 0, 0, 0.5) 100%);
  background-blend-mode: normal,multiply,multiply;
}
.text-accent { color: #EAEAEA; }
.border-accent { border-color: #EAEAEA; }
.bg-accent { background-color: #EAEAEA; }
.form-input {
  background-color: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}
.form-input:focus {
  outline: none;
  border-color: #EAEAEA;
  box-shadow: 0 0 15px rgba(234, 234, 234, 0.2);
}
.module-card {
  background-color: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}
.module-card:hover {
  transform: translateY(-10px);
  border-color: #EAEAEA;
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s, transform 0.7s;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
