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

    <!-- 历史记录 -->
    <section class="history">
      <div class="title">
        <strong>历史记录</strong>
        <div class="clear">
          <span class="iconfont icon-guanbi"></span>
          <em>清除</em>
        </div>
      </div>

      <ul class="history-list">
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
        <li class="history-item">美女</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
// 头部搜索栏样式
.header {
  padding: 5 / 360 * 100vw 10/ 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon-zuojiantou,
  .btn {
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
    border-radius: (38 / 360 * 100vw) * 50%;

    .icon-search {
      color: #999;
      padding: 0 5 / 360 * 100vw;
      border-right: 1px solid #ccc;
    }

    #search {
      border: 0;
      padding-left: 5 / 360 * 100vw;
      font-size: 14px;
    }
  }
}

// 历史记录
.history {
  margin: 0 10 / 360 * 100vw;
  padding: 10 / 360 * 100vw 0;
  border-bottom: 1px solid #ccc;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10 / 360 * 100vw;
    padding: 0 10 / 360 * 100vw;
    .clear {
      background: rgba(0, 0, 0, 0.1);
      padding: 2px 10px;
      border-radius: 50px;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: #333;

      .icon-guanbi {
        font-size: 10px;
        margin-right: 5px;
      }
    }
  }

  .history-list {
      display: flex;
      flex-wrap: wrap;

      .history-item {
          font-size: 12px;
          padding:1px 10 / 360 * 100vw ;
          border-radius: 100px;
          border: 1px solid #ddd;
          margin: 5 / 360 * 100vw 10 / 360 * 100vw;
          background: #eee;
      }
  }
}
</style>