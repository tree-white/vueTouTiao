<template>
    <router-link to="#">
      <div class="list" >
        <i>{{ label }}</i>
        <span> {{ tips }} <i class="iconfont icon-youjiantou"></i> </span>
      </div>
    </router-link>
</template>

<script>
export default {
    // 声明组件可以接收属性 - label=坐标文字 / tips=右边文字
    props: ['label','tips'],
    methods: {

    }
};
</script>

<style scoped lang="less">
.list {
  display: flex;
  justify-content: space-between;
  padding: 15 / 360 * 100vw 0;
  border-bottom: 1px solid #ccc;
  margin-left: 15 / 360 * 100vw;

  span {
    flex: 1;
    font-size: 14px;
    color: #aaa;
    text-align: right;
    margin-right: 10px;
  }
}
</style>