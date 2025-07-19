<template>
  <div class="blog-container">
    <header class="blog-header">
      <h1>九州国际控股集团博客</h1>
      <p>分享集团新闻、业务动态和行业见解</p>
    </header>

    <main class="blog-main">
      <div class="blog-filter">
        <input type="text" v-model="searchQuery" placeholder="搜索文章..." class="search-input">
        <div class="category-filter">
          <button @click="filterCategory('all')" :class="{ 'active': currentCategory === 'all' }")>全部</button>
          <button @click="filterCategory('news')" :class="{ 'active': currentCategory === 'news' }")>集团新闻</button>
          <button @click="filterCategory('business')" :class="{ 'active': currentCategory === 'business' }")>业务动态</button>
          <button @click="filterCategory('insight')" :class="{ 'active': currentCategory === 'insight' }")>行业见解</button>
        </div>
      </div>

      <div class="blog-list">
        <div v-for="post in filteredPosts" :key="post.id" class="blog-card">
          <img :src="post.coverImage" alt="文章封面" class="blog-cover">
          <div class="blog-meta">
            <span class="blog-category" :class="post.category">{{ getCategoryName(post.category) }}</span>
            <span class="blog-date">{{ formatDate(post.publishDate) }}</span>
          </div>
          <h2 class="blog-title">{{ post.title }}</h2>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <router-link :to="{ name: 'blog-post', params: { id: post.id } }" class="read-more">阅读更多</router-link>
        </div>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button @click="currentPage > 1 ? currentPage-- : ''" :disabled="currentPage === 1">上一页</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage < totalPages ? currentPage++ : ''" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const searchQuery = ref('');
const currentCategory = ref('all');
const currentPage = ref(1);
const postsPerPage = ref(6);

// 模拟文章数据
const posts = ref([
  {
    id: 1,
    title: "九州集团荣获2023年度最具创新力企业奖",
    excerpt: "九州集团凭借在数字科技领域的卓越创新，荣获2023年度最具创新力企业奖。",
    content: "详细内容...",
    coverImage: "https://via.placeholder.com/800x400?text=九州集团新闻",
    publishDate: new Date('2023-11-15'),
    category: 'news',
    author: "九州集团公关部"
  },
  {
    id: 2,
    title: "九州集团发布新一代人工智能平台",
    excerpt: "九州集团正式发布新一代人工智能平台，助力企业数字化转型。",
    content: "详细内容...",
    coverImage: "https://via.placeholder.com/800x400?text=AI平台发布",
    publishDate: new Date('2023-10-28'),
    category: 'business',
    author: "九州集团技术部"
  },
  {
    id: 3,
    title: "数字经济时代的企业发展战略",
    excerpt: "探讨数字经济时代下，企业如何制定有效的发展战略。",
    content: "详细内容...",
    coverImage: "https://via.placeholder.com/800x400?text=数字经济战略",
    publishDate: new Date('2023-10-15'),
    category: 'insight',
    author: "九州集团战略规划部"
  }
]);

// 过滤文章
const filteredPosts = computed(() => {
  let filtered = posts.value;

  // 按分类过滤
  if (currentCategory.value !== 'all') {
    filtered = filtered.filter(post => post.category === currentCategory.value);
  }

  // 按搜索词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query)
    );
  }

  // 分页
  const startIndex = (currentPage.value - 1) * postsPerPage.value;
  const endIndex = startIndex + postsPerPage.value;
  return filtered.slice(startIndex, endIndex);
});

// 总页数
const totalPages = computed(() => {
  let filtered = posts.value;

  // 按分类过滤
  if (currentCategory.value !== 'all') {
    filtered = filtered.filter(post => post.category === currentCategory.value);
  }

  // 按搜索词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query)
    );
  }

  return Math.ceil(filtered.length / postsPerPage.value);
});

// 格式化日期
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 获取分类名称
function getCategoryName(category: string) {
  switch(category) {
    case 'news': return '集团新闻';
    case 'business': return '业务动态';
    case 'insight': return '行业见解';
    default: return '未知分类';
  }
}

// 过滤分类
function filterCategory(category: string) {
  currentCategory.value = category;
  currentPage.value = 1; // 重置到第一页
}
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #bfa374;
}

.blog-header p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.blog-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-radius: 4px;
  font-size: 1rem;
}

.category-filter {
  display: flex;
  gap: 0.5rem;
}

.category-filter button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-filter button:hover {
  border-color: #bfa374;
  color: #bfa374;
}

.category-filter button.active {
  background-color: #bfa374;
  color: #15140F;
  border-color: #bfa374;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.blog-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.blog-category {
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
}

.blog-category.news {
  background-color: rgba(191, 163, 116, 0.2);
  color: #bfa374;
}

.blog-category.business {
  background-color: rgba(100, 116, 255, 0.2);
  color: #6474ff;
}

.blog-category.insight {
  background-color: rgba(66, 184, 131, 0.2);
  color: #42b883;
}

.blog-title {
  padding: 0 1rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: white;
}

.blog-excerpt {
  padding: 0 1rem 1rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  display: block;
  padding: 1rem;
  text-align: center;
  color: #bfa374;
  text-decoration: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.read-more:hover {
  background-color: rgba(191, 163, 116, 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  border-color: #bfa374;
  color: #bfa374;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .blog-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .category-filter {
    justify-content: center;
  }

  .blog-list {
    grid-template-columns: 1fr;
  }
}
</style>