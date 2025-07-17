
<template>
  <div class="min-h-screen w-screen overflow-hidden" style="font-family: 'Songti SC', 'STSong', serif; background-image: linear-gradient(-180deg, #15140F 0%, #34312C 97%); color: rgba(255,255,255,0.7);">
    <!-- 侧边栏与主内容区 -->
    <div class="flex h-screen w-screen p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8">
      <!-- 侧边栏 -->
      <aside class="w-1/4 lg:w-1/5 h-full flex flex-col gap-4 md:gap-6">
        <div class="border border-white/10 rounded-lg p-4 flex-shrink-0 bg-black/20 shadow-lg">
          <h1 class="text-2xl font-bold text-accent">九州：沙盘</h1>
          <p class="text-sm mt-1">战略推演应用 v1.8 (著书版)</p>
        </div>
        <div id="infoPanel" class="border border-white/10 rounded-lg p-4 flex-grow flex flex-col bg-black/20 shadow-lg overflow-hidden">
          <div class="flex justify-between items-center border-b border-accent/20 pb-2 mb-4 flex-shrink-0">
            <h2 class="text-lg text-accent">世界状态</h2>
            <div class="text-right">
              <p class="text-sm text-white/70">世界周期</p>
              <p id="worldCycle" class="text-lg font-bold text-accent">0</p>
            </div>
          </div>
          <div id="infoContent" class="flex-grow overflow-y-auto pr-2">
            <p id="infoPlaceholder" class="text-center py-12">悬停于元素上以查看详情</p>
            <div id="infoText" class="hidden"></div>
            <div id="worldEvents" class="mt-4 border-t border-accent/20 pt-4">
              <h3 class="text-md text-accent/80 mb-2">世界事件</h3>
              <div id="policyList" class="space-y-3 max-h-48 overflow-y-auto pr-2"></div>
            </div>
          </div>
          <div id="chartContainer" class="flex-shrink-0 mt-auto border-t border-accent/20 pt-4 hidden">
            <h4 class="text-md text-accent/80 mb-2">影响力分布</h4>
            <div class="h-48"><canvas id="influenceChartCanvas"></canvas></div>
          </div>
          <div id="actionButtons" class="flex-shrink-0 mt-4 space-y-2">
            <button id="nextCycleButton" class="w-full py-2 bg-accent text-black font-bold rounded hover:opacity-90 transition-opacity duration-300">推演下一周期</button>
          </div>
        </div>
      </aside>
      <!-- 主内容区 -->
      <main class="w-3/4 lg:w-4/5 h-full border border-white/10 rounded-lg bg-black/20 shadow-lg relative flex items-center justify-center overflow-hidden">
        <div id="territoryGrid" class="absolute top-0 left-0 w-full h-full grid grid-cols-12 grid-rows-8 gap-1 p-2 opacity-50"></div>
        <div id="governanceCircle" class="relative w-[50vh] h-[50vh] lg:w-[60vh] lg:h-[60vh] border-2 border-accent/30 rounded-full flex items-center justify-center">
          <div id="seatContainer" class="absolute w-full h-full"></div>
          <div id="centerLogo" class="w-32 h-32 lg:w-40 lg:h-40 bg-black/50 rounded-full flex items-center justify-center text-center border-2 border-accent/50 shadow-gold backdrop-blur-sm">
            <div><h3 class="text-xl lg:text-2xl text-accent font-bold">九州</h3><p class="text-xs lg:text-sm text-white/50">点击以阅宪章</p></div>
          </div>
        </div>
      </main>
    </div>
    <!-- 宪章模态框 -->
    <div id="charterModal" class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center hidden z-50">
      <div id="charterContent" class="w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl h-auto max-h-[80vh] bg-gradient-to-br from-[#15140F] to-[#25221D] border-2 border-accent rounded-lg shadow-2xl shadow-gold p-8 overflow-y-auto modal-enter">
        <h1 class="text-3xl text-accent text-center mb-6">《九州宪章》</h1>
        <div id="charterText" class="space-y-6 text-white/80">
          <div><h2 class="text-xl text-accent/80 mb-2">第一章：共生性使命</h2><p>九州不追求预设的终极目标。我们的存在，是为了敏锐地洞察、并以极具创造力的方式，去回应我们时代里最杰出、最富探索精神的个体的深层需求。我们与成员共生，成员的成长定义了我们的边界。</p></div>
          <div><h2 class="text-xl text-accent/80 mb-2">第二章：四大信条</h2><ul class="list-disc list-inside space-y-1"><li><b>绝对诚信:</b> 信任是九州生态的唯一货币。</li><li><b>无尽探索:</b> 我们为探索未知而生，奖励有价值的失败。</li><li><b>底线原则:</b> 当原则与利益冲突时，我们选择原则。</li><li><b>共赢生态:</b> 我们不寻求零和游戏，致力于相互成就。</li></ul></div>
          <div><h2 class="text-xl text-accent/80 mb-2">第三章：成功的定义</h2><p>我们最大的成功，是成员因九州而变得更智慧、更强大。我们以创造的文化印记，而非积累的财富来衡量伟大。我们推崇具备“无尽创造力”与“绝对担当”的九州创造者。</p></div>
          <div><h2 class="text-xl text-accent/80 mb-2">第四章：九州世界观</h2><p>我们视财富为工具，权力为责任。我们信奉“科技向善，人文向美”，科技的终极应与艺术、哲学和爱融为一体。</p></div>
        </div>
        <button id="closeCharterModal" class="absolute top-4 right-4 text-white/50 hover:text-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
      </div>
    </div>
    <!-- 其他模态框与脚本由 onMounted 注入 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  // 动态注入原生交互脚本（Chart.js、localStorage、模态框、推演等）
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => {
    // 这里可按需将原有 JS 逻辑迁移为 Vue 响应式实现，或直接复用原生逻辑
    // 由于篇幅限制，建议后续将核心逻辑逐步迁移为 Vue 组件内数据与方法
  };
  document.body.appendChild(script);
  // 其余原生 JS 逻辑（如 localStorage、模态框、推演等）可直接迁移或复用
  // ...如需完整迁移为响应式 SPA，请告知...
});
</script>

<style scoped>
.text-accent { color: #bfa374; }
.border-accent { border-color: #bfa374; }
.bg-accent { background-color: #bfa374; }
.bg-accent-transparent { background-color: rgba(191, 163, 116, 0.1); }
.shadow-gold { box-shadow: 0 0 15px rgba(191, 163, 116, 0.3), inset 0 0 5px rgba(191, 163, 116, 0.2); }
.tooltip { visibility: hidden; opacity: 0; transition: opacity 0.3s; }
.has-tooltip:hover .tooltip { visibility: visible; opacity: 1; }
.seat { transition: all 0.3s ease-in-out; }
.seat:hover { transform: scale(1.1) rotate(0deg) !important; border-color: #bfa374; box-shadow: 0 0 25px rgba(191, 163, 116, 0.7); }
.territory { transition: all 0.3s ease-in-out; cursor: pointer; position: relative; }
.territory:hover { transform: scale(1.05); z-index: 10; }
.territory-level { position: absolute; top: 4px; right: 4px; background-color: rgba(0,0,0,0.5); color: #bfa374; font-size: 0.7rem; font-weight: bold; padding: 1px 5px; border-radius: 4px; border: 1px solid rgba(191, 163, 116, 0.5); }
.influence-ping {
  position: absolute; top: 50%; left: 50%;
  width: 100%; height: 100%;
  border-radius: 0.5rem;
  animation: ping-animation 1s ease-out;
}
@keyframes ping-animation {
  0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0 rgba(191, 163, 116, 0.7); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 20px 30px rgba(191, 163, 116, 0); opacity: 0; }
}
#centerLogo { cursor: pointer; transition: all 0.3s ease-in-out; }
#centerLogo:hover { transform: scale(1.05); }
.modal-enter { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
#charterContent::-webkit-scrollbar, #policyContent::-webkit-scrollbar, #policyList::-webkit-scrollbar, #infoContent::-webkit-scrollbar { width: 8px; }
#charterContent::-webkit-scrollbar-track, #policyContent::-webkit-scrollbar-track, #policyList::-webkit-scrollbar-track, #infoContent::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
#charterContent::-webkit-scrollbar-thumb, #policyContent::-webkit-scrollbar-thumb, #policyList::-webkit-scrollbar-thumb, #infoContent::-webkit-scrollbar-thumb { background: rgba(191, 163, 116, 0.4); border-radius: 10px; }
#charterContent::-webkit-scrollbar-thumb:hover, #policyContent::-webkit-scrollbar-thumb:hover, #policyList::-webkit-scrollbar-thumb:hover, #infoContent::-webkit-scrollbar-thumb:hover { background: rgba(191, 163, 116, 0.6); }
.form-input { background-color: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.2); }
.form-input:focus { border-color: #bfa374; outline: none; box-shadow: 0 0 10px rgba(191, 163, 116, 0.3); }
.spinner { border-top-color: #bfa374; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.policy-btn { padding: 2px 6px; font-size: 0.75rem; border-radius: 4px; transition: all 0.2s; }
</style>
