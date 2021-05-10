<template>
  <div>
    <!-- 视频 -->
    <video
    v-if="post.content"
      :src="$axios.defaults.baseURL + post.content"
      controls="controls"
      width="100%"
      :poster="$axios.defaults.baseURL + post.cover[0].url"
    >
      您的浏览器不支持 video 标签。
    </video>

    <!-- 作者栏 -->
    <div class="author">
      <div class="left">
        <!-- 作者头像 -->
        <img :src="$axios.defaults.baseURL + post.user.head_img" />

        <!-- 作者昵称 -->
        <span>{{ post.user.nickname }}</span>
      </div>

      <!-- 关注 / 取消关注 按钮 -->
      <div
        class="follow"
        :class="post.has_follow ? '' : 'active'"
        @click="handleFollow"
      >
        {{ post.has_follow ? "已关注" : "关注" }}
      </div>
    </div>

    <div class="container">
      <!-- 标题 -->
      <h2>{{ post.title }}</h2>

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
        <div class="wechat" @click="showShare = true">
          <span class="iconfont icon-weixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>

    <!-- 底部固定栏 -->
    <PostFooter :getPost="post" />


    <!-- vant 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import PostFooter from "@/components/Post_Footer"
export default {
    components: {PostFooter},
  data() {
    return {
      token: "",
      post: { user: {}, cover: [{}] },
      // 分享面板
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "朋友圈", icon: "wechat-moments" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" },
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
    // 分享面板
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },

    // 点赞 / 取消点赞
    handleLike() {
      // 发起请求
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

    // 关注和取消关注
    handleFollow() {
      // 判断当前的状态是关注还是未关注
      const url =
        (this.post.has_follow ? "/user_unfollow/" : "/user_follows/") +
        this.post.user.id;

      // 发起请求
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
  },
};
</script>

<style scoped lang="less">
// 文章内容
.author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999;
  padding: 20 / 360 * 100vw;

  .left {
    display: flex;
    align-items: center;

    img {
      width: 30 / 360 * 100vw;
      height: 30 / 360 * 100vw;
      border-radius: 50%;
      margin-right: 10 / 360 * 100vw;
    }

    span {
      font-size: 14 / 360 * 100vw;
    }
  }

  .follow {
    padding: 3 / 360 * 100vw 15 / 360 * 100vw;
    font-size: 12 / 360 * 100vw;
    border: 1px #999 solid;
    border-radius: 50px;
  }
}

.container {
  h2 {
    padding: 0 20 / 360 * 100vw 30 / 360 * 100vw;
    font-size: 16 / 360 * 100vw;
    font-weight: normal;
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

// 是否已点赞
.like_check {
  color: red;
}

// 关注样式
.active {
  background: red;
  color: #fff;
  border-color: red !important;
}
</style>