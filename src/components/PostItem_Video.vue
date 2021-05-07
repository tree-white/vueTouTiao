<template>
  <div>
    <!-- 循环结构 - 视频列表组件 -->
    <div class="collect-video">
      <!-- 标题 -->
      <h4>{{ data.title }}</h4>

      <!-- 封面图片 -->
      <div class="video-cover">
        <img
          :src="$axios.defaults.baseURL + data.cover[0].url"
        />
        <!-- 播放按钮 -->
        <div class="playBtn">
          <span class="iconfont icon-shipin"></span>
        </div>
      </div>

      <!-- 作者 - 跟帖量 -->
      <div>
        <span>{{ data.user.nickname }}</span>
        <span>{{ data.comments }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped lang="less">
.collect-video {
  padding: 10 / 360 * 100vw;
  border-bottom: 1px solid #eee;

  h4 {
    margin-bottom: 10 / 360 * 100vw;
    font-weight: 400;
    display: -webkit-box; /*将对象转为弹性盒模型展示*/
    -webkit-box-orient: vertical; /*设置弹性盒模型子元素的排列方式*/
    -webkit-line-clamp: 2; /*限制文本行数*/
    overflow: hidden; /*超出隐藏*/
  }

  .video-cover {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10 / 360 * 100vw;

    img {
      width: 100%;
      height: 170 / 360 * 100vw;
      object-fit: cover;
    }

    .playBtn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      .icon-shipin {
        font-size: 46 / 360 * 100vw;
        color: #fff;
        margin: 0;
      }
    }
  }

  span {
    display: inline-block;
    font-size: 12px;
    color: #aaa;
    margin-right: 10 / 360 * 100vw;
  }
}
</style>