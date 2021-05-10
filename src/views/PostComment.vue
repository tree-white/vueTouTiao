<template>
  <div>
    <!-- 头部 -->
    <Titlebar title="精彩跟帖" showBack="true" />

    <!-- 跟帖评论列表 -->
    <div class="comment">
      <!-- 用户信息 / 回复 -->
      <div class="comment-top">
        <!-- 左边：头像/昵称/跟帖时间 -->
        <div class="user">
          <!-- 左边头像 -->
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />

          <!-- 右边昵称/时间 -->
          <div class="user-info">
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
        </div>

        <!-- 右边：回复按钮 -->
        <span class="reply">回复</span>
      </div>

      <!-- 回复内容 -->
      <div class="content">文章说的很有道理！</div>
      
    </div>
  </div>
</template>

<script>
import Titlebar from "@/components/Titlebar";
export default {
  components: { Titlebar },
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
  }
}
</style>