<template>
  <div class="box">
    <!-- 头部 -->
    <header class="header">
      <!-- 左边 - 退出 -->
      <div class="left" @click="$router.back('fromPath')">
        <span class="iconfont icon-zuojiantou"></span>
        <span class="iconfont icon-new"></span>
      </div>

      <!-- 右边 - 关注 - active(已关注/关注) -->
      <div
        class="follow"
        :class="post.has_follow ? '' : 'active'"
        @click="handleFollow"
      >
        {{ post.has_follow ? "已关注" : "关注" }}
      </div>
    </header>

    <!-- 内容 -->
    <div class="container">
      <!-- 标题 -->
      <h2>{{ post.title }}</h2>

      <!-- 作者/发布时间 -->
      <div class="author">
        {{ post.user.nickname }}
        {{ moment(post.create_date).format("YYYY-MM-DD") }}
      </div>

      <!-- 内容 -->
      <div class="content" v-html="post.content"></div>

      <!-- 按钮 -->
      <div class="btn">
        <!-- 点赞 -->
        <div class="like" @click="handleLike">
          <span
            class="iconfont icon-dianzan"
            :class="post.has_like ? 'like_check' : ''"
          ></span>
          <!-- 点赞数 -->
          <span>{{ post.like_length }}</span>
        </div>

        <!-- 分享微信 -->
        <div class="wechat">
          <span class="iconfont icon-weixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>

    <!-- 底部固定蓝 -->
    <footer class="footer">
      <input type="text" placeholder="发布评论" class="comment-input" />

      <div class="comment-number">
        <div class="iconfont icon-pinglun"></div>
        <!-- 评论条数 -->
        <div class="number">
          {{ post.comment_length > 99 ? "99+" : post.comment_length }}
        </div>
      </div>

      <!-- 底部收藏星星 -->
      <div
        class="iconfont icon-shoucang"
        :class="post.has_star ? 'collect' : ''"
        @click="handleStar"
      ></div>

      <!-- 底部右下角分享按钮 -->
      <div class="iconfont icon-fenxiang" @click="showShare = true"></div>
    </footer>

    <!-- vant 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
// 时间格式化工具
import moment from "moment";
export default {
  data() {
    return {
      // 进来的路径
      fromPath: localStorage.getItem("fromPath"),
      // 时间格式化工具
      moment,
      // 文章的详情
      post: { user: {} },
      token: "",
      // 分享面板
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: "微博", icon: "weibo" },
        { name: 'QQ', icon: 'qq' },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },

  mounted() {
    // 获取本地token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

    // 保存一份token到本地
    this.token = token;

    // 请求配置单独创建
    const config = { url: "/post/" + this.$route.params.id };

    // 如果 token 有值就给头信息加上token
    if (token) config.headers = { Authorization: token };

    // 请求文章详情
    this.$axios(config).then((res) => {
      const { data } = res.data;
      this.post = data;
    });
  },

  methods: {
    // 关注和取消关注
    handleFollow() {
      // 判断当前的状态是关注还是未关注
      const url =
        (this.post.has_follow ? "/user_unfollow/" : "/user_follows/") +
        this.post.user.id;
      this.$axios({
        url,
        headers: { Authorization: this.token },
      }).then((res) => {
        console.log(res);
        // 关注成功之后，修改关注状态
        this.post.has_follow = !this.post.has_follow;

        this.$toast.success(this.post.has_follow ? "关注成功" : "取消关注成功");
      });
    },

    // 点赞 / 取消点赞
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.post.id,
        headers: { Authorization: this.token },
      }).then((res) => {
        // 修改点赞的状态
        this.post.has_like = !this.post.has_like;
        // 点赞的数量加1
        this.post.has_like
          ? (this.post.like_length += 1)
          : (this.post.like_length -= 1);
        // 弹窗提示
        this.$toast.success(res.data.message);
      });
    },

    // 收藏 / 取消收藏
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: { Authorization: this.token },
      }).then((res) => {
        console.log(res);
        // 修改点赞的状态
        this.post.has_star = !this.post.has_star;

        // 弹窗提示
        this.$toast.success(res.data.message);
      });
    },

    // 分享面板
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<style scoped lang="less">
// 头部
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    padding: 0 10 / 360 * 100vw;

    .icon-zuojiantou {
      font-size: 15 / 360 * 100vw;
      margin-right: 5 / 360 * 100vw;
    }

    .icon-new {
      font-size: 54 / 360 * 100vw;
    }
  }

  .follow {
    padding: 3 / 360 * 100vw 15 / 360 * 100vw;
    font-size: 12 / 360 * 100vw;
    border: 1px #999 solid;
    border-radius: 50px;
    margin-right: 15 / 360 * 100vw;
  }
}

// 关注样式
.active {
  background: red;
  color: #fff;
  border-color: red !important;
}

// 文章内容
.container {
  margin-top: 60 / 360 * 100vw;
  padding: 10 / 360 * 100vw;
  border-bottom: 5 / 360 * 100vw solid #e4e4e4;

  h2 {
    font-size: 20 / 360 * 100vw;
    margin-bottom: 5 / 360 * 100vw;
  }

  .author {
    color: #999;
  }

  .content {
    margin: 20 / 360 * 100vw 0;
    line-height: 2;

    /deep/ img {
      max-width: 100%;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 80 / 360 * 100vw;

    div {
      border: 1px #999 solid;
      padding: 5 / 360 * 100vw 20 / 360 * 100vw;
      border-radius: 50px;
      .iconfont {
        margin-right: 5 / 360 * 100vw;
      }

      .icon-weixin {
        color: #07c160;
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: #fff;
  // justify-content: center;
  padding: 0 20 / 360 * 100vw;
  box-sizing: border-box;

  .comment-input {
    flex: 1;
    width: 0;
    background: #ddd;
    outline: none;
    border: 0;
    border-radius: 50px;
    padding: 10 / 360 * 100vw 20 / 360 * 100vw;
  }

  .comment-number {
    position: relative;
    padding: 10 / 360 * 100vw;

    .icon-pinglun {
      font-size: 30 / 360 * 100vw;
    }

    .number {
      display: flex;
      align-items: center;
      position: absolute;
      top: 10 / 360 * 100vw;
      right: 5 / 360 * 100vw;
      font-size: 12 / 360 * 100vw;
      color: #fff;
      background: red;
      border-radius: 50px;
      padding: 1 / 360 * 100vw 5 / 360 * 100vw;
    }
  }

  .icon-shoucang {
    font-size: 28 / 360 * 100vw;
    padding: 10 / 360 * 100vw;
    font-weight: 700;
  }

  .icon-fenxiang {
    font-size: 28 / 360 * 100vw;
    padding: 10 / 360 * 100vw;
    font-weight: 700;
  }
}

// 点击了底部的小星星 = 收藏
// 是否已点赞
.collect,
.like_check {
  color: red;
}
</style>