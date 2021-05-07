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
      <!-- 顶部下拉刷新 -->
      <van-tabs v-model="active" sticky swipeable>
        <!-- 底部下拉刷新 -->
        <van-tab
          v-for="(item, index) in category"
          :title="item.name"
          :key="index"
        >
          <!-- tab栏 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <!-- 列表组件 -->
              <!-- 传入的是需要渲染的数组 -->
              <PostAll :arrData="list" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="Ｖ"></van-tab>
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
    console.log("------------------- ↓ 刷新了 Index.vue 页面 ↓ ------------------------");

    const { token: Authorization } = JSON.parse(localStorage.getItem("userInfo")) || {};
    console.log(Authorization ? "有密令！" : "没有密令！");

    // 调用请求列表数据
    this.getList(Authorization);

    // 请求前先判断本地是否有栏目数据
    const { data: category } = JSON.parse(localStorage.getItem("category")) || [];

    this.category = category;
    console.log("列表栏数据:",this.category);

    // 有本地数据时-进行判断
    if (category) {
      // 有登录/但本地数据没关注
      if (Authorization && category[0].name !== "关注") {
        console.log("有（本地数据）有（token）但没（关注分类）!");
        this.getCategory(Authorization);
      }

      // 没登录/但本地数据有关注
      if (!Authorization && category[0].name === "关注") {
        console.log("有（本地数据）没（token）但有（关注分类）");
        this.getCategory();
      }

      this.handleCategories();
      console.log("所有栏目添加pageIndex后：",this.category);
    }
    // 没本地数据的时候则直接请求
    else {
      this.getCategory(Authorization);
      console.log("没有本地数据");
    }
  },

  data() {
    return {
      refreshing: false,
      list: [],
      total: 1,
      loading: false,
      finished: false,
      // 菜单的数据
      category: [],
      categoryID: 999,
      // 会记录当前的值
      active: 1,
    };
  },
  methods: {
    // 循环给栏目加上 pageIndex，每个栏目都是自己的pageIndex
    handleCategories(){
        this.category.forEach(v => v.pageIndex = 1)
    },

    // 获取菜单
    getCategory(Authorization = "") {
      // 请求栏目列表
      this.$axios({
        url: "/category",
        headers: { Authorization },
      }).then((resposne) => {
        // 打印输出获取逇菜单数据
        console.log("获取栏目成功：", resposne.data.data);
        // 把菜单的数据保存到本地
        localStorage.setItem("category", JSON.stringify(resposne.data));
        // 渲染本地数据
        this.category = resposne.data.data
        // 给每个栏目添加一个 pageIndex
        this.handleCategories();
      });
    },

    // 请求数据列表
    getList(Authorization = "") {
      // 请求数据列表
      this.$axios({
        url: "/post",
        params: {
            category: this.categoryID
        },
        headers: { Authorization },


      }).then((response) => {
        console.log("请求返回的内容：", response);
        console.log("请求返回的内容里的data：", response.data);
        //   this.arrData = response.data.data;
        this.list = response.data.data;
        this.total = response.data.total;
        console.log("总页数：",this.total);
      });
    },

    onLoad() {
        // 加载下一页设定



      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     if (this.refreshing) {
      //       this.list = [];
      //       this.refreshing = false;
      //     }
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
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
      console.log(this.active);
      if (this.active === this.category.length) {
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