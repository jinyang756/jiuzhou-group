// API服务层 - 管理九州热点栏目、集团理念宗旨和星际传送门内容
import { fetchWithCache } from './data-loader.js';

// 数据缓存
const apiCache = new Map();

// 获取九州热点栏目数据
export async function getHotColumns() {
  return fetchWithCache('/src/data/hot-columns.json');
}

// 更新九州热点栏目数据
export async function updateHotColumns(data) {
  try {
    // 在实际项目中，这里会发送PUT请求到后端
    // 这里我们只是模拟更新缓存
    apiCache.set('hot-columns', data);
    return { success: true, message: '九州热点栏目更新成功' };
  } catch (error) {
    console.error('更新九州热点栏目失败:', error);
    return { success: false, message: '更新失败', error: error.message };
  }
}

// 获取集团理念宗旨数据
export async function getGroupPhilosophy() {
  return fetchWithCache('/src/data/group-philosophy.json');
}

// 更新集团理念宗旨数据
export async function updateGroupPhilosophy(data) {
  try {
    // 在实际项目中，这里会发送PUT请求到后端
    // 这里我们只是模拟更新缓存
    apiCache.set('group-philosophy', data);
    return { success: true, message: '集团理念宗旨更新成功' };
  } catch (error) {
    console.error('更新集团理念宗旨失败:', error);
    return { success: false, message: '更新失败', error: error.message };
  }
}

// 获取星际传送门数据
export async function getStarGate() {
  return fetchWithCache('/src/data/star-gate.json');
}

// 更新星际传送门数据
export async function updateStarGate(data) {
  try {
    // 在实际项目中，这里会发送PUT请求到后端
    // 这里我们只是模拟更新缓存
    apiCache.set('star-gate', data);
    return { success: true, message: '星际传送门更新成功' };
  } catch (error) {
    console.error('更新星际传送门失败:', error);
    return { success: false, message: '更新失败', error: error.message };
  }
}

// 清空API缓存
export function clearApiCache() {
  apiCache.clear();
}