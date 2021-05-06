<template>
  <div>
    <!-- 收藏揶表头 -->
    <Titlebar title="我的收藏" showBack="true" />

    <!-- 循环的结构，少于3张图片的布局 -->
    <div class="collect-oneImg">
      <div class="oneImg-left">
        <h4>林志玲穿透视黑纱裙米兰看秀腹部微秀腹部微秀腹部微隆显孕味</h4>
        <span>火星时报</span>
        <span>52跟帖</span>
      </div>
      <img
        src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
      />
    </div>
  </div>
</template>

<script>
// 导入表头
import Titlebar from "@/components/Titlebar";

export default {
  components: { Titlebar },
};
</script>

<style scoped lang="less">
.collect-oneImg {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;

  .oneImg-left {
    flex: 1;

    h4 {
      margin: 10 / 360 * 100vw 0;
      font-weight: 400;
      display: -webkit-box; /*将对象转为弹性盒模型展示*/
      -webkit-box-orient: vertical; /*设置弹性盒模型子元素的排列方式*/
      -webkit-line-clamp: 2; /*限制文本行数*/
      overflow: hidden; /*超出隐藏*/
    }

    span {
      display: inline-block;
      font-size: 12px;
      color: #aaa;
      margin-right: 10 / 360 * 100vw;
    }
  }

  img {
    display: block;
    margin-left: 10 / 360 * 100vw;
    width: 121 / 360 * 100vw;
    height: 75 / 360 * 100vw;
    object-fit: cover;
  }
}
</style>