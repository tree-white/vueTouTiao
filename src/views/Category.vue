<template>
  <div>
    <!-- 收藏揶表头 -->
    <Titlebar title="栏目管理" showBack="true" />

    <!-- 内容 -->
    <section class="section">
      <p>点击删除以下频道</p>
      <div class="list">
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
      </div>

      <p>点击添加以下频道</p>
      <div class="list">
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
      </div>
    </section>
  </div>
</template>

<script>
// 导入表头
import Titlebar from "@/components/Titlebar";

export default {
  // 注册组件
  components: { Titlebar },
};
</script>

<style scoped lang="less">
.section {
    padding: 10 / 360 * 100vw;

    p {
        margin: 10 / 360 * 100vw;
        font-size:14px;
        color: #333;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .item {
            border: 1px solid #ccc;
            padding: 5 / 360 * 100vw  15 / 360 * 100vw;
            font-size: 14px;
            text-align: center;
            margin: 5 / 360 * 100vw 10 / 360 * 100vw;
        }
    }

}
</style>