<template>
  <div class="Post-Comment-component">
    <!-- 底部固定栏 -->
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
export default {
  props: ['getPost'],
  watch: {
      getPost(){
          this.post = this.getPost
      }
  },
  data() {
    return {
      // 传递过来的数据
      post:{ user: {}, cover: [{}] },
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

  methods: {
    // 收藏 / 取消收藏
    handleStar() {
      // 本地的token
      const {token} = JSON.parse(localStorage.getItem("userInfo")) || {};
      
      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: { Authorization: token },
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
// 底部发布栏
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
.collect {
  color: red;
}
</style>