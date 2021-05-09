<template>
  <div>
    <!--搜索栏 -->
    <header class="header">
      <!-- 退出搜索返回上一层 -->
      <div class="iconfont icon-zuojiantou"></div>

      <!-- 中间的搜索框 -->
      <div class="search-wrapper">
        <!-- 搜索的图标 -->
        <label for="search">
          <span class="iconfont icon-search"></span>
        </label>

        <!-- 搜索框 -->
        <!-- @keyup.enter 是键盘事件中回车键的事件 -->
        <input
          type="text"
          placeholder="请输入搜索关键字"
          id="search"
          v-model="value"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- 搜索按钮 -->
      <span class="btn" @click="handleSearch">搜索</span>
    </header>

    <!-- 历史记录 -->
    <section class="history">
      <div class="title">
        <strong>历史记录</strong>
        <!-- 清空本地的搜索记录 -->
        <div class="clear" @click="handleClear">
          <span class="iconfont icon-guanbi"></span>
          <em>清除</em>
        </div>
      </div>

      <ul class="history-list">
        <li
          class="history-item"
          v-for="(item, index) in history"
          :key="index"
          @click="handleSearchHistory(item)"
        >
          {{ item }}
        </li>
      </ul>

      <!-- 结果的浮层 -->
      <ul class="supernatant-list" v-if="showLayer">
        <!-- 渲染浮层搜索到的内容 -->
        <PostAll :arrData="list" />

        <div class="empty" v-if="list.length === 0">
            没有找到你搜索的内容
        </div>
        <!-- <li class="supernatant-item">
          <p>搜索结果的浮层搜索结果的浮层</p>
          <span class="iconfont icon-youjiantou"></span>
        </li> -->
      </ul>
    </section>
  </div>
</template>

<script>
import PostAll from "@/components/PostItem_All";

export default {
  components: { PostAll },

  watch: {
      value(){
          // 如果搜索内容=空
          if(!this.value.trim()) {
              // 清空文章列表
              this.list = [];
              // 浮层清空
              this.showLayer = false;
          }
      }
  },

  data() {
    return {
      // 搜索内容
      value: "",
      // 历史数据 - 把本地历史数据添加到本地
      history: JSON.parse(localStorage.getItem("history")) || [],
      // 文章列表
      list: [],
      // 是否展示浮层
      showLayer: false,
    };
  },

  methods: {
    // 点击搜索按钮或者输入框按下回车触发
    handleSearch() {
      console.log("点击了搜索：", this.value);
      // 去掉前后空格
      this.value = this.value.trim();
      if (this.value) {
        // 把当前的搜索关键字添加到数组中第一位
        this.history.unshift(this.value);
        // 去重
        this.history = [...new Set(this.history)];
        // 把搜索关键字添加到本地
        localStorage.setItem("history", JSON.stringify(this.history));
        // 调用接口开始搜索
        this.getList();
      } else {
        this.$toast.fail("搜索内容\n不能为空");
      }
    },

    // 点击清除按钮触发清除输入框内容和本地存储内容
    handleClear() {
      this.history = [];
      localStorage.removeItem("history");
    },

    // 点击历史记录输入框会自动显示隶属记录内容
    handleSearchHistory(item) {
      this.value = item;
      this.getList();
    },

    // 调用接口发起搜索请求 - 多次调用所以封装成函数
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value,
        },
      }).then((res) => {
        console.log(res);
        // 显示浮层
        this.showLayer = true;
        // data 是文章列表
        const { data } = res.data;
        // 保存到data中的list
        this.list = data;
      });
    },
  },
};
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
    // padding: 20 / 360 * 100vw;
    padding-top: 10 / 360 * 100vw;

    .empty {
        text-align: center;
        color: #999;
        margin-top:20 / 360 * 100vw ;
    }

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