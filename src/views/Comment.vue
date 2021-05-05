<template>
  <div>
    <!-- 头部 -->
    <Titlebar title="'我的跟帖" showBack="true" />

    <!-- 跟帖内容 -->
    <div class="comment-item">
      <!-- 时间 -->
      <div class="date">2021-05-06 02:24</div>
      <!-- 已回复的内容 -->
      <div class="commented">
        <div class="commented-user">回复：火星彩票研究员</div>
        <div class="commented-content">
          阿信是张信哲吗？张信哲是不是张学友的弟弟啊？
        </div>
      </div>
      <!-- 自己最新的回复 -->
      <div class="comment-new">张信哲不是张学友的弟弟啊！</div>
      <!-- 原文链接 -->
      <router-link to="#" class="link-post">
        <div>原文：阿信分享《说好不哭》幕后故事阿萨德艾弗森a</div>
        <span class="iconfont icon-youjiantou"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
// 导入头部组件
import Titlebar from "@/components/Titlebar";

export default {
  // 注册组件
  components: { Titlebar },
};
</script>

<style scoped lang="less">
.comment-item {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #ccc;

  .date {
    color: #999;
    margin-bottom: 10/360 * 100vw;
  }

  .commented {
    padding: 10/360 * 100vw;
    background: #eee;
    color: #777;
  }

  .commented-content {
    margin-top: 10/360 * 100vw;
  }

  .comment-new {
    margin: 15/360 * 100vw 0;
  }

  .link-post {
    color: #999;
    display: flex;
    align-items: center;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }

    span {

    }
  }
}
</style>