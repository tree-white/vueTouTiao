<template>
  <div>
    <!--搜索栏 -->
    <header class="header" @touchmove.prevent>
      <!-- 退出搜索返回上一层 -->
      <div class="iconfont icon-zuojiantou"></div>

      <!-- 中间的搜索框 -->
      <div class="search-wrapper">
        <!-- 搜索的图标 -->
        <label for="search">
          <span class="iconfont icon-search"></span>
        </label>

        <!-- 搜索框 -->
        <input type="text" placeholder="请输入搜索关键字" id="search" />
      </div>

      <!-- 搜索按钮 -->
      <span class="btn">搜索</span>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header {
  padding: 5 / 360 * 100vw 10/ 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon-zuojiantou,.btn {
      padding: 10 / 360 * 100vw;
  }

  .search-wrapper {
    flex: 1;
    height: 38 / 360 * 100vw;
    padding: 0 10 / 360 * 100vw;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    outline: none;
    border-radius: (38 / 360 * 100vw)*50%;

    .icon-search {
        color: #999;
        padding:0 5 / 360 * 100vw;
        border-right:1px solid #ccc;
    }

    #search {
        border: 0;
        padding-left: 5 / 360 * 100vw;
    }
  }

}
</style>