<template>
  <div>
    <!-- 头部 -->
    <Titlebar title="我的跟帖" showBack="true" />

    <!-- 跟帖内容 -->
    <div class="comment-item" v-for="(item, index) in comments" :key="index">
      <!-- 时间 -->
      <div class="date">
        {{ moment(item.create_date).format("YYYY-MM-DD hh:mm") }}
      </div>
      <!-- 已回复的内容 -->
      <div class="commented" v-if="item.parent">
        <div class="commented-user">回复：{{ item.parent.user.nickname }}</div>
        <div class="commented-content">
          {{ item.parent.content }}
        </div>
      </div>
      <!-- 自己最新的回复 -->
      <div class="comment-new">{{ item.content }}</div>
      <!-- 原文链接 -->
      <router-link to="#" class="link-post">
        <div>原文：{{ item.post.title }}</div>
        <span class="iconfont icon-youjiantou"></span>
      </router-link>
    </div>

    <!-- 更多跟帖 -->
    <div class="other-comments">
      <span>更多跟帖</span>
      <span class="iconfont icon-shuangyoujiantou-"></span>
    </div>
  </div>
</template>

<script>
// 导入头部组件
import Titlebar from "@/components/Titlebar";
// 导入日期格式组件
import moment from "moment";

export default {
  mounted() {
    const { token: Authorization, user } = JSON.parse(
      localStorage.getItem("userInfo")
    );
    // 请求数据
    this.$axios({
      url: "/user_comments",
      headers: { Authorization },
    }).then((response) => {
      console.log(response);
      this.comments = response.data.data;
      console.log(this.comments);
    });
  },
  data() {
    return {
      moment,
      comments: [],
    };
  },
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
    justify-content: space-between;
    align-items: center;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
}
// 更多跟帖
.other-comments {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40/360 * 100vw;
  color: #777;

  .icon-shuangyoujiantou- {
    margin-left: 10px;
  }
}
</style>