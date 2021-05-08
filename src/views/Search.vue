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

      <!-- 结果的浮层 -->
      <ul class="supernatant-list">
        <li class="supernatant-item">
          <p>搜索结果的浮层搜索结果的浮层</p>
          <span class="iconfont icon-youjiantou"></span>
        </li>
        <li class="supernatant-item">
          <p>搜索结果的浮层搜索结果的浮层</p>
          <span class="iconfont icon-youjiantou"></span>
        </li>
        <li class="supernatant-item">
          <p>搜索结果的浮层搜索结果的浮层搜索结果的浮层搜索结果的浮层</p>
          <span class="iconfont icon-youjiantou"></span>
        </li>
        <li class="supernatant-item">
          <p>搜索结果的浮层搜索结果的浮层</p>
          <span class="iconfont icon-youjiantou"></span>
        </li>
        <li class="supernatant-item">
          <p>搜索结果的浮层搜索结果的浮层</p>
          <span class="iconfont icon-youjiantou"></span>
        </li>
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
      font-size: 14 / 360 * 100vw;
    }
  }
}

// 历史记录
.history {
  margin: 0 10 / 360 * 100vw;
  padding: 10 / 360 * 100vw 0;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10 / 360 * 100vw;
    padding: 0 10 / 360 * 100vw;
    .clear {
      background: rgba(0, 0, 0, 0.1);
      padding: 2 / 360 * 100vw 10 / 360 * 100vw;
      border-radius: 50 / 360 * 100vw;
      height: 14 / 360 * 100vw;
      line-height: 14 / 360 * 100vw;
      font-size: 14 / 360 * 100vw;
      color: #333;

      .icon-guanbi {
        font-size: 10 / 360 * 100vw;
        margin-right: 5 / 360 * 100vw;
      }
    }
  }

  // 历史记录
  .history-list {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10 / 360 * 100vw;

    .history-item {
      font-size: 12 / 360 * 100vw;
      padding: 1 / 360 * 100vw 10 / 360 * 100vw;
      border-radius: 100px;
      border: 1 / 360 * 100vw solid #ddd;
      margin: 5 / 360 * 100vw 10 / 360 * 100vw;
      background: #eee;
    }
  }

  // 浮层
  .supernatant-list {
    position: absolute;
    top: 50 / 360 * 100vw;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff; // 暂时的遮罩层
    // display: none; // 隐藏遮罩层
    padding: 20 / 360 * 100vw;
    padding-top: 10 / 360 * 100vw;

    .supernatant-item {
      display: flex;
      justify-content: space-between;
      padding: 10 / 360 * 100vw 0;
      border-bottom: 1px solid #ccc;
      font-size: 14 / 360 * 100vw;
      align-items: center;

      p {
        flex: 1;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .icon-youjiantou {
        color: #ccc;
        font-size: 16 / 360 * 100vw;
      }
    }
  }
}
</style>