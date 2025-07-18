const dataCache = new Map();

// 基础 fetch 请求函数，带缓存功能
async function fetchWithCache(url) {
  if (dataCache.has(url)) {
    return Promise.resolve(dataCache.get(url));
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    dataCache.set(url, data);
    return data;
  } catch (error) {
    console.error('Data fetch error:', error);
    throw error;
  }
}

// 获取集团核心数据
export async function fetchGroupData() {
  return fetchWithCache('/src/data/group-core.json');
}

// 获取子公司数据
export async function fetchSubsidiaryData(id) {
  return fetchWithCache(`/src/data/subsidiaries/${id}.json`);
}

// 获取业务数据
export async function fetchBusinessData(id) {
  return fetchWithCache(`/src/data/businesses/${id}.json`);
}

// 获取数据流详情
export async function fetchDataFlowDetails(businessId, flowId) {
  return fetchWithCache(`/src/data/data-flows/${businessId}/${flowId}.json`);
}

// 清空缓存（用于开发环境）
export function clearDataCache() {
  dataCache.clear();
}