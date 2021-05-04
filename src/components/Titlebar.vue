<template>
      <div class="hearder">
        <span class="iconfont icon-zuojiantou" @click="$router.back()"></span>
        <a href="javascript:;">{{title ? title : '还未写标题'}}</a>
        <span class="iconfont icon-shouye" @click="$router.replace('/index')"></span>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped lang="less">
.hearder {
    height: 48px ;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        font-size: 24px;
        padding: 0 (30 / 635 * 100vw);
    }
}
</style>