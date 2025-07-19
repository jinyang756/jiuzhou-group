<template>
  <div class="api-test">
    <h2 class="text-2xl text-accent mb-6">API测试组件</h2>

    <div class="mb-8">
      <h3 class="text-xl text-white mb-4">九州热点栏目</h3>
      <button @click="fetchHotColumns" class="cta-button mb-4">获取热点栏目数据</button>
      <div v-if="hotColumns" class="bg-dark-section p-4 rounded-lg">
        <ul>
          <li v-for="column in hotColumns.columns" :key="column.id" class="mb-2">
            <span class="text-accent">{{ column.title }}:</span> {{ column.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-xl text-white mb-4">集团理念宗旨</h3>
      <button @click="fetchGroupPhilosophy" class="cta-button mb-4">获取理念宗旨数据</button>
      <div v-if="groupPhilosophy" class="bg-dark-section p-4 rounded-lg">
        <h4 class="text-lg text-accent mb-2">{{ groupPhilosophy.title }}</h4>
        <ul>
          <li v-for="value in groupPhilosophy.values" :key="value.id" class="mb-2">
            <span class="text-accent">{{ value.title }}:</span> {{ value.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-xl text-white mb-4">星际传送门</h3>
      <button @click="fetchStarGate" class="cta-button mb-4">获取传送门数据</button>
      <div v-if="starGate" class="bg-dark-section p-4 rounded-lg">
        <h4 class="text-lg text-accent mb-2">{{ starGate.title }}</h4>
        <ul>
          <li v-for="portal in starGate.portals" :key="portal.id" class="mb-2">
            <span class="text-accent">{{ portal.title }}:</span> {{ portal.description }}
            <ul v-if="portal.subItems" class="ml-6 mt-1">
              <li v-for="subItem in portal.subItems" :key="subItem.id" class="text-sm text-white/70">
                - {{ subItem.title }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotColumns, getGroupPhilosophy, getStarGate } from '../services/api-service.js';

export default {
  name: 'ApiTest',
  data() {
    return {
      hotColumns: null,
      groupPhilosophy: null,
      starGate: null
    };
  },
  methods: {
    async fetchHotColumns() {
      try {
        this.hotColumns = await getHotColumns();
        console.log('热点栏目数据:', this.hotColumns);
      } catch (error) {
        console.error('获取热点栏目数据失败:', error);
        alert('获取热点栏目数据失败');
      }
    },
    async fetchGroupPhilosophy() {
      try {
        this.groupPhilosophy = await getGroupPhilosophy();
        console.log('理念宗旨数据:', this.groupPhilosophy);
      } catch (error) {
        console.error('获取理念宗旨数据失败:', error);
        alert('获取理念宗旨数据失败');
      }
    },
    async fetchStarGate() {
      try {
        this.starGate = await getStarGate();
        console.log('星际传送门数据:', this.starGate);
      } catch (error) {
        console.error('获取星际传送门数据失败:', error);
        alert('获取星际传送门数据失败');
      }
    }
  }
};
</script>

<style scoped>
.api-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>