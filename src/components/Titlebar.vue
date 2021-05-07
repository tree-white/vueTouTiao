<template>
  <div class="hearder">
    <span
      class="iconfont icon-zuojiantou"
      @click="$router.replace(fromPath)"
      v-if="showBack"
    ></span>
    <span v-else class="iconfont icon-zuojiantou" style="opacity: 0"></span>

    <a href="javascript:;">{{ title ? title : "还未写标题" }}</a>

    <span
      class="iconfont icon-shouye"
      @click="$router.push('/')"
      v-if="showHome"
    ></span>
    <span v-else class="iconfont icon-shouye" style="opacity: 0"></span>
  </div>
</template>

<script>
export default {
  mounted(){
    this.fromPath = localStorage.getItem('fromPath');
    
  },
  props: ["title", "showBack", "showHome"],
  data() {
    return {
      fromPath: '',
    };
  },
};
</script>

<style scoped lang="less">
.hearder {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 24px;
    padding: 0 (30 / 635 * 100vw);
  }
}
</style>