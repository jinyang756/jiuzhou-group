<template>
  <div class="blog-post-container">
    <header class="blog-post-header">
      <router-link to="/blog" class="back-link">← 返回博客列表</router-link>
      <div v-if="post" class="post-meta">
        <span class="post-category" :class="post.category">{{ getCategoryName(post.category) }}</span>
        <span class="post-date">{{ formatDate(post.publishDate) }}</span>
        <span class="post-author">作者: {{ post.author }}</span>
      </div>
      <h1 v-if="post">{{ post.title }}</h1>
    </header>

    <main class="blog-post-main" v-if="post">
      <img :src="post.coverImage" alt="文章封面" class="post-cover">
      <div class="post-content" v-html="post.content"></div>

      <div class="post-navigation">
        <div v-if="prevPost" class="prev-post">
          <span class="nav-label">上一篇</span>
          <router-link :to="{ name: 'blog-post', params: { id: prevPost.id } }">{{ prevPost.title }}</router-link>
        </div>
        <div v-if="nextPost" class="next-post">
          <span class="nav-label">下一篇</span>
          <router-link :to="{ name: 'blog-post', params: { id: nextPost.id } }">{{ nextPost.title }}</router-link>
        </div>
      </div>

      <div class="comments-section">
        <h3>评论 ({{ comments.length }})</h3>
        <div class="comment-form">
          <textarea v-model="newCommentContent" placeholder="写下您的评论..." class="comment-textarea"></textarea>
          <button @click="submitComment" class="submit-comment">提交评论</button>
        </div>
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="commenter-info">
              <div class="commenter-avatar">{{ comment.commenterName.charAt(0) }}</div>
              <div class="commenter-details">
                <span class="commenter-name">{{ comment.commenterName }}</span>
                <span class="comment-date">{{ formatDate(comment.commentDate) }}</span>
              </div>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </main>
    <div v-else class="loading">加载中...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = ref<number | null>(null);
const post = ref<any>(null);
const prevPost = ref<any>(null);
const nextPost = ref<any>(null);
const comments = ref<any[]>([]);
const newCommentContent = ref('');

// 模拟文章数据
const posts = [
  {
    id: 1,
    title: "九州集团荣获2023年度最具创新力企业奖",
    content: `
      <p>九州集团凭借在数字科技领域的卓越创新，荣获2023年度最具创新力企业奖。这一奖项是对集团在技术研发、业务模式创新以及数字化转型方面所取得成就的高度认可。</p>
      <p>九州集团自成立以来，始终坚持以技术创新为核心驱动力，不断加大研发投入，推动业务模式升级。集团旗下的人工智能、大数据分析等核心技术已在多个行业得到广泛应用，为客户创造了显著价值。</p>
      <p>此次获奖，不仅是对九州集团过去成绩的肯定，更是对集团未来发展的激励。九州集团将继续秉持创新理念，不断突破技术瓶颈，为推动行业发展和社会进步做出更大贡献。</p>
    `,
    coverImage: "https://via.placeholder.com/1200x600?text=九州集团新闻",
    publishDate: new Date('2023-11-15'),
    category: 'news',
    author: "九州集团公关部"
  },
  {
    id: 2,
    title: "九州集团发布新一代人工智能平台",
    content: `
      <p>九州集团正式发布新一代人工智能平台，助力企业数字化转型。该平台整合了集团最新的人工智能、大数据和云计算技术，能够为企业提供全方位的数字化解决方案。</p>
      <p>新一代人工智能平台具有以下核心优势：</p>
      <ul>
        <li>强大的数据分析能力，能够快速处理海量数据，提取有价值的商业洞察；</li>
        <li>先进的机器学习算法，能够不断优化业务流程，提高运营效率；</li>
        <li>灵活的部署方式，支持公有云、私有云和混合云等多种部署模式；</li>
        <li>完善的安全保障体系，确保企业数据安全和隐私保护。</li>
      </ul>
      <p>九州集团表示，新一代人工智能平台的发布，标志着集团在数字化转型领域迈出了重要一步。集团将继续加大技术研发投入，不断完善平台功能，为企业提供更加优质的数字化服务。</p>
    `,
    coverImage: "https://via.placeholder.com/1200x600?text=AI平台发布",
    publishDate: new Date('2023-10-28'),
    category: 'business',
    author: "九州集团技术部"
  },
  {
    id: 3,
    title: "数字经济时代的企业发展战略",
    content: `
      <p>探讨数字经济时代下，企业如何制定有效的发展战略。随着信息技术的飞速发展，数字经济已经成为拉动全球经济增长的重要引擎。在这个时代，企业面临着前所未有的机遇和挑战。</p>
      <p>数字经济时代的企业发展战略需要关注以下几个方面：</p>
      <ul>
        <li>数字化转型：企业需要积极推动业务流程、组织结构和企业文化的数字化转型，提高企业的数字化能力；</li>
        <li>技术创新：企业需要加大技术研发投入，不断突破核心技术瓶颈，提高企业的技术竞争力；</li>
        <li>生态合作：企业需要积极构建开放、协作的生态体系，与合作伙伴共同创造价值；</li>
        <li>数据驱动：企业需要充分利用大数据分析技术，实现决策的科学化和智能化。</li>
      </ul>
      <p>九州集团作为数字经济领域的领军企业，始终坚持以技术创新为核心，以客户需求为导向，不断完善企业发展战略，积极应对数字经济时代的挑战，实现了企业的快速发展。</p>
    `,
    coverImage: "https://via.placeholder.com/1200x600?text=数字经济战略",
    publishDate: new Date('2023-10-15'),
    category: 'insight',
    author: "九州集团战略规划部"
  }
];

// 模拟评论数据
const initialComments = [
  {
    id: 1,
    postId: 1,
    commenterName: "张先生",
    content: "恭喜九州集团获得此项殊荣，实至名归！",
    commentDate: new Date('2023-11-16')
  },
  {
    id: 2,
    postId: 1,
    commenterName: "李女士",
    content: "九州集团的创新精神值得我们学习，期待看到更多的创新成果。",
    commentDate: new Date('2023-11-17')
  }
];

onMounted(() => {
  // 获取文章ID
  const id = Number(route.params.id);
  postId.value = id;

  // 获取文章详情
  const foundPost = posts.find(p => p.id === id);
  post.value = foundPost;

  // 获取上一篇和下一篇文章
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex > 0) {
    prevPost.value = posts[postIndex - 1];
  }
  if (postIndex < posts.length - 1) {
    nextPost.value = posts[postIndex + 1];
  }

  // 获取评论
  comments.value = initialComments.filter(c => c.postId === id);
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

// 提交评论
function submitComment() {
  if (!newCommentContent.value.trim()) {
    alert('请输入评论内容');
    return;
  }

  const newComment = {
    id: comments.value.length + 1,
    postId: postId.value,
    commenterName: "匿名用户",
    content: newCommentContent.value,
    commentDate: new Date()
  };

  comments.value.push(newComment);
  newCommentContent.value = '';
}
</script>

<style scoped>
.blog-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #bfa374;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 0.8;
}

.blog-post-header {
  margin-bottom: 2rem;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.post-category {
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
}

.post-category.news {
  background-color: rgba(191, 163, 116, 0.2);
  color: #bfa374;
}

.post-category.business {
  background-color: rgba(100, 116, 255, 0.2);
  color: #6474ff;
}

.post-category.insight {
  background-color: rgba(66, 184, 131, 0.2);
  color: #42b883;
}

.blog-post-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.post-cover {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.post-content {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.post-content p {
  margin-bottom: 1.5rem;
}

.post-content ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.post-content li {
  margin-bottom: 0.5rem;
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.prev-post,
.next-post {
  flex: 1;
}

.prev-post {
  margin-right: 1rem;
}

.next-post {
  margin-left: 1rem;
  text-align: right;
}

.nav-label {
  display: block;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.post-navigation a {
  color: #bfa374;
  text-decoration: none;
  transition: opacity 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  box-orient: vertical;
  overflow: hidden;
}

.post-navigation a:hover {
  opacity: 0.8;
}

.comments-section {
  margin-top: 3rem;
}

.comments-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-textarea {
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1rem;
}

.submit-comment {
  padding: 0.8rem 1.5rem;
  background-color: #bfa374;
  color: #15140F;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.submit-comment:hover {
  background-color: #d4b886;
}

.comments-list {
  margin-top: 1.5rem;
}

.comment-item {
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.commenter-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.commenter-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #bfa374;
  color: #15140F;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

.commenter-details {
  flex: 1;
}

.commenter-name {
  font-weight: bold;
  color: white;
  margin-bottom: 0.2rem;
  display: block;
}

.comment-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.comment-content {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.loading {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
}

@media (max-width: 768px) {
  .blog-post-container {
    padding: 1rem;
  }

  .blog-post-header h1 {
    font-size: 1.5rem;
  }

  .post-navigation {
    flex-direction: column;
    gap: 1.5rem;
  }

  .prev-post,
  .next-post {
    margin: 0;
    text-align: left;
  }
}
</style>