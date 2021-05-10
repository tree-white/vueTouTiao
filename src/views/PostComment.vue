<template>
  <div>
    <!-- 头部 -->
    <Titlebar title="精彩跟帖" showBack="true" />

    <!-- 跟帖评论列表 -->
    <div class="comment" v-for="(item, index) in list" :key="index">
      <!-- 用户信息 / 回复 -->
      <div class="comment-top">
        <!-- 左边：头像/昵称/跟帖时间 -->
        <div class="user">
          <!-- 左边头像 -->
          <img
            :src="$axios.defaults.baseURL + item.user.head_img"
          />

          <!-- 右边昵称/时间 -->
          <div class="user-info">
            <p>{{ item.user.nickname }}</p>
            <!-- moment().fromNow() 显示距离到当前的时间 -->
            <span>{{ moment(item.create_date).fromNow() }}</span>
          </div>
        </div>

        <!-- 右边：回复按钮 -->
        <span class="reply">回复</span>
      </div>

      <!-- 回复列表 - 递归盒子 -->
      <div class="reply-list">
        <!-- item.parent有多少层数据，CommentFloor就自调用多少次 -->
        <CommentFloor v-if="item.parent" :data="item.parent"/>
      </div>

      <!-- 回复内容 -->
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
// 头部导航组件
import Titlebar from "@/components/Titlebar";
// 回复评论的楼层组件
import CommentFloor from "@/components/CommentFloor";
// moment时间处理组件
import moment from "moment";
// 转换过继语言，zh-CN 就是中文
moment.locale('zh-CN');

export default {
  components: { Titlebar, CommentFloor },
  data() {
    return {
      // 激活时间组件
      moment,
      // 文章id
      pid: "",
      // 评论的列表
      list: [],
    };
  },
  mounted() {
    // 文章的id
    const { id } = this.$route.params;
    // 把id保存到data
    this.pid = id;

    // 请求评论列表数据
    this.getList();
  },
  methods: {
    // 请求评论列表数据
    getList() {
      this.$axios({
        url: `/post_comment/${this.pid}`,
      }).then((res) => {
        // data是评论的列表数组
        const { data } = res.data;
        // 保存到data的list数组中
        this.list = data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.comment {
  padding: 20 / 360 * 100vw;
  border-bottom: 1px solid #ddd;

  .comment-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20 / 360 * 100vw;

    .user {
      display: flex;
      align-items: center;

      img {
        width: 35 / 360 * 100vw;
        height: 35 / 360 * 100vw;
        margin-right: 5 / 360 * 100vw;
        border-radius: 5 / 360 * 100vw;
      }

      .user-info {
        font-size: 14 / 360 * 100vw;

        span {
          font-size: 12 / 360 * 100vw;
          color: #999;
        }
      }
    }

    .reply {
      font-size: 12 / 360 * 100vw;
      color: #999;
    }
  }

  .content {
    font-size: 14 / 360 * 100vw;
    margin-top: 10 / 360 * 100vw;
  }
}

</style>