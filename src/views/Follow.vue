<template>
  <div>
    <!-- 头部组件 -->
    <Titlebar title="我的关注" showBack="true" />

    <!-- 要循环的结构 -->
    <div class="user-item">
      <img
        src="http://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
      />
      <div class="user-info">
        <div>火星网友</div>
        <p>2021-05-05</p>
      </div>
      <span class="cancel">取消关注</span>
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
.user-item {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  align-items: center;

  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    display: block; // 去掉图片的底部白边
    border-radius: 50%;
    object-fit: cover; // 防止图片变形
    margin-right: 20 / 360 * 100vw;
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      color: #999;
      font-size: 14px;
    }
  }

  .cancel {
    display: flex;
    align-items: center;
    background: #ccc;
    padding: 5px 20px;
    border-radius: 50px;
    font-size: 14px;
  }
}
</style>