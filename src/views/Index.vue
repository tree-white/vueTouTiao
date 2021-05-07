<template>
  <div>
    <!-- 头部 -->
    <header class="header" @touchmove.prevent>
      <!-- 左边 new -->
      <div class="iconfont icon-new"></div>
      <!-- 中间搜索框 -->
      <router-link to="#" class="search-cont">
        <div class="search">
          <span class="iconfont icon-search"></span>
          <span>搜索新闻</span>
        </div>
      </router-link>

      <!-- 右边个人中心 -->
      <router-link to="/user">
        <div class="iconfont icon-wode"></div>
      </router-link>
    </header>

    <!-- Tab栏切换 - vant 组件 -->
    <!-- v-model：就是当前的索引值，是唯一的，类似于for循环的key -->
    <!-- sticky：使用粘性布局 -->
    <section class="section">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="(item, index) in navData" :title="item" :key="index">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <!-- 单张图的列表 -->
              <PostAll />
              <!-- 2-3张图的列表 -->
              <!-- <PostManyImg /> -->
              <!-- 视频列表 -->
              <!-- <PostVideo /> -->
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="V"></van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script>
// 文章列表的组件
import PostAll from "@/components/PostItem_All";

export default {
  // 进来则自动获取文章列表
  mounted() {
      const {token: Authorization } = JSON.parse(localStorage.getItem("userInfo")) || "";
      console.log(Authorization ? "有密令" : '没有密令');

    this.$axios({
      url: "/post",
      headers: {Authorization}
    }).then((response) => {
      console.log("请求返回的内容：",response);
      console.log("请求返回的内容里的data：",response.data);
    });
  },
  data() {
    return {
      refreshing: false,
      list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      loading: false,
      finished: false,
      // 菜单的数据
      navData: [
        "关注",
        "头条",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "体育",
        "汽车",
        "房产",
        "房产",
        "体育",
        "汽车",
        "房产",
      ],
      // 会记录当前的值
      active: 0,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  watch: {
    active() {
      //   console.log(this.active); // 测试点击了哪个tab
      // 如果点击的是最后一个图标，跳珠啊难道栏目管理业
      if (this.active === this.navData.length) {
        this.$router.push("/栏目管理业");
      }
    },
  },
  components: { PostAll },
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10 / 360 * 100vw;
  background: red;

  .icon-new {
    font-size: 54 / 360 * 100vw;
    color: #fff;
    margin-right: 10 / 360 * 100vw;
  }

  .search-cont {
    flex: 1;
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #fff;
      background: rgba(255, 255, 255, 0.6);
      padding: 6px 0;
      border-radius: 50px;
      font-size: 14px;

      span {
        position: relative;
        z-index: 999;
      }

      .icon-search {
        margin-right: 5px;
        font-size: 14px;
      }
    }
  }

  .icon-wode {
    font-size: 32 / 360 * 100vw;
    color: #fff;
    padding: 5px;
    margin-left: 10 / 360 * 100vw;
  }
}

/deep/ .van-tabs__wrap {
  position: relative;
  padding-right: 49px;
}

/deep/ .van-tabs__nav {
  position: unset;
  background: #eee;

  .van-tab:nth-last-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50px;
    background: #eee;
  }
}

/deep/ .van-tabs__line {
  display: none;
}

/deep/ .van-tab--active {
  border-bottom: 1px solid red;
}
</style>