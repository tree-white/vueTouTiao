<template>
  <div class="listbar">
    <router-link to="#">
      <div class="list">
        <i>{{ label }}</i>
        <span> {{ tips }} <i class="iconfont icon-youjiantou"></i> </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    // 声明组件可以接收属性 - label=坐标文字 / tips=右边文字
    props: ['label','tips']
};
</script>

<style scoped lang="less">
.listbar {
    padding-left: 35 / 635 * 100vw;
}
.list {
  display: flex;
  justify-content: space-between;
  padding: 15 / 360 * 100vw 0;
  border-bottom: 1px solid #ccc;

  span {
    flex: 1;
    font-size: 14px;
    color: #aaa;
    text-align: right;
    margin-right: 10px;
  }
}
</style>