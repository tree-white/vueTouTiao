<template>
  <div class="hearder">
    <span
      class="iconfont icon-zuojiantou"
      @click="$router.back(fromPath)"
      v-if="showBack"
    ></span>
    <span v-else class="iconfont icon-zuojiantou" style="opacity: 0"></span>

    <a href="javascript:;" style="font-weight: 700;">{{ title ? title : "还未写标题" }}</a>

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
  props: ["title", "showBack", "showHome"],
  data() {
    return {
      fromPath: localStorage.getItem('fromPath') || '',
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