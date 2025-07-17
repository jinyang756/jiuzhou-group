<template>
  <div class="graphite flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-accent">九州统一通行证</h1>
        <p class="text-white/70 mt-2">进入思想与战略的演武场</p>
      </div>
      <div class="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl p-6 md:p-8">
        <div class="flex border-b border-white/10 mb-6">
          <button :class="['tab-button flex-1 pb-3 text-lg text-white/60 border-b-2 border-transparent', activeTab === 'login' ? 'active' : '']" @click="activeTab = 'login'">登录</button>
          <button :class="['tab-button flex-1 pb-3 text-lg text-white/60 border-b-2 border-transparent', activeTab === 'register' ? 'active' : '']" @click="activeTab = 'register'">注册</button>
        </div>
        <!-- 登录表单 -->
        <div v-show="activeTab === 'login'" class="form-container active">
          <form @submit.prevent="onLogin">
            <div class="mb-4">
              <label for="login-identity" class="block text-sm text-white/80 mb-2">邮箱 / 手机号</label>
              <input type="text" id="login-identity" v-model="login.identity" class="form-input w-full p-3 rounded" placeholder="请输入您的邮箱或手机号">
            </div>
            <div class="mb-6">
              <label for="login-password" class="block text-sm text-white/80 mb-2">密码</label>
              <input type="password" id="login-password" v-model="login.password" class="form-input w-full p-3 rounded" placeholder="请输入您的密码">
            </div>
            <button type="submit" class="w-full bg-accent text-gray-900 font-bold py-3 rounded hover:opacity-90 transition-opacity duration-300">进入沙盘</button>
          </form>
        </div>
        <!-- 注册表单 -->
        <div v-show="activeTab === 'register'" class="form-container active">
          <form @submit.prevent="onRegister">
            <div class="mb-4">
              <label for="register-email" class="block text-sm text-white/80 mb-2">邮箱</label>
              <input type="email" id="register-email" v-model="register.email" class="form-input w-full p-3 rounded" placeholder="用于接收重要通知">
            </div>
            <div class="mb-4">
              <label for="register-phone" class="block text-sm text-white/80 mb-2">手机号</label>
              <input type="tel" id="register-phone" v-model="register.phone" class="form-input w-full p-3 rounded" placeholder="用于身份验证">
            </div>
            <div class="mb-4">
              <label for="register-password" class="block text-sm text-white/80 mb-2">设置密码</label>
              <input type="password" id="register-password" v-model="register.password" class="form-input w-full p-3 rounded" placeholder="至少8位，包含字母和数字">
            </div>
            <button type="submit" class="w-full bg-accent text-gray-900 font-bold py-3 rounded hover:opacity-90 transition-opacity duration-300">注册并获取资格</button>
          </form>
        </div>
      </div>
      <p class="text-center text-xs text-white/50 mt-6">
        <a href="https://jiuzhougroup.vip" target="_blank" class="hover:text-accent transition">返回集团官网</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref<'login' | 'register'>('login');
const login = ref({ identity: '', password: '' });
const register = ref({ email: '', phone: '', password: '' });

function onLogin() {
  window.alert('登录成功！正在为您跳转至“九州沙盘”...');
}
function onRegister() {
  window.alert('注册成功！欢迎加入九州世界。');
  activeTab.value = 'login';
}
</script>

<style scoped>
.graphite {
  background: #282828;
  background-image: linear-gradient(-90deg, #7B7F82 2%, #303136 100%), radial-gradient(50% 116%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%), linear-gradient(-59deg, rgba(255, 255, 255, 0.5) 7%, rgba(87, 87, 87, 0.5) 68%, rgba(85, 85, 85, 0.5) 76%, rgba(0, 0, 0, 0.5) 100%);
  background-blend-mode: normal,multiply,multiply;
}
body {
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.85);
}
h1, h2, h3, h4, .tab-button {
  font-family: 'Noto Serif SC', serif;
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
.tab-button {
  transition: all 0.3s ease;
}
.tab-button.active {
  color: #EAEAEA;
  border-bottom-color: #EAEAEA;
}
.form-container {
  display: none;
}
.form-container.active {
  display: block;
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
