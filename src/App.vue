<script setup lang="ts">
</script>

<template>
  <div>
    <h1>九州集团</h1>
    <nav style="margin-bottom: 2rem;">
      <router-link to="/">首页</router-link> |
      <router-link to="/blog">集团博客</router-link> |
      <router-link to="https://jiuzhougroup-rdtz.web.app/" target="_blank">日斗投资</router-link> |
      <router-link to="https://jiuzhougroup-jczf.web.app/" target="_blank">聚财众发</router-link> |
      <router-link to="https://jiuzhougroup-xft.web.app/" target="_blank">讯飞通</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
